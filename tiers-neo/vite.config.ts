import { defineConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";

import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
const viteConfig = defineConfig({
	base: "/tiers/",
	plugins: [
		TanStackRouterVite(),
		react()
	],
	server: {
		host: true,
	},
});

const vitestConfig = defineVitestConfig({
	test: {
		includeSource: ["src/**/*.{ts,tsx}"],
	},
	define: {
		"import.meta.vitest": "undefined",
	}
});

export default mergeConfig(viteConfig, vitestConfig);
