import { css } from "@styled-system/css";
import type { FunctionComponent } from "preact";
import { Title } from "./title";

export const HomePage: FunctionComponent = () => {
	return (
		<div className={css({ w: "screen", h: "screen" })}>
			<Title />
		</div>
	);
};
