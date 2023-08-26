import { FC, forwardRef, memo } from "react";
import type { TierDefinition } from "../../apis/tiers";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { DraggableCard } from "./Card";
import { TierLabel } from "./Label";
import { css } from "../../../styled-system/css";
import { Divider } from "../../components/presentational/Divider";

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
				<div
					className={css({ pl: "1", opacity: "0.5" })}
					style={{ backgroundColor: tier.color }}
				/>
				<ImageContainer ref={setNodeRef}>
					{images.map((image) => (
						<DraggableCard key={image} image={image} />
					))}
				</ImageContainer>
			</RowGrid>
			<Divider />
		</SortableContext>
	);
});
TierRow.displayName = "TierRow";
