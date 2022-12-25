import { FC, memo } from "react";
import {
	MuiBox,
	MuiGrid,
	MuiTypography,
} from "../../components/presentational/Mui";
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
	defKey: string;
};

export const TierEditor: FC<TierEditorProps> = memo((props) => {
	const definition = useTierDefinition(props.defKey);
	const tierMapping = useTierMapping(props.defKey);
	const setTierMapping = useSetTierMapping(props.defKey);

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
		<>
			<MuiBox
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<MuiTypography variant="h4" component="h1">
					{definition?.title}
				</MuiTypography>
			</MuiBox>
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
				</MuiGrid>
			</DndContext>
		</>
	);
});
