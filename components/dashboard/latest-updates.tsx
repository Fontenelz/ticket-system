"use client"

import { useState } from "react"
import {
  ClipboardList,
  Search,
  Ticket,
  UserPlus,
  Repeat,
  AlertTriangle,
  BookOpen,
  Star,
} from "lucide-react"
import { activities, type Activity } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

const tabs = ["Today", "Yesterday", "This week"]

const iconMap: Record<
  Activity["type"],
  { icon: React.ElementType; className: string }
> = {
  ticket: { icon: Ticket, className: "bg-blue-50 text-blue-600" },
  client: { icon: UserPlus, className: "bg-violet-50 text-violet-600" },
  agent: { icon: Repeat, className: "bg-amber-50 text-amber-600" },
  breach: { icon: AlertTriangle, className: "bg-red-50 text-red-600" },
  kb: { icon: BookOpen, className: "bg-sky-50 text-sky-600" },
  feedback: { icon: Star, className: "bg-yellow-50 text-yellow-600" },
}

export function LatestUpdates() {
  const [active, setActive] = useState("Today")
  const [query, setQuery] = useState("")

  const filtered = activities.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.description.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <ClipboardList className="size-[18px] text-muted-foreground" />
        <h2 className="text-sm font-semibold">Latest Updates</h2>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex items-center gap-1 rounded-xl bg-secondary p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              active === tab
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
        <Search className="size-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search activities"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <p className="mt-4 text-sm">
        <span className="font-semibold">{filtered.length}</span>{" "}
        <span className="text-muted-foreground">
          new activities{" "}
          {active === "Today" ? "today" : active === "Yesterday" ? "yesterday" : "this week"}
        </span>
      </p>

      {/* List */}
      <ul className="mt-2 flex-1 space-y-1 overflow-y-auto">
        {filtered.map((a) => {
          const { icon: Icon, className } = iconMap[a.type]
          return (
            <li
              key={a.id}
              className="flex items-start gap-3 rounded-lg py-2.5"
            >
              <span
                className={cn(
                  "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg",
                  className,
                )}
              >
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{a.title}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {a.time}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {a.description}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
