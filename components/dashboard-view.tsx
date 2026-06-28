"use client"

import {
  LayoutGrid,
  Bell,
  Settings,
  Calendar,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { LatestUpdates } from "@/components/dashboard/latest-updates"
import { VolumeTrend } from "@/components/dashboard/volume-trend"
import { SlaMonitoring } from "@/components/dashboard/sla-monitoring"

export function DashboardView() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-border px-6 py-3.5">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm"
        >
          <LayoutGrid className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground">Overview</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium text-foreground">Dashboard</span>
        </nav>
        <div className="flex items-center gap-1">
          <button
            aria-label="Notifications"
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Bell className="size-[18px]" />
          </button>
          <button
            aria-label="Settings"
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Settings className="size-[18px]" />
          </button>
        </div>
      </header>

      {/* Scroll area */}
      <div className="min-h-0 flex-1 overflow-y-auto bg-background px-6 py-6">
        {/* Greeting */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Hello, Achmad Hakim
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Here are the latest insights from your customer interactions.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
              <Calendar className="size-4 text-muted-foreground" />
              Last week
              <ChevronDown className="size-4 text-muted-foreground" />
            </button>
            <button
              aria-label="More options"
              className="rounded-lg border border-border bg-card p-2 text-muted-foreground hover:text-foreground"
            >
              <MoreHorizontal className="size-[18px]" />
            </button>
          </div>
        </div>

        {/* Main grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
          {/* Left/main column */}
          <div className="flex flex-col gap-4 xl:col-span-2">
            <MetricCards />
            <VolumeTrend />
          </div>
          {/* Right column */}
          <div className="xl:col-span-1">
            <LatestUpdates />
          </div>
        </div>

        {/* SLA monitoring full width */}
        <div className="mt-4">
          <SlaMonitoring />
        </div>
      </div>
    </div>
  )
}
