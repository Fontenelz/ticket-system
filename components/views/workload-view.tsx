"use client"

import Image from "next/image"
import { PageShell } from "@/components/page-shell"

const agents = [
  { name: "Sarah Lee", avatar: "/avatar-sarah.png", open: 12, inProgress: 5, resolved: 201, utilization: 85 },
  { name: "Olivia Rhye", avatar: "/avatar-olivia.png", open: 8, inProgress: 3, resolved: 124, utilization: 60 },
  { name: "John Doe", avatar: "/avatar-john.png", open: 15, inProgress: 7, resolved: 89, utilization: 92 },
  { name: "Michael Wong", avatar: "/avatar-michael.png", open: 4, inProgress: 2, resolved: 312, utilization: 40 },
]

function UtilizationBar({ value }: { value: number }) {
  const color =
    value >= 90 ? "bg-rose-500" : value >= 70 ? "bg-amber-500" : "bg-emerald-500"
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-8 text-right text-xs tabular-nums text-muted-foreground">
        {value}%
      </span>
    </div>
  )
}

export function WorkloadView() {
  return (
    <PageShell
      crumbs={[{ label: "Analytics" }, { label: "Workload Analytics" }]}
      title="Workload Analytics"
      description="Monitor agent capacity and ticket distribution across your team."
    >
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Open", value: agents.reduce((s, a) => s + a.open, 0).toString(), color: "text-amber-600" },
          { label: "In Progress", value: agents.reduce((s, a) => s + a.inProgress, 0).toString(), color: "text-blue-600" },
          { label: "Avg. Utilization", value: `${Math.round(agents.reduce((s, a) => s + a.utilization, 0) / agents.length)}%`, color: "text-foreground" },
          { label: "Agents Active", value: agents.length.toString(), color: "text-emerald-600" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className={`mt-1 text-3xl font-semibold tracking-tight ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card">
        <table className="w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              {["Agent", "Open", "In Progress", "Resolved", "Utilization"].map((col) => (
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
            {agents.map((agent) => (
              <tr key={agent.name} className="transition-colors hover:bg-secondary/40">
                <td className="border-b border-border/60 px-5 py-3">
                  <span className="flex items-center gap-2 font-medium">
                    <Image
                      src={agent.avatar}
                      alt={agent.name}
                      width={24}
                      height={24}
                      className="size-6 rounded-full object-cover"
                    />
                    {agent.name}
                  </span>
                </td>
                <td className="border-b border-border/60 px-5 py-3 text-amber-600">{agent.open}</td>
                <td className="border-b border-border/60 px-5 py-3 text-blue-600">{agent.inProgress}</td>
                <td className="border-b border-border/60 px-5 py-3 text-muted-foreground">{agent.resolved}</td>
                <td className="border-b border-border/60 px-5 py-3 w-48">
                  <UtilizationBar value={agent.utilization} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  )
}
