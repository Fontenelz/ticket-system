"use client"

import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TicketRow } from "@/components/ticket-row"
import { TicketFilters } from "@/components/ticket-filters"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Ticket } from "@/lib/tickets-data"

export function TicketsTable({
  tickets,
  selectedId,
  compact,
  query,
  activeView,
  onQueryChange,
  onSelect,
  onOpenSidebar,
  onNewTicket,
}: {
  tickets: Ticket[]
  selectedId: string | null
  compact: boolean
  query: string
  activeView: string
  onQueryChange: (value: string) => void
  onSelect: (ticket: Ticket) => void
  onOpenSidebar: () => void
  onNewTicket: () => void
}) {
  return (
    <div className="flex h-full min-w-0 flex-1 flex-col bg-card">
      <TicketFilters
        query={query}
        activeView={activeView}
        onQueryChange={onQueryChange}
        onOpenSidebar={onOpenSidebar}
        onNewTicket={onNewTicket}
      />

      <ScrollArea className="min-h-0 flex-1">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-10 pl-4">
                <Checkbox aria-label="Selecionar todos" />
              </TableHead>
              <TableHead className="w-20">#</TableHead>
              <TableHead>Título</TableHead>
              {!compact && <TableHead className="w-40">Categoria</TableHead>}
              <TableHead className="w-28">Status</TableHead>
              {!compact && <TableHead className="w-32">Data</TableHead>}
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TicketRow
                key={ticket.id}
                ticket={ticket}
                selected={selectedId === ticket.id}
                compact={compact}
                onSelect={onSelect}
              />
            ))}
          </TableBody>
        </Table>
        {tickets.length === 0 && (
          <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
            Nenhum ticket encontrado.
          </div>
        )}
      </ScrollArea>

      <footer className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="gap-1.5 text-muted-foreground" />
            }
          >
            20 linhas
            <ChevronRight className="size-3.5 rotate-90" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>10 linhas</DropdownMenuItem>
            <DropdownMenuItem>20 linhas</DropdownMenuItem>
            <DropdownMenuItem>50 linhas</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="gap-1 text-muted-foreground">
            <ChevronLeft className="size-3.5" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>
          {["1", "2", "3", "…", "19"].map((p, i) => (
            <Button
              key={i}
              variant={p === "1" ? "default" : "ghost"}
              size="icon-sm"
              className={cn("size-8", p === "…" && "pointer-events-none")}
            >
              {p}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="gap-1 text-muted-foreground">
            <span className="hidden sm:inline">Próximo</span>
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </footer>
    </div>
  )
}
