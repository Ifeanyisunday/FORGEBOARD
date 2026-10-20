"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useProjects } from "@/features/projects/hooks/useProjects";
import { FolderKanban, Plus, X } from "lucide-react";

export function ProjectSection() {
  const { projects, createProject, isLoaded, storageError } = useProjects();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function openModal() {
    setName("");
    setDescription("");
    setError("");
    setSuccessMessage("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setError("");
  }

  function handleCreateProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = createProject(name, description);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setName("");
    setDescription("");
    setError("");
    setIsModalOpen(false);
    setSuccessMessage(`"${result.project.name}" was added successfully.`);
  }

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm shadow-gray-100/50">
      <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h3 className="font-semibold text-gray-950">Recent projects</h3>
          <p className="mt-1 text-sm text-gray-500">
            Track progress across your team's work.
          </p>
        </div>

        <Button
          type="button"
          onClick={openModal}
          disabled={!isLoaded}
          className="w-full sm:w-auto"
        >
          <Plus size={16} className="mr-2" />
          Create project
        </Button>
      </div>

      {storageError && (
        <p
          role="status"
          className="border-b border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-800 sm:px-6"
        >
          {storageError}
        </p>
      )}

      {successMessage && (
        <div
          role="status"
          className="border-b border-emerald-100 bg-emerald-50 px-5 py-3 text-sm text-emerald-800 sm:px-6"
        >
          {successMessage}
        </div>
      )}

      {!isLoaded ? (
        <div
          role="status"
          className="px-6 py-12 text-center text-sm text-gray-500"
        >
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <FolderKanban size={32} className="mx-auto text-gray-400" />
          <h4 className="mt-3 font-semibold text-gray-900">
            No projects yet
          </h4>
          <p className="mt-1 text-sm text-gray-500">
            Create your first project to get started.
          </p>
          <Button type="button" className="mt-4" onClick={openModal}>
            Create your first project
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col gap-4 px-5 py-5 sm:px-6 lg:flex-row lg:items-center"
            >
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm font-semibold text-gray-700">
                  {project.name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <h4 className="break-words text-sm font-semibold text-gray-900">
                    {project.name}
                  </h4>
                  <p className="mt-1 break-words text-sm text-gray-500">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-64 lg:shrink-0">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-xs text-gray-500">
                    {project.status}
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-gray-700">
                    {project.progress}%
                  </span>
                </div>

                <div
                  role="progressbar"
                  aria-label={`${project.name} progress`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={project.progress}
                  className="h-2 overflow-hidden rounded-full bg-gray-100"
                >
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-950/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-project-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-gray-200 bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-5 sm:px-6">
              <div>
                <h2
                  id="create-project-title"
                  className="text-lg font-semibold text-gray-950"
                >
                  Create a project
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Give your team a place to organise its work.
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label="Close dialog"
                onClick={closeModal}
              >
                <X size={18} />
              </Button>
            </div>

            <form
              onSubmit={handleCreateProject}
              className="space-y-5 p-5 sm:p-6"
            >
              <div>
                <label
                  htmlFor="project-name"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Project name <span className="text-red-600">*</span>
                </label>
                <input
                  id="project-name"
                  name="name"
                  type="text"
                  autoFocus
                  required
                  maxLength={100}
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                  }}
                  placeholder="e.g. Website redesign"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label
                  htmlFor="project-description"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Description{" "}
                  <span className="ml-1 font-normal text-gray-400">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="project-description"
                  name="description"
                  rows={4}
                  maxLength={500}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="What is this project about?"
                  className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
                <p className="mt-1 text-right text-xs text-gray-400">
                  {description.length}/500
                </p>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={closeModal}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  Create project
                </Button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}
