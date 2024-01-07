import { FC, forwardRef, memo, useState } from "react";
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
	swapOrder,
	uncategorizedTier,
	useSetTierMapping,
	useTierData,
	useTierMapping,
} from "./store";
import { standardTiers } from "../../apis/tiers";
import { css } from "../../../styled-system/css";

const findRow = (mapping: TierMapping, id: string | null) => {
	if (!id) {
		return null;
	}
	const row = standardTiers.find((v) => v.key === id);
	if (row) {
		return row.key;
	}
	for (const [key, value] of Object.entries(mapping.mappings)) {
		if (value.ids.find((s) => s === id)) {
			return key;
		}
	}
	return null;
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

export type TierViewProps = {
	defKey: string;
};

export const TierView: FC<TierViewProps> = memo((props) => {
	const tierData = useTierData(props.defKey);
	const tierMapping = useTierMapping(props.defKey);
	const setTierMapping = useSetTierMapping(props.defKey);
	const [currentId, setCurrentId] = useState<string | null>(null);

	const handleDragStart = (event: DragStartEvent) => {
		setCurrentId(String(event.active.id));
	};

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		const activeId = String(active.id);
		const overId = over ? String(over.id) : null;
		const activeColumnKey = findRow(tierMapping, activeId);
		const overColumnKey = findRow(tierMapping, overId);
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
						value.ids = value.ids.filter((id) => id !== activeId);
					}
					if (key === overColumnKey) {
						value.ids.push(activeId);
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
		const activeColumnKey = findRow(tierMapping, activeId);
		const overColumnKey = findRow(tierMapping, overId);
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
						const activeIndex = value.ids.findIndex((i) => i === activeId);
						const overIndex = value.ids.findIndex((i) => i === overId);
						if (
							0 <= activeIndex &&
							0 <= overIndex &&
							activeIndex !== overIndex
						) {
							value.ids = swapOrder(value.ids, activeIndex, overIndex);
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
			<div
				className={css({
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				})}
			>
				<Typography variant="h4">{tierData.definition.title}</Typography>
			</div>
			<DndContext
				sensors={sensors}
				collisionDetection={rectIntersection}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
				autoScroll={true}
			>
				<TiersContainer>
					{standardTiers.map((tier) => (
						<TierRow
							key={tier.key}
							tier={tier}
							images={tierData.images}
							ids={tierMapping.mappings[tier.key]?.ids || []}
						/>
					))}
					<TierRow
						key={uncategorizedTier.key}
						tier={uncategorizedTier}
						images={tierData.images}
						ids={tierMapping.mappings[uncategorizedTier.key]?.ids || []}
					/>
				</TiersContainer>
				<DragOverlay>
					{currentId != null ? (
						<Card image={tierData.images[currentId] ?? ""} overlay />
					) : null}
				</DragOverlay>
			</DndContext>
		</>
	);
});
