import { describe, expect, it } from "vitest";
import { serialize } from "../src/serialize";

function expectToBe(name: string, val: unknown, expected: string) {
    expect(serialize(name, val)).toBe(expected);
}

describe("serialize", () => {
    it("basic types", () => {
        expectToBe("foo", "Hello World", "<foo>Hello World</foo>");
        expectToBe("foo", 2333, "<foo>2333</foo>");
        expectToBe("foo", -666, "<foo>-666</foo>");
        expectToBe("foo", true, "<foo>true</foo>");
        expectToBe("foo", false, "<foo>false</foo>");
        expectToBe("foo", null, "");
        expectToBe("foo", void 0, "");
    });

    it("array", () => {
        expectToBe(
            "foo",
            ["Hello", null, 2, void 0, "World"],
            "<foo>Hello</foo><foo>2</foo><foo>World</foo>",
        );
    });

    it("object", () => {
        expectToBe(
            "foo",
            { bar: "Hello", baz: "World", qux: void 0 },
            "<foo><bar>Hello</bar><baz>World</baz></foo>",
        );
    });

    it("self-closing tag", () => {
        expectToBe("foo", "", "<foo />");
    });

    it("qualified tag", () => {
        expectToBe("foo:bar", "", "<foo:bar />");
    });

    it("unwrap content", () => {
        expectToBe("", "Hello World", "Hello World");
        expectToBe("", { foo: "bar", baz: "qux" }, "<foo>bar</foo><baz>qux</baz>");
        expectToBe("", [{ foo: "bar" }, { baz: "qux" }], "<foo>bar</foo><baz>qux</baz>");
    });

    it("empty array", () => {
        expectToBe("foo", [], "");
    });

    it("empty object", () => {
        expectToBe("foo", {}, "<foo />");
    });

    it("nested array and object", () => {
        expectToBe(
            "foo",
            {
                bar: ["Hello", null, "World"],
                baz: { qux: 2333, unknown: void 0 },
            },
            "<foo><bar>Hello</bar><bar>World</bar><baz><qux>2333</qux></baz></foo>",
        );
    });

    it("attribute", () => {
        expectToBe(
            "foo",
            { $id: "foo", $class: "bar" },
            `<foo id="foo" class="bar" />`,
        );
    });

    it("text", () => {
        expectToBe(
            "foo",
            { "#text": "Hello World" },
            "<foo>Hello World</foo>",
        );
    });

    it("cdata", () => {
        expectToBe(
            "foo",
            { "#cdata": `<bar baz="qux">Hello World</bar>` },
            `<foo><![CDATA[<bar baz="qux">Hello World</bar>]]></foo>`,
        );
    });

    it("text and cdata should have higher priority", () => {
        expectToBe(
            "foo",
            { foo: "foo", "#text": "Hello", bar: "bar" },
            "<foo>Hello</foo>",
        );
        expectToBe(
            "foo",
            { foo: "foo", "#cdata": "World", bar: "bar" },
            "<foo><![CDATA[World]]></foo>",
        );
        expectToBe(
            "foo",
            { foo: "foo", "#text": "Hello", "#cdata": "World", bar: "bar" },
            "<foo><![CDATA[World]]></foo>",
        );
        expectToBe(
            "foo",
            { foo: "foo", "#cdata": "World", "#text": "Hello", bar: "bar" },
            "<foo>Hello</foo>",
        );
    });

    it("mixed children", () => {
        expectToBe(
            "",
            [
                { foo: "bar" },
                { "#text": "Hello" },
                { "#cdata": "World" },
                { "#text": "!" },
                { baz: "" },
            ],
            "<foo>bar</foo>Hello<![CDATA[World]]>!<baz />",
        );
    });

    it("declaration", () => {
        expectToBe(
            "?xml",
            { $version: "1.0", $encoding: "utf-8" },
            `<?xml version="1.0" encoding="utf-8"?>`,
        );
    });

    it("declaration should skip content", () => {
        expectToBe(
            "?xml",
            { $version: "1.0", $encoding: "utf-8", foo: "bar" },
            `<?xml version="1.0" encoding="utf-8"?>`,
        );
        expectToBe(
            "?xml",
            { $version: "1.0", $encoding: "utf-8", "#text": "Hello World" },
            `<?xml version="1.0" encoding="utf-8"?>`,
        );
        expectToBe(
            "?xml",
            { $version: "1.0", $encoding: "utf-8", "#cdata": "<foo />" },
            `<?xml version="1.0" encoding="utf-8"?>`,
        );
    });

    it("namespace", () => {
        expectToBe(
            "foo",
            { "$xmlns:foo": "http://example.com" },
            `<foo xmlns:foo="http://example.com" />`,
        );
    });

    it("escape", () => {
        expectToBe(
            "foo",
            { $id: `Hello <&"'"&> World` },
            `<foo id="Hello &lt;&amp;&quot;&#39;&quot;&amp;&gt; World" />`,
        );
        expectToBe(
            "foo",
            { "#text": `Hello <&"'"&> World` },
            `<foo>Hello &lt;&amp;&quot;&#39;&quot;&amp;&gt; World</foo>`,
        );
        expectToBe(
            "foo",
            { "#cdata": `Hello <&"'"&> World` },
            `<foo><![CDATA[Hello <&"'"&> World]]></foo>`,
        );
    });
});
