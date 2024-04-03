import type { FunctionComponent } from "preact";
import { Route, Router, Switch } from "wouter-preact";
import { SeasonalAnimes } from "./seasonal-animes";
import { Seasons } from "./seasons";
import { HomePage } from "../features/home/home-page";

export const AppRoutes: FunctionComponent = () => (
	<Router base="/tiers">
		<Switch>
			<Route path="/" component={() => <HomePage />} />
			<Route path="/seasons" component={Seasons} />
			<Route path="/seasons/:season_id">
				{({ season_id }) => <SeasonalAnimes season_id={season_id} />}
			</Route>
			<Route path="/characters/:anime_id">
				{({ anime_id }) => <div>character: {anime_id}</div>}
			</Route>
			<Route>404</Route>
		</Switch>
	</Router>
);

/*

/tiers/
/tiers/seasons
/tiers/seasons/:season_id
/tiers/characters/:anime_id

*/
