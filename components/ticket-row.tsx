"use client"

import { cn } from "@/lib/utils"
import { TableCell, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { StatusBadge, PriorityFlag } from "@/components/ticket-badges"
import { ChevronRight } from "lucide-react"
import type { Ticket } from "@/lib/tickets-data"

export function TicketRow({
  ticket,
  selected,
  compact,
  onSelect,
}: {
  ticket: Ticket
  selected: boolean
  compact: boolean
  onSelect: (ticket: Ticket) => void
}) {
  return (
    <TableRow
      onClick={() => onSelect(ticket)}
      data-selected={selected}
      className={cn(
        "cursor-pointer border-border transition-colors data-[selected=true]:bg-accent/70 hover:bg-accent/40",
      )}
    >
      <TableCell className="w-10 pl-4">
        <Checkbox
          checked={selected}
          onClick={(e) => e.stopPropagation()}
          onCheckedChange={() => onSelect(ticket)}
          aria-label={`Selecionar ${ticket.code}`}
        />
      </TableCell>
      <TableCell className="font-medium text-muted-foreground tabular-nums">{ticket.code}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2.5">
          <PriorityFlag priority={ticket.priority} />
          <span className="truncate font-medium text-foreground">{ticket.title}</span>
        </div>
      </TableCell>
      {!compact && (
        <TableCell className="text-muted-foreground">{ticket.category}</TableCell>
      )}
      <TableCell>
        <StatusBadge status={ticket.status} />
      </TableCell>
      {!compact && (
        <TableCell className="text-muted-foreground tabular-nums">{ticket.date}</TableCell>
      )}
      <TableCell className="w-10 pr-3 text-right">
        <ChevronRight className="ml-auto size-4 text-muted-foreground" />
      </TableCell>
    </TableRow>
  )
}
