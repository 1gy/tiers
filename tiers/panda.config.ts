import { defineConfig } from "@pandacss/dev";

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {
			tokens: {
				colors: {
					"app.primary": { value: "{colors.blue.500}" },
				},
			},
		},
	},

	// The output directory for your css system
	outdir: "styled-system",

	// strict
	strictTokens: true,
});
