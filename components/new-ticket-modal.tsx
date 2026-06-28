"use client"

import { useEffect, useState } from "react"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  categories,
  priorities,
  statuses,
  type TicketCategory,
  type TicketPriority,
  type TicketStatus,
} from "@/lib/tickets-data"

interface NewTicketModalProps {
  open: boolean
  onClose: () => void
  onCreate: (data: {
    subject: string
    category: TicketCategory
    priority: TicketPriority
    status: TicketStatus
    description: string
  }) => void
}

const fieldClass =
  "w-full rounded-lg border border-border bg-input/30 px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"

export function NewTicketModal({ open, onClose, onCreate }: NewTicketModalProps) {
  const [subject, setSubject] = useState("")
  const [category, setCategory] = useState<TicketCategory>(categories[0])
  const [priority, setPriority] = useState<TicketPriority>("Medium")
  const [status, setStatus] = useState<TicketStatus>("Open")
  const [description, setDescription] = useState("")

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      setSubject("")
      setCategory(categories[0])
      setPriority("Medium")
      setStatus("Open")
      setDescription("")
    }
  }, [open])

  if (!open) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!subject.trim()) return
    onCreate({ subject: subject.trim(), category, priority, status, description: description.trim() })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-ticket-title"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-input/30">
              <Plus className="size-4" />
            </span>
            <div>
              <h2 id="new-ticket-title" className="text-base font-semibold">
                Create new ticket
              </h2>
              <p className="text-sm text-muted-foreground">
                Add a new ticket to track and resolve.
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Login page returns 500 error"
              className={fieldClass}
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as TicketCategory)}
                className={fieldClass}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="priority" className="text-sm font-medium">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TicketPriority)}
                className={fieldClass}
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TicketStatus)}
              className={fieldClass}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe the issue in detail..."
              className={`${fieldClass} resize-none`}
            />
          </div>

          <div className="mt-1 flex items-center justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!subject.trim()}>
              <Plus className="size-4" />
              Create Ticket
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
