import { css } from "@styled-system/css";
import type { FunctionComponent } from "preact";
import { useMemo } from "preact/hooks";
import type { TierMapping } from "../tier/tier";
import { TierView } from "../tier/tier-view";
import { Title } from "../title";
import { Page } from "../ui";
import {
	useSeasonalAnimeImages,
	type Season,
	type SeasonalAnimeImages,
} from "./season";

export type SeasonalAnimesProps = {
	season: Season;
	year: number;
};

const normalizeMappings = (images: SeasonalAnimeImages): TierMapping => {
	const mapping: TierMapping = {
		S: { ids: [] },
		A: { ids: [] },
		B: { ids: [] },
		C: { ids: [] },
		D: { ids: [] },
		E: { ids: [] },
		F: { ids: [] },
		G: { ids: [] },
		uncategorized: { ids: Object.keys(images) },
	};
	return mapping;
};

export const SeasonalAnimesPage: FunctionComponent<SeasonalAnimesProps> = ({
	season,
	year,
}) => {
	const [images, _] = useSeasonalAnimeImages(season, year);
	const mapping = useMemo(() => normalizeMappings(images), [images]);

	return (
		<Page>
			<div
				className={css({
					w: "full",
					h: "full",
					display: "flex",
					overflow: "hidden",
					flexDirection: "column",
				})}
			>
				<Title text={`${season} ${year}`} />
				<div className={css({ flexGrow: "1", overflow: "hidden" })}>
					<TierView images={images} mapping={mapping} />
				</div>
			</div>
		</Page>
	);
};
