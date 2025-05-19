import type { Feed } from "../feed";

export function generateJson(feed: Feed) {
    const data: any = {
        version: "https://jsonfeed.org/version/1",
        title: feed.title,
    };

    if (feed.link) {
        data.home_page_url = feed.link;
    }

    if (feed.feedLinks && feed.feedLinks.json) {
        data.feed_url = feed.feedLinks.json;
    }

    if (feed.description) {
        data.description = feed.description;
    }

    if (feed.image) {
        data.icon = feed.image;
    }

    if (feed.author) {
        data.author = {};
        if (feed.author.name) {
            data.author.name = feed.author.name;
        }
        if (feed.author.link) {
            data.author.url = feed.author.link;
        }
        if (feed.author.avatar) {
            data.author.avatar = feed.author.avatar;
        }
    }

    data.items = feed.items.map((item) => {
        const entry: any = {
            id: item.id,
            content_html: item.content ?? item.description,
        };

        if (item.link) {
            entry.url = item.link;
        }

        if (item.title) {
            entry.title = item.title;
        }

        if (item.description && item.content) {
            entry.summary = item.description;
        }

        if (item.image) {
            entry.image = item.image;
        }

        if (item.date) {
            entry.date_modified = item.date.toISOString();
        }

        if (item.published) {
            entry.date_published = item.published.toISOString();
        }

        if (item.author?.length) {
            const author = item.author[0];
            entry.author = {
                name: author.name,
                url: author.link,
                avatar: author.avatar,
            };
        }

        if (item.category?.length) {
            entry.tags = item.category.map(({ name }) => name).filter(Boolean);
        }

        if (item.extensions?.length) {
            for (const { name, objects } of item.extensions) {
                entry[name] = objects;
            }
        }

        return entry;
    });

    for (const { name, objects } of feed.extensions) {
        data[name] = objects;
    }

    return JSON.stringify(data, null, 4);
}
