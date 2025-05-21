import { defaults } from "../feed";
import { serialize } from "../serialize";
import { createRoot, createRootAttributes, toArray } from "./utils";
import type { Author, Category, Enclosure, Feed, Generator } from "../types";

export function generateAtom1(feed: Feed) {
    const xml = createRoot(feed, {
        feed: {
            ...createRootAttributes(feed, "http://www.w3.org/2005/Atom"),
            "$xml:lang": feed.language,
            title: feed.title,
            subtitle: feed.description,
            id: feed.id,
            updated: feed.updatedAt?.toISOString() ?? new Date().toISOString(),
            generator: feed.generator && transformGenerator(feed.generator),
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
    const atomLink = feed.feed ?? feed.feedLinks?.atom;
    if (atomLink !== void 0) {
        xml.feed.link.push({
            $rel: "self",
            $href: atomLink,
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
            title: {
                $type: "html",
                "#cdata": item.title,
            },
            id: item.id ?? item.link,
            link: [{
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

        return entry;
    });

    if (feed.extends) {
        for (const [key, value] of Object.entries(feed.extends)) {
            xml.feed[key] = value;
        }
    }

    return serialize("", xml);
}

function transformGenerator(generator: string | true | Generator) {
    if (typeof generator === "string") {
        return generator;
    }
    else if (generator === true) {
        generator = defaults.generator;
    }

    const { version, uri, text } = generator;
    return {
        $uri: uri,
        $version: version,
        "#text": text,
    };
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

function transformEnclosure(enclosure: string | Enclosure, mimeCategory = "image") {
    if (typeof enclosure === "string") {
        const type = new URL(enclosure).pathname.split(".").pop();
        return {
            $rel: "enclosure",
            $href: enclosure,
            $type: `${mimeCategory}/${type}`,
        };
    }

    const type = new URL(enclosure.url).pathname.split(".").pop();
    return {
        $rel: "enclosure",
        $href: enclosure.url,
        $title: enclosure.title,
        $type: `${mimeCategory}/${type}`,
        $length: enclosure.length,
    };
}
