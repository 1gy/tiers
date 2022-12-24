import { FC, memo } from "react";
import type { TierDefinition } from "../../apis/tiers";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { TierCard } from "./Card";
import { TierLabel } from "./Label";
import { MuiBox, MuiGrid } from "../../components/presentational/Mui";

export type TierRowProps = {
	tier: TierDefinition;
	images: string[];
};

export const TierRow: FC<TierRowProps> = memo(({ tier, images }) => {
	const { setNodeRef } = useDroppable({ id: tier.label });
	return (
		<SortableContext id={tier.id} items={images} strategy={rectSortingStrategy}>
			<MuiGrid item container direction="row" flexWrap="nowrap">
				<TierLabel key={tier.id} color={tier.color} label={tier.label} />
				<MuiBox pl={1} sx={{ bgcolor: tier.color, opacity: 0.5 }} />
				<MuiGrid width="100%" ref={setNodeRef} sx={{ bgcolor: "#fff" }}>
					{images.map((image) => (
						<TierCard key={image} url={image} />
					))}
				</MuiGrid>
			</MuiGrid>
		</SortableContext>
	);
});
TierRow.displayName = "TierRow";
