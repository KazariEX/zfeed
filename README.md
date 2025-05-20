# ZFeed

[![version](https://img.shields.io/npm/v/zfeed?color=white&labelColor=FFA602&label=npm)](https://www.npmjs.com/package/zfeed)
[![downloads](https://img.shields.io/npm/dm/zfeed?color=white&labelColor=FFA602&label=downloads)](https://www.npmjs.com/package/zfeed)
[![license](https://img.shields.io/npm/l/zfeed?color=white&labelColor=FFA602&label=license)](/LICENSE)

Modern feed generator for RSS, Atom and JSON. Forked and rewritten from [jpmonette/feed](https://github.com/jpmonette/feed).

Tiny, tree-shakable and zero dependencies.

## Installation

```bash
pnpm i zfeed
```

## Usage

```ts
import { createFeed, generateAtom1, generateJson, generateRss2 } from "zfeed";

export const feed = createFeed({
  title: "Feed Title",
  description: "This is my personnal feed!",
  id: "http://example.com/",
  link: "http://example.com/",
  feed: "http://example.com/feed",
  feedLinks: {
    atom: "http://example.com/atom",
    json: "http://example.com/json",
  },
  language: "en-US",
  generator: "https://example.com/generator",
  stylesheet: "http://example.com/style.xsl",
  image: "http://example.com/image.png",
  favicon: "http://example.com/image.ico",
  copyright: "Copyright © 2025 KazariEX",
  updatedAt: new Date(2019, 6, 19),

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
    { term: "Anime" },
    { term: "Novel" },
  ],

  items: [
    {
      title: "Hello World",
      id: "https://example.com/hello-world?id=this&that=true",
      link: "https://example.com/hello-world",
      updatedAt: new Date(2019, 6, 19),
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
      image: "https://example.com/hello-world.jpg",
    },
  ],
});

// Atom 1.0
const atom1 = generateAtom1(feed);

// JSON Feed 1.0
const json = generateJson(feed);

// RSS 2.0
const rss2 = generateRss2(feed);
```
