import { forwardRef } from "react";
import type { MouseEventHandler, ReactNode } from "react";
import { css } from "../../../styled-system/css";

type ButtonProps = {
	children: ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

const styles = css({
	color: "app.primary",
	padding: "6px 8px",
	fontWeight: "medium",
	fontSize: "sm",
	transition: "background-color 0.2s ease-in-out",
	"&:hover": {
		backgroundColor: "rgba(25, 118, 210, 0.04)",
	},
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => (
		<button ref={ref} type="button" className={styles} {...props} />
	),
);
