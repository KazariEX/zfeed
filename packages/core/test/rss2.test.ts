import { describe, it } from "vitest";
import { generateRss2 } from "../src";
import { feed } from "./shared";
import { format, snapshot } from "./utils";

describe("rss2", () => {
    it("snapshot", async () => {
        const result = format(generateRss2(feed));
        await snapshot(result, "rss2", "xml");
    });
});
