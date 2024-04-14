import { render } from "@testing-library/preact";
import { expect, it } from "vitest";
import { SettingsIcon } from "./@icons";

it("should render", () => {
	const { container } = render(<SettingsIcon />);
	expect(container.querySelector("path")).not.toBeNull();
	expect(container.querySelector("title")).not.toBeNull();
});
