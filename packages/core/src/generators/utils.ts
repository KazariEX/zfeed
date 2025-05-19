import type { Feed } from "../feed";

export function createRoot(feed: Feed, defaults: Record<string, any> = {}) {
    const xml: Record<string, any> = {
        "?xml": { $version: "1.0", $encoding: "utf-8" },
    };

    if (feed.stylesheet !== void 0) {
        const url = new URL(feed.stylesheet, "https://example.com");
        xml["?xml-stylesheet"] = {
            $type: `text/${url.pathname.split(".").pop() ?? "css"}`,
            $href: feed.stylesheet,
        };
    }

    return {
        ...xml,
        ...defaults,
    };
}

export function createRootAttributes(feed: Feed, defaultNamespaceUrl?: string) {
    const attributes = {
        "$xml:lang": feed.language,
        $xmlns: defaultNamespaceUrl,
        ...Object.fromEntries(
            Object.entries(feed.namespaces).map(([key, value]) => [
                `$xmlns:${key}`,
                value,
            ]),
        ),
    };

    return attributes;
}
