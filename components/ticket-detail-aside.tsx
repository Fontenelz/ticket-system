"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X, Calendar, Clock, Tag, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge, PriorityLabel } from "@/components/ticket-badges"
import type { Ticket } from "@/lib/tickets-data"

interface TicketDetailAsideProps {
  ticket: Ticket | null
  onClose: () => void
}

export function TicketDetailAside({ ticket, onClose }: TicketDetailAsideProps) {
  const open = ticket !== null

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Ticket details"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {ticket && (
          <>
            <div className="flex items-start justify-between gap-4 border-b border-border p-5">
              <div className="flex min-w-0 flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md border border-border bg-input/30 px-2 py-0.5 font-mono text-xs text-muted-foreground">
                    <Hash className="size-3" />
                    {ticket.ticketId}
                  </span>
                  <StatusBadge status={ticket.status} />
                </div>
                <h2 className="text-lg font-semibold leading-snug text-balance">
                  {ticket.subject}
                </h2>
              </div>
              <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close">
                <X className="size-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {/* Meta grid */}
              <dl className="grid grid-cols-2 gap-4">
                <MetaItem icon={Tag} label="Category">
                  {ticket.category}
                </MetaItem>
                <MetaItem icon={Clock} label="Priority">
                  <PriorityLabel priority={ticket.priority} />
                </MetaItem>
                <MetaItem icon={Calendar} label="Created">
                  {ticket.createdAt}
                </MetaItem>
                <MetaItem icon={Calendar} label="Last updated">
                  {ticket.updatedAt}
                </MetaItem>
              </dl>

              {/* Assignee */}
              <div className="mt-6">
                <p className="mb-2 text-xs font-medium tracking-wider text-muted-foreground">
                  ASSIGNEE
                </p>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-input/20 p-3">
                  <Image
                    src={ticket.assignee.avatar || "/placeholder.svg"}
                    alt={ticket.assignee.name}
                    width={40}
                    height={40}
                    className="size-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{ticket.assignee.name}</p>
                    <p className="text-xs text-muted-foreground">Support Engineer</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <p className="mb-2 text-xs font-medium tracking-wider text-muted-foreground">
                  DESCRIPTION
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {ticket.description}
                </p>
              </div>

              {/* Activity */}
              <div className="mt-6">
                <p className="mb-3 text-xs font-medium tracking-wider text-muted-foreground">
                  ACTIVITY
                </p>
                <ol className="flex flex-col gap-4 border-l border-border pl-4">
                  <ActivityItem time={ticket.createdAt} text="Ticket created and assigned." />
                  <ActivityItem
                    time={ticket.updatedAt}
                    text={`Status changed to ${ticket.status}.`}
                  />
                </ol>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-border p-5">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button>Edit ticket</Button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

function MetaItem({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </dt>
      <dd className="text-sm font-medium">{children}</dd>
    </div>
  )
}

function ActivityItem({ time, text }: { time: string; text: string }) {
  return (
    <li className="relative">
      <span className="absolute -left-[21px] top-1 size-2 rounded-full bg-muted-foreground" />
      <p className="text-sm">{text}</p>
      <p className="text-xs text-muted-foreground">{time}</p>
    </li>
  )
}
