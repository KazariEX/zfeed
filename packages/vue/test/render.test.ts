import { html as format } from "js-beautify";
import { describe, expect, it } from "vitest";
import { render } from "../src";
import Comp from "./fixtures/index.vue";

describe("render", () => {
    it("snapshot", async () => {
        const text = await render(Comp);
        expect(format(text)).toMatchSnapshot();
    });
});
