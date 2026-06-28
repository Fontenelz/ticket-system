"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Plus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageShell } from "@/components/page-shell"
import { cn } from "@/lib/utils"

const tabs = ["All Agents", "Online", "Offline"] as const
type Tab = (typeof tabs)[number]

const agents = [
  { id: "1", name: "Olivia Rhye", email: "olivia@kravio.io", avatar: "/avatar-olivia.png", role: "Support Engineer", team: "Tier 1", status: "Online" as const, resolved: 124 },
  { id: "2", name: "John Doe", email: "john@kravio.io", avatar: "/avatar-john.png", role: "Senior Support", team: "Tier 2", status: "Online" as const, resolved: 89 },
  { id: "3", name: "Sarah Lee", email: "sarah@kravio.io", avatar: "/avatar-sarah.png", role: "Support Engineer", team: "Tier 1", status: "Online" as const, resolved: 201 },
  { id: "4", name: "Michael Wong", email: "michael@kravio.io", avatar: "/avatar-michael.png", role: "Team Lead", team: "Management", status: "Offline" as const, resolved: 312 },
  { id: "5", name: "Achmad Hakim", email: "achmad@kravio.io", avatar: "/avatar-achmad.png", role: "Admin", team: "Management", status: "Online" as const, resolved: 0 },
]

export function AgentsView() {
  const [activeTab, setActiveTab] = useState<Tab>("All Agents")
  const [query, setQuery] = useState("")

  const filtered = agents.filter((a) => {
    const matchesTab =
      activeTab === "All Agents" ||
      (activeTab === "Online" && a.status === "Online") ||
      (activeTab === "Offline" && a.status === "Offline")
    const matchesQuery =
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.team.toLowerCase().includes(query.toLowerCase())
    return matchesTab && matchesQuery
  })

  return (
    <PageShell
      crumbs={[{ label: "Agents & Teams" }]}
      title="Agents & Teams"
      description="Manage your support team members and their assignments."
      actions={
        <Button size="lg">
          <Plus className="size-4" />
          Invite Agent
        </Button>
      }
    >
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-xl border border-border bg-card/50 p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search agents..."
            className="min-w-0 w-48 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((agent) => (
          <div
            key={agent.id}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="relative">
                  <Image
                    src={agent.avatar}
                    alt={agent.name}
                    width={44}
                    height={44}
                    className="size-11 rounded-full object-cover"
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 size-3 rounded-full border-2 border-card",
                      agent.status === "Online" ? "bg-green-500" : "bg-muted-foreground",
                    )}
                  />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{agent.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{agent.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span className="rounded-md border border-border bg-secondary px-2 py-1">
                {agent.team}
              </span>
              <span>{agent.resolved} resolved</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-muted-foreground">
            No agents found.
          </p>
        )}
      </div>
    </PageShell>
  )
}
