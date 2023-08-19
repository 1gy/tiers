import { FC, forwardRef, memo, useState } from "react";
import { MuiBox } from "../../components/presentational/Mui";
import { Typography } from "../../components/presentational/Typography";
import {
	DndContext,
	useSensor,
	useSensors,
	PointerSensor,
	DragOverEvent,
	DragEndEvent,
	rectIntersection,
	DragOverlay,
	DragStartEvent,
} from "@dnd-kit/core";
import { produce } from "immer";

import { TierRow } from "./Row";
import { Card } from "./Card";
import {
	TierMapping,
	uncategorizedTier,
	useSetTierMapping,
	useTierDefinition,
	useTierMapping,
} from "./store";
import type { TierKey, TierTableDefinition } from "../../apis/tiers";
import { css } from "../../../styled-system/css";

const findRow = (
	definition: TierTableDefinition | null,
	mapping: TierMapping,
	id: string | null,
): TierKey | null => {
	if (!id) {
		return null;
	}
	const row = definition?.tiers.find((v) => v.key === id);
	if (row) {
		return row.key;
	}
	for (const [key, value] of Object.entries(mapping.mappings)) {
		if (value.images.find((s) => s === id)) {
			return key;
		}
	}
	return null;
};

const swapOrder = <T extends unknown>(
	items: T[],
	active: number,
	over: number,
): T[] => {
	const item = items[active];
	if (!item) {
		return items;
	}
	const filtered = items.filter((_, index) => index !== active);
	return [...filtered.slice(0, over), item, ...filtered.slice(over)];
};

const TiersContainer = forwardRef<
	HTMLDivElement,
	{ children: React.ReactNode }
>(({ children }, ref) => (
	<div
		ref={ref}
		className={css({
			display: "flex",
			flexDirection: "column",
			userSelect: "none",
			w: "full",
		})}
	>
		{children}
	</div>
));

export type TierEditorProps = {
	defKey: string;
};

export const TierEditor: FC<TierEditorProps> = memo((props) => {
	const definition = useTierDefinition(props.defKey);
	const tierMapping = useTierMapping(props.defKey);
	const setTierMapping = useSetTierMapping(props.defKey);
	const [currentImage, setCurrentImage] = useState<string | null>(null);

	const handleDragStart = (event: DragStartEvent) => {
		setCurrentImage(String(event.active.id));
	};

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		const activeId = String(active.id);
		const overId = over ? String(over.id) : null;
		const activeColumnKey = findRow(definition, tierMapping, activeId);
		const overColumnKey = findRow(definition, tierMapping, overId);
		if (
			activeColumnKey == null ||
			overColumnKey == null ||
			activeColumnKey === overColumnKey
		) {
			return null;
		}
		setTierMapping(
			produce((draft) => {
				Object.entries(draft.mappings).forEach(([key, value]) => {
					if (key === activeColumnKey) {
						value.images = value.images.filter((img) => img !== activeId);
					}
					if (key === overColumnKey) {
						value.images.push(activeId);
					}
				});
			}),
		);
		return;
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		const activeId = String(active.id);
		const overId = over ? String(over.id) : null;
		const activeColumnKey = findRow(definition, tierMapping, activeId);
		const overColumnKey = findRow(definition, tierMapping, overId);
		if (
			activeColumnKey == null ||
			overColumnKey == null ||
			activeColumnKey !== overColumnKey
		) {
			return null;
		}
		setTierMapping(
			produce((draft) => {
				Object.entries(draft.mappings).forEach(([key, value]) => {
					if (key === activeColumnKey) {
						const activeIndex = value.images.findIndex((i) => i === activeId);
						const overIndex = value.images.findIndex((i) => i === overId);
						if (
							0 <= activeIndex &&
							0 <= overIndex &&
							activeIndex !== overIndex
						) {
							value.images = swapOrder(value.images, activeIndex, overIndex);
						}
					}
				});
			}),
		);
		return;
	};

	const sensors = useSensors(useSensor(PointerSensor));
	return (
		<>
			<MuiBox
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography variant="h4">{definition?.title}</Typography>
			</MuiBox>
			<DndContext
				sensors={sensors}
				collisionDetection={rectIntersection}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
				autoScroll={true}
			>
				<TiersContainer>
					{definition?.tiers.map((tier) => (
						<TierRow
							key={tier.key}
							tier={tier}
							images={tierMapping.mappings[tier.key]?.images || []}
						/>
					))}
					<TierRow
						key={uncategorizedTier.key}
						tier={uncategorizedTier}
						images={tierMapping.mappings[uncategorizedTier.key]?.images || []}
					/>
				</TiersContainer>
				<DragOverlay>
					{currentImage != null ? <Card image={currentImage} overlay /> : null}
				</DragOverlay>
			</DndContext>
		</>
	);
});
