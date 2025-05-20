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

    language: "en-US",
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
            date: updated,
            published,
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
            image: "https://example.com/hello-world.jpg",
            enclosure: {
                url: "https://example.com/hello-world.jpg",
                length: 65535,
                type: "image/jpeg",
            },
            extends: {
                "extend:1": {
                    about: "just an extend item example",
                    dummy: "example",
                },
                "extend:2": {
                    about: "just a second extend item example",
                    dummy: "example",
                },
            },
        },
    ],

    extends: {
        extend: {
            about: "just an extend example",
            dummy: "example",
        },
    },
});
