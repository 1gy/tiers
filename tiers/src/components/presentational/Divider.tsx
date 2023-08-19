import { forwardRef } from "react";
import { cva } from "../../../styled-system/css";

const divider = cva({
	base: {
		bgColor: "gray.200",
	},
	variants: {
		orientation: {
			horizontal: {
				w: "full",
				h: "1px",
			},
			vertical: {
				w: "1px",
				h: "full",
			},
		},
	},
});

export const Divider = forwardRef<
	HTMLDivElement,
	{
		orientation?: "horizontal" | "vertical";
	}
>(({ orientation = "horizontal" }, ref) => {
	return <div ref={ref} className={divider({ orientation })} />;
});
