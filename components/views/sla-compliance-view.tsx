"use client"

import { PageShell } from "@/components/page-shell"
import { SlaMonitoring } from "@/components/dashboard/sla-monitoring"
import { metrics } from "@/lib/dashboard-data"

const slaMetric = metrics.find((m) => m.label === "SLA Compliance Rate")

export function SlaComplianceView() {
  return (
    <PageShell
      crumbs={[{ label: "Analytics" }, { label: "SLA Compliance" }]}
      title="SLA Compliance"
      description="Track and manage service level agreement performance across all tickets."
    >
      {slaMetric && (
        <div className="mt-6 flex items-center gap-6 rounded-2xl border border-border bg-card px-6 py-5">
          <div>
            <p className="text-sm text-muted-foreground">{slaMetric.label}</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight">{slaMetric.value}</p>
          </div>
          <div className="text-sm">
            <span
              className={
                slaMetric.trend === "up" ? "font-medium text-green-600" : "font-medium text-red-600"
              }
            >
              {slaMetric.delta}
            </span>{" "}
            <span className="text-muted-foreground">vs last week</span>
          </div>
        </div>
      )}
      <div className="mt-4">
        <SlaMonitoring />
      </div>
    </PageShell>
  )
}
