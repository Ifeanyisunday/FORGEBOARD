"use client";

import { Button } from "@/components/ui/Button";

export default function Page() {
  function handleCreateProject() {
    console.log("Creating project...");
  }

  function handleDeleteProject() {
    console.log("Deleting project...");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
      <div className="flex flex-wrap gap-4">
        <Button
          variant="primary"
          size="lg"
          onClick={handleCreateProject}
        >
          Create Project
        </Button>

        <Button variant="secondary" size="md">
          Cancel
        </Button>

        <Button
          variant="danger"
          size="sm"
          onClick={handleDeleteProject}
        >
          Delete Project
        </Button>

        <Button variant="primary" size="md" loading>
          Save Changes
        </Button>

        <Button type="submit" variant="ghost">
          Submit
        </Button>
      </div>
    </main>
  );
}