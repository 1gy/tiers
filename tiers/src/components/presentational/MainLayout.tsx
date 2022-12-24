import { MuiGrid } from "./Mui";
import type { FC, ReactNode } from "react";
import { Page } from "./Page";

type MainLayoutProps = {
	title: ReactNode;
	main: ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = (props) => {
	return (
		<Page>
			<MuiGrid
				container={true}
				direction="column"
				wrap="nowrap"
				width="100%"
				height="100%"
			>
				<MuiGrid item={true}>{props.title}</MuiGrid>
				<MuiGrid item={true} flexGrow="1" overflow="hidden">
					{props.main}
				</MuiGrid>
			</MuiGrid>
		</Page>
	);
};
