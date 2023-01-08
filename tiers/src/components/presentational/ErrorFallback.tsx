import type { ErrorInfo, FC } from "react";

export const ErrorFallback: FC<{ error: Error; errorInfo: ErrorInfo }> = ({
	error,
	errorInfo,
}) => {
	return (
		<div>
			<p>エラーが発生しました。開発者に連絡したら治るかもしれません。</p>
			<h3>error stack</h3>
			<pre>{error.stack}</pre>
			<h3>errorInfo stack</h3>
			<pre>{errorInfo.componentStack}</pre>
		</div>
	);
};
