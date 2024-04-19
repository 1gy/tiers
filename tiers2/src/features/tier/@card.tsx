import { cva } from "@styled-system/css";
import { forwardRef, useMemo } from "preact/compat";
import { useCardSize } from "../settings-dialog";

export type CardProps = {
	image: string;
};

const cardStyle = cva({
	base: {
		display: "inline-block",
		verticalAlign: "top",
		touchAction: "none",
		boxShadow: "",
		objectFit: "fill",
	},
	variants: {
		overlay: {
			true: {
				boxShadow: "0px 0px 12px 4px rgba(0, 0, 0, 0.5)",
			},
		},
	},
});

export const Card = forwardRef<HTMLDivElement, CardProps>(({ image }, ref) => {
	const cardSize = useCardSize();
	const sizeStyle = useMemo<{ width: string; height: string }>(() => {
		return {
			width: `${cardSize}px`,
			height: `${cardSize}px`,
		};
	}, [cardSize]);
	return (
		<div ref={ref} className={cardStyle({ overlay: false })}>
			<img src={image} alt="" style={sizeStyle} />
		</div>
	);
});
Card.displayName = "Card";
