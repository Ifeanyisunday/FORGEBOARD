import Link from "next/link";
import {
  Bell,
  Search,
  Command,
  Plus,
} from "lucide-react";

const mobileNavigation = [
  { label: "Overview", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Issues", href: "/issues" },
  { label: "Documents", href: "/documents" },
  { label: "Team", href: "/team" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="hidden text-xs text-gray-500 sm:block">
            Forgeboard Inc.
          </p>
          <h1 className="truncate text-sm font-semibold text-gray-950">
            Workspace overview
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Search"
            className="hidden h-9 items-center gap-3 rounded-lg border border-gray-200 px-3 text-sm text-gray-500 transition-colors hover:bg-gray-50 md:flex"
          >
            <Search size={16} />
            <span>Search anything...</span>
            <span className="ml-3 flex items-center gap-1 rounded border border-gray-200 px-1.5 py-0.5 text-xs text-gray-400">
              <Command size={11} />
              K
            </span>
          </button>

          <button
            type="button"
            aria-label="Create new item"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-950 text-white transition-colors hover:bg-gray-800"
          >
            <Plus size={18} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100"
          >
            <Bell size={19} strokeWidth={1.8} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 sm:hidden">
            IS
          </div>
        </div>
      </div>

      <nav
        aria-label="Mobile navigation"
        className="flex gap-1 overflow-x-auto border-t border-gray-100 px-4 py-2 lg:hidden"
      >
        {mobileNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-950"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}