import { describe, expect, it } from "vitest";
import { generateJson } from "../src";
import { feed } from "./shared";

describe("json", () => {
    it("snapshot", () => {
        const result = generateJson(feed);
        expect(result).toMatchSnapshot();
    });
});
