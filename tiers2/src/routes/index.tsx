import type { FunctionComponent } from "preact";
import { Route, Router, Switch } from "wouter-preact";
import { HomePage } from "../features/home/home-page";
import { ErrorBoundary } from "../features/ui/error-boundary";
import { SeasonalAnimes } from "./seasonal-animes";
import { Seasons } from "./seasons";

export const AppRoutes: FunctionComponent = () => (
	<ErrorBoundary>
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
	</ErrorBoundary>
);

/*

/tiers/
/tiers/seasons
/tiers/seasons/:season_id
/tiers/characters/:anime_id

*/
