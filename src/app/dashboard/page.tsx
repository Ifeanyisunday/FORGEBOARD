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

const navigation = [
  "Overview",
  "Projects",
  "Issues",
  "Documents",
  "Analytics",
  "Team",
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-gray-200 bg-white lg:flex lg:flex-col">
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-sm font-bold text-white">
              F
            </div>

            <span className="text-lg font-semibold">Forgeboard</span>
          </div>
        </div>

        <div className="border-b border-gray-200 p-4">
          <button className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-gray-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 font-semibold text-blue-700">
              F
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                Forgeboard Inc.
              </p>

              <p className="truncate text-xs text-gray-500">
                Engineering
              </p>
            </div>

            <span className="text-gray-400">⌄</span>
          </button>
        </div>

        <nav className="flex-1 p-4">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Workspace
          </p>

          <div className="space-y-1">
            {navigation.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  index === 0
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-gray-300" />
                {item}
              </a>
            ))}
          </div>

          <p className="mb-3 mt-8 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Manage
          </p>

          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="h-2 w-2 rounded-full bg-gray-300" />
            Settings
          </a>
        </nav>

        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-medium text-white">
              IS
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Ifeanyi</p>
              <p className="truncate text-xs text-gray-500">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div>
            <p className="text-sm text-gray-500">Workspace</p>
            <h1 className="text-sm font-semibold">Overview</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 md:block">
              Search
              <span className="ml-3 text-xs text-gray-400">
                ⌘ K
              </span>
            </button>

            <button
              aria-label="Notifications"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
            >
              🔔
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white">
              IS
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {/* Greeting */}
            <section className="mb-8">
              <p className="mb-1 text-sm font-medium text-gray-500">
                Monday, September 29
              </p>

              <h2 className="text-2xl font-bold tracking-tight">
                Good morning, Ifeanyi.
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Here&apos;s what&apos;s happening across your workspace.
              </p>
            </section>

            {/* Stats */}
            <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  <p className="text-sm text-gray-500">{stat.label}</p>

                  <div className="mt-3 flex items-end justify-between gap-4">
                    <p className="text-3xl font-semibold tracking-tight">
                      {stat.value}
                    </p>

                    <span className="text-xs font-medium text-green-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </section>

            {/* Projects */}
            <section className="rounded-xl border border-gray-200 bg-white">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                <div>
                  <h3 className="font-semibold">Recent Projects</h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Projects currently being worked on.
                  </p>
                </div>

                <a
                  href="#"
                  className="text-sm font-medium text-gray-900 hover:underline"
                >
                  View all
                </a>
              </div>

              <div className="divide-y divide-gray-100">
                {projects.map((project) => (
                  <div
                    key={project.name}
                    className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center"
                  >
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium">{project.name}</h4>

                      <p className="mt-1 text-sm text-gray-500">
                        {project.description}
                      </p>
                    </div>

                    <div className="w-full md:w-64">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {project.status}
                        </span>

                        <span className="text-xs font-medium">
                          {project.progress}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-gray-900"
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}