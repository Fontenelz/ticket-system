"use client"

import { useState } from "react"
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
import {
  MoreHorizontal,
  X,
  MessageSquare,
  BadgeCheck,
  ChevronDown,
} from "lucide-react"
import {
  categories,
  priorities,
  type Ticket,
  type TicketCategory,
  type TicketPriority,
  type TicketStatus,
} from "@/lib/tickets-data"

const STATUSES: TicketStatus[] = ["New", "Open", "Pending", "Resolved", "Escalated"]

const ASSIGNEES = [
  { name: "John Doe", avatar: "/avatar-man-portrait.png" },
  { name: "Mike Ross", avatar: "/avatar-man-beard.png" },
  { name: "Sara Lima", avatar: "/avatar-woman-glasses.png" },
]

export function TicketDetails({
  ticket,
  onClose,
  onUpdate,
  onDelete,
}: {
  ticket: Ticket
  onClose: () => void
  onUpdate: (ticket: Ticket) => void
  onDelete: (id: string) => void
}) {
  const [title, setTitle] = useState(ticket.title)
  const [status, setStatus] = useState<TicketStatus>(ticket.status)
  const [priority, setPriority] = useState<TicketPriority>(ticket.priority)
  const [category, setCategory] = useState<TicketCategory>(ticket.category)
  const [assignee, setAssignee] = useState(ticket.assignee)

  function buildUpdated(): Ticket {
    return { ...ticket, title, status, priority, category, assignee }
  }

  function handleSave() {
    onUpdate(buildUpdated())
  }

  function handleSaveAndClose() {
    onUpdate(buildUpdated())
    onClose()
  }

  function handleSaveAndEscalate() {
    const escalated = { ...buildUpdated(), status: "Escalated" as const }
    setStatus("Escalated")
    onUpdate(escalated)
    onClose()
  }

  function handleMarkResolved() {
    const resolved = { ...buildUpdated(), status: "Resolved" as const }
    setStatus("Resolved")
    onUpdate(resolved)
  }

  function handleDelete() {
    onDelete(ticket.id)
  }

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <header className="flex items-start justify-between gap-2 px-5 pt-5 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-heading text-base font-semibold">#{ticket.code}</span>
            {/* Clickable status badge */}
            <DropdownMenu>
              <DropdownMenuTrigger render={<button className="cursor-pointer rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />}>
                <StatusBadge status={status} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" sideOffset={6}>
                {STATUSES.map((s) => (
                  <DropdownMenuItem key={s} onClick={() => setStatus(s)}>
                    <StatusBadge status={s} />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent p-0 text-xs text-muted-foreground outline-none placeholder:text-muted-foreground/50 hover:text-foreground focus:text-foreground"
            placeholder="Título do ticket"
          />
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground" />}
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleMarkResolved}>Marcar como resolvido</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                const reassigned = { ...buildUpdated(), assignee: ASSIGNEES[(ASSIGNEES.findIndex(a => a.name === assignee.name) + 1) % ASSIGNEES.length] }
                setAssignee(reassigned.assignee)
                onUpdate(reassigned)
              }}>
                Reatribuir
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={handleDelete}>
                Excluir ticket
              </DropdownMenuItem>
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
                  <AvatarImage
                    src={ticket.customer.avatar || "/placeholder.svg"}
                    alt={ticket.customer.name}
                  />
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
            {/* Assignee */}
            <Meta label="Responsável">
              <DropdownMenu>
                <DropdownMenuTrigger render={<button className="flex items-center gap-1.5 cursor-pointer rounded outline-none focus-visible:ring-2 focus-visible:ring-ring" />}>
                  <Avatar className="size-5">
                    <AvatarImage
                      src={assignee.avatar || "/placeholder.svg"}
                      alt={assignee.name}
                    />
                    <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="truncate text-sm">{assignee.name}</span>
                  <ChevronDown className="size-3 shrink-0 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {ASSIGNEES.map((a) => (
                    <DropdownMenuItem key={a.name} onClick={() => setAssignee(a)}>
                      <Avatar className="size-5">
                        <AvatarImage src={a.avatar} alt={a.name} />
                        <AvatarFallback>{a.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {a.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </Meta>

            {/* Category */}
            <Meta label="Categoria">
              <DropdownMenu>
                <DropdownMenuTrigger render={<button className="flex items-center gap-1 cursor-pointer rounded outline-none focus-visible:ring-2 focus-visible:ring-ring" />}>
                  <span className="text-sm">{category}</span>
                  <ChevronDown className="size-3 shrink-0 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.map((c) => (
                    <DropdownMenuItem key={c} onClick={() => setCategory(c)}>
                      {c}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </Meta>

            {/* Priority */}
            <Meta label="Prioridade">
              <DropdownMenu>
                <DropdownMenuTrigger render={<button className="flex items-center gap-1 cursor-pointer rounded outline-none focus-visible:ring-2 focus-visible:ring-ring" />}>
                  <span className="flex items-center gap-1.5 text-sm">
                    <PriorityFlag priority={priority} />
                    {priority}
                  </span>
                  <ChevronDown className="size-3 shrink-0 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {priorities.map((p) => (
                    <DropdownMenuItem key={p} onClick={() => setPriority(p)}>
                      <PriorityFlag priority={p} />
                      {p}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </Meta>

            <Meta label="Aberto em">
              <span className="text-sm tabular-nums">{ticket.date}</span>
            </Meta>
          </div>

          <Separator />

          <TicketSummary ticket={{ ...ticket, title }} />

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
            <DropdownMenuItem onClick={handleSave}>Salvar alterações</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSaveAndClose}>Salvar e fechar</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSaveAndEscalate}>Salvar e escalar</DropdownMenuItem>
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
