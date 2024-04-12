import { css } from "@styled-system/css";
import type { FunctionComponent } from "preact";
import { Appbar, IconButton, SettingsIcon } from "../ui";

const Spacer: FunctionComponent = () => <div style={{ flexGrow: 1 }} />;

export const Title: FunctionComponent = () => {
	return (
		<Appbar>
			<h1>Home</h1>
			<Spacer />
			<IconButton className={css({ mr: "2" })}>
				<SettingsIcon />
			</IconButton>
		</Appbar>
	);
};
