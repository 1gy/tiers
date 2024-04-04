import {
	Component,
	ComponentChild,
	ComponentChildren,
	ErrorInfo,
} from "preact";

type Props = {
	readonly children?: ComponentChildren;
	readonly fallback?: (error: Error, errorInfo: ErrorInfo) => ComponentChildren;
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

	render(): ComponentChild {
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
