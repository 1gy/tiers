import { css } from "@styled-system/css";
import type { FunctionComponent } from "preact";

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
	return (
		<div
			className={tierLabelStyle}
			style={{
				minWidth: "64px",
				minHeight: "64px",
				backgroundColor: color,
			}}
		>
			{label}
		</div>
	);
};
TierLabel.displayName = "TierLabel";
