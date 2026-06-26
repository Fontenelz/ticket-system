"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StatusBadge, PriorityFlag } from "@/components/ticket-badges"
import { TicketSummary } from "@/components/ticket-summary"
import { TicketTimeline } from "@/components/ticket-timeline"
import { MoreHorizontal, X, MessageSquare, BadgeCheck, ChevronDown } from "lucide-react"
import type { Ticket } from "@/lib/tickets-data"

export function TicketDetails({
  ticket,
  onClose,
}: {
  ticket: Ticket
  onClose: () => void
}) {
  return (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <header className="flex items-start justify-between gap-2 px-5 pt-5 pb-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="font-heading text-base font-semibold">#{ticket.code}</span>
            <StatusBadge status={ticket.status} />
          </div>
          <span className="text-xs text-muted-foreground">Detalhes do ticket</span>
        </div>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground" />}
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Marcar como resolvido</DropdownMenuItem>
              <DropdownMenuItem>Reatribuir</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Excluir ticket</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            className="text-muted-foreground"
            aria-label="Fechar painel"
          >
            <X className="size-4" />
          </Button>
        </div>
      </header>

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-5 px-5 pb-6">
          {/* Customer */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">Emitido por</p>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={ticket.customer.avatar || "/placeholder.svg"} alt={ticket.customer.name} />
                  <AvatarFallback>{ticket.customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 text-sm font-medium">
                    {ticket.customer.name}
                    {ticket.customer.verified && (
                      <BadgeCheck className="size-4 fill-primary text-primary-foreground" />
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground">{ticket.customer.email}</span>
                </div>
              </div>
              <Button size="icon" className="shrink-0">
                <MessageSquare className="size-4" />
                <span className="sr-only">Mensagem</span>
              </Button>
            </div>
          </div>

          {/* Meta info */}
          <div className="grid grid-cols-2 gap-3 rounded-xl border border-border p-3">
            <Meta label="Responsável">
              <div className="flex items-center gap-1.5">
                <Avatar className="size-5">
                  <AvatarImage src={ticket.assignee.avatar || "/placeholder.svg"} alt={ticket.assignee.name} />
                  <AvatarFallback>{ticket.assignee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="truncate text-sm">{ticket.assignee.name}</span>
              </div>
            </Meta>
            <Meta label="Categoria">
              <span className="text-sm">{ticket.category}</span>
            </Meta>
            <Meta label="Prioridade">
              <span className="flex items-center gap-1.5 text-sm">
                <PriorityFlag priority={ticket.priority} />
                {ticket.priority}
              </span>
            </Meta>
            <Meta label="Aberto em">
              <span className="text-sm tabular-nums">{ticket.date}</span>
            </Meta>
          </div>

          <Separator />

          <TicketSummary ticket={ticket} />

          <Separator />

          <TicketTimeline events={ticket.timeline} />
        </div>
      </ScrollArea>

      {/* Footer */}
      <footer className="flex items-center justify-between gap-2 border-t border-border px-5 py-3.5">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button className="gap-1.5" />}>
            Atualizar ticket
            <ChevronDown className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Salvar alterações</DropdownMenuItem>
            <DropdownMenuItem>Salvar e fechar</DropdownMenuItem>
            <DropdownMenuItem>Salvar e escalar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </footer>
    </div>
  )
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}
