"use client"

import { useMemo, useState } from "react"
import { AlertTriangle } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { StatusBadge, PriorityLabel } from "@/components/ticket-badges"
import { tickets } from "@/lib/tickets-data"
import { cn } from "@/lib/utils"

const SLA_HOURS: Record<string, number> = {
  Critical: 4,
  High: 8,
  Medium: 24,
  Low: 72,
}

export function SlaBreachView() {
  const [selected, setSelected] = useState<string | null>(null)

  const atRisk = useMemo(
    () =>
      tickets
        .filter((t) => t.status === "Open" || t.status === "In Progress")
        .map((t) => ({ ...t, slaHours: SLA_HOURS[t.priority] })),
    [],
  )

  return (
    <PageShell
      crumbs={[{ label: "Tickets", href: "/tickets" }, { label: "SLA Breach Risk" }]}
      title="SLA Breach Risk"
      description="Tickets approaching or past their SLA deadline."
    >
      <div className="mt-6 rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-5 py-4">
          <AlertTriangle className="size-4 text-amber-500" />
          <span className="text-sm font-medium">
            {atRisk.length} tickets at risk
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                {["Ticket ID", "Subject", "Priority", "Status", "SLA Limit"].map((col) => (
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
              {atRisk.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => setSelected(t.id === selected ? null : t.id)}
                  className={cn(
                    "cursor-pointer transition-colors",
                    t.id === selected ? "bg-secondary/40" : "hover:bg-card/60",
                  )}
                >
                  <td className="border-b border-border/60 px-5 py-3 font-medium text-muted-foreground">
                    {t.ticketId}
                  </td>
                  <td className="border-b border-border/60 px-5 py-3 font-medium">
                    {t.subject}
                  </td>
                  <td className="border-b border-border/60 px-5 py-3">
                    <PriorityLabel priority={t.priority} />
                  </td>
                  <td className="border-b border-border/60 px-5 py-3">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="border-b border-border/60 px-5 py-3 text-muted-foreground">
                    {t.slaHours}h
                  </td>
                </tr>
              ))}
              {atRisk.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    No tickets at risk. Great work!
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
