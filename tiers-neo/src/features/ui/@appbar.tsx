import type { FC, ReactNode } from "react";
import { css } from "../../../styled-system/css";

export type AppbarProps = {
	children?: ReactNode;
};

const Appbar: FC<AppbarProps> = ({ children }) => {
	return (
		<header
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
	);
};

export default Appbar;
