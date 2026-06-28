"use client"

import { useMemo } from "react"
import { Flame } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { StatusBadge, PriorityLabel } from "@/components/ticket-badges"
import { tickets } from "@/lib/tickets-data"

export function EscalationsView() {
  const escalated = useMemo(
    () => tickets.filter((t) => t.priority === "Critical"),
    [],
  )

  return (
    <PageShell
      crumbs={[{ label: "Tickets", href: "/tickets" }, { label: "Escalations" }]}
      title="Escalations"
      description="Critical-priority tickets requiring immediate attention."
    >
      <div className="mt-6 rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-5 py-4">
          <Flame className="size-4 text-rose-500" />
          <span className="text-sm font-medium">
            {escalated.length} escalated tickets
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                {["Ticket ID", "Subject", "Category", "Status", "Updated"].map((col) => (
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
              {escalated.map((t) => (
                <tr key={t.id} className="transition-colors hover:bg-secondary/40">
                  <td className="border-b border-border/60 px-5 py-3 font-medium text-muted-foreground">
                    {t.ticketId}
                  </td>
                  <td className="border-b border-border/60 px-5 py-3 font-medium">
                    {t.subject}
                  </td>
                  <td className="border-b border-border/60 px-5 py-3 text-muted-foreground">
                    {t.category}
                  </td>
                  <td className="border-b border-border/60 px-5 py-3">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="border-b border-border/60 px-5 py-3 text-muted-foreground">
                    {t.updatedAt}
                  </td>
                </tr>
              ))}
              {escalated.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    No escalations at the moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  )
}
