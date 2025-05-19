import type { Author, Extension, Item } from "./types";

export interface Feed {
    title: string;
    description?: string;
    id: string;
    link?: string;
    feed?: string;
    feedLinks?: {
        atom?: string;
        json?: string;
        rss?: string;
    };
    hub?: string;

    language?: string;
    generator?: string;
    stylesheet?: string;
    docs?: string;
    image?: string;
    favicon?: string;
    copyright?: string;
    updated?: Date;
    ttl?: number;

    category?: string;
    podcast?: boolean;

    author?: Author;
    contributors: Author[];
    categories: string[];
    items: Item[];
    extensions: Extension[];
}

export interface CreateFeedOptions extends Partial<Feed> {
    title: string;
    id: string;
}

export function createFeed(options: CreateFeedOptions) {
    const feed: Feed = {
        items: [],
        categories: [],
        contributors: [],
        extensions: [],
        ...options,
    };
    return feed;
}
