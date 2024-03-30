import { FC, useMemo, useState } from "react";
import {
	TierMapping,
	swapOrder,
	useCharacterTierMapping,
	useCharactersInfo,
	useSetCharacterTierMapping,
} from "./store";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { standardTiers } from "../../apis/tiers";
import produce from "immer";
import { TierView } from "./TierView";

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

export type CharactersTierProps = {
	id: string;
};

export const CharactersTier: FC<CharactersTierProps> = ({ id }) => {
	const idn = parseInt(id);
	const charactersData = useCharactersInfo(idn);
	const images = useMemo<Record<string, string>>(() => {
		const images: Record<string, string> = {};
		for (const character of charactersData.characters) {
			images[character.id] = character.image;
		}
		return images;
	}, [charactersData]);
	const tierMapping = useCharacterTierMapping({ id: idn, images });
	const setTierMapping = useSetCharacterTierMapping({ id: idn, images });
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
			variant="character"
			title={charactersData.title}
			handleDragStart={handleDragStart}
			handleDragOver={handleDragOver}
			handleDragEnd={handleDragEnd}
			images={images}
			currentId={currentId}
			mappings={tierMapping.mappings}
		/>
	);
};
