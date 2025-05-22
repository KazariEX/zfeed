import { createFeed } from "../src";

export const updatedAt = new Date("Mon, 30 Sept 2019 11:45:14 GMT");
export const publishedAt = new Date("Fri, 19 Jul 2019 11:45:14 GMT");

export const feed = createFeed({
    namespaces: {
        media: "http://search.yahoo.com/mrss/",
    },

    title: "Feed Title",
    description: "This is my personnal feed!",
    id: "http://example.com/",
    link: "http://example.com/",
    feed: {
        atom: "http://example.com/atom",
        json: "http://example.com/json",
        rss: "http://example.com/rss",
    },
    hub: "wss://example.com/hub",

    language: "en-US",
    generator: {
        uri: "https://example.com/generator",
        version: "2.3.3",
        text: "Generator",
    },
    stylesheet: "http://example.com/stylesheet.xsl",
    image: "http://example.com/image.png",
    favicon: "http://example.com/image.ico",
    copyright: "Copyright © 2025 KazariEX",
    updatedAt,
    publishedAt,
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

    categories: [
        {
            term: "foo",
            label: "Category Foo",
        },
        {
            term: "bar",
            label: "Category Bar",
            link: "http://example.com/category",
        },
    ],

    items: [
        {
            title: "Hello World",
            id: "https://example.com/hello-world?id=this&that=true",
            link: "https://example.com/hello-world",
            updatedAt,
            publishedAt,
            categories: [
                {
                    term: "foo",
                    label: "Category Foo",
                },
                {
                    term: "bar",
                    label: "Category Bar",
                    link: "http://example.com/category",
                },
            ],
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
            contributors: [
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
            enclosure: {
                url: "https://example.com/hello-world.jpg",
                length: 65535,
                type: "image/jpeg",
            },
            image: "https://example.com/hello-world.jpg",
            extends: {
                "extend:foo": {
                    about: "just an extend item foo",
                    dummy: "foo",
                },
                "extend:bar": {
                    about: "just an extend item bar",
                    dummy: "bar",
                },
            },
        },
    ],

    extends: {
        "extend:baz": {
            about: "just an extend item baz",
            dummy: "baz",
        },
    },
});
