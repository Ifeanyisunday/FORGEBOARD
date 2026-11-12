"use client";

import { useEffect, useState } from "react";
import type {
  CreateProjectResult,
  Project,
} from "@/features/projects/types";
import {
  loadProjects,
  saveProjects,
} from "@/features/projects/services/projectRepository";
import { validateProject } from "@/features/projects/utils/projectValidation";

type UpdateProjectResult =
  | { success: true; project: Project }
  | { success: false; message: string };

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    const result = loadProjects();

    setProjects(result.projects);
    setStorageError(result.error);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const error = saveProjects(projects);
    setStorageError(error);
  }, [projects, isLoaded]);

  function createProject(
    name: string,
    description: string,
  ): CreateProjectResult {
    const validationError = validateProject(name, description);

    if (validationError) {
      return { success: false, message: validationError };
    }

    const newProject: Project = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description:
        description.trim() || "No description added yet",
      progress: 0,
      status: "Not Started",
    };

    setProjects((currentProjects) => [
      newProject,
      ...currentProjects,
    ]);

    return { success: true, project: newProject };
  }

  function updateProject(
    projectId: string,
    name: string,
    description: string,
  ): UpdateProjectResult {
    const validationError = validateProject(name, description);

    if (validationError) {
      return { success: false, message: validationError };
    }

    const existingProject = projects.find(
      (project) => project.id === projectId,
    );

    if (!existingProject) {
      return {
        success: false,
        message:
          "This project could not be found. Refresh and try again.",
      };
    }

    const updatedProject: Project = {
      ...existingProject,
      name: name.trim(),
      description:
        description.trim() || "No description added yet",
    };

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId ? updatedProject : project,
      ),
    );

    return { success: true, project: updatedProject };
  }

  function deleteProject(projectId: string): boolean {
    const projectExists = projects.some(
      (project) => project.id === projectId,
    );

    if (!projectExists) {
      return false;
    }

    setProjects((currentProjects) =>
      currentProjects.filter(
        (project) => project.id !== projectId,
      ),
    );

    return true;
  }

  return {
    projects,
    createProject,
    updateProject,
    deleteProject,
    isLoaded,
    storageError,
  };
}