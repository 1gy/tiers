import { Outlet, createRootRoute } from "@tanstack/react-router";
import { lazy } from "react";
import Appbar from "../features/ui/@appbar";
import { css } from "../../styled-system/css";

const TanStackRouterDevtools = import.meta.env.DEV
	? lazy(() =>
			import("@tanstack/router-devtools").then((mod) => ({
				default: mod.TanStackRouterDevtools,
			})),
		)
	: () => null;

const RootComponent: React.FC = () => {
	return (
		<>
			<title>title</title>
			<div
				className={css({
					w: "screen",
					h: "screen",
					overflow: "hidden",
					display: "flex",
					flexDirection: "column",
				})}
			>
				<Appbar>Tiers</Appbar>
				<Outlet />
			</div>
			<TanStackRouterDevtools />
		</>
	);
};

export const Route = createRootRoute({
	component: RootComponent,
});
