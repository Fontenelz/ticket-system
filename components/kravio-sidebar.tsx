"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Search,
  LayoutGrid,
  Ticket,
  Users,
  UsersRound,
  BookOpen,
  Plug,
  Gauge,
  Smile,
  Activity,
  FileText,
  MessageSquare,
  LifeBuoy,
  Settings,
  ChevronDown,
  ChevronsUpDown,
  PanelLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"

const ticketSub = [
  { label: "All / My Queue", href: "/tickets" },
  { label: "SLA Breach Risk", href: "/tickets/sla-breach" },
  { label: "Escalations", href: "/tickets/escalations" },
]

const mainNav = [
  { label: "Clients", icon: Users, href: "/clients" },
  { label: "Agents & Teams", icon: UsersRound, href: "/agents", chevron: true },
  { label: "Knowledge Base", icon: BookOpen, href: "/knowledge-base", chevron: true },
  { label: "Integrations", icon: Plug, href: "/integrations" },
]

const analyticsNav = [
  { label: "SLA Compliance", icon: Gauge, href: "/analytics/sla" },
  { label: "CSAT & NPS", icon: Smile, href: "/analytics/csat" },
  { label: "Workload Analytics", icon: Activity, href: "/analytics/workload" },
  { label: "Reports", icon: FileText, href: "/analytics/reports" },
]

const supportNav = [
  { label: "Feedback", icon: MessageSquare, href: "/feedback" },
  { label: "Help & Support", icon: LifeBuoy, href: "/help" },
  { label: "Settings", icon: Settings, href: "/settings" },
]

function NavLink({
  label,
  icon: Icon,
  href,
  active,
  chevron,
  collapsed,
}: {
  label: string
  icon: React.ElementType
  href: string
  active?: boolean
  chevron?: boolean
  collapsed?: boolean
}) {
  const base = active
    ? "bg-secondary font-medium text-foreground"
    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"

  if (collapsed) {
    return (
      <Link
        href={href}
        title={label}
        className={cn(
          "flex h-9 w-full items-center justify-center rounded-lg transition-colors",
          base,
        )}
      >
        <Icon className="size-[18px]" />
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        base,
      )}
    >
      <Icon className="size-[18px]" />
      <span className="flex-1">{label}</span>
      {chevron && <ChevronDown className="size-4 opacity-60" />}
    </Link>
  )
}

export function KravioSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [ticketsOpen, setTicketsOpen] = useState(true)
  const pathname = usePathname()

  const overviewActive = pathname === "/"
  const ticketsActive = pathname.startsWith("/tickets")

  function isActive(href: string) {
    return pathname === href
  }

  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col border-r border-border bg-card transition-[width] duration-200",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Brand */}
      <div
        className={cn(
          "flex items-center py-4",
          collapsed ? "justify-center px-2" : "justify-between px-4",
        )}
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
              K
            </span>
            <span className="text-base font-semibold tracking-tight">Kravio</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="text-muted-foreground hover:text-foreground"
        >
          <PanelLeft
            className={cn(
              "size-[18px] transition-transform duration-200",
              collapsed && "rotate-180",
            )}
          />
        </button>
      </div>

      {/* Search */}
      {collapsed ? (
        <div className="flex justify-center px-2 pb-3">
          <button
            title="Search"
            className="flex h-9 w-full items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:bg-secondary/50"
          >
            <Search className="size-4" />
          </button>
        </div>
      ) : (
        <div className="px-3 pb-3">
          <button className="flex w-full items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/50">
            <Search className="size-4" />
            <span className="flex-1 text-left">Search anything</span>
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">
              ⌘ K
            </kbd>
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 pb-2">
        {!collapsed && (
          <p className="px-2 pb-1 pt-2 text-[11px] font-medium tracking-wider text-muted-foreground">
            MAIN NAVIGATION
          </p>
        )}
        {collapsed && <div className="pt-2" />}

        <ul className="flex flex-col gap-0.5">
          <li>
            <NavLink
              label="Overview"
              icon={LayoutGrid}
              href="/"
              active={overviewActive}
              collapsed={collapsed}
            />
          </li>

          {/* Tickets with sub-items */}
          <li>
            <button
              onClick={() => !collapsed && setTicketsOpen((v) => !v)}
              title={collapsed ? "Tickets" : undefined}
              className={cn(
                "flex w-full items-center rounded-lg transition-colors",
                collapsed
                  ? "h-9 justify-center"
                  : "gap-3 px-3 py-2 text-sm",
                ticketsActive
                  ? "bg-secondary font-medium text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
              )}
            >
              <Ticket className="size-[18px] shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">Tickets</span>
                  <ChevronDown
                    className={cn(
                      "size-4 opacity-60 transition-transform",
                      ticketsOpen ? "" : "-rotate-90",
                    )}
                  />
                </>
              )}
            </button>

            {!collapsed && ticketsOpen && (
              <ul className="mb-1 ml-[26px] flex flex-col gap-0.5 border-l border-border pl-3">
                {ticketSub.map((sub) => (
                  <li key={sub.label}>
                    <Link
                      href={sub.href}
                      className={cn(
                        "block rounded-md px-3 py-1.5 text-sm transition-colors",
                        pathname === sub.href
                          ? "font-medium text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {mainNav.map((item) => (
            <li key={item.label}>
              <NavLink
                {...item}
                active={isActive(item.href)}
                collapsed={collapsed}
              />
            </li>
          ))}
        </ul>

        {!collapsed && (
          <p className="px-2 pb-1 pt-5 text-[11px] font-medium tracking-wider text-muted-foreground">
            ANALYTICS & INSIGHTS
          </p>
        )}
        {collapsed && <div className="mt-4 border-t border-border/60 pt-4" />}

        <ul className="flex flex-col gap-0.5">
          {analyticsNav.map((item) => (
            <li key={item.label}>
              <NavLink
                {...item}
                active={isActive(item.href)}
                collapsed={collapsed}
              />
            </li>
          ))}
        </ul>

        {!collapsed && (
          <p className="px-2 pb-1 pt-5 text-[11px] font-medium tracking-wider text-muted-foreground">
            SUPPORT
          </p>
        )}
        {collapsed && <div className="mt-4 border-t border-border/60 pt-4" />}

        <ul className="flex flex-col gap-0.5">
          {supportNav.map((item) => (
            <li key={item.label}>
              <NavLink
                {...item}
                active={isActive(item.href)}
                collapsed={collapsed}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* User */}
      <div className="border-t border-border p-3">
        {collapsed ? (
          <button
            title="Achmad Hakim"
            className="flex w-full items-center justify-center rounded-lg p-1 transition-colors hover:bg-secondary/60"
          >
            <span className="relative">
              <Image
                src="/avatar-achmad.png"
                alt="Achmad Hakim"
                width={32}
                height={32}
                className="size-8 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 size-2 rounded-full border-2 border-card bg-green-500" />
            </span>
          </button>
        ) : (
          <button className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-secondary/60">
            <span className="relative">
              <Image
                src="/avatar-achmad.png"
                alt="Achmad Hakim"
                width={36}
                height={36}
                className="size-9 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-card bg-green-500" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">Achmad Hakim</span>
              <span className="block truncate text-xs text-muted-foreground">
                achmadhakim@gmail.com
              </span>
            </span>
            <ChevronsUpDown className="size-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </aside>
  )
}
