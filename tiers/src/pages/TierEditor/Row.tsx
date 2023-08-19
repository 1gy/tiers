import { FC, forwardRef, memo } from "react";
import type { TierDefinition } from "../../apis/tiers";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { DraggableCard } from "./Card";
import { TierLabel } from "./Label";
import { MuiBox, MuiDivider } from "../../components/presentational/Mui";
import { css } from "../../../styled-system/css";

export type TierRowProps = {
	tier: TierDefinition;
	images: string[];
};

const RowGrid = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
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

const ImageContainer = forwardRef<
	HTMLDivElement,
	{ children: React.ReactNode }
>(({ children }, ref) => (
	<div
		ref={ref}
		className={css({
			w: "full",
			bgColor: "#fff",
		})}
	>
		{children}
	</div>
));

export const TierRow: FC<TierRowProps> = memo(({ tier, images }) => {
	const { setNodeRef } = useDroppable({ id: tier.label });
	return (
		<SortableContext
			id={tier.key}
			items={images}
			strategy={rectSortingStrategy}
		>
			<RowGrid>
				<TierLabel key={tier.key} color={tier.color} label={tier.label} />
				<MuiBox pl={1} sx={{ bgcolor: tier.color, opacity: 0.5 }} />
				<ImageContainer ref={setNodeRef}>
					{images.map((image) => (
						<DraggableCard key={image} image={image} />
					))}
				</ImageContainer>
			</RowGrid>
			<MuiDivider />
		</SortableContext>
	);
});
TierRow.displayName = "TierRow";
