import type { Feed } from "../types";

export function createRoot(feed: Feed, defaults: Record<string, any> = {}) {
    const decls: Record<string, any> = {
        "?xml": { $version: "1.0", $encoding: "utf-8" },
    };

    if (feed.stylesheet !== void 0) {
        const url = new URL(feed.stylesheet, "https://example.com");
        decls["?xml-stylesheet"] = {
            $type: `text/${url.pathname.split(".").pop() ?? "css"}`,
            $href: feed.stylesheet,
        };
    }

    return {
        ...decls,
        ...defaults,
    };
}

export function createRootAttributes(feed: Feed, defaultNamespaceUrl?: string) {
    const attributes: Record<string, any> = {
        "$xml:lang": feed.language,
        $xmlns: defaultNamespaceUrl,
    };

    if (feed.namespaces) {
        for (const [key, value] of Object.entries(feed.namespaces)) {
            attributes[`$xmlns:${key}`] = value;
        }
    }

    return attributes;
}

export function toArray<T>(data: T | T[] | undefined) {
    return data !== void 0 ? Array.isArray(data) ? data : [data] : [];
}
