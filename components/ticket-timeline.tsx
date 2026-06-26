import { cn } from "@/lib/utils"
import { Hand, Sparkles, Clock, MessageSquare, RefreshCw } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { TimelineEvent } from "@/lib/tickets-data"

const icons: Record<TimelineEvent["type"], LucideIcon> = {
  assigned: Hand,
  ai: Sparkles,
  created: Clock,
  status: RefreshCw,
  comment: MessageSquare,
}

export function TicketTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-semibold">Linha do tempo</p>
      <ol className="mt-2 flex flex-col">
        {events.map((event, i) => {
          const Icon = icons[event.type]
          const last = i === events.length - 1
          return (
            <li key={event.id} className="relative flex gap-3 pb-5 last:pb-0">
              {!last && (
                <span
                  className="absolute top-8 left-[15px] h-[calc(100%-1.5rem)] w-px bg-border"
                  aria-hidden
                />
              )}
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground",
                )}
              >
                <Icon className="size-4" />
              </span>
              <div className="flex flex-col pt-1">
                <span className="text-sm font-medium leading-tight text-foreground">
                  {event.title}
                </span>
                <span className="text-xs text-muted-foreground">{event.time}</span>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
