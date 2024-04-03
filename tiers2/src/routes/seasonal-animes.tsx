import type { FunctionComponent } from "preact";

type SeasonalAnimesProps = {
	season_id: string;
};

export const SeasonalAnimes: FunctionComponent<SeasonalAnimesProps> = ({
	season_id,
}) => <div>seasonal-animes: {season_id}</div>;
