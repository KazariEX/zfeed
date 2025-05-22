import * as packageJson from "../package.json";
import type { Feed, Generator } from "./types";

export const defaults = {
    generator: {
        name: "ZFeed",
        uri: `https://github.com/${packageJson.repository}`,
        version: packageJson.version,
    } satisfies Generator,
};

export function createFeed(feed: Feed) {
    return feed;
}
