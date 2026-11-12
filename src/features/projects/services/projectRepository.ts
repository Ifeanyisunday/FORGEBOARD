import type { Project } from "@/features/projects/types";

const STORAGE_KEY = "forgeboard:projects:v1";

const initialProjects: Project[] = [
  {
    id: "project-1",
    name: "Forgeboard Web App",
    description: "Core product development",
    progress: 72,
    status: "In Progress",
  },
  {
    id: "project-2",
    name: "Mobile Experience",
    description: "iOS and Android improvements",
    progress: 48,
    status: "In Progress",
  },
  {
    id: "project-3",
    name: "Design System",
    description: "Shared UI components",
    progress: 91,
    status: "In Progress",
  },
  {
    id: "project-4",
    name: "API Platform",
    description: "Backend infrastructure",
    progress: 34,
    status: "In Progress",
  },
];

function isProjectList(value: unknown): value is Project[] {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      typeof item.id === "string" &&
      typeof item.name === "string" &&
      typeof item.description === "string" &&
      typeof item.progress === "number" &&
      Number.isFinite(item.progress) &&
      item.progress >= 0 &&
      item.progress <= 100 &&
      (item.status === "In Progress" ||
        item.status === "Not Started"),
  );
}

export function loadProjects(): {
  projects: Project[];
  error: string;
} {
  try {
    const savedProjects = localStorage.getItem(STORAGE_KEY);

    if (savedProjects === null) {
      return {
        projects: initialProjects,
        error: "",
      };
    }

    const parsed: unknown = JSON.parse(savedProjects);

    if (!isProjectList(parsed)) {
      return {
        projects: initialProjects,
        error:
          "Saved project data was invalid. Using demo projects instead.",
      };
    }

    return {
      projects: parsed,
      error: "",
    };
  } catch {
    return {
      projects: initialProjects,
      error:
        "Browser storage could not be read. Changes may not persist after refresh.",
    };
  }
}

export function saveProjects(projects: Project[]): string {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return "";
  } catch {
    return "Browser storage could not save your projects. Changes may be lost after refresh.";
  }
}