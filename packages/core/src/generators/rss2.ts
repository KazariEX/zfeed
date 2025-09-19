import { defaults } from "../feed";
import { serialize } from "../serialize";
import { createRoot, createRootAttributes, getFeedLink, toArray } from "./utils";
import type { Category, Enclosure, Feed } from "../types";

export function generateRss2(feed: Feed) {
    const plugins = feed.plugins?.filter(({ type }) => type === "rss2") ?? [];
    const namespace: Record<string, boolean> = {};

    const xml = createRoot(feed, {
        rss: {
            $version: "2.0",
            ...createRootAttributes(feed),
            channel: {
                /**
                 * @see https://www.rssboard.org/rss-specification#requiredChannelElements
                 */
                title: feed.title,
                description: feed.description,
                link: feed.link ?? feed.id,

                /**
                 * @see https://www.rssboard.org/rss-specification#optionalChannelElements
                 */
                pubDate: feed.publishedAt?.toUTCString(),
                lastBuildDate: feed.updatedAt?.toUTCString() ?? new Date().toUTCString(),
                category: feed.categories?.map(transformCategory),
                docs: feed.docs ?? "https://www.rssboard.org/rss-specification",
                generator: transformGenerator(feed.generator),
                language: feed.language,
                copyright: feed.copyright,
                ttl: feed.ttl,
            },
        },
    });

    /**
     * @see https://www.rssboard.org/rss-specification#ltimagegtSubelementOfLtchannelgt
     */
    if (feed.image !== void 0) {
        xml.rss.channel.image = {
            url: feed.image,
            title: feed.title,
            link: feed.link,
        };
    }

    /**
     * @see https://www.rssboard.org/rss-profile#namespace-elements-atom-link
     */
    const atomLinks: any[] = xml.rss.channel["atom:link"] = [];

    // atom:link (rel="self")
    const feedLink = getFeedLink(feed, "rss");
    if (feedLink !== void 0) {
        atomLinks.push({
            $rel: "self",
            $href: feedLink,
            $type: "application/rss+xml",
        });
    }

    // atom:link (rel="hub")
    if (feed.hub !== void 0) {
        atomLinks.push({
            $rel: "hub",
            $href: feed.hub,
        });
    }

    xml.rss.channel.item = feed.items?.map((item) => {
        const entry: any = {
            title: item.title,
            /**
             * @see https://www.rssboard.org/rss-specification#ltguidgtSubelementOfLtitemgt
             */
            guid: item.id !== void 0 ? { $isPermaLink: "false", "#text": item.id } : item.link,
            link: item.link,
            /**
             * @see https://www.rssboard.org/rss-specification#ltpubdategtSubelementOfLtitemgt
             */
            pubDate: item.publishedAt?.toUTCString() ?? item.updatedAt.toUTCString(),
        };

        /**
         * @see https://www.rssboard.org/rss-specification#ltcategorygtSubelementOfLtitemgt
         */
        entry.category = item.categories?.map(transformCategory);

        if (item.description !== void 0) {
            entry.description = { "#cdata": item.description };
        }

        /**
         * @see https://www.rssboard.org/rss-profile#namespace-elements-content-encoded
         */
        if (item.content !== void 0) {
            entry["content:encoded"] = { "#cdata": item.content };
            namespace.content = true;
        }

        /**
         * @see https://www.rssboard.org/rss-specification#ltauthorgtSubelementOfLtitemgt
         * @see https://www.rssboard.org/rss-profile#namespace-elements-dublin-creator
         */
        for (const { name, email } of toArray(item.author)) {
            if (email !== void 0) {
                (entry.author ??= []).push(name ? `${email} (${name})` : email);
            }
            else if (name !== void 0) {
                (entry["dc:creator"] ??= []).push(name);
                namespace.dc = true;
            }
        }

        /**
         * @see https://www.rssboard.org/rss-specification#ltenclosuregtSubelementOfLtitemgt
         */
        if (item.enclosure) {
            entry.enclosure = transformEnclosure(item.enclosure);
        }

        if (item.image !== void 0) {
            entry.enclosure = transformEnclosure(item.image, "image");
        }

        if (item.audio !== void 0) {
            entry.enclosure = transformEnclosure(item.audio, "audio");
        }

        if (item.video !== void 0) {
            entry.enclosure = transformEnclosure(item.video, "video");
        }

        if (item.extends) {
            for (const [key, value] of Object.entries(item.extends)) {
                entry[key] = value;
            }
        }

        for (const plugin of plugins) {
            plugin.resolveItem?.(item, entry);
        }

        return entry;
    });

    if (atomLinks.length) {
        xml.rss["$xmlns:atom"] = "http://www.w3.org/2005/Atom";
    }
    if (namespace.content) {
        xml.rss["$xmlns:content"] = "http://purl.org/rss/1.0/modules/content/";
    }
    if (namespace.dc) {
        xml.rss["$xmlns:dc"] = "http://purl.org/dc/elements/1.1/";
    }

    if (feed.extends) {
        for (const [key, value] of Object.entries(feed.extends)) {
            xml.rss.channel[key] = value;
        }
    }

    for (const plugin of plugins) {
        plugin.resolve?.(feed, xml);
    }

    return serialize("", xml);
}

function transformCategory(category: Category) {
    const { term, label, link } = category;

    return {
        $domain: link,
        "#text": label ?? term,
    };
}

function transformGenerator(generator: Feed["generator"] = defaults.generator) {
    if (typeof generator !== "object") {
        return generator || void 0;
    }

    const { name, uri, version } = generator;
    let str = name;
    if (version !== void 0) {
        str += ` ${version}`;
    }
    if (uri !== void 0) {
        str += ` (${uri})`;
    }
    return str;
}

function transformEnclosure(enclosure: string | Enclosure, mimeCategory = "image") {
    if (typeof enclosure === "string") {
        enclosure = { url: enclosure };
    }

    const { url, length, type } = enclosure;
    return {
        $url: url,
        $length: length ?? 0,
        $type: type ?? `${mimeCategory}/${new URL(url).pathname.split(".").pop()}`,
    };
}
