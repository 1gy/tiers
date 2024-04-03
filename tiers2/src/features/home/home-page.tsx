import { FunctionComponent } from "preact";
import { Appbar } from "../ui/appbar";
import { css } from "@styled-system/css";

export const HomePage: FunctionComponent = () => {
	return (
		<div className={css({ w: "screen", h: "screen" })}>
			<Appbar>
				<h1>Home</h1>
			</Appbar>
		</div>
	);
};
