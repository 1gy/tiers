import { css } from "@styled-system/css";
import type { ComponentChildren, FunctionComponent } from "preact";
import { forwardRef } from "preact/compat";
import { TierLabel } from "./label";
import type { TierDefinition } from "./tier";

type RowGridProps = {
	children: ComponentChildren;
};

const RowGrid = forwardRef<HTMLDivElement, RowGridProps>(
	({ children }, ref) => (
		<div
			ref={ref}
			className={css({
				display: "flex",
				flexDirection: "row",
				flexWrap: "nowrap",
			})}
		>
			{children}
		</div>
	),
);
RowGrid.displayName = "RowGrid";

export type RowProps = {
	tier: TierDefinition;
	images: Record<string, string>;
};

export const Row: FunctionComponent<RowProps> = ({ images, tier }) => {
	return (
		<RowGrid>
			<TierLabel color={tier.color} label={tier.label} />
			<div
				className={css({ pl: "1", opacity: "0.5" })}
				style={{ backgroundColor: tier.color }}
			/>
		</RowGrid>
	);
};
Row.displayName = "Row";
