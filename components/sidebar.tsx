"use client"

import {
  ChevronsUpDown,
  LayoutGrid,
  PieChart,
  TicketIcon,
  Layers,
  Users,
  Inbox,
  Settings,
  Headphones,
  UserPlus,
  Search,
  ChevronRight,
  SquarePen,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const mainNav = [
  { label: "Dashboard", icon: LayoutGrid, href: "/" },
  { label: "Analytics", icon: PieChart, href: "/" },
  { label: "Tickets", icon: TicketIcon, active: true, hasChevron: true, href: "/tickets" },
  { label: "Workflows", icon: Layers, href: "/tickets" },
  { label: "Members", icon: Users, href: "/tickets" },
  { label: "Request types", icon: Inbox, href: "/tickets" },
]

const bottomNav = [
  { label: "Settings", icon: Settings },
  { label: "Support", icon: Headphones },
  { label: "Invite teammates", icon: UserPlus },
]

export function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      {/* Workspace switcher */}
      <div className="p-3">
        <button className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-sidebar-accent">
          <span className="flex size-9 items-center justify-center rounded-full border border-sidebar-border">
            <span className="block size-4 rounded-[5px] border-2 border-sidebar-foreground/80 rotate-12" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold">Nurul Mustofa</span>
            <span className="block truncate text-xs text-muted-foreground">hey@themust.co</span>
          </span>
          <ChevronsUpDown className="size-4 text-muted-foreground" />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-3 py-2">
          <Search className="size-4 text-muted-foreground" />
          <input
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <SquarePen className="size-4 text-muted-foreground" />
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <p className="px-2 py-2 text-[11px] font-medium tracking-wider text-muted-foreground">
          MAIN
        </p>
        <ul className="flex flex-col gap-1">
          {mainNav.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  item.active
                    ? "bg-sidebar-accent font-medium text-sidebar-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="size-[18px]" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.hasChevron && <ChevronRight className="size-4" />}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom nav */}
      <div className="px-3 pb-4">
        <ul className="flex flex-col gap-1">
          {bottomNav.map((item) => (
            <li key={item.label}>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground">
                <item.icon className="size-[18px]" />
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
