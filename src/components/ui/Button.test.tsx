
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from "./Button";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Create project</Button>);

    expect(
      screen.getByRole("button", { name: "Create project" }),
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick}>
        Create project
      </Button>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Create project" }),
    );

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Create project
      </Button>,
    );

    const button = screen.getByRole("button", {
      name: "Create project",
    });

    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("displays Loading when loading is true", () => {
    render(<Button loading>Save project</Button>);

    expect(
      screen.getByRole("button", { name: "Loading..." }),
    ).toBeInTheDocument();
  });

  it("disables the button when loading", () => {
    render(<Button loading>Save project</Button>);

    expect(
      screen.getByRole("button", { name: "Loading..." }),
    ).toBeDisabled();
  });
});
