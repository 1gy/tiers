import { FC, memo } from "react";
import { MuiBox, MuiTypography } from "../../components/presentational/Mui";
import { useCardSize } from "../../hooks/uiSettings";

export type TierLabelProps = { color: string; label: string };

export const TierLabel: FC<TierLabelProps> = memo(({ color, label }) => {
	const cardSize = useCardSize();
	return (
		<MuiBox
			sx={{
				minWidth: cardSize,
				minHeight: cardSize,
				bgcolor: color,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<MuiTypography variant="subtitle1">{label}</MuiTypography>
		</MuiBox>
	);
});
TierLabel.displayName = "TierLabel";
