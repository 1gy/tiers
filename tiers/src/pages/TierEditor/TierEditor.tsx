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
import { produce } from "immer";

import { TierRow } from "./Row";
import {
	TierMapping,
	uncategorizedTier,
	useSetTierMapping,
	useTierDefinition,
	useTierMapping,
} from "./store";
import type { TierKey, TierTableDefinition } from "../../apis/tiers";

const findRow = (
	definition: TierTableDefinition | null,
	mapping: TierMapping,
	id: string | null,
): TierKey | null => {
	if (!id) {
		return null;
	}
	const row = definition?.tiers.find((v) => v.label === id);
	if (row) {
		return row.id;
	}
	for (const [key, value] of Object.entries(mapping.mappings)) {
		if (value.images.find((s) => s === id)) {
			return key;
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
	const tierMapping = useTierMapping(props.id);
	const setTierMapping = useSetTierMapping(props.id);

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		const activeId = String(active.id);
		const overId = over ? String(over.id) : null;
		const activeColumn = findRow(definition, tierMapping, activeId); // TODO activeColumnKey
		const overColumn = findRow(definition, tierMapping, overId);
		if (
			activeColumn == null ||
			overColumn == null ||
			activeColumn === overColumn
		) {
			return null;
		}
		setTierMapping(
			produce((draft) => {
				Object.entries(draft.mappings).forEach(([key, value]) => {
					if (key === activeColumn) {
						value.images = value.images.filter((img) => img !== activeId);
					}
					if (key === overColumn) {
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
		const activeColumn = findRow(definition, tierMapping, activeId);
		const overColumn = findRow(definition, tierMapping, overId);
		if (
			activeColumn == null ||
			overColumn == null ||
			activeColumn !== overColumn
		) {
			return null;
		}
		setTierMapping(
			produce((draft) => {
				Object.entries(draft.mappings).forEach(([key, value]) => {
					if (key === activeColumn) {
						const activeIndex = value.images.findIndex((i) => i === activeId);
						const overIndex = value.images.findIndex((i) => i === overId);
						if (
							0 <= activeIndex &&
							0 <= overIndex &&
							activeIndex !== overIndex
						) {
							value.images = swapArray(value.images, activeIndex, overIndex);
						}
					}
				});
			}),
		);
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
				{definition?.tiers.map((tier) => (
					<TierRow
						key={tier.id}
						tier={tier}
						images={tierMapping.mappings[tier.id]?.images || []}
					/>
				))}
				<TierRow
					key={uncategorizedTier.id}
					tier={uncategorizedTier}
					images={tierMapping.mappings[uncategorizedTier.id]?.images || []}
				/>
			</MuiGrid>
		</DndContext>
	);
});
