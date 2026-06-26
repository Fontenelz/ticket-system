"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/sidebar"
import { TicketsTable } from "@/components/tickets-table"
import { TicketDetails } from "@/components/ticket-details"
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useMediaQuery } from "@/hooks/use-media-query"
import { tickets as allTickets, type Ticket } from "@/lib/tickets-data"

export function TicketsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [displayTicket, setDisplayTicket] = useState<Ticket | null>(null)
  const [activeView, setActiveView] = useState("All Tickets")
  const [query, setQuery] = useState("")
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const open = selectedId !== null

  const filtered = useMemo(() => {
    return allTickets.filter((t) => {
      const matchesView =
        activeView === "All Tickets" || t.status === activeView
      const matchesQuery =
        query.trim() === "" ||
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.code.toLowerCase().includes(query.toLowerCase())
      return matchesView && matchesQuery
    })
  }, [activeView, query])

  function handleSelect(ticket: Ticket) {
    if (ticket.id === selectedId) {
      handleClose()
      return
    }
    setSelectedId(ticket.id)
    setDisplayTicket(ticket)
  }

  function handleClose() {
    setSelectedId(null)
    // keep content mounted briefly so the slide-out animation can play
    window.setTimeout(() => setDisplayTicket(null), 300)
  }

  return (
    <TooltipProvider>
      <div className="flex h-dvh w-full overflow-hidden bg-muted/50 p-0 lg:p-3">
        <div className="flex h-full w-full overflow-hidden rounded-none border-border bg-card lg:rounded-2xl lg:border lg:shadow-sm">
          {/* Sidebar - desktop */}
          <aside className="hidden w-72 shrink-0 border-r border-border md:block">
            <Sidebar activeView={activeView} onSelectView={setActiveView} />
          </aside>

          {/* Main table area */}
          <main className="flex min-w-0 flex-1 flex-col">
            <TicketsTable
              tickets={filtered}
              selectedId={selectedId}
              compact={isDesktop && open}
              query={query}
              onQueryChange={setQuery}
              onSelect={handleSelect}
              onOpenSidebar={() => setMobileSidebarOpen(true)}
            />
          </main>

          {/* Details panel - desktop (animated width) */}
          <aside
            className={cn(
              "hidden shrink-0 overflow-hidden border-l border-border transition-[width] duration-300 ease-in-out lg:block",
              open ? "w-[400px]" : "w-0 border-l-0",
            )}
            aria-hidden={!open}
          >
            <div className="h-full w-[400px]">
              {displayTicket && <TicketDetails ticket={displayTicket} onClose={handleClose} />}
            </div>
          </aside>
        </div>
      </div>

      {/* Sidebar - mobile drawer */}
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-[300px] p-0">
          <SheetTitle className="sr-only">Menu de tickets</SheetTitle>
          <Sidebar
            activeView={activeView}
            onSelectView={(v) => {
              setActiveView(v)
              setMobileSidebarOpen(false)
            }}
          />
        </SheetContent>
      </Sheet>

      {/* Details - mobile/tablet sheet */}
      {!isDesktop && (
        <Sheet open={open} onOpenChange={(o) => !o && handleClose()}>
          <SheetContent
            side="right"
            showCloseButton={false}
            className="w-full p-0 sm:max-w-md"
          >
            <SheetTitle className="sr-only">
              {displayTicket ? `Detalhes do ticket ${displayTicket.code}` : "Detalhes do ticket"}
            </SheetTitle>
            {displayTicket && <TicketDetails ticket={displayTicket} onClose={handleClose} />}
          </SheetContent>
        </Sheet>
      )}
    </TooltipProvider>
  )
}
