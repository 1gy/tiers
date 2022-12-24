import { FC, memo } from "react";
import { MuiGrid } from "../../components/presentational/Mui";
import {
	DndContext,
	useSensor,
	useSensors,
	PointerSensor,
	DragOverEvent,
	DragEndEvent,
	rectIntersection,
} from "@dnd-kit/core";

import { TierRow } from "./Row";
import {
	TierMapping,
	useSetTierMapping,
	useTierDefinition,
	useTierMapping,
} from "./store";
import type { TierDefinition, TierTableDefinition } from "../../apis/tiers";

const findRow = (
	definition: TierTableDefinition | null,
	mapping: TierMapping[],
	id: string | null,
): TierDefinition | null => {
	if (!id) {
		return null;
	}
	const row = definition?.tiers.find((v) => v.label === id);
	if (row) {
		return row;
	}
	for (const v of mapping) {
		if (v.images.find((s) => s === id)) {
			return v.tier;
		}
	}
	return null;
};

const swapArray = <T extends unknown>(
	items: T[],
	first: number,
	second: number,
): T[] =>
	items.map((e, index) =>
		index === first
			? (items[second] as T)
			: index === second
			? (items[first] as T)
			: e,
	);

export type TierEditorProps = {
	id: string;
};

export const TierEditor: FC<TierEditorProps> = memo((props) => {
	const { definition } = useTierDefinition(props.id);
	const tierMapping = useTierMapping();
	const setTierMapping = useSetTierMapping();

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		const activeId = String(active.id);
		const overId = over ? String(over.id) : null;
		const activeColumn = findRow(definition, tierMapping, activeId);
		const overColumn = findRow(definition, tierMapping, overId);
		if (
			activeColumn == null ||
			overColumn == null ||
			activeColumn === overColumn
		) {
			return null;
		}
		setTierMapping((prev) => {
			return prev.map((v) => {
				if (v.tier.id === activeColumn.id) {
					return {
						...v,
						images: v.images.filter((img) => img !== activeId),
					};
				} else if (v.tier.id === overColumn.id) {
					return {
						...v,
						images: [...v.images, activeId],
					};
				}
				return v;
			});
		});
		return;
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		const activeId = String(active.id);
		const overId = over ? String(over.id) : null;
		const activeColumn = findRow(definition, tierMapping, activeId);
		const overColumn = findRow(definition, tierMapping, overId);
		if (
			activeColumn == null ||
			overColumn == null ||
			activeColumn !== overColumn
		) {
			return null;
		}
		setTierMapping((prev) => {
			return prev.map((v) => {
				if (v.tier.id === activeColumn.id) {
					const activeIndex = v.images.findIndex((i) => i === activeId);
					const overIndex = v.images.findIndex((i) => i === overId);
					if (0 <= activeIndex && 0 <= overIndex && activeIndex !== overIndex) {
						return {
							...v,
							images: swapArray(v.images, activeIndex, overIndex),
						};
					}
				}
				return v;
			});
		});
		return;
	};

	const sensors = useSensors(useSensor(PointerSensor));
	return (
		<DndContext
			sensors={sensors}
			collisionDetection={rectIntersection}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			autoScroll={true}
		>
			<MuiGrid
				container
				width="100%"
				direction="column"
				sx={{ userSelect: "none" }}
			>
				{tierMapping.map((item) => (
					<TierRow
						key={item.tier.label}
						tier={item.tier}
						images={item.images}
					/>
				))}
			</MuiGrid>
		</DndContext>
	);
});
