"use client"

import { useState } from "react"
import { Search, Plus, BookOpen, Clock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageShell } from "@/components/page-shell"
import { cn } from "@/lib/utils"

const tabs = ["All", "Published", "Draft", "Archived"] as const
type Tab = (typeof tabs)[number]

const articles = [
  { id: "1", title: "How to reset your password", category: "Account", views: 1240, status: "Published" as const, updated: "Jan 14, 2025" },
  { id: "2", title: "Understanding SLA policies", category: "SLA", views: 890, status: "Published" as const, updated: "Jan 12, 2025" },
  { id: "3", title: "Login Troubleshooting Guide", category: "Account", views: 432, status: "Published" as const, updated: "Jan 10, 2025" },
  { id: "4", title: "API Rate Limits Explained", category: "Technical", views: 210, status: "Published" as const, updated: "Jan 8, 2025" },
  { id: "5", title: "Billing FAQ", category: "Billing", views: 88, status: "Draft" as const, updated: "Jan 5, 2025" },
  { id: "6", title: "Mobile app setup guide", category: "Technical", views: 0, status: "Draft" as const, updated: "Jan 3, 2025" },
]

const statusStyles: Record<"Published" | "Draft" | "Archived", string> = {
  Published: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600",
  Draft: "border-amber-500/30 bg-amber-500/10 text-amber-600",
  Archived: "border-border bg-secondary text-muted-foreground",
}

export function KnowledgeBaseView() {
  const [activeTab, setActiveTab] = useState<Tab>("All")
  const [query, setQuery] = useState("")

  const filtered = articles.filter((a) => {
    const matchesTab = activeTab === "All" || a.status === activeTab
    const matchesQuery = a.title.toLowerCase().includes(query.toLowerCase())
    return matchesTab && matchesQuery
  })

  return (
    <PageShell
      crumbs={[{ label: "Knowledge Base" }]}
      title="Knowledge Base"
      description="Create and manage articles to help your clients self-serve."
      actions={
        <Button size="lg">
          <Plus className="size-4" />
          New Article
        </Button>
      }
    >
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-xl border border-border bg-card/50 p-1">
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
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="min-w-0 w-48 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((article) => (
          <div
            key={article.id}
            className="cursor-pointer rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-secondary/20"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary">
                <BookOpen className="size-4 text-muted-foreground" />
              </div>
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
                  statusStyles[article.status],
                )}
              >
                {article.status}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold leading-snug">{article.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{article.category}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="size-3.5" />
                {article.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {article.updated}
              </span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-muted-foreground">
            No articles found.
          </p>
        )}
      </div>
    </PageShell>
  )
}
