import vue from "@vitejs/plugin-vue";
import paths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [
        paths(),
        vue({
            template: {
                transformAssetUrls: false,
            },
        }),
    ],
});
