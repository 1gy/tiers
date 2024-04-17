import { css } from "@styled-system/css";
import type { FunctionComponent } from "preact";
import { SeasonList } from "../seasons";
import { Title } from "../title";
import { Page } from "../ui";

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
				<Title text="Home" />
				<div className={css({ flexGrow: "1", overflow: "auto" })}>
					<SeasonList />
				</div>
			</div>
		</Page>
	);
};
