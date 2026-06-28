import { cn } from "@/lib/utils"
import type { TicketPriority, TicketStatus } from "@/lib/tickets-data"

const statusStyles: Record<TicketStatus, string> = {
  Resolved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Open: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  "In Progress": "border-blue-500/30 bg-blue-500/10 text-blue-400",
  Failed: "border-rose-500/30 bg-rose-500/10 text-rose-400",
}

const priorityStyles: Record<TicketPriority, string> = {
  Critical: "text-rose-400",
  High: "text-amber-400",
  Medium: "text-blue-400",
  Low: "text-emerald-400",
}

export function StatusBadge({
  status,
  className,
}: {
  status: TicketStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
        className,
      )}
    >
      {status}
    </span>
  )
}

export function PriorityLabel({
  priority,
  className,
}: {
  priority: TicketPriority
  className?: string
}) {
  return (
    <span className={cn("text-sm font-medium", priorityStyles[priority], className)}>
      {priority}
    </span>
  )
}
