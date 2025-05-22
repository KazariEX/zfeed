import { defaults } from "../feed";
import { serialize } from "../serialize";
import { createRoot, createRootAttributes, getFeedLink, toArray } from "./utils";
import type { Author, Category, Enclosure, Feed } from "../types";

export function generateAtom1(feed: Feed) {
    const plugins = feed.plugins?.filter(({ type }) => type === "atom1") ?? [];

    const xml = createRoot(feed, {
        feed: {
            ...createRootAttributes(feed, "http://www.w3.org/2005/Atom"),
            "$xml:lang": feed.language,
            title: feed.title,
            subtitle: feed.description,
            id: feed.id,
            updated: feed.updatedAt?.toISOString() ?? new Date().toISOString(),
            generator: transformGenerator(feed.generator),
            logo: feed.image,
            icon: feed.favicon,
            rights: feed.copyright,
        },
    });

    xml.feed.link = [];

    // link (rel="alternate")
    if (feed.link !== void 0) {
        xml.feed.link.push({
            $rel: "alternate",
            $href: feed.link,
        });
    }

    // link (rel="self")
    const feedLink = getFeedLink(feed, "atom");
    if (feedLink !== void 0) {
        xml.feed.link.push({
            $rel: "self",
            $href: feedLink,
            $type: "application/atom+xml",
        });
    }

    // link (rel="hub")
    if (feed.hub !== void 0) {
        xml.feed.link.push({
            $rel: "hub",
            $href: feed.hub,
        });
    }

    xml.feed.author = toArray(feed.author).map(transformAuthor);

    xml.feed.contributor = feed.contributors?.map(transformAuthor);

    xml.feed.category = feed.categories?.map(transformCategory);

    xml.feed.entry = feed.items?.map((item) => {
        const entry: any = {
            title: item.title,
            id: item.id ?? item.link,
            link: [{
                $rel: "alternate",
                $href: item.link,
            }],
            updated: item.updatedAt.toISOString(),
            published: item.publishedAt?.toISOString(),
        };

        entry.category = item.categories?.map(transformCategory);

        if (item.description !== void 0) {
            entry.summary = {
                $type: "html",
                "#cdata": item.description,
            };
        }

        if (item.content !== void 0) {
            entry.content = {
                $type: "html",
                "#cdata": item.content,
            };
        }

        entry.author = toArray(item.author).map(transformAuthor);

        entry.contributor = item.contributors?.map(transformAuthor);

        entry.rights = item.copyright;

        if (item.enclosure) {
            entry.link.push(transformEnclosure(item.enclosure));
        }

        if (item.image !== void 0) {
            entry.link.push(transformEnclosure(item.image, "image"));
        }

        if (item.audio !== void 0) {
            entry.link.push(transformEnclosure(item.audio, "audio"));
        }

        if (item.video !== void 0) {
            entry.link.push(transformEnclosure(item.video, "video"));
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

    if (feed.extends) {
        for (const [key, value] of Object.entries(feed.extends)) {
            xml.feed[key] = value;
        }
    }

    for (const plugin of plugins) {
        plugin.resolve?.(feed, xml);
    }

    return serialize("", xml);
}

function transformAuthor(author: Author) {
    const { name, email, link } = author;

    return {
        name,
        email,
        uri: link,
    };
}

function transformCategory(category: Category) {
    const { term, label, link } = category;

    return {
        $term: term,
        $label: label,
        $scheme: link,
    };
}

function transformGenerator(generator: Feed["generator"]) {
    if (typeof generator !== "object") {
        return generator || void 0;
    }

    const { uri, version, text } = generator ?? defaults.generator;
    return {
        $uri: uri,
        $version: version,
        "#text": text,
    };
}

function transformEnclosure(enclosure: string | Enclosure, mimeCategory = "image") {
    if (typeof enclosure === "string") {
        enclosure = { url: enclosure };
    }

    const { url, type, title, length } = enclosure;
    return {
        $rel: "enclosure",
        $href: url,
        $type: type ?? `${mimeCategory}/${new URL(url).pathname.split(".").pop()}`,
        $title: title,
        $length: length,
    };
}
