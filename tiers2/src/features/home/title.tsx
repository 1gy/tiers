import { css } from "@styled-system/css";
import type { FunctionComponent } from "preact";
import { SettingsDialog, useSettingsDialog } from "../settings-dialog";
import { Appbar, IconButton, SettingsIcon } from "../ui";

const Spacer: FunctionComponent = () => <div style={{ flexGrow: 1 }} />;

export const Title: FunctionComponent = () => {
	const { open } = useSettingsDialog();
	return (
		<Appbar>
			<h1>Home</h1>
			<Spacer />
			<IconButton className={css({ mr: "2" })} onClick={() => open()}>
				<SettingsIcon />
			</IconButton>
			<SettingsDialog />
		</Appbar>
	);
};
