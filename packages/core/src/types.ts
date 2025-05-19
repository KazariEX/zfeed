export interface Item {
    title: string;
    id?: string;
    link: string;
    date: Date;
    published?: Date;

    description?: string;
    category?: Category[];
    content?: string;

    author?: Author[];
    contributor?: Author[];
    copyright?: string;

    enclosure?: Enclosure;
    image?: string | Enclosure;
    audio?: string | Enclosure;
    video?: string | Enclosure;

    extensions?: Extension[];
}

export interface Category {
    name?: string;
    domain?: string;
    scheme?: string;
    term?: string;
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
