"use client"

import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { Tag, Zap, Timer } from "lucide-react"
import { metrics, type Metric } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

const icons = [Tag, Zap, Timer]

function Sparkline({ data, trend, label }: { data: Metric["spark"]; trend: "up" | "down"; label: string }) {
  const color = trend === "up" ? "#16a34a" : "#dc2626"
  const id = `spark-${label.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`
  return (
    <div className="h-12 w-28">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="y"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${id})`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {metrics.map((m, i) => {
        const Icon = icons[i]
        return (
          <div
            key={m.label}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {m.label}
              </span>
              <Icon className="size-[18px] text-muted-foreground" />
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-3xl font-semibold tracking-tight">
                  {m.value}
                </p>
                <p className="mt-1.5 text-xs">
                  <span
                    className={cn(
                      "font-medium",
                      m.trend === "up" ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {m.delta}
                  </span>{" "}
                  <span className="text-muted-foreground">vs last week</span>
                </p>
              </div>
              <Sparkline data={m.spark} trend={m.trend} label={m.label} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
