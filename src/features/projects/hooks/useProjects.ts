"use client";

import { useEffect, useState } from "react";

export type Project = {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: "In Progress" | "Not Started";
};

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

type CreateProjectResult =
  | { success: true; project: Project }
  | { success: false; message: string };

function isProjectList(value: unknown): value is Project[] {
  if (!Array.isArray(value)) return false;

  return value.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      typeof item.id === "string" &&
      typeof item.name === "string" &&
      typeof item.description === "string" &&
      typeof item.progress === "number" &&
      item.progress >= 0 &&
      item.progress <= 100 &&
      (item.status === "In Progress" || item.status === "Not Started"),
  );
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [storageError, setStorageError] = useState("");

  // Load saved projects when the component first mounts.
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem(STORAGE_KEY);

      if (savedProjects === null) {
        setProjects(initialProjects);
      } else {
        const parsed: unknown = JSON.parse(savedProjects);

        if (isProjectList(parsed)) {
          setProjects(parsed);
        } else {
          setProjects(initialProjects);
          setStorageError(
            "Saved project data was invalid. Using demo projects instead.",
          );
        }
      }
    } catch {
      setProjects(initialProjects);
      setStorageError(
        "Browser storage could not be read. Changes may not persist after refresh.",
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save projects whenever the list changes, after loading is complete.
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch {
      setStorageError(
        "Browser storage could not save your projects. Changes may be lost after refresh.",
      );
    }
  }, [projects, isLoaded]);

  function createProject(
    name: string,
    description: string,
  ): CreateProjectResult {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      return { success: false, message: "Please enter a project name." };
    }

    if (trimmedName.length > 100) {
      return {
        success: false,
        message: "Project names cannot exceed 100 characters.",
      };
    }

    if (trimmedDescription.length > 500) {
      return {
        success: false,
        message: "Descriptions cannot exceed 500 characters.",
      };
    }

    const newProject: Project = {
      id: crypto.randomUUID(),
      name: trimmedName,
      description: trimmedDescription || "No description added yet",
      progress: 0,
      status: "Not Started",
    };

    setProjects((currentProjects) => [newProject, ...currentProjects]);

    return { success: true, project: newProject };
  }

  return {
    projects,
    createProject,
    isLoaded,
    storageError,
  };
}
