import { expect } from "vitest";
import formatXml from "xml-formatter";

export function format(text: string) {
    return formatXml(text, {
        collapseContent: true,
        indentation: "  ",
    });
}

export function snapshot(text: string, name: string, ext: string) {
    text = `\`\`\`${ext}\n${text}\n\`\`\`\n`;
    const path = `./__snapshots__/${name}.md`;
    return expect(text).toMatchFileSnapshot(path);
}
