import type { FC, ReactNode } from "react";
import { Page } from "./Page";
import { css } from "../../../styled-system/css";

type MainLayoutProps = {
	title: ReactNode;
	main: ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = (props) => {
	return (
		<Page>
			<div
				className={css({
					display: "flex",
					flexDir: "column",
					w: "full",
					h: "full",
				})}
			>
				<div className={css({})}>{props.title}</div>
				<div
					className={css({
						flexGrow: "1",
						overflow: "hidden",
						display: "flex",
					})}
				>
					{props.main}
				</div>
			</div>
		</Page>
	);
};
