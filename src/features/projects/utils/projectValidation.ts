export function validateProject(
  name: string,
  description: string,
): string | null {
  const trimmedName = name.trim();
  const trimmedDescription = description.trim();

  if (!trimmedName) {
    return "Please enter a project name.";
  }

  if (trimmedName.length > 100) {
    return "Project names cannot exceed 100 characters.";
  }

  if (trimmedDescription.length > 500) {
    return "Descriptions cannot exceed 500 characters.";
  }

  return null;
}