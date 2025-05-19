import { createFeed } from "../src";

export const updated = new Date("Mon, 30 Sept 2019 11:45:14 GMT");
export const published = new Date("Fri, 19 Jul 2019 11:45:14 GMT");

export const feed = createFeed({
    namespaces: {
        media: "http://search.yahoo.com/mrss/",
    },

    title: "Feed Title",
    description: "This is my personnal feed!",
    id: "http://example.com/",
    link: "http://example.com/",
    feed: "http://example.com/feed",
    feedLinks: {
        atom: "http://example.com/atom",
        json: "http://example.com/json",
    },
    hub: "wss://example.com/hub",

    language: "en",
    generator: "https://example.com/generator",
    stylesheet: "http://example.com/stylesheet.xsl",
    image: "http://example.com/image.png",
    favicon: "http://example.com/image.ico",
    copyright: "Copyright © 2025 KazariEX",
    updated,
    ttl: 60,

    author: {
        name: "KazariEX",
        email: "kazariex@example.com",
        link: "https://example.com/kazariex",
    },

    contributors: [
        {
            name: "Mimori",
            email: "mimori@example.com",
            link: "https://example.com/mimori",
        },
    ],

    categories: ["Anime", "Novel"],

    items: [
        {
            title: "Hello World",
            id: "https://example.com/hello-world?id=this&that=true",
            link: "https://example.com/hello-world",
            description: "This is an article about Hello World.",
            content: "Content of the item.",
            author: [
                {
                    name: "Mimori",
                    email: "mimori@example.com",
                    link: "https://example.com/mimori",
                },
                {
                    name: "Yamabuki",
                    email: "yamabuki@example.com",
                    link: "https://example.com/yamabuki",
                },
                {
                    name: "Yamabuki, Name Only",
                },
            ],
            contributor: [
                {
                    name: "Kumoyo",
                    email: "kumoyo@example.com",
                    link: "https://example.com/kumoyo",
                },
                {
                    name: "Moriya",
                    email: "moriya@example.com",
                    link: "https://example.com/moriya",
                },
            ],
            category: [
                {
                    name: "Category One",
                },
                {
                    name: "Category Two",
                    domain: "http://example.com/category",
                },
            ],
            date: updated,
            published,
            image: "https://example.com/hello-world.jpg",
            enclosure: {
                url: "https://example.com/hello-world.jpg",
                length: 65535,
                type: "image/jpeg",
            },
            extensions: [
                {
                    name: "extension:1",
                    objects: {
                        about: "just an item extension example",
                        dummy: "example",
                    },
                },
                {
                    name: "extension:2",
                    objects: {
                        about: "just a second item extension example",
                        dummy: "example",
                    },
                },
            ],
        },
    ],

    extensions: [
        {
            name: "extension",
            objects: {
                about: "just an extension example",
                dummy: "example",
            },
        },
    ],
});
