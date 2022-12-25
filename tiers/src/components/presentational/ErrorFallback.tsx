import type { ErrorInfo, FC } from "react";
import { MuiBox, MuiTypography } from "./Mui";

export const ErrorFallback: FC<{ error: Error; errorInfo: ErrorInfo }> = ({
	error,
	errorInfo,
}) => {
	return (
		<MuiBox>
			<MuiTypography>{JSON.stringify(error)}</MuiTypography>
			<MuiTypography>{JSON.stringify(errorInfo)}</MuiTypography>
		</MuiBox>
	);
};
