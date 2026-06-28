"use client"

import { useState } from "react"
import { Search, Plus, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageShell } from "@/components/page-shell"
import { cn } from "@/lib/utils"

const tabs = ["All", "Active", "Inactive"] as const
type Tab = (typeof tabs)[number]

const clients = [
  { id: "1", name: "PT. Alpha Indonesia", contact: "Budi Santoso", email: "budi@alpha.co.id", tickets: 14, status: "Active" as const },
  { id: "2", name: "Acme Corp", contact: "Jane Smith", email: "jane@acme.com", tickets: 8, status: "Active" as const },
  { id: "3", name: "Globex Solutions", contact: "Homer Simpson", email: "homer@globex.com", tickets: 3, status: "Inactive" as const },
  { id: "4", name: "Initech LLC", contact: "Bill Lumbergh", email: "bill@initech.com", tickets: 21, status: "Active" as const },
  { id: "5", name: "Umbrella Corp", contact: "Albert Wesker", email: "albert@umbrella.com", tickets: 0, status: "Inactive" as const },
]

export function ClientsView() {
  const [activeTab, setActiveTab] = useState<Tab>("All")
  const [query, setQuery] = useState("")

  const filtered = clients.filter((c) => {
    const matchesTab = activeTab === "All" || c.status === activeTab
    const matchesQuery =
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.contact.toLowerCase().includes(query.toLowerCase())
    return matchesTab && matchesQuery
  })

  return (
    <PageShell
      crumbs={[{ label: "Clients" }]}
      title="Clients"
      description="Manage your client accounts and contacts."
      actions={
        <Button size="lg">
          <Plus className="size-4" />
          Add Client
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
            placeholder="Search clients..."
            className="min-w-0 w-48 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card">
        <table className="w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              {["Company", "Contact", "Email", "Tickets", "Status"].map((col) => (
                <th
                  key={col}
                  className="border-b border-border px-5 py-3 text-left font-medium text-muted-foreground"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="cursor-pointer transition-colors hover:bg-secondary/40">
                <td className="border-b border-border/60 px-5 py-3">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="flex size-7 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                      <Building2 className="size-4" />
                    </span>
                    {c.name}
                  </span>
                </td>
                <td className="border-b border-border/60 px-5 py-3">{c.contact}</td>
                <td className="border-b border-border/60 px-5 py-3 text-muted-foreground">
                  {c.email}
                </td>
                <td className="border-b border-border/60 px-5 py-3 text-muted-foreground">
                  {c.tickets}
                </td>
                <td className="border-b border-border/60 px-5 py-3">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                      c.status === "Active"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                        : "border-border bg-secondary text-muted-foreground",
                    )}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-muted-foreground">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageShell>
  )
}
