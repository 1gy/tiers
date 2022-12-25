import type { FC, ReactNode } from "react";
import { MuiAppBar, MuiToolbar } from "./Mui";

export type AppbarProps = {
	children?: ReactNode;
};

export const Appbar: FC<AppbarProps> = ({ children }) => (
	<MuiAppBar position="static">
		<MuiToolbar variant="dense" disableGutters sx={{ ml: 2 }}>
			{children}
		</MuiToolbar>
	</MuiAppBar>
);
