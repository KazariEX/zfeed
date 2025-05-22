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
    feed?: string | {
        atom?: string;
        json?: string;
        rss?: string;
    };
    hub?: string;

    language?: string;
    generator?: string | true | Generator;
    docs?: string;
    image?: string;
    favicon?: string;
    copyright?: string;
    updatedAt?: Date;
    publishedAt?: Date;
    ttl?: number;

    author?: Author | Author[];
    contributors?: Author[];
    categories?: Category[];
    items?: Item[];

    extends?: Record<string, any>;
    plugins?: PluginInstance[];
}

export interface Item {
    title: string;
    id?: string;
    link: string;
    updatedAt: Date;
    publishedAt?: Date;

    categories?: Category[];
    description?: string;
    content?: string;

    author?: Author | Author[];
    contributors?: Author[];
    copyright?: string;

    enclosure?: Enclosure;
    image?: string | Enclosure;
    audio?: string | Enclosure;
    video?: string | Enclosure;

    extends?: Record<string, any>;
}

export interface Generator {
    uri?: string;
    version?: string;
    text: string;
}

export interface Author {
    name?: string;
    email?: string;
    link?: string;
    avatar?: string;
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
}

export interface Plugin<T> {
    (options?: T): PluginInstance;
}

export interface PluginInstance {
    name: string;
    resolveAtom1?: (feed: Feed, xml: any) => void;
    resolveJson?: (feed: Feed, data: any) => void;
    resolveRss2?: (feed: Feed, xml: any) => void;
}
