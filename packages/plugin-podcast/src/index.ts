import { definePlugin } from "zfeed";
import * as packageJson from "../package.json";

/**
 * @see https://podcast-standard.org/podcast_standard
 */
export default definePlugin(() => {
    return {
        name: packageJson.name,
        type: "rss2",
        resolve(feed, data) {
            data.rss["$xmlns:googleplay"] = "http://www.google.com/schemas/play-podcasts/1.0";
            data.rss["$xmlns:itunes"] = "http://www.itunes.com/dtds/podcast-1.0.dtd";

            const author = Array.isArray(feed.author) ? feed.author[0] : feed.author;

            if (author?.name !== void 0) {
                data.rss.channel["googleplay:author"] = author.name;
                data.rss.channel["itunes:author"] = author.name;
            }

            if (author?.email !== void 0) {
                data.rss.channel["googleplay:owner"] = author.email;
                data.rss.channel["itunes:owner"] = {
                    "itunes:email": author.email,
                };
            }

            if (feed.categories !== void 0) {
                data.rss.channel["googleplay:category"] = feed.categories.map(({ term }) => ({ $text: term }));
                data.rss.channel["itunes:category"] = feed.categories.map(({ term }) => ({ $text: term }));
            }

            if (feed.image !== void 0) {
                data.rss.channel["googleplay:image"] = { $href: feed.image };
                data.rss.channel["itunes:image"] = { $href: feed.image };
            }
        },
        resolveItem(item, data) {
            if (typeof item.audio === "object" && item.audio.duration !== void 0) {
                data["itunes:duration"] = item.audio.duration;
            }
        },
    };
});
