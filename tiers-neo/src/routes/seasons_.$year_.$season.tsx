import { createFileRoute, notFound } from "@tanstack/react-router";

type Params = {
	year: number;
	season: "spring" | "summer" | "fall" | "winter";
};

export const Route = createFileRoute("/seasons_/$year_/$season")({
	component: () => {
		const { year, season } = Route.useParams();
		return <div>Hello "/seasons/$year/$season"! {`${year} ${season}`}</div>;
	},
	params: {
		parse: (params) => {
			const { year, season } = params;
			const parsedYear = Number.parseInt(year, 10);
			if (Number.isNaN(parsedYear)) {
				throw new Error("Invalid year");
			}
			if (season !== "winter" && season !== "spring" && season !== "summer" && season !== "fall") {
				throw new Error("Invalid season");
			}
			return {
				year: parsedYear,
				season: season,
			} satisfies Params;
		},
	},

	onError: () => {
		throw notFound();
	},
});
