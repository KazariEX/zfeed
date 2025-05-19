import { describe, expect, it } from "vitest";
import { generateRss2 } from "../src";
import { feed } from "./shared";

describe("rss2", () => {
    it("snapshot", () => {
        const result = generateRss2(feed);
        expect(result).toMatchSnapshot();
    });
});
