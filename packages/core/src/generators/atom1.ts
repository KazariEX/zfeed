import { XMLBuilder } from "fast-xml-parser";
import type { Feed } from "../feed";
import type { Author, Category, Enclosure } from "../types";

export function generateAtom1(feed: Feed) {
    const builder = new XMLBuilder({
        attributeNamePrefix: "$",
        cdataPropName: "$",
        format: true,
        ignoreAttributes: false,
    });

    const data: any = {
        "?xml": { $version: "1.0", $encoding: "utf-8" },
        feed: {
            $xmlns: "http://www.w3.org/2005/Atom",
            title: feed.title,
            id: feed.id,
            updated: feed.updated ? feed.updated.toISOString() : new Date().toISOString(),
            generator: feed.generator,
        },
    };

    if (feed.author) {
        data.feed.author = transformAuthor(feed.author);
    }

    if (feed.contributors.length) {
        data.feed.contributor = feed.contributors.map(transformAuthor);
    }

    data.feed.link = [];

    // link (rel="alternate")
    if (feed.link) {
        data.feed.link.push({
            $rel: "alternate",
            $href: feed.link,
        });
    }

    // link (rel="self")
    const atomLink = feed.feed || feed.feedLinks?.atom;
    if (atomLink) {
        data.feed.link.push({
            $rel: "self",
            $href: atomLink,
        });
    }

    // link (rel="hub")
    if (feed.hub) {
        data.feed.link.push({
            $rel: "hub",
            $href: feed.hub,
        });
    }

    if (feed.description) {
        data.feed.subtitle = feed.description;
    }

    if (feed.image) {
        data.feed.logo = feed.image;
    }

    if (feed.favicon) {
        data.feed.icon = feed.favicon;
    }

    if (feed.copyright) {
        data.feed.rights = feed.copyright;
    }

    data.feed.category = feed.categories.map((category) => ({
        $term: category,
    }));

    data.feed.entry = feed.items.map((item) => {
        const entry: any = {
            title: {
                $type: "html",
                $: item.title,
            },
            id: item.id || item.link,
            link: [{
                $href: item.link,
            }],
            updated: item.date.toISOString(),
        };

        if (item.published) {
            entry.published = item.published.toISOString();
        }

        if (item.description) {
            entry.summary = {
                $type: "html",
                $: item.description,
            };
        }

        if (item.category?.length) {
            entry.category = item.category.map(transformCategory);
        }

        if (item.content) {
            entry.content = {
                $type: "html",
                $: item.content,
            };
        }

        if (item.author?.length) {
            entry.author = item.author.map(transformAuthor);
        }

        if (item.contributor?.length) {
            entry.contributor = item.contributor.map(transformAuthor);
        }

        if (item.copyright) {
            entry.rights = item.copyright;
        }

        if (item.enclosure) {
            entry.link.push(transformEnclosure(item.enclosure));
        }

        if (item.image) {
            entry.link.push(transformEnclosure(item.image, "image"));
        }

        if (item.audio) {
            entry.link.push(transformEnclosure(item.audio, "audio"));
        }

        if (item.video) {
            entry.link.push(transformEnclosure(item.video, "video"));
        }

        return entry;
    });

    return builder.build(data);
}

function transformCategory(category: Category) {
    const { name, scheme, term } = category;

    return {
        $label: name,
        $scheme: scheme,
        $term: term,
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

function transformEnclosure(enclosure: string | Enclosure, mimeCategory = "image") {
    if (typeof enclosure === "string") {
        const type = new URL(enclosure).pathname.split(".").slice(-1)[0];
        return {
            $rel: "enclosure",
            $href: enclosure,
            $type: `${mimeCategory}/${type}`,
        };
    }

    const type = new URL(enclosure.url).pathname.split(".").slice(-1)[0];
    return {
        $rel: "enclosure",
        $href: enclosure.url,
        $title: enclosure.title,
        $type: `${mimeCategory}/${type}`,
        $length: enclosure.length,
    };
}
