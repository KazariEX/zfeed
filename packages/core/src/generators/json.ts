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

    if (feed.author) {
        data.author = transformAuthor(feed.author);
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

        if (item.author?.length) {
            entry.author = transformAuthor(item.author[0]);
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
