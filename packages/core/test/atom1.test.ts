import { describe, it } from "vitest";
import { generateAtom1 } from "../src";
import { feed, format, snapshot } from "./shared";

describe("atom1", () => {
    it("snapshot", async () => {
        const result = format(generateAtom1(feed));
        await snapshot(result, "atom1", "xml");
    });
});
