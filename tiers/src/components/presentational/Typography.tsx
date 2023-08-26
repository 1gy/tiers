import { forwardRef } from "react";
import type { ReactNode } from "react";
import { cva, cx } from "../../../styled-system/css";

const typography = cva({
	base: {},
	variants: {
		variant: {
			h1: {
				fontSize: "6xl",
				fontWeight: "normal",
			},
			h2: {
				fontSize: "5xl",
				fontWeight: "normal",
			},
			h3: {
				fontSize: "4xl",
				fontWeight: "normal",
			},
			h4: {
				fontSize: "3xl",
				fontWeight: "normal",
			},
			h5: {
				fontSize: "2xl",
				fontWeight: "normal",
			},
			h6: {
				fontSize: "xl",
				fontWeight: "medium",
			},
			body1: {
				fontWeight: "normal",
			},
		},
	},
	defaultVariants: {
		variant: "body1",
	},
});

type TypographyProps = {
	children: ReactNode;
	variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1";
	className?: string;
};

export const Typography = forwardRef<HTMLDivElement, TypographyProps>(
	({ children, className, variant = "body1" }, ref) => {
		return (
			<p ref={ref} className={cx(typography({ variant }), className)}>
				{children}
			</p>
		);
	},
);
