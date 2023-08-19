import React, { forwardRef } from "react";
import { cva } from "../../../styled-system/css";

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
			body1: {
				fontWeight: "normal",
			},
		},
	},
	defaultVariants: {
		variant: "body1",
	},
});

export const Typography = forwardRef<
	HTMLDivElement,
	{
		children: React.ReactNode;
		variant?: "h1" | "h2" | "h3" | "h4" | "body1";
	}
>(({ children, variant = "body1" }, ref) => {
	return (
		<p ref={ref} className={typography({ variant })}>
			{children}
		</p>
	);
});
