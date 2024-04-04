import { css, cx } from "@styled-system/css";
import type { ComponentChildren, JSX } from "preact";
import { forwardRef } from "preact/compat";

export type PageProps = {
	children?: ComponentChildren;
	className?: string;
	style?: JSX.IntrinsicElements["div"]["style"];
};

export const Page = forwardRef<HTMLDivElement, PageProps>(
	({ children, className, style }, ref) => (
		<div
			ref={ref}
			className={cx(
				css({
					w: "screen",
					h: "screen",
					overflow: "hidden",
				}),
				className,
			)}
			style={style}
		>
			{children}
		</div>
	),
);
Page.displayName = "Page";
