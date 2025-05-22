import { defaults } from "../feed";
import { serialize } from "../serialize";
import { createRoot, createRootAttributes, getFeedLink, toArray } from "./utils";
import type { Author, Category, Enclosure, Feed, Generator } from "../types";

export function generateRss2(feed: Feed) {
    let hasContent = false;

    const xml = createRoot(feed, {
        rss: {
            $version: "2.0",
            ...createRootAttributes(feed),
            channel: {
                /**
                 * @link https://www.rssboard.org/rss-specification#requiredChannelElements
                 */
                title: feed.title,
                description: feed.description,
                link: feed.link ?? feed.id,

                /**
                 * @link https://www.rssboard.org/rss-specification#optionalChannelElements
                 */
                pubDate: feed.publishedAt?.toUTCString(),
                lastBuildDate: feed.updatedAt?.toUTCString() ?? new Date().toUTCString(),
                category: feed.categories?.map(transformCategory),
                docs: feed.docs ?? "https://www.rssboard.org/rss-specification",
                generator: feed.generator && transformGenerator(feed.generator),
                language: feed.language,
                copyright: feed.copyright,
                ttl: feed.ttl,
            },
        },
    });

    /**
     * @link https://www.rssboard.org/rss-specification#ltimagegtSubelementOfLtchannelgt
     */
    if (feed.image !== void 0) {
        xml.rss.channel.image = {
            title: feed.title,
            url: feed.image,
            link: feed.link,
        };
    }

    const atomLinks: any[] = xml.rss.channel["atom:link"] = [];

    // atom:link (rel="self")
    const atomLink = getFeedLink(feed, "rss");
    if (atomLink !== void 0) {
        atomLinks.push({
            $href: atomLink,
            $rel: "self",
            $type: "application/rss+xml",
        });
    }

    // atom:link (rel="hub")
    if (feed.hub !== void 0) {
        atomLinks.push({
            $href: feed.hub,
            $rel: "hub",
        });
    }

    xml.rss.channel.item = feed.items?.map((item) => {
        const entry: any = {
            title: item.title,
            /**
             * @link https://www.rssboard.org/rss-specification#ltguidgtSubelementOfLtitemgt
             */
            guid: item.id !== void 0 ? { $isPermaLink: "false", "#text": item.id } : item.link,
            link: item.link,
            /**
             * @link https://www.rssboard.org/rss-specification#ltpubdategtSubelementOfLtitemgt
             */
            pubDate: item.publishedAt?.toUTCString() ?? item.updatedAt.toUTCString(),
        };

        /**
         * @link https://www.rssboard.org/rss-specification#ltcategorygtSubelementOfLtitemgt
         */
        entry.category = item.categories?.map(transformCategory);

        if (item.description !== void 0) {
            entry.description = { "#cdata": item.description };
        }

        /**
         * @link https://www.rssboard.org/rss-profile#namespace-elements-content-encoded
         */
        if (item.content !== void 0) {
            hasContent = true;
            entry["content:encoded"] = { "#cdata": item.content };
        }

        /**
         * @link https://www.rssboard.org/rss-specification#ltauthorgtSubelementOfLtitemgt
         */
        entry.author = toArray(item.author)
            .filter(({ email }) => email !== void 0)
            .map(transformAuthor);

        /**
         * @link https://www.rssboard.org/rss-specification#ltenclosuregtSubelementOfLtitemgt
         */
        if (item.enclosure) {
            entry.enclosure = transformEnclosure(item.enclosure);
        }

        if (item.image !== void 0) {
            entry.enclosure = transformEnclosure(item.image, "image");
        }

        if (item.audio !== void 0) {
            entry.enclosure = transformEnclosure(item.audio, "audio");

            if (entry.enclosure.$duration !== void 0) {
                entry["itunes:duration"] = entry.enclosure.$duration;
                delete entry.enclosure.$duration;
            }
        }

        if (item.video !== void 0) {
            entry.enclosure = transformEnclosure(item.video, "video");
        }

        if (item.extends) {
            for (const [key, value] of Object.entries(item.extends)) {
                entry[key] = value;
            }
        }

        return entry;
    });

    if (atomLinks.length) {
        xml.rss["$xmlns:atom"] = "http://www.w3.org/2005/Atom";
    }

    if (hasContent) {
        xml.rss["$xmlns:dc"] = "http://purl.org/dc/elements/1.1/";
        xml.rss["$xmlns:content"] = "http://purl.org/rss/1.0/modules/content/";
    }

    if (feed.extends) {
        for (const [key, value] of Object.entries(feed.extends)) {
            xml.rss.channel[key] = value;
        }
    }

    for (const plugin of feed.plugins ?? []) {
        plugin.resolveRss2?.(feed, xml);
    }

    return serialize("", xml);
}

function transformAuthor(author: Author) {
    const { name, email } = author;
    return `${email} (${name})`;
}

function transformCategory(category: Category) {
    const { term, label, link } = category;

    return {
        $domain: link,
        "#text": label ?? term,
    };
}

function transformGenerator(generator: string | true | Generator) {
    if (typeof generator === "string") {
        return generator;
    }
    else if (generator === true) {
        generator = defaults.generator;
    }
    return generator.uri;
}

function transformEnclosure(enclosure: string | Enclosure, mimeCategory = "image") {
    if (typeof enclosure === "string") {
        enclosure = { url: enclosure };
    }

    const { url, length, type, title, duration } = enclosure;
    return {
        $url: url,
        $length: length ?? 0,
        $type: type ?? `${mimeCategory}/${new URL(url).pathname.split(".").pop()}`,
        $title: title,
        $duration: duration,
    };
}
