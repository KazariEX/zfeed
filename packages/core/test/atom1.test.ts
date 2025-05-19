import { describe, expect, it } from "vitest";
import { generateAtom1 } from "../src";
import { feed } from "./shared";

describe("atom1", () => {
    it("snapshot", () => {
        const result = generateAtom1(feed);
        expect(result).toMatchSnapshot();
    });
});
