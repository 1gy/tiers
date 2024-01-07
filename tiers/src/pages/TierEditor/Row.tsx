import { FC, forwardRef, memo } from "react";
import type { TierDefinition } from "../../apis/tiers";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { DraggableCard } from "./Card";
import { TierLabel } from "./Label";
import { css } from "../../../styled-system/css";
import { Divider } from "../../components/presentational/Divider";
import { useOpenDialog } from "../../dialogs/AnimeInfo/store";

export type TierRowProps = {
	tier: TierDefinition;
	ids: string[];
	images: Record<string, string>;
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

export const TierRow: FC<TierRowProps> = memo(({ tier, images, ids }) => {
	const { setNodeRef } = useDroppable({ id: tier.label });
	const openInfoDialog = useOpenDialog();

	return (
		<SortableContext id={tier.key} items={ids} strategy={rectSortingStrategy}>
			<RowGrid>
				<TierLabel key={tier.key} color={tier.color} label={tier.label} />
				<div
					className={css({ pl: "1", opacity: "0.5" })}
					style={{ backgroundColor: tier.color }}
				/>
				<ImageContainer ref={setNodeRef}>
					{ids.map((id) => (
						<DraggableCard
							key={id}
							id={id}
							image={images[id] ?? ""}
							onClick={() => openInfoDialog(id)}
						/>
					))}
				</ImageContainer>
			</RowGrid>
			<Divider />
		</SortableContext>
	);
});
TierRow.displayName = "TierRow";
