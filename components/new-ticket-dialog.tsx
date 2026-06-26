"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import {
  categories,
  priorities,
  type Ticket,
  type TicketCategory,
  type TicketPriority,
  type TicketStatus,
} from "@/lib/tickets-data"

const ASSIGNEES = [
  { name: "John Doe", avatar: "/avatar-man-portrait.png" },
  { name: "Mike Ross", avatar: "/avatar-man-beard.png" },
  { name: "Sara Lima", avatar: "/avatar-woman-glasses.png" },
]

const STATUSES: TicketStatus[] = ["New", "Open", "Pending", "Resolved", "Escalated"]

function generateId() {
  return `t-${Date.now()}`
}

function generateCode() {
  return `AV-${Math.floor(1000 + Math.random() * 9000)}`
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

export function NewTicketDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (ticket: Ticket) => void
}) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<TicketCategory>("Other")
  const [priority, setPriority] = useState<TicketPriority>("Medium")
  const [status, setStatus] = useState<TicketStatus>("New")
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [assignee, setAssignee] = useState(ASSIGNEES[0])

  function reset() {
    setTitle("")
    setCategory("Other")
    setPriority("Medium")
    setStatus("New")
    setCustomerName("")
    setCustomerEmail("")
    setAssignee(ASSIGNEES[0])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !customerName.trim()) return

    const ticket: Ticket = {
      id: generateId(),
      code: generateCode(),
      title: title.trim(),
      category,
      status,
      priority,
      date: formatDate(),
      customer: {
        name: customerName.trim(),
        email: customerEmail.trim() || `${customerName.toLowerCase().replace(/\s+/g, ".")}@email.com`,
        avatar: "/placeholder-user.jpg",
        verified: false,
      },
      assignee,
      summary: "Novo ticket criado manualmente pelo sistema.",
      confidence: 75,
      resolution: [
        { label: "Analisar o problema relatado.", done: false },
        { label: "Entrar em contato com o cliente.", done: false },
        { label: "Aplicar solução e verificar resolução.", done: false },
      ],
      references: [],
      timeline: [
        {
          id: `e-${Date.now()}`,
          type: "created",
          title: `Ticket criado por ${customerName.trim()}`,
          time: "Agora",
        },
      ],
    }

    onCreate(ticket)
    reset()
    onOpenChange(false)
  }

  const canSubmit = title.trim() !== "" && customerName.trim() !== ""

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" showCloseButton={false} className="w-full p-0 sm:max-w-md">
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
          <SheetHeader className="border-b border-border px-5 py-4 gap-0.5">
            <SheetTitle>Novo Ticket</SheetTitle>
            <SheetDescription>Preencha as informações do ticket de suporte.</SheetDescription>
          </SheetHeader>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-5">
            <Field label="Título *">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Descreva o problema..."
                required
                autoFocus
              />
            </Field>

            <Field label="Nome do cliente *">
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nome completo"
                required
              />
            </Field>

            <Field label="E-mail do cliente">
              <Input
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="email@exemplo.com"
                type="email"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Categoria">
                <SelectDropdown
                  value={category}
                  options={[...categories]}
                  onChange={(v) => setCategory(v as TicketCategory)}
                />
              </Field>

              <Field label="Prioridade">
                <SelectDropdown
                  value={priority}
                  options={[...priorities]}
                  onChange={(v) => setPriority(v as TicketPriority)}
                />
              </Field>

              <Field label="Status">
                <SelectDropdown
                  value={status}
                  options={[...STATUSES]}
                  onChange={(v) => setStatus(v as TicketStatus)}
                />
              </Field>

              <Field label="Responsável">
                <SelectDropdown
                  value={assignee.name}
                  options={ASSIGNEES.map((a) => a.name)}
                  onChange={(v) => setAssignee(ASSIGNEES.find((a) => a.name === v) ?? ASSIGNEES[0])}
                />
              </Field>
            </div>
          </div>

          <SheetFooter className="border-t border-border flex-row gap-2 p-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset()
                onOpenChange(false)
              }}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={!canSubmit}>
              Criar Ticket
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  )
}

function SelectDropdown({
  value,
  options,
  onChange,
}: {
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="w-full justify-between gap-1 font-normal"
          />
        }
      >
        <span className="truncate">{value}</span>
        <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((opt) => (
          <DropdownMenuItem key={opt} onClick={() => onChange(opt)}>
            {opt}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
