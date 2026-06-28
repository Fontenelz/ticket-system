"use client"

import { useState } from "react"
import { Download, FileText, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageShell } from "@/components/page-shell"
import { cn } from "@/lib/utils"

const tabs = ["All Reports", "Scheduled", "Recent"] as const
type Tab = (typeof tabs)[number]

const reports = [
  { id: "1", name: "Weekly Ticket Summary", type: "Tickets", schedule: "Every Monday", lastRun: "Jan 13, 2025", status: "Ready" as const },
  { id: "2", name: "SLA Compliance Report", type: "SLA", schedule: "Monthly", lastRun: "Jan 1, 2025", status: "Ready" as const },
  { id: "3", name: "Agent Performance", type: "Team", schedule: "Weekly", lastRun: "Jan 13, 2025", status: "Ready" as const },
  { id: "4", name: "CSAT Trends", type: "Satisfaction", schedule: "Monthly", lastRun: "Jan 1, 2025", status: "Ready" as const },
  { id: "5", name: "Workload Distribution", type: "Team", schedule: "On demand", lastRun: "Jan 10, 2025", status: "Processing" as const },
]

const statusStyles = {
  Ready: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600",
  Processing: "border-amber-500/30 bg-amber-500/10 text-amber-600",
}

export function ReportsView() {
  const [activeTab, setActiveTab] = useState<Tab>("All Reports")

  return (
    <PageShell
      crumbs={[{ label: "Analytics" }, { label: "Reports" }]}
      title="Reports"
      description="Generate and export detailed reports about your support operations."
      actions={
        <Button size="lg">
          <FileText className="size-4" />
          New Report
        </Button>
      }
    >
      <div className="mt-6">
        <div className="mb-4 flex items-center gap-1 rounded-xl border border-border bg-card/50 p-1 w-fit">
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

        <div className="rounded-2xl border border-border bg-card">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                {["Report", "Type", "Schedule", "Last Run", "Status", ""].map((col, i) => (
                  <th
                    key={i}
                    className="border-b border-border px-5 py-3 text-left font-medium text-muted-foreground"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="transition-colors hover:bg-secondary/40">
                  <td className="border-b border-border/60 px-5 py-3">
                    <span className="flex items-center gap-2 font-medium">
                      <FileText className="size-4 text-muted-foreground" />
                      {report.name}
                    </span>
                  </td>
                  <td className="border-b border-border/60 px-5 py-3 text-muted-foreground">
                    {report.type}
                  </td>
                  <td className="border-b border-border/60 px-5 py-3">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="size-3.5" />
                      {report.schedule}
                    </span>
                  </td>
                  <td className="border-b border-border/60 px-5 py-3 text-muted-foreground">
                    {report.lastRun}
                  </td>
                  <td className="border-b border-border/60 px-5 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                        statusStyles[report.status],
                      )}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="border-b border-border/60 px-5 py-3">
                    <Button variant="ghost" size="sm" disabled={report.status !== "Ready"}>
                      <Download className="size-3.5" />
                      Export
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  )
}
