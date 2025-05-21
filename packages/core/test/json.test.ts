import { describe, it } from "vitest";
import { snapshot } from "#utils";
import { generateJson } from "../src";
import { feed } from "./shared";

describe("json", () => {
    it("snapshot", async () => {
        const result = generateJson(feed);
        await snapshot(result, "json", "json");
    });
});
