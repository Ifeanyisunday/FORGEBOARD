import { describe, expect, it } from "vitest";
import { validateProject } from "./projectValidation";

describe("validateProject", () => {
  it("rejects an empty project name", () => {
    const result = validateProject("", "A project description");

    expect(result).toBe("Please enter a project name.");
  });

  it("rejects a project name containing only spaces", () => {
    const result = validateProject("    ", "Description");

    expect(result).toBe("Please enter a project name.");
  });

  it("rejects project names longer than 100 characters", () => {
    const result = validateProject(
      "A".repeat(101),
      "Description",
    );

    expect(result).toBe(
      "Project names cannot exceed 100 characters.",
    );
  });

  it("rejects descriptions longer than 500 characters", () => {
    const result = validateProject(
      "Forgeboard",
      "A".repeat(501),
    );

    expect(result).toBe(
      "Descriptions cannot exceed 500 characters.",
    );
  });

  it("accepts valid project information", () => {
    const result = validateProject(
      "Forgeboard",
      "Project management application",
    );

    expect(result).toBeNull();
  });

  it("accepts an empty description", () => {
    const result = validateProject("Forgeboard", "");

    expect(result).toBeNull();
  });

  it("accepts names at the maximum allowed length", () => {
    const result = validateProject(
      "A".repeat(100),
      "Description",
    );

    expect(result).toBeNull();
  });
});