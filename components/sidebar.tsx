"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PriorityFlag } from "@/components/ticket-badges"
import { views, categories, priorities } from "@/lib/tickets-data"
import {
  Home,
  Inbox,
  MessageSquare,
  BarChart3,
  Zap,
  Boxes,
  Folder,
  Puzzle,
  Bell,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  Layers,
  Sparkles,
  Mail,
  Clock,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Wrench,
  UserCog,
  RefreshCw,
  MoreHorizontal,
  Tag,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const navIcons: LucideIcon[] = [Home, Inbox, BarChart3, Zap, Boxes, Folder, Puzzle, Bell]

const viewIcons: Record<string, LucideIcon> = {
  "All Tickets": Layers,
  New: Sparkles,
  Open: Mail,
  Pending: Clock,
  Resolved: CheckCircle2,
  Escalated: AlertTriangle,
}

const categoryIcons: Record<string, LucideIcon> = {
  Billing: CreditCard,
  "Technical Issue": Wrench,
  "Account & Login": UserCog,
  Subscription: RefreshCw,
  Other: MoreHorizontal,
}

export function Sidebar({
  activeView,
  onSelectView,
}: {
  activeView: string
  onSelectView: (view: string) => void
}) {
  return (
    <div className="flex h-full w-full">
      {/* Icon rail */}
      <nav
        className="hidden w-14 shrink-0 flex-col items-center gap-1 border-r border-border bg-sidebar py-4 lg:flex"
        aria-label="Main"
      >
        <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <MessageSquare className="size-5" />
        </div>
        <div className="flex flex-1 flex-col items-center gap-1">
          {navIcons.map((Icon, i) => (
            <Button
              key={i}
              variant={i === 1 ? "secondary" : "ghost"}
              size="icon"
              className="size-9 rounded-lg text-muted-foreground data-[active=true]:text-foreground"
              data-active={i === 1}
            >
              <Icon className="size-5" />
              <span className="sr-only">Navegação {i + 1}</span>
            </Button>
          ))}
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button variant="ghost" size="icon" className="size-9 rounded-lg text-muted-foreground">
            <Users className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" className="size-9 rounded-lg text-muted-foreground">
            <Settings className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" className="size-9 rounded-lg text-muted-foreground">
            <LogOut className="size-5" />
          </Button>
        </div>
      </nav>

      {/* Filters column */}
      <div className="flex min-w-0 flex-1 flex-col bg-card">
        <header className="flex items-center justify-between px-4 py-4">
          <h2 className="font-heading text-base font-semibold">Tickets</h2>
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
            <MoreHorizontal className="size-4" />
          </Button>
        </header>

        <ScrollArea className="flex-1 px-2">
          <div className="flex flex-col gap-6 pb-6">
            <Section title="Views" count={6}>
              {views.map((v) => {
                const Icon = viewIcons[v.label]
                const active = activeView === v.label
                return (
                  <button
                    key={v.label}
                    onClick={() => onSelectView(v.label)}
                    className={cn(
                      "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                      active
                        ? "bg-accent font-medium text-foreground"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                    )}
                  >
                    {active && (
                      <span className="absolute left-0 h-5 w-0.5 rounded-full bg-primary" aria-hidden />
                    )}
                    <Icon className="size-4 shrink-0" />
                    <span className="flex-1 truncate text-left">{v.label}</span>
                    <span
                      className={cn(
                        "rounded-md px-1.5 py-0.5 text-xs",
                        v.label === "New"
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {v.count.toLocaleString("pt-BR")}
                    </span>
                  </button>
                )
              })}
            </Section>

            <Section title="Categories" count={18}>
              {categories.map((c) => {
                const Icon = categoryIcons[c]
                return (
                  <button
                    key={c}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="flex-1 truncate text-left">{c}</span>
                  </button>
                )
              })}
            </Section>

            <Section title="Priority" count={4}>
              {priorities.map((p) => (
                <button
                  key={p}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
                >
                  <PriorityFlag priority={p} />
                  <span className="flex-1 truncate text-left">{p}</span>
                </button>
              ))}
            </Section>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

function Section({
  title,
  count,
  children,
}: {
  title: string
  count: number
  children: React.ReactNode
}) {
  const Icon = title === "Categories" ? Tag : title === "Priority" ? Tag : Layers
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-2.5 py-1 text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Icon className="size-3.5" />
          <span className="text-xs font-medium tracking-wide">{title}</span>
          <span className="text-xs">{count}</span>
        </div>
        <ChevronDown className="size-3.5" />
      </div>
      <div className="relative flex flex-col gap-0.5">{children}</div>
    </div>
  )
}
