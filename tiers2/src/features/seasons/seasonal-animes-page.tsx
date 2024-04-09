import { css } from "@styled-system/css";
import type { FunctionComponent } from "preact";
import { TierView } from "../tier/tier-view";
import { Appbar, Page } from "../ui";
import { useSeasonalAnimeImages, type Season } from "./season";

export type SeasonalAnimesProps = {
	season: Season;
	year: number;
};

export const SeasonalAnimesPage: FunctionComponent<SeasonalAnimesProps> = ({
	season,
	year,
}) => {
	const [images, _] = useSeasonalAnimeImages(season, year);

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
				<div>
					<Appbar>
						<h1>
							{season} {year}
						</h1>
					</Appbar>
				</div>
				<div className={css({ flexGrow: "1", overflow: "hidden" })}>
					<TierView images={images} mapping={{}} />
				</div>
			</div>
		</Page>
	);
};
