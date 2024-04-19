import { css } from "@styled-system/css";
import type { FunctionComponent } from "preact";
import { useCardSize } from "../settings-dialog";

export type TierLabelProps = { color: string; label: string };

const tierLabelStyle = css({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

export const TierLabel: FunctionComponent<TierLabelProps> = ({
	color,
	label,
}) => {
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
			{label}
		</div>
	);
};
TierLabel.displayName = "TierLabel";
