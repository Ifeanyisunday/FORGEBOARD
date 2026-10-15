const stats = [
  {
    label: "Active Projects",
    value: "12",
    change: "+2 this month",
  },
  {
    label: "Open Issues",
    value: "48",
    change: "-8 this week",
  },
  {
    label: "Team Members",
    value: "24",
    change: "+3 this month",
  },
  {
    label: "Completed Tasks",
    value: "186",
    change: "+24 this week",
  },
];

const projects = [
  {
    name: "Forgeboard Web App",
    description: "Core product development",
    progress: 72,
    status: "In Progress",
  },
  {
    name: "Mobile Experience",
    description: "iOS and Android improvements",
    progress: 48,
    status: "In Progress",
  },
  {
    name: "Design System",
    description: "Shared UI components",
    progress: 91,
    status: "Almost Done",
  },
  {
    name: "API Platform",
    description: "Backend infrastructure",
    progress: 34,
    status: "In Progress",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-500">
            Thursday, October 15
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
            Good morning, Ifeanyi.
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Here's what's happening across your workspace.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center justify-center rounded-lg bg-gray-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          + Create project
        </button>
      </section>

      <section
        aria-label="Workspace statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm shadow-gray-100/50"
          >
            <p className="text-sm font-medium text-gray-500">
              {stat.label}
            </p>

            <div className="mt-4">
              <p className="text-3xl font-semibold tracking-tight text-gray-950">
                {stat.value}
              </p>

              <p className="mt-2 text-xs font-medium text-emerald-700">
                {stat.change}
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm shadow-gray-100/50">
        <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h3 className="font-semibold text-gray-950">
              Recent projects
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Track progress across your team's work.
            </p>
          </div>

          <a
            href="/projects"
            className="w-fit text-sm font-medium text-gray-700 transition-colors hover:text-gray-950"
          >
            View all projects →
          </a>
        </div>

        <div className="divide-y divide-gray-100">
          {projects.map((project) => (
            <article
              key={project.name}
              className="flex flex-col gap-4 px-5 py-5 sm:px-6 lg:flex-row lg:items-center"
            >
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm font-semibold text-gray-700">
                  {project.name.charAt(0)}
                </div>

                <div className="min-w-0">
                  <h4 className="truncate text-sm font-semibold text-gray-900">
                    {project.name}
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
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
      </section>

      <p className="text-xs text-gray-400">
        Demo data for development. Live workspace data will be connected later.
      </p>
    </div>
  );
}