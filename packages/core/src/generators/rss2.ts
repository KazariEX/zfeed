import { XMLBuilder } from "fast-xml-parser";
import type { Feed } from "../feed";
import type { Category, Enclosure } from "../types";

export function generateRss2(feed: Feed) {
    const builder = new XMLBuilder({
        attributeNamePrefix: "$",
        cdataPropName: "$",
        format: true,
        ignoreAttributes: false,
    });

    let isAtom = false;
    let isContent = false;

    const data: any = {
        rss: {
            $version: "2.0",
            channel: {
                title: feed.title,
                link: feed.link,
                description: feed.description,
                lastBuildDate: feed.updated ? feed.updated.toUTCString() : new Date().toUTCString(),
                docs: feed.docs ?? "https://validator.w3.org/feed/docs/rss2.html",
                generator: feed.generator,
            },
        },
    };

    /**
     * Channel language
     * https://validator.w3.org/feed/docs/rss2.html#ltlanguagegtSubelementOfLtchannelgt
     */
    if (feed.language) {
        data.rss.channel.language = feed.language;
    }

    /**
     * Channel ttl
     * https://validator.w3.org/feed/docs/rss2.html#ltttlgtSubelementOfLtchannelgt
     */
    if (feed.ttl) {
        data.rss.channel.ttl = feed.ttl;
    }

    /**
     * Channel Image
     * https://validator.w3.org/feed/docs/rss2.html#ltimagegtSubelementOfLtchannelgt
     */
    if (feed.image) {
        data.rss.channel.image = {
            title: feed.title,
            url: feed.image,
            link: feed.link,
        };
    }

    /**
     * Channel Copyright
     * https://validator.w3.org/feed/docs/rss2.html#optionalChannelElements
     */
    if (feed.copyright) {
        data.rss.channel.copyright = feed.copyright;
    }

    /**
     * Channel Categories
     * https://validator.w3.org/feed/docs/rss2.html#comments
     */
    data.rss.channel.category = feed.categories;

    /**
     * Feed URL
     * http://validator.w3.org/feed/docs/warning/MissingAtomSelfLink.html
     */
    const atomLink = feed.feed || (feed.feedLinks && feed.feedLinks.rss);
    if (atomLink) {
        isAtom = true;
        data.rss.channel["atom:link"] = [
            {
                $href: atomLink,
                $rel: "self",
                $type: "application/rss+xml",
            },
        ];
    }

    /**
     * Hub for PubSubHubbub
     * https://code.google.com/p/pubsubhubbub/
     */
    if (feed.hub) {
        isAtom = true;
        (data.rss.channel["atom:link"] ??= []).push({
            $href: feed.hub,
            $rel: "hub",
        });
    }

    /**
     * Channel Categories
     * https://validator.w3.org/feed/docs/rss2.html#hrelementsOfLtitemgt
     */
    data.rss.channel.item = feed.items.map((item) => {
        const entry: any = {};

        if (item.title) {
            entry.title = { $: item.title };
        }

        if (item.link) {
            entry.link = item.link;
        }

        if (item.id) {
            entry.guid = item.id;
        }
        else if (item.link) {
            entry.guid = item.link;
        }

        if (item.date) {
            entry.pubDate = item.date.toUTCString();
        }

        if (item.published) {
            entry.pubDate = item.published.toUTCString();
        }

        if (item.description) {
            entry.description = { $: item.description };
        }

        /**
         * Item Category
         * https://validator.w3.org/feed/docs/rss2.html#ltcategorygtSubelementOfLtitemgt
         */
        if (item.category?.length) {
            entry.category = item.category.map(transformCategory);
        }

        if (item.content) {
            isContent = true;
            entry["content:encoded"] = { $: item.content };
        }

        /**
         * Item Author
         * https://validator.w3.org/feed/docs/rss2.html#ltauthorgtSubelementOfLtitemgt
         */
        if (item.author?.length) {
            entry.author = item.author
                .filter(({ email, name }) => email && name)
                .map(({ email, name }) => `${email} (${name})`);
        }

        /**
         * Item Enclosure
         * https://validator.w3.org/feed/docs/rss2.html#ltenclosuregtSubelementOfLtitemgt
         */
        if (item.enclosure) {
            entry.enclosure = transformEnclosure(item.enclosure);
        }

        if (item.image) {
            entry.enclosure = transformEnclosure(item.image, "image");
        }

        if (item.audio) {
            entry.enclosure = transformEnclosure(item.audio, "audio");

            if (entry.enclosure.$duration !== void 0) {
                entry["itunes:duration"] = entry.enclosure.$duration;
                delete entry.enclosure.$duration;
            }
        }

        if (item.video) {
            entry.enclosure = transformEnclosure(item.video, "video");
        }

        if (item.extensions?.length) {
            for (const { name, objects } of item.extensions) {
                entry[name] = objects;
            }
        }

        return entry;
    });

    if (isAtom) {
        data.rss["$xmlns:atom"] = "http://www.w3.org/2005/Atom";
    }

    if (isContent) {
        data.rss["$xmlns:dc"] = "http://purl.org/dc/elements/1.1/";
        data.rss["$xmlns:content"] = "http://purl.org/rss/1.0/modules/content/";
    }

    if (feed.podcast) {
        data.rss["$xmlns:googleplay"] = "http://www.google.com/schemas/play-podcasts/1.0";
        data.rss["$xmlns:itunes"] = "http://www.itunes.com/dtds/podcast-1.0.dtd";

        if (feed.category) {
            data.rss.channel["googleplay:category"] = feed.category;
            data.rss.channel["itunes:category"] = feed.category;
        }

        if (feed.author?.email) {
            data.rss.channel["googleplay:owner"] = feed.author.email;
            data.rss.channel["itunes:owner"] = {
                "itunes:email": feed.author.email,
            };
        }

        if (feed.author?.name) {
            data.rss.channel["googleplay:author"] = feed.author.name;
            data.rss.channel["itunes:author"] = feed.author.name;
        }

        if (feed.image) {
            data.rss.channel["googleplay:image"] = {
                $href: feed.image,
            };
        }
    }

    if (feed.extensions?.length) {
        for (const { name, objects } of feed.extensions) {
            data.rss[name] = objects;
        }
    }

    return builder.build(data);
}

function transformEnclosure(enclosure: string | Enclosure, mimeCategory = "image") {
    if (typeof enclosure === "string") {
        const type = new URL(enclosure).pathname.split(".").slice(-1)[0];
        return {
            $url: enclosure,
            $length: 0,
            $type: `${mimeCategory}/${type}`,
        };
    }

    const type = new URL(enclosure.url).pathname.split(".").slice(-1)[0];
    return {
        $url: enclosure.url,
        $length: 0,
        $type: `${mimeCategory}/${type}`,
        $title: enclosure.title,
        $duration: enclosure.duration ? transformDuration(enclosure.duration) : void 0,
    };
}

function transformCategory(category: Category) {
    const { name, domain } = category;

    return {
        $domain: domain,
        "#text": name,
    };
}

function transformDuration(duration: number) {
    const seconds = duration % 60;
    const totalMinutes = Math.floor(duration / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    const notHours = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
    return hours ? hours + ":" + notHours : notHours;
}
