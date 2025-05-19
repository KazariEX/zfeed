import { renderToString } from "@vue/server-renderer";
import { type Component, createSSRApp } from "vue";

/**
 * Copy from `vue-component-type-helpers`
 *
 * @link https://github.com/vuejs/language-tools/blob/v2.2.10/packages/component-type-helpers/index.ts#L6
 */
type ComponentProps<T> = T extends new (...args: any) => {
    $props: infer P;
} ? NonNullable<P> : T extends (props: infer P, ...args: any) => any ? P : {};

export async function render<T extends Component>(component: T, props?: ComponentProps<T>) {
    const app = createSSRApp(component, props);
    const text = await renderToString(app);
    return `<?xml version="1.0" encoding="UTF-8"?>${text}`;
}
