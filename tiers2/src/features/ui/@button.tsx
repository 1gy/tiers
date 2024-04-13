import { css, cx } from "@styled-system/css";
import type { ComponentChildren, JSX } from "preact";
import { forwardRef } from "preact/compat";

export type ButtonProps = {
	children?: ComponentChildren;
	className?: string;
	onClick?: JSX.MouseEventHandler<HTMLButtonElement>;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, ...props }, ref) => (
		<button
			ref={ref}
			type="button"
			className={cx(
				css({
					color: "app.primary",
					padding: "6px 8px",
					fontWeight: "medium",
					fontSize: "sm",
					transition: "background-color 0.2s ease-in-out",
					"&:hover": {
						backgroundColor: "rgba(25, 118, 210, 0.04)",
					},
				}),
				className,
			)}
			{...props}
		/>
	),
);
Button.displayName = "Button";
