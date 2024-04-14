import { css } from "@styled-system/css";
import type { ComponentChildren } from "preact";
import { forwardRef } from "preact/compat";

export type AppbarProps = {
	children?: ComponentChildren;
};

export const Appbar = forwardRef<HTMLElement, AppbarProps>(
	({ children }, ref) => (
		<header
			ref={ref}
			className={css({
				bg: "app.primary",
				color: "white",
				display: "flex",
			})}
		>
			<div
				className={css({
					minH: "12",
					display: "flex",
					alignItems: "center",
					pl: "4",
					w: "full",
				})}
			>
				{children}
			</div>
		</header>
	),
);
Appbar.displayName = "Appbar";
