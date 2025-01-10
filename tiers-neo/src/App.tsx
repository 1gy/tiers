import type { FC } from "react";
import { css } from "../styled-system/css";

const App: FC = () => {
	return (
		<div className={css({ fontSize: "2xl", fontWeight: "bold" })}>
			Hello 🐼!
		</div>
	);
};

export default App;
