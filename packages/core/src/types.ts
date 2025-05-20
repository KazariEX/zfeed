export interface Feed {
    /**
     * Declarations
     */
    stylesheet?: string;

    /**
     * Namespaces
     */
    namespaces?: Record<string, string>;

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
    docs?: string;
    image?: string;
    favicon?: string;
    copyright?: string;
    updated?: Date;
    ttl?: number;

    category?: string;
    podcast?: boolean;

    author?: Author;
    contributors?: Author[];
    categories?: Category[];
    items?: Item[];
    extends?: Record<string, any>;
}

export interface Item {
    title: string;
    id?: string;
    link: string;
    date: Date;
    published?: Date;

    categories?: Category[];
    description?: string;
    content?: string;

    author?: Author[];
    contributor?: Author[];
    copyright?: string;

    enclosure?: Enclosure;
    image?: string | Enclosure;
    audio?: string | Enclosure;
    video?: string | Enclosure;

    extends?: Record<string, any>;
}

export interface Category {
    term: string;
    link?: string;
    label?: string;
}

export interface Enclosure {
    url: string;
    type?: string;
    length?: number;
    title?: string;
    duration?: number;
}

export interface Author {
    name?: string;
    email?: string;
    link?: string;
    avatar?: string;
}

export interface Extension {
  name: string;
  objects: any;
}
