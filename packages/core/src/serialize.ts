export function serialize(name: string, val: unknown): string {
    if (isNullish(val)) {
        return "";
    }
    if (Array.isArray(val)) {
        return val.map((item) => serialize(name, item)).join("");
    }

    let stuff = "";
    let content = "";
    let raw = false;

    if (typeof val === "object") {
        for (const [key, value] of Object.entries(val)) {
            if (isNullish(value)) {
                continue;
            }
            if (key.startsWith("$")) {
                stuff += ` ${key.slice(1)}="${escape(String(value))}"`;
            }
            else if (key === "#text") {
                content = escape(String(value));
                raw = true;
            }
            else if (key === "#cdata") {
                content = `<![CDATA[${value}]]>`;
                raw = true;
            }
            else if (!raw) {
                content += serialize(key, value);
            }
        }
    }
    else {
        content = escape(String(val));
    }

    return name
        ? name.startsWith("?")
            ? `<?${name.slice(1)}${stuff}?>`
            : content
                ? `<${name}${stuff}>${content}</${name}>`
                : `<${name}${stuff} />`
        : content;
}

const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "\"": "&quot;",
};

function escape(str: string) {
    return str.replaceAll(/[&<>'"]/g, (match) => entities[match]);
}

function isNullish(val: unknown) {
    return val === null || val === void 0;
}
