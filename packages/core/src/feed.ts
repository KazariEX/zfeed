import * as packageJson from "../package.json";
import type { Feed, Generator } from "./types";

export const defaults = {
    generator: {
        uri: `https://github.com/${packageJson.repository}`,
        version: packageJson.version,
        text: "ZFeed",
    } satisfies Generator,
};

export function createFeed(feed: Feed) {
    return feed;
}
