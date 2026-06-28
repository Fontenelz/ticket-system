"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Target,
  Search,
  ListFilter,
  MoreVertical,
  ChevronsUpDown,
  FileText,
  CheckCircle2,
  Clock,
  Check,
} from "lucide-react"
import { slaRows, type SlaPriority, type SlaStatus } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

const columns = [
  "Ticket ID",
  "Subject",
  "Priority",
  "Assigned To",
  "Status",
  "Created Date",
  "SLA Due",
]

const priorityStyles: Record<SlaPriority, string> = {
  High: "text-red-600",
  Medium: "text-amber-600",
  Low: "text-muted-foreground",
}

const priorityBars: Record<SlaPriority, number> = {
  High: 3,
  Medium: 2,
  Low: 1,
}

function PriorityCell({ priority }: { priority: SlaPriority }) {
  return (
    <span className={cn("inline-flex items-center gap-2", priorityStyles[priority])}>
      <span className="flex h-3.5 items-end gap-0.5">
        {[1, 2, 3].map((bar) => (
          <span
            key={bar}
            className={cn(
              "w-1 rounded-sm",
              bar <= priorityBars[priority] ? "bg-current" : "bg-current/25",
            )}
            style={{ height: `${bar * 4 + 2}px` }}
          />
        ))}
      </span>
      <span className="text-foreground">{priority}</span>
    </span>
  )
}

const statusStyles: Record<
  SlaStatus,
  { icon: React.ElementType; className: string }
> = {
  "In Review": { icon: FileText, className: "text-blue-600" },
  Delivered: { icon: CheckCircle2, className: "text-green-600" },
  "In Progress": { icon: Clock, className: "text-amber-600" },
}

function StatusCell({ status }: { status: SlaStatus }) {
  const { icon: Icon, className } = statusStyles[status]
  return (
    <span className="inline-flex items-center gap-2">
      <Icon className={cn("size-4", className)} />
      <span>{status}</span>
    </span>
  )
}

function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: () => void
}) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        "flex size-[18px] items-center justify-center rounded-[5px] border transition-colors",
        checked
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border hover:border-muted-foreground",
      )}
    >
      {checked && <Check className="size-3" strokeWidth={3} />}
    </button>
  )
}

export function SlaMonitoring() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["#2319"]))
  const [searchQuery, setSearchQuery] = useState("")

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filteredRows = slaRows.filter(
    (row) =>
      row.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Target className="size-[18px] text-muted-foreground" />
          <h2 className="text-sm font-semibold">SLA Monitoring</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ticket"
              className="w-32 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm">
            <ListFilter className="size-4" />
            Filter
          </button>
          <button
            aria-label="More options"
            className="rounded-lg border border-border bg-background p-1.5 text-muted-foreground"
          >
            <MoreVertical className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th className="border-b border-border px-2 py-3 text-left">
                <span className="sr-only">Select</span>
              </th>
              {columns.map((col) => (
                <th
                  key={col}
                  className="whitespace-nowrap border-b border-border py-3 pr-4 text-left font-medium text-muted-foreground"
                >
                  <span className="inline-flex items-center gap-1">
                    {col}
                    <ChevronsUpDown className="size-3.5 opacity-50" />
                  </span>
                </th>
              ))}
              <th className="border-b border-border px-2 py-3" />
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  No tickets found.
                </td>
              </tr>
            )}
            {filteredRows.map((row) => (
              <tr key={row.id} className="hover:bg-secondary/40">
                <td className="border-b border-border/60 px-2 py-3">
                  <Checkbox
                    checked={selected.has(row.id)}
                    onChange={() => toggle(row.id)}
                  />
                </td>
                <td className="whitespace-nowrap border-b border-border/60 py-3 pr-4 font-medium">
                  {row.id}
                </td>
                <td className="whitespace-nowrap border-b border-border/60 py-3 pr-4">
                  {row.subject}
                </td>
                <td className="whitespace-nowrap border-b border-border/60 py-3 pr-4">
                  <PriorityCell priority={row.priority} />
                </td>
                <td className="whitespace-nowrap border-b border-border/60 py-3 pr-4">
                  <span className="inline-flex items-center gap-2">
                    <Image
                      src={row.assignee.avatar || "/placeholder.svg"}
                      alt={row.assignee.name}
                      width={24}
                      height={24}
                      className="size-6 rounded-full object-cover"
                    />
                    {row.assignee.name}
                  </span>
                </td>
                <td className="whitespace-nowrap border-b border-border/60 py-3 pr-4">
                  <StatusCell status={row.status} />
                </td>
                <td className="whitespace-nowrap border-b border-border/60 py-3 pr-4 text-muted-foreground">
                  {row.createdDate}
                </td>
                <td className="whitespace-nowrap border-b border-border/60 py-3 pr-4 text-muted-foreground">
                  {row.slaDue}
                </td>
                <td className="border-b border-border/60 px-2 py-3">
                  <button
                    aria-label="Row actions"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <MoreVertical className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
