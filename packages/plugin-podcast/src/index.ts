import { definePlugin } from "zfeed";
import * as packageJson from "../package.json";

/**
 * @see https://podcast-standard.org/podcast_standard
 */
export default definePlugin(() => {
    return {
        name: packageJson.name,
        resolveRss2(feed, xml) {
            xml.rss["$xmlns:googleplay"] = "http://www.google.com/schemas/play-podcasts/1.0";
            xml.rss["$xmlns:itunes"] = "http://www.itunes.com/dtds/podcast-1.0.dtd";

            const author = Array.isArray(feed.author) ? feed.author[0] : feed.author;

            if (author?.name !== void 0) {
                xml.rss.channel["googleplay:author"] = author.name;
                xml.rss.channel["itunes:author"] = author.name;
            }

            if (author?.email !== void 0) {
                xml.rss.channel["googleplay:owner"] = author.email;
                xml.rss.channel["itunes:owner"] = {
                    "itunes:email": author.email,
                };
            }

            if (feed.categories !== void 0) {
                xml.rss.channel["googleplay:category"] = feed.categories.map(({ term }) => ({ $text: term }));
                xml.rss.channel["itunes:category"] = feed.categories.map(({ term }) => ({ $text: term }));
            }

            if (feed.image !== void 0) {
                xml.rss.channel["googleplay:image"] = { $href: feed.image };
                xml.rss.channel["itunes:image"] = { $href: feed.image };
            }
        },
    };
});
