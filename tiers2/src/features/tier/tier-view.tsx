import { css } from "@styled-system/css";
import type { FunctionComponent } from "preact";
import { Row } from "./row";
import { standardTiers } from "./tier";

export type TierViewProps = {
	images: Record<string, string>;
};

export const TierView: FunctionComponent<TierViewProps> = ({ images }) => {
	return (
		<div className={css({ w: "full", h: "full", overflowY: "scroll" })}>
			{standardTiers.map((tier) => (
				<Row key={tier.key} images={images} tier={tier} />
			))}
		</div>
	);
};
