import type { FC, ReactNode } from "react";
import { MuiBox } from "./Mui";

export type PageProps = {
	children?: ReactNode;
};

export const Page: FC<PageProps> = (props) => (
	<MuiBox role="page" width="100vw" height="100vh" overflow="hidden">
		{props.children}
	</MuiBox>
);
