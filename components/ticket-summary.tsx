"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Sparkles } from "lucide-react"
import type { Ticket } from "@/lib/tickets-data"

export function TicketSummary({ ticket }: { ticket: Ticket }) {
  const [checked, setChecked] = useState(() => ticket.resolution.map((r) => r.done))

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
          <Sparkles className="size-4" />
          Resumo da IA
        </div>
        <h3 className="font-heading text-lg font-semibold text-balance">{ticket.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{ticket.summary}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Nível de confiança</span>
          <span className="font-semibold tabular-nums">{ticket.confidence}%</span>
        </div>
        <Progress value={ticket.confidence} className="h-2" />
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/40 p-4">
        <div>
          <p className="text-sm font-semibold">Resolução sugerida</p>
          <p className="text-xs text-muted-foreground">Resposta recomendada passo a passo</p>
        </div>
        <ul className="flex flex-col gap-2.5">
          {ticket.resolution.map((step, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Checkbox
                id={`step-${i}`}
                checked={checked[i]}
                onCheckedChange={(v) =>
                  setChecked((prev) => prev.map((c, idx) => (idx === i ? Boolean(v) : c)))
                }
                className="mt-0.5"
              />
              <label
                htmlFor={`step-${i}`}
                className="cursor-pointer text-sm leading-snug text-foreground"
              >
                {step.label}
              </label>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-1.5 pt-1">
          <p className="text-xs font-medium text-muted-foreground">Referências da base de conhecimento</p>
          {ticket.references.map((ref) => (
            <a
              key={ref.code}
              href="#"
              className="text-sm text-primary underline-offset-2 hover:underline"
            >
              {ref.code}: {ref.title}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Button variant="outline" size="sm" className="flex-1">
            Editar antes de enviar
          </Button>
          <Button size="sm" className="flex-1">
            Aplicar como resposta
          </Button>
        </div>
      </div>
    </div>
  )
}
