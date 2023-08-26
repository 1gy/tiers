import { FC, memo } from "react";
import { Typography } from "../../components/presentational/Typography";
import { useCardSize } from "../../hooks/uiSettings";
import { css } from "../../../styled-system/css";

export type TierLabelProps = { color: string; label: string };

const tierLabelStyle = css({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

export const TierLabel: FC<TierLabelProps> = memo(({ color, label }) => {
	const cardSize = useCardSize();
	return (
		<div
			className={tierLabelStyle}
			style={{
				minWidth: cardSize,
				minHeight: cardSize,
				backgroundColor: color,
			}}
		>
			<Typography>{label}</Typography>
		</div>
	);
});
TierLabel.displayName = "TierLabel";
