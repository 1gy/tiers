import type { FC, ReactNode } from "react";
import { css } from "../../../styled-system/css";

export type PageProps = {
	children?: ReactNode;
};

export const Page: FC<PageProps> = (props) => (
	<div
		role="page"
		className={css({ w: "screen", h: "screen", overflow: "hidden" })}
	>
		{props.children}
	</div>
);
