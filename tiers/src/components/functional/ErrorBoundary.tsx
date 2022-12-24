import { Component, ErrorInfo, ReactNode } from "react";

type Props = {
	readonly children?: ReactNode;
	readonly fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode;
};

type State =
	| {
			readonly hasError: false;
	  }
	| {
			readonly hasError: true;
			readonly error: Error;
			readonly errorInfo: ErrorInfo;
	  };

export class ErrorBoundary extends Component<Props, State> {
	public override state: State = {
		hasError: false,
	};

	override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("Uncaught error: ", error, errorInfo);
		this.setState({ hasError: true, error, errorInfo });
	}

	override render(): ReactNode {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback(this.state.error, this.state.errorInfo);
			} else {
				return <>Something went wrong.</>;
			}
		}
		return this.props.children;
	}
}
