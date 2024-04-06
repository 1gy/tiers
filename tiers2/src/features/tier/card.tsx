import { cva } from "@styled-system/css";
import { forwardRef } from "preact/compat";

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
	return (
		<div ref={ref} className={cardStyle({ overlay: false })}>
			<img src={image} alt="" />
		</div>
	);
});
Card.displayName = "Card";
