"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
  CircleHelp,
  CheckSquare,
} from "lucide-react";

const navigation = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Issues", href: "/issues", icon: CheckSquare },
  { label: "Documents", href: "/documents", icon: FileText },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Team", href: "/team", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white lg:flex lg:flex-col">
      <Link
        href="/dashboard"
        className="flex h-16 items-center gap-3 border-b border-gray-200 px-6"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-950 text-lg font-bold text-white">
          F
        </span>

        <span className="text-lg font-semibold tracking-tight text-gray-950">
          Forgeboard
        </span>
      </Link>

      <div className="border-b border-gray-100 p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-gray-50"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 font-semibold text-indigo-700">
            F
          </span>

          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-gray-900">
              Forgeboard Inc.
            </span>
            <span className="mt-0.5 block truncate text-xs text-gray-500">
              Engineering workspace
            </span>
          </span>

          <span aria-hidden="true" className="text-gray-400">
            ⌄
          </span>
        </button>
      </div>

      <nav aria-label="Main navigation" className="flex-1 space-y-7 p-4">
        <div>
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Workspace
          </p>

          <div className="space-y-1">
            {navigation.map(({ label, href, icon: Icon }) => {
              const active =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-gray-100 text-gray-950"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Manage
          </p>

          <Link
            href="/settings"
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              pathname.startsWith("/settings")
                ? "bg-gray-100 text-gray-950"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
            }`}
          >
            <Settings size={18} strokeWidth={1.8} />
            Settings
          </Link>

          <a
            href="mailto:support@forgeboard.example"
            className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-950"
          >
            <CircleHelp size={18} strokeWidth={1.8} />
            Help & support
          </a>
        </div>
      </nav>

      <div className="border-t border-gray-200 p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-gray-50"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-medium text-white">
            IS
          </span>

          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-gray-900">
              Ifeanyi
            </span>
            <span className="block truncate text-xs text-gray-500">
              Administrator
            </span>
          </span>

          <span aria-hidden="true" className="text-gray-400">
            ···
          </span>
        </button>
      </div>
    </aside>
  );
}