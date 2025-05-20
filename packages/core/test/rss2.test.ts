import { describe, expect, it } from "vitest";
import { generateRss2 } from "../src";
import { feed, format } from "./shared";

describe("rss2", () => {
    it("snapshot", () => {
        const result = format(generateRss2(feed));
        expect(result).toMatchSnapshot();
    });
});
