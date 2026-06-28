"use client"

import { useState } from "react"
import { Star, MessageSquare } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { cn } from "@/lib/utils"
import { activities } from "@/lib/dashboard-data"

const tabs = ["All", "Positive", "Neutral", "Negative"] as const
type Tab = (typeof tabs)[number]

const feedbackItems = [
  { id: "1", client: "PT. Alpha Indonesia", agent: "Sarah Lee", score: 5, comment: "Great support response, thanks Sarah!", date: "Jan 14, 2025", ticketId: "TRG-001" },
  { id: "2", client: "Acme Corp", agent: "Olivia Rhye", score: 4, comment: "Quick resolution, very helpful.", date: "Jan 13, 2025", ticketId: "TRG-003" },
  { id: "3", client: "Initech LLC", agent: "John Doe", score: 3, comment: "Issue resolved but took longer than expected.", date: "Jan 12, 2025", ticketId: "TRG-004" },
  { id: "4", client: "Globex Solutions", agent: "Sarah Lee", score: 5, comment: "Excellent communication throughout.", date: "Jan 11, 2025", ticketId: "TRG-007" },
  { id: "5", client: "Acme Corp", agent: "Michael Wong", score: 2, comment: "Had to follow up multiple times.", date: "Jan 10, 2025", ticketId: "TRG-008" },
  { id: "6", client: "Umbrella Corp", agent: "Olivia Rhye", score: 1, comment: "Very slow response and issue not fully resolved.", date: "Jan 9, 2025", ticketId: "TRG-010" },
]

function scoreCategory(score: number): "Positive" | "Neutral" | "Negative" {
  if (score >= 4) return "Positive"
  if (score === 3) return "Neutral"
  return "Negative"
}

const categoryColor: Record<"Positive" | "Neutral" | "Negative", string> = {
  Positive: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600",
  Neutral: "border-amber-500/30 bg-amber-500/10 text-amber-600",
  Negative: "border-rose-500/30 bg-rose-500/10 text-rose-500",
}

export function FeedbackView() {
  const [activeTab, setActiveTab] = useState<Tab>("All")

  const filtered = feedbackItems.filter((f) => {
    if (activeTab === "All") return true
    return scoreCategory(f.score) === activeTab
  })

  return (
    <PageShell
      crumbs={[{ label: "Feedback" }]}
      title="Feedback"
      description="Customer satisfaction responses collected after ticket resolution."
    >
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {(["Positive", "Neutral", "Negative"] as const).map((cat) => {
          const count = feedbackItems.filter((f) => scoreCategory(f.score) === cat).length
          return (
            <div key={cat} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">{cat}</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight">{count}</p>
            </div>
          )
        })}
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

        <div className="flex flex-col gap-3">
          {filtered.map((f) => {
            const cat = scoreCategory(f.score)
            return (
              <div
                key={f.id}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-secondary">
                      <MessageSquare className="size-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{f.client}</p>
                      <p className="text-xs text-muted-foreground">Agent: {f.agent} · {f.ticketId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={cn(
                            "size-3.5",
                            s <= f.score ? "fill-amber-400 text-amber-400" : "text-border",
                          )}
                        />
                      ))}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
                        categoryColor[cat],
                      )}
                    >
                      {cat}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">&ldquo;{f.comment}&rdquo;</p>
                <p className="mt-2 text-xs text-muted-foreground">{f.date}</p>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">No feedback found.</p>
          )}
        </div>
      </div>
    </PageShell>
  )
}
