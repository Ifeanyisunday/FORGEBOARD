export type Project = {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: "In Progress" | "Not Started";
};

export type CreateProjectResult =
  | {
      success: true;
      project: Project;
    }
  | {
      success: false;
      message: string;
    };