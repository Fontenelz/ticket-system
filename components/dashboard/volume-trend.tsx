"use client"

import { useMemo, useState } from "react"
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { BarChart3 } from "lucide-react"
import { volumeTrend } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

interface TooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-lg">
      {label}: {payload[0].value.toLocaleString()}
    </div>
  )
}

const periods = [
  { label: "3M", months: 3, vsLabel: "vs prev. 3 months" },
  { label: "6M", months: 6, vsLabel: "vs prev. 6 months" },
  { label: "12M", months: 12, vsLabel: "vs last year" },
] as const

type PeriodLabel = (typeof periods)[number]["label"]

function computeDelta(current: number, previous: number): string {
  if (previous === 0) return "+0%"
  const pct = ((current - previous) / previous) * 100
  return `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`
}

export function VolumeTrend() {
  const [period, setPeriod] = useState<PeriodLabel>("12M")
  const [activeIndex, setActiveIndex] = useState<number | null>(
    volumeTrend.length - 1,
  )

  const selected = periods.find((p) => p.label === period)!

  const data = useMemo(
    () => volumeTrend.slice(-selected.months),
    [selected.months],
  )

  const prevData = useMemo(
    () => volumeTrend.slice(-selected.months * 2, -selected.months),
    [selected.months],
  )

  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data])

  const prevTotal = useMemo(
    () => prevData.reduce((s, d) => s + d.value, 0),
    [prevData],
  )

  const delta = useMemo(
    () => (prevTotal > 0 ? computeDelta(total, prevTotal) : "+12.0%"),
    [total, prevTotal],
  )

  const isPositive = delta.startsWith("+")

  const yMax = useMemo(() => {
    const max = Math.max(...data.map((d) => d.value))
    return Math.ceil(max / 1000) * 1000 + 1000
  }, [data])

  const yTicks = useMemo(
    () => Array.from({ length: yMax / 1000 + 1 }, (_, i) => i * 1000),
    [yMax],
  )

  const maxBarSize = period === "3M" ? 72 : period === "6M" ? 52 : 40

  function handlePeriodChange(label: PeriodLabel) {
    const next = periods.find((p) => p.label === label)!
    setPeriod(label)
    setActiveIndex(volumeTrend.slice(-next.months).length - 1)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="size-[18px] text-muted-foreground" />
          <h2 className="text-sm font-semibold">Ticket Volume Trend</h2>
        </div>

        {/* Period selector */}
        <div className="flex items-center gap-0.5 rounded-lg border border-border bg-background p-0.5">
          {periods.map((p) => (
            <button
              key={p.label}
              onClick={() => handlePeriodChange(p.label)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                period === p.label
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <p className="text-3xl font-semibold tracking-tight">
          {total.toLocaleString()}
        </p>
        <p className="text-xs">
          <span className={cn("font-medium", isPositive ? "text-green-600" : "text-red-600")}>
            {delta}
          </span>{" "}
          <span className="text-muted-foreground">{selected.vsLabel}</span>
        </p>
      </div>

      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 16, right: 8, bottom: 0, left: 0 }}
            onMouseMove={(state) => {
              const s = state as { activeTooltipIndex?: number }
              if (s?.activeTooltipIndex != null)
                setActiveIndex(s.activeTooltipIndex)
            }}
            onMouseLeave={() => setActiveIndex(data.length - 1)}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              dy={8}
            />
            <YAxis
              orientation="right"
              domain={[0, yMax]}
              ticks={yTicks}
              tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}k`)}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              width={36}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={maxBarSize}>
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    index === activeIndex
                      ? "var(--primary)"
                      : "var(--secondary)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
