import { css } from "@styled-system/css";
import type { FunctionComponent } from "preact";

export type TierViewProps = {
	images: Record<string, string>;
};

export const TierView: FunctionComponent<TierViewProps> = ({ images }) => {
	return (
		<div className={css({ w: "full", h: "full", overflowY: "scroll" })}>
			{Object.entries(images).map(([id, url]) => (
				<img key={id} src={url} alt={id} />
			))}
		</div>
	);
};
