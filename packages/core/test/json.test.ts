import { describe, it } from "vitest";
import { generateJson } from "../src";
import { feed } from "./shared";
import { snapshot } from "./utils";

describe("json", () => {
    it("snapshot", async () => {
        const result = generateJson(feed);
        await snapshot(result, "json", "json");
    });
});
