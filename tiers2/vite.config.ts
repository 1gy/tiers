/// <reference types="vitest" />
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact(), tsconfigPaths()],
	base: "/tiers/",
	test: {
		environment: "happy-dom",
		includeSource: ["src/**/*.ts"],
	},
});
