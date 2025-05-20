import { describe, expect, it } from "vitest";
import { generateAtom1 } from "../src";
import { feed, format } from "./shared";

describe("atom1", () => {
    it("snapshot", () => {
        const result = format(generateAtom1(feed));
        expect(result).toMatchSnapshot();
    });
});
