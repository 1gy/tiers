import type { FC, ReactNode } from "react";
import { css } from "../../../styled-system/css";

export type AppbarProps = {
	children?: ReactNode;
};

export const Appbar: FC<AppbarProps> = ({ children }) => (
	<header
		className={css({
			backgroundColor: "app.primary",
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
);
