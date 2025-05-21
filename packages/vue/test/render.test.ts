import { describe, it } from "vitest";
import { format, snapshot } from "#utils";
import { render } from "../src";
import Comp from "./fixtures/index.vue";

describe("render", () => {
    it("snapshot", async () => {
        const text = await render(Comp);
        await snapshot(format(text), "index", "xsl");
    });
});
