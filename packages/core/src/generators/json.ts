import { toArray } from "./utils";
import type { Author, Feed } from "../types";

export function generateJson(feed: Feed) {
    const data: any = {
        version: "https://jsonfeed.org/version/1",
        title: feed.title,
        home_page_url: feed.link,
        feed_url: feed.feed ?? feed.feedLinks?.json,
        description: feed.description,
        icon: feed.image,
    };

    const authors = toArray(feed.author);
    if (authors.length) {
        data.author = transformAuthor(authors[0]);
    }

    data.items = feed.items?.map((item) => {
        const entry: any = {
            title: item.title,
            id: item.id,
            url: item.link,
            date_modified: item.updatedAt?.toISOString(),
            date_published: item.publishedAt?.toISOString(),
            tags: item.categories?.map(({ label }) => label),
            summary: item.description,
            content_html: item.content ?? item.description,
            image: item.image,
        };

        const authors = toArray(item.author);
        if (authors.length) {
            entry.author = transformAuthor(authors[0]);
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
            data[key] = value;
        }
    }

    return JSON.stringify(data, null, 4);
}

function transformAuthor(author: Author) {
    const { name, link, avatar } = author;

    return {
        name,
        url: link,
        avatar,
    };
}
