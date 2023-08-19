import type { FC } from "react";
import { css } from "../../../styled-system/css";

export const BreadcrumbsSeparator: FC = () => (
	<div className={css({ userSelect: "none", ml: "1", mr: "1" })}>/</div>
);
