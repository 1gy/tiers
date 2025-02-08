import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/seasons_/$year")({
	component: () => {
		const { year } = Route.useParams();
		return <div>Hello "/seasons/$year"! {`${year}`}</div>;
	},
});
