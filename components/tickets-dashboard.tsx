"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import {
  Plus,
  Upload,
  ListFilter,
  ChevronsUpDown,
  MoreHorizontal,
  Trash2,
  Check,
  LayoutGrid,
  Bell,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge, PriorityLabel } from "@/components/ticket-badges"
import { TicketDetailAside } from "@/components/ticket-detail-aside"
import { NewTicketModal } from "@/components/new-ticket-modal"
import {
  tickets as initialTickets,
  type Ticket,
  type TicketStatus,
} from "@/lib/tickets-data"
import { cn } from "@/lib/utils"

const tabs: { label: string; value: TicketStatus | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Resolved", value: "Resolved" },
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "In Progress" },
  { label: "Failed", value: "Failed" },
]

const columns = [
  "Ticket ID",
  "Subject",
  "Assignee",
  "Category",
  "Priority",
  "Status",
  "Action",
]

export function TicketsDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets)
  const [activeTab, setActiveTab] = useState<TicketStatus | "All">("All")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [viewing, setViewing] = useState<Ticket | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = useMemo(
    () =>
      activeTab === "All"
        ? tickets
        : tickets.filter((t) => t.status === activeTab),
    [tickets, activeTab],
  )

  const allVisibleSelected =
    filtered.length > 0 && filtered.every((t) => selected.has(t.id))

  function toggleAll() {
    setSelected((prev) => {
      const next = new Set(prev)
      if (allVisibleSelected) {
        filtered.forEach((t) => next.delete(t.id))
      } else {
        filtered.forEach((t) => next.add(t.id))
      }
      return next
    })
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function deleteSelected() {
    setTickets((prev) => prev.filter((t) => !selected.has(t.id)))
    setSelected(new Set())
  }

  function handleCreate(data: {
    subject: string
    category: Ticket["category"]
    priority: Ticket["priority"]
    status: Ticket["status"]
    description: string
  }) {
    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      ticketId: `TRG-${String(tickets.length + 1).padStart(3, "0")}`,
      subject: data.subject,
      assignee: { name: "Olivia Rhye", avatar: "/avatar-olivia.png" },
      category: data.category,
      priority: data.priority,
      status: data.status,
      description: data.description || "No description provided.",
      createdAt: "Just now",
      updatedAt: "Just now",
    }
    setTickets((prev) => [newTicket, ...prev])
    setModalOpen(false)
  }

  return (
    <div className="flex h-full flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-border px-6 py-3.5">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
          <LayoutGrid className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground">Overview</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium text-foreground">Tickets</span>
        </nav>
        <div className="flex items-center gap-1">
          <button
            aria-label="Notifications"
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Bell className="size-[18px]" />
          </button>
          <button
            aria-label="Settings"
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Settings className="size-[18px]" />
          </button>
        </div>
      </header>

      {/* Section header */}
      <header className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tickets</h1>
          <p className="text-sm text-muted-foreground">
            Manage tickets and track performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="lg">
            <Upload className="size-4" />
            Export Ticket
          </Button>
          <Button size="lg" onClick={() => setModalOpen(true)}>
            <Plus className="size-4" />
            New Ticket
          </Button>
        </div>
      </header>

      {/* Tabs + filter */}
      <div className="flex items-center justify-between gap-4 px-6 pb-4">
        <div className="flex items-center gap-1 rounded-xl border border-border bg-card/50 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors",
                activeTab === tab.value
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <Button variant="outline">
          <ListFilter className="size-4" />
          Filter
        </Button>
      </div>

      {/* Table */}
      <div className="relative min-h-0 flex-1 overflow-auto px-6 pb-4">
        <table className="w-full border-separate border-spacing-0 text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="bg-background">
              <th className="border-b border-border py-3 pr-2 pl-2 text-left">
                <Checkbox checked={allVisibleSelected} onChange={toggleAll} />
              </th>
              {columns.map((col) => (
                <th
                  key={col}
                  className="border-b border-border py-3 pr-4 text-left font-medium text-muted-foreground"
                >
                  <span className="inline-flex items-center gap-1">
                    {col}
                    <ChevronsUpDown className="size-3.5 opacity-60" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((ticket) => {
              const isSelected = selected.has(ticket.id)
              return (
                <tr
                  key={ticket.id}
                  onClick={() => setViewing(ticket)}
                  className={cn(
                    "group cursor-pointer transition-colors",
                    isSelected ? "bg-secondary/40" : "hover:bg-card/60",
                  )}
                >
                  <td className="border-b border-border/60 py-3 pr-2 pl-2">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => toggleOne(ticket.id)}
                      stopPropagation
                    />
                  </td>
                  <td className="border-b border-border/60 py-3 pr-4 font-medium text-muted-foreground">
                    {ticket.ticketId}
                  </td>
                  <td className="border-b border-border/60 py-3 pr-4 font-medium">
                    {ticket.subject}
                  </td>
                  <td className="border-b border-border/60 py-3 pr-4">
                    <span className="inline-flex items-center gap-2">
                      <Image
                        src={ticket.assignee.avatar || "/placeholder.svg"}
                        alt={ticket.assignee.name}
                        width={24}
                        height={24}
                        className="size-6 rounded-full object-cover"
                      />
                      <span>{ticket.assignee.name}</span>
                    </span>
                  </td>
                  <td className="border-b border-border/60 py-3 pr-4">
                    <span className="text-muted-foreground underline decoration-border underline-offset-4">
                      {ticket.category}
                    </span>
                  </td>
                  <td className="border-b border-border/60 py-3 pr-4">
                    <PriorityLabel priority={ticket.priority} />
                  </td>
                  <td className="border-b border-border/60 py-3 pr-4">
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td className="border-b border-border/60 py-3 pr-4">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label="Ticket actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-16 text-center text-muted-foreground"
                >
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Selection action bar */}
        {selected.size > 0 && (
          <div className="sticky bottom-2 z-20 mx-auto flex w-fit items-center gap-3 rounded-xl border border-border bg-secondary/90 px-4 py-2.5 shadow-xl backdrop-blur">
            <span className="text-sm text-muted-foreground">
              {selected.size} ticket(s) selected
            </span>
            <Button variant="destructive" size="sm" onClick={deleteSelected}>
              <Trash2 className="size-4" />
              Delete
            </Button>
            <button
              onClick={() => setSelected(new Set())}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      <footer className="flex items-center justify-between border-t border-border px-6 py-4">
        <Button variant="outline">Previous</Button>
        <span className="text-sm text-muted-foreground">Page 1 of 5</span>
        <Button variant="outline">Next</Button>
      </footer>

      <TicketDetailAside ticket={viewing} onClose={() => setViewing(null)} />
      <NewTicketModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  )
}

function Checkbox({
  checked,
  onChange,
  stopPropagation,
}: {
  checked: boolean
  onChange: () => void
  stopPropagation?: boolean
}) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={(e) => {
        if (stopPropagation) e.stopPropagation()
        onChange()
      }}
      className={cn(
        "flex size-[18px] items-center justify-center rounded-[5px] border transition-colors",
        checked
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-input/30 hover:border-muted-foreground",
      )}
    >
      {checked && <Check className="size-3" strokeWidth={3} />}
    </button>
  )
}
