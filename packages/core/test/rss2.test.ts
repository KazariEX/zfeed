import { describe, it } from "vitest";
import { format, snapshot } from "#utils";
import { generateRss2 } from "../src";
import { feed } from "./shared";

describe("rss2", () => {
    it("snapshot", async () => {
        const result = format(generateRss2(feed));
        await snapshot(result, "rss2", "xml");
    });
});
