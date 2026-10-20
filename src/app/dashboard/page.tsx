import { ProjectSection } from "@/features/projects/components/ProjectSection";

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

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-500">
            Your workspace at a glance
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
            Good morning, Ifeanyi.
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Here's what's happening across your workspace.
          </p>
        </div>
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

      <ProjectSection />

      <p className="text-xs text-gray-400">
        Demo data for development. Projects are currently stored in React
        component state and are not persisted to a backend.
      </p>
    </div>
  );
}
