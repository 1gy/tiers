import { AnchorHTMLAttributes, forwardRef } from "react";
import { cva, cx } from "../../../styled-system/css";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	underline?: "hover" | "always" | "none";
};

const linkStyle = cva({
	base: {},
	variants: {
		underline: {
			hover: {
				"&:hover": {
					textDecoration: "underline",
				},
			},
			always: {
				textDecoration: "underline",
			},
			none: {
				textDecoration: "none",
			},
		},
	},
});

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
	({ underline = "none", ...props }, ref) => {
		return (
			<a
				ref={ref}
				{...props}
				className={cx(props.className, linkStyle({ underline }))}
			/>
		);
	},
);
