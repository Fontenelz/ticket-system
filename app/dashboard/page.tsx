import { StubPage } from "@/components/stub-page"
import { views } from "@/lib/tickets-data"
import {
  Layers,
  Sparkles,
  Mail,
  Clock,
  CheckCircle2,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react"

const statusIcons: Record<string, LucideIcon> = {
  "All Tickets": Layers,
  New: Sparkles,
  Open: Mail,
  Pending: Clock,
  Resolved: CheckCircle2,
  Escalated: AlertTriangle,
}

const statusColors: Record<string, string> = {
  "All Tickets": "text-foreground bg-muted",
  New: "text-violet-600 bg-violet-50",
  Open: "text-emerald-600 bg-emerald-50",
  Pending: "text-amber-600 bg-amber-50",
  Resolved: "text-sky-600 bg-sky-50",
  Escalated: "text-rose-600 bg-rose-50",
}

export default function DashboardPage() {
  return (
    <StubPage title="Dashboard" description="">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="font-heading text-2xl font-semibold">Visão Geral</h2>
          <p className="mt-1 text-sm text-muted-foreground">Resumo do sistema de tickets de suporte</p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {views.map((v) => {
            const Icon = statusIcons[v.label]
            const colorClass = statusColors[v.label]
            return (
              <div
                key={v.label}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <div className={`flex size-10 items-center justify-center rounded-xl ${colorClass}`}>
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums">
                    {v.count.toLocaleString("pt-BR")}
                  </p>
                  <p className="text-sm text-muted-foreground">{v.label}</p>
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Dados atualizados em tempo real com o estado dos tickets
        </p>
      </div>
    </StubPage>
  )
}
