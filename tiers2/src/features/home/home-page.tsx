import { css } from "@styled-system/css";
import type { FunctionComponent } from "preact";
import { SeasonList } from "../seasons";
import { Page } from "../ui";
import { Title } from "./title";

export const HomePage: FunctionComponent = () => {
	return (
		<Page>
			<div
				className={css({
					w: "full",
					h: "full",
					display: "flex",
					overflow: "hidden",
					flexDirection: "column",
				})}
			>
				<Title />
				<div className={css({ flexGrow: "1", overflow: "auto" })}>
					<SeasonList />
				</div>
			</div>
		</Page>
	);
};
