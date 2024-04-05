import type { FunctionComponent } from "preact";
import type { Season } from "../features/seasons";
import { SeasonalAnimesPage } from "../features/seasons/seasonal-animes-page";

type SeasonalAnimesProps = {
	season_id: string;
};

const parseSeasonId = (season_id: string): [number, Season] => {
	const [year, season] = season_id.split("-");
	if (
		season === "WINTER" ||
		season === "SPRING" ||
		season === "SUMMER" ||
		season === "FALL"
	) {
		return [Number.parseInt(year, 10), season];
	}
	throw new Error("Invalid season");
};

export const SeasonalAnimes: FunctionComponent<SeasonalAnimesProps> = ({
	season_id,
}) => {
	const [year, season] = parseSeasonId(season_id);
	return <SeasonalAnimesPage season={season} year={year} />;
};
