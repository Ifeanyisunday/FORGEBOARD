
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";

import { ProjectSection } from "./ProjectSection";

const {
  mockUseProjects,
  mockCreateProject,
  mockUpdateProject,
  mockDeleteProject,
} = vi.hoisted(() => ({
  mockUseProjects: vi.fn(),
  mockCreateProject: vi.fn(),
  mockUpdateProject: vi.fn(),
  mockDeleteProject: vi.fn(),
}));

vi.mock("@/features/projects/hooks/useProjects", () => ({
  useProjects: mockUseProjects,
}));

const sampleProject = {
  id: "project-1",
  name: "Forgeboard",
  description: "Project management application",
  progress: 40,
  status: "In Progress" as const,
};

describe("ProjectSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseProjects.mockReturnValue({
      projects: [],
      createProject: mockCreateProject,
      updateProject: mockUpdateProject,
      deleteProject: mockDeleteProject,
      isLoaded: true,
      storageError: "",
    });
  });

  it("displays the loading state", () => {
    mockUseProjects.mockReturnValue({
      projects: [],
      createProject: mockCreateProject,
      updateProject: mockUpdateProject,
      deleteProject: mockDeleteProject,
      isLoaded: false,
      storageError: "",
    });

    render(<ProjectSection />);

    expect(
      screen.getByText("Loading projects..."),
    ).toBeInTheDocument();
  });

  it("displays the empty state when there are no projects", () => {
    render(<ProjectSection />);

    expect(
      screen.getByText("No projects yet"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Create your first project to get started."),
    ).toBeInTheDocument();
  });

  it("displays existing projects", () => {
    mockUseProjects.mockReturnValue({
      projects: [sampleProject],
      createProject: mockCreateProject,
      updateProject: mockUpdateProject,
      deleteProject: mockDeleteProject,
      isLoaded: true,
      storageError: "",
    });

    render(<ProjectSection />);

    expect(
      screen.getByRole("heading", { name: "Forgeboard" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Project management application"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("progressbar", {
        name: "Forgeboard progress",
      }),
    ).toHaveAttribute("aria-valuenow", "40");
  });

  it("opens the create project dialog", () => {
    render(<ProjectSection />);

    fireEvent.click(
      screen.getByRole("button", { name: "Create project" }),
    );

    expect(
      screen.getByRole("dialog", {
        name: "Create a project",
      }),
    ).toBeInTheDocument();
  });

  it("submits a new project", () => {
    const newProject = {
      id: "project-2",
      name: "Website redesign",
      description: "Redesign the company website",
      progress: 0,
      status: "Not Started" as const,
    };

    mockCreateProject.mockReturnValue({
      success: true,
      project: newProject,
    });

    render(<ProjectSection />);

    fireEvent.click(
      screen.getByRole("button", { name: "Create project" }),
    );

    const dialog = screen.getByRole("dialog");

    fireEvent.change(
      within(dialog).getByLabelText(/Project name/i),
      { target: { value: "Website redesign" } },
    );

    fireEvent.change(
      within(dialog).getByLabelText(/Description/i),
      { target: { value: "Redesign the company website" } },
    );

    fireEvent.click(
      within(dialog).getByRole("button", {
        name: "Create project",
      }),
    );

    expect(mockCreateProject).toHaveBeenCalledWith(
      "Website redesign",
      "Redesign the company website",
    );

    expect(
      screen.getByText(
        '"Website redesign" was created successfully.',
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("dialog"),
    ).not.toBeInTheDocument();
  });

  it("displays a validation error when project creation fails", () => {
    mockCreateProject.mockReturnValue({
      success: false,
      message: "Please enter a project name.",
    });

    render(<ProjectSection />);

    fireEvent.click(
      screen.getByRole("button", { name: "Create project" }),
    );

    const dialog = screen.getByRole("dialog");

    fireEvent.change(
      within(dialog).getByLabelText(/Project name/i),
      { target: { value: "   " } },
    );

    fireEvent.click(
      within(dialog).getByRole("button", {
        name: "Create project",
      }),
    );

    expect(
      screen.getByRole("alert"),
    ).toHaveTextContent("Please enter a project name.");

    expect(dialog).toBeInTheDocument();
  });


  it("opens the edit dialog with existing project details", () => {
    mockUseProjects.mockReturnValue({
      projects: [sampleProject],
      createProject: mockCreateProject,
      updateProject: mockUpdateProject,
      deleteProject: mockDeleteProject,
      isLoaded: true,
      storageError: "",
    });

    render(<ProjectSection />);

    fireEvent.click(
      screen.getByRole("button", { name: "Edit" }),
    );

    const dialog = screen.getByRole("dialog", {
      name: "Edit project",
    });

    expect(
      within(dialog).getByLabelText(/Project name/i),
    ).toHaveValue("Forgeboard");

    expect(
      within(dialog).getByLabelText(/Description/i),
    ).toHaveValue("Project management application");
  });

  it("deletes a project after confirmation", () => {
    mockUseProjects.mockReturnValue({
      projects: [sampleProject],
      createProject: mockCreateProject,
      updateProject: mockUpdateProject,
      deleteProject: mockDeleteProject,
      isLoaded: true,
      storageError: "",
    });

    mockDeleteProject.mockReturnValue(true);

    render(<ProjectSection />);

    fireEvent.click(
      screen.getByRole("button", { name: "Delete" }),
    );

    expect(
      screen.getByRole("alertdialog", {
        name: "Delete this project?",
      }),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Delete project" }),
    );

    expect(mockDeleteProject).toHaveBeenCalledWith("project-1");

    expect(
      screen.getByText('"Forgeboard" was deleted successfully.'),
    ).toBeInTheDocument();
  });

});
