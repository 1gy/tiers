import { FC, memo } from "react";
import { MuiBox, MuiTypography } from "../../components/presentational/Mui";
import { iconSize } from "./constants";

export type TierLabelProps = { color: string; label: string };

export const TierLabel: FC<TierLabelProps> = memo(({ color, label }) => (
	<MuiBox
		sx={{
			minWidth: iconSize,
			minHeight: iconSize,
			bgcolor: color,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		}}
	>
		<MuiTypography variant="subtitle1">{label}</MuiTypography>
	</MuiBox>
));
TierLabel.displayName = "TierLabel";
