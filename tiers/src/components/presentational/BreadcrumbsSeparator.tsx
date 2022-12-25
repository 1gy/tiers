import type { FC } from "react";
import { MuiBox } from "./Mui";

export const BreadcrumbsSeparator: FC = () => (
	<MuiBox sx={{ userSelect: "none", ml: 1, mr: 1 }}>/</MuiBox>
);
