import { render } from "@testing-library/preact";
import { expect, it, vi } from "vitest";
import { ErrorBoundary } from "./@error-boundary";

it("should render", () => {
	const { container } = render(<ErrorBoundary>Content</ErrorBoundary>);
	expect(container.firstChild).toMatchInlineSnapshot("Content");
});

const RaiseError = () => {
	throw new Error("Error");
};

it("should render with fallback", async () => {
	vi.spyOn(console, "error").mockImplementation(() => {});
	const { container } = render(
		<ErrorBoundary fallback={() => "throw error"}>
			<RaiseError />
		</ErrorBoundary>,
	);
	expect(container.firstChild).toMatchInlineSnapshot("throw error");
});
