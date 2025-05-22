import type { Plugin } from "./types";

export function definePlugin<T>(plugin: Plugin<T>) {
    return plugin;
}
