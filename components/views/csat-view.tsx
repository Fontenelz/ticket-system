"use client"

import { useState } from "react"
import { Star, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { cn } from "@/lib/utils"

const tabs = ["This Week", "This Month", "Last 3 Months"] as const
type Tab = (typeof tabs)[number]

const feedback = [
  { id: "1", client: "PT. Alpha Indonesia", agent: "Sarah Lee", score: 5, comment: "Great support response, thanks Sarah!", date: "Jan 14, 2025" },
  { id: "2", client: "Acme Corp", agent: "Olivia Rhye", score: 4, comment: "Quick resolution, very helpful.", date: "Jan 13, 2025" },
  { id: "3", client: "Initech LLC", agent: "John Doe", score: 3, comment: "Issue resolved but took longer than expected.", date: "Jan 12, 2025" },
  { id: "4", client: "Globex Solutions", agent: "Sarah Lee", score: 5, comment: "Excellent communication throughout.", date: "Jan 11, 2025" },
  { id: "5", client: "Acme Corp", agent: "Michael Wong", score: 2, comment: "Had to follow up multiple times.", date: "Jan 10, 2025" },
]

const avg = feedback.reduce((sum, f) => sum + f.score, 0) / feedback.length
const nps = Math.round((feedback.filter((f) => f.score >= 4).length / feedback.length) * 100)

function ScoreStars({ score }: { score: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn(
            "size-3.5",
            s <= score ? "fill-amber-400 text-amber-400" : "text-border",
          )}
        />
      ))}
    </span>
  )
}

export function CsatView() {
  const [activeTab, setActiveTab] = useState<Tab>("This Week")

  return (
    <PageShell
      crumbs={[{ label: "Analytics" }, { label: "CSAT & NPS" }]}
      title="CSAT & NPS"
      description="Customer satisfaction scores and net promoter metrics."
    >
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Avg. CSAT Score</p>
          <p className="mt-1 text-4xl font-semibold tracking-tight">{avg.toFixed(1)}</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
            <TrendingUp className="size-3.5" />
            <span>+0.3 vs last week</span>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">NPS Score</p>
          <p className="mt-1 text-4xl font-semibold tracking-tight">{nps}</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
            <TrendingDown className="size-3.5" />
            <span>-5 vs last week</span>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Responses</p>
          <p className="mt-1 text-4xl font-semibold tracking-tight">{feedback.length}</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <Minus className="size-3.5" />
            <span>No change</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-4 flex items-center gap-1 rounded-xl border border-border bg-card/50 p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                {["Client", "Agent", "Score", "Comment", "Date"].map((col) => (
                  <th
                    key={col}
                    className="border-b border-border px-5 py-3 text-left font-medium text-muted-foreground"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {feedback.map((f) => (
                <tr key={f.id} className="transition-colors hover:bg-secondary/40">
                  <td className="border-b border-border/60 px-5 py-3 font-medium">{f.client}</td>
                  <td className="border-b border-border/60 px-5 py-3 text-muted-foreground">{f.agent}</td>
                  <td className="border-b border-border/60 px-5 py-3">
                    <ScoreStars score={f.score} />
                  </td>
                  <td className="border-b border-border/60 px-5 py-3 max-w-xs truncate text-muted-foreground">
                    {f.comment}
                  </td>
                  <td className="border-b border-border/60 px-5 py-3 whitespace-nowrap text-muted-foreground">
                    {f.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  )
}
