import { css } from "@styled-system/css";
import type { FunctionComponent } from "preact";
import { Row } from "./row";
import { standardTiers, uncategorizedTier, type TierMapping } from "./tier";

export type TierViewProps = {
	images: Record<string, string>;
	mapping: TierMapping;
};

export const TierView: FunctionComponent<TierViewProps> = ({
	images,
	mapping,
}) => {
	return (
		<div className={css({ w: "full", h: "full", overflowY: "scroll" })}>
			{standardTiers.map((tier) => (
				<Row
					key={tier.key}
					images={images}
					tier={tier}
					ids={mapping[tier.key]?.ids}
				/>
			))}
			<Row
				key={uncategorizedTier.key}
				images={images}
				tier={uncategorizedTier}
				ids={mapping[uncategorizedTier.key]?.ids}
			/>
		</div>
	);
};
