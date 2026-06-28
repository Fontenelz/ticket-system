"use client"

import { useState } from "react"
import { Plug, CheckCircle2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageShell } from "@/components/page-shell"
import { cn } from "@/lib/utils"

const tabs = ["All", "Connected", "Available"] as const
type Tab = (typeof tabs)[number]

const integrations = [
  { id: "1", name: "Slack", description: "Send ticket notifications to Slack channels.", category: "Communication", connected: true, icon: "💬" },
  { id: "2", name: "GitHub", description: "Link tickets to GitHub issues and PRs.", category: "Development", connected: true, icon: "🐙" },
  { id: "3", name: "Jira", description: "Sync tickets with Jira projects.", category: "Project Management", connected: false, icon: "📋" },
  { id: "4", name: "PagerDuty", description: "Escalate critical tickets to on-call engineers.", category: "Alerting", connected: false, icon: "🚨" },
  { id: "5", name: "Zendesk", description: "Import legacy tickets from Zendesk.", category: "Support", connected: false, icon: "🎧" },
  { id: "6", name: "Datadog", description: "Link incidents from Datadog monitors.", category: "Monitoring", connected: true, icon: "🐶" },
]

export function IntegrationsView() {
  const [activeTab, setActiveTab] = useState<Tab>("All")

  const filtered = integrations.filter((i) => {
    if (activeTab === "Connected") return i.connected
    if (activeTab === "Available") return !i.connected
    return true
  })

  return (
    <PageShell
      crumbs={[{ label: "Integrations" }]}
      title="Integrations"
      description="Connect Kravio with your existing tools and workflows."
    >
      <div className="mt-6">
        <div className="flex items-center gap-1 rounded-xl border border-border bg-card/50 p-1 w-fit">
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
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((integration) => (
          <div
            key={integration.id}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-secondary text-xl">
                  {integration.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold">{integration.name}</p>
                  <p className="text-xs text-muted-foreground">{integration.category}</p>
                </div>
              </div>
              {integration.connected && (
                <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{integration.description}</p>
            <div className="mt-auto flex items-center gap-2">
              {integration.connected ? (
                <Button variant="outline" size="sm" className="flex-1">
                  Configure
                </Button>
              ) : (
                <Button size="sm" className="flex-1">
                  <Plug className="size-3.5" />
                  Connect
                </Button>
              )}
              <Button variant="ghost" size="icon-sm">
                <ExternalLink className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
