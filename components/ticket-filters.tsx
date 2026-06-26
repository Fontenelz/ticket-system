"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Search, ArrowUpDown, SlidersHorizontal, PanelLeft } from "lucide-react"

export function TicketFilters({
  query,
  onQueryChange,
  onOpenSidebar,
}: {
  query: string
  onQueryChange: (value: string) => void
  onOpenSidebar: () => void
}) {
  return (
    <header className="flex items-center gap-2 border-b border-border px-4 py-3.5">
      <Button
        variant="ghost"
        size="icon-sm"
        className="lg:hidden"
        onClick={onOpenSidebar}
        aria-label="Abrir menu"
      >
        <PanelLeft className="size-5" />
      </Button>
      <h1 className="font-heading text-base font-semibold whitespace-nowrap">All Tickets</h1>

      <div className="relative ml-auto w-full max-w-sm">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar"
          className="pl-9"
        />
      </div>

      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon" />}>
          <ArrowUpDown className="size-4" />
        </TooltipTrigger>
        <TooltipContent>Ordenar</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon" />}>
          <SlidersHorizontal className="size-4" />
        </TooltipTrigger>
        <TooltipContent>Filtros</TooltipContent>
      </Tooltip>
    </header>
  )
}
