import { FC, memo } from "react";
import { MuiBox } from "../../components/presentational/Mui";
import { Typography } from "../../components/presentational/Typography";
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
			<Typography>{label}</Typography>
		</MuiBox>
	);
});
TierLabel.displayName = "TierLabel";
