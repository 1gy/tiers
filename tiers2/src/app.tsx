import { css } from "@styled-system/css";
import { useState } from "preact/hooks";

export function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div class={css({ fontSize: "2xl", fontWeight: "bold", pt: "56px" })}>
				Hello 🐼!
			</div>
			<div class={css({ fontSize: "xl", pt: "24px" })}>
				<button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
			</div>
		</>
	);
}
