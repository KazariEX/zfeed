import { describe, it } from "vitest";
import { generateJson } from "../src";
import { feed, snapshot } from "./shared";

describe("json", () => {
    it("snapshot", async () => {
        const result = generateJson(feed);
        await snapshot(result, "json", "json");
    });
});
