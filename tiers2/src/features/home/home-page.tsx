import { css } from "@styled-system/css";
import type { FunctionComponent } from "preact";
import { Appbar } from "../ui/appbar";

export const HomePage: FunctionComponent = () => {
	return (
		<div className={css({ w: "screen", h: "screen" })}>
			<Appbar>
				<h1>Home</h1>
			</Appbar>
		</div>
	);
};
