import type { FC } from "react";
import { MuiAppBar, MuiToolbar, MuiTypography } from "./Mui";

export type AppbarProps = {
	text: string;
};

export const Appbar: FC<AppbarProps> = (props) => (
	<MuiAppBar position="static">
		<MuiToolbar variant="dense" disableGutters sx={{ ml: 2 }}>
			<MuiTypography>{props.text}</MuiTypography>
		</MuiToolbar>
	</MuiAppBar>
);
