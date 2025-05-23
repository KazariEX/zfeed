import { getFeedLink, toArray } from "./utils";
import type { Author, Enclosure, Feed } from "../types";

export function generateJson1(feed: Feed) {
    const plugins = feed.plugins?.filter(({ type }) => type === "json1") ?? [];

    const data: any = {
        version: "https://jsonfeed.org/version/1.1",
        title: feed.title,
        home_page_url: feed.link,
        feed_url: getFeedLink(feed, "json"),
        description: feed.description,
        icon: feed.image,
        favicon: feed.favicon,
        authors: toArray(feed.author).map(transformAuthor),
        language: feed.language,
    };

    data.items = feed.items?.map((item) => {
        const entry: any = {
            id: item.id,
            url: item.link,
            title: item.title,
            content_html: item.content ?? item.description,
            summary: item.description,
            image: item.image,
            date_published: item.publishedAt?.toISOString(),
            date_modified: item.updatedAt?.toISOString(),
            authors: toArray(item.author).map(transformAuthor),
            tags: item.categories?.map(({ label }) => label),
        };

        const attachments = [];

        if (item.enclosure) {
            attachments.push(transformEnclosure(item.enclosure));
        }

        if (item.image !== void 0) {
            attachments.push(transformEnclosure(item.image, "image"));
        }

        if (item.audio !== void 0) {
            attachments.push(transformEnclosure(item.audio, "audio"));
        }

        if (item.video !== void 0) {
            attachments.push(transformEnclosure(item.video, "video"));
        }

        if (attachments.length) {
            entry.attachments = attachments;
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
            data[key] = value;
        }
    }

    for (const plugin of plugins) {
        plugin.resolve?.(feed, data);
    }

    return JSON.stringify(data, null, 2);
}

function transformAuthor(author: Author) {
    const { name, link, avatar } = author;

    return {
        name,
        url: link,
        avatar,
    };
}

function transformEnclosure(enclosure: string | Enclosure, mimeCategory = "image") {
    if (typeof enclosure === "string") {
        enclosure = { url: enclosure };
    }

    const { url, type, title, length, duration } = enclosure;
    return {
        url,
        mime_type: type ?? `${mimeCategory}/${new URL(url).pathname.split(".").pop()}`,
        title,
        size_in_bytes: length,
        duration_in_seconds: duration,
    };
}
