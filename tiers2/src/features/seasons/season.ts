import { atom, useAtom, type Atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { getSeasonalAnimeImages } from "../../libs/anilist";
import { cached } from "../../libs/cache";

export type Season = "WINTER" | "SPRING" | "SUMMER" | "FALL";

type SeasonalAnimeQuery = {
	season: Season;
	year: number;
};

type SeasonalAnimeImages = {
	[id: string]: string;
};

const seasonalAnimesAtom = atomFamily<
	SeasonalAnimeQuery,
	Atom<Promise<SeasonalAnimeImages>>
>(
	({ year, season }) => {
		return atom(async () => {
			const images = await cached(
				`seasonal-anime-images-${year}-${season}`,
				() => getSeasonalAnimeImages(year, season),
				1000 * 60 * 60 * 24,
			);
			return images;
		});
	},
	(a, b) => {
		return a.season === b.season && a.year === b.year;
	},
);

export const useSeasonalAnimeImages = (season: Season, year: number) => {
	return useAtom(seasonalAnimesAtom({ season, year }));
};
