import { cn } from "@/lib/utils"
import { Flag } from "lucide-react"
import type { TicketPriority, TicketStatus } from "@/lib/tickets-data"

const statusStyles: Record<TicketStatus, string> = {
  New: "bg-violet-50 text-violet-700",
  Open: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Resolved: "bg-sky-50 text-sky-700",
  Escalated: "bg-rose-50 text-rose-700",
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
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        statusStyles[status],
        className,
      )}
    >
      {status}
    </span>
  )
}

const priorityColors: Record<TicketPriority, string> = {
  Urgent: "text-rose-500 fill-rose-500",
  High: "text-amber-500 fill-amber-500",
  Medium: "text-yellow-500 fill-yellow-500",
  Low: "text-emerald-500 fill-emerald-500",
}

export function PriorityFlag({
  priority,
  className,
}: {
  priority: TicketPriority
  className?: string
}) {
  return <Flag className={cn("size-4", priorityColors[priority], className)} aria-hidden />
}
