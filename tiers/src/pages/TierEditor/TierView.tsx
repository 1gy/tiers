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

import { CharacterTierRow, TierRow } from "./Row";
import { Card } from "./Card";
import {
	TierMapping,
	swapOrder,
	uncategorizedTier,
	useSetTierMapping,
	useTierData,
	useTierMapping,
} from "./store";
import { TierKey, standardTiers } from "../../apis/tiers";
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

export type AnimeTierViewProps = {
	defKey: string;
};

export const AnimeTierView: FC<AnimeTierViewProps> = memo((props) => {
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

	return (
		<TierView
			variant="anime"
			title={tierData.definition.title}
			handleDragStart={handleDragStart}
			handleDragOver={handleDragOver}
			handleDragEnd={handleDragEnd}
			images={tierData.images}
			currentId={currentId}
			mappings={tierMapping.mappings}
		/>
	);
});

export type TierViewProps = {
	title: string;
	images: Record<string, string>;
	handleDragStart: (event: DragStartEvent) => void;
	handleDragOver: (event: DragOverEvent) => void;
	handleDragEnd: (event: DragEndEvent) => void;
	currentId?: string | null;
	mappings: Record<TierKey, { ids: string[] }>;
	variant: "anime" | "character";
};

export const TierView: FC<TierViewProps> = ({
	title,
	handleDragStart,
	handleDragOver,
	handleDragEnd,
	images,
	currentId,
	mappings,
	variant,
}) => {
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 1 } }),
	);
	const Row = variant === "anime" ? TierRow : CharacterTierRow;
	return (
		<>
			<div
				className={css({
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				})}
			>
				<Typography variant="h4">{title}</Typography>
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
						<Row
							key={tier.key}
							tier={tier}
							images={images}
							ids={mappings[tier.key]?.ids || []}
						/>
					))}
					<Row
						key={uncategorizedTier.key}
						tier={uncategorizedTier}
						images={images}
						ids={mappings[uncategorizedTier.key]?.ids || []}
					/>
				</TiersContainer>
				<DragOverlay>
					{currentId != null ? (
						<Card image={images[currentId] ?? ""} overlay variant={variant} />
					) : null}
				</DragOverlay>
			</DndContext>
		</>
	);
};
