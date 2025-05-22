import { describe, it } from "vitest";
import { generateJson1 } from "../src";
import { feed } from "./shared";
import { snapshot } from "./utils";

describe("json", () => {
    it("snapshot", async () => {
        const result = generateJson1(feed);
        await snapshot(result, "json1", "json");
    });
});
