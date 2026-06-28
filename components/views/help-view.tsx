"use client"

import { useState } from "react"
import { Search, ChevronDown, LifeBuoy, BookOpen, MessageSquare, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageShell } from "@/components/page-shell"
import { cn } from "@/lib/utils"

const tabs = ["FAQ", "Documentation", "Contact"] as const
type Tab = (typeof tabs)[number]

const faqs = [
  { id: "1", question: "How do I create a new ticket?", answer: "Click the 'New Ticket' button in the top-right corner of the Tickets page. Fill in the subject, category, priority, and description, then click 'Create Ticket'." },
  { id: "2", question: "How are SLA deadlines calculated?", answer: "SLA deadlines are based on ticket priority: Critical = 4h, High = 8h, Medium = 24h, Low = 72h. The clock starts when a ticket is created." },
  { id: "3", question: "Can I reassign a ticket to another agent?", answer: "Yes. Open the ticket detail panel and click 'Edit ticket'. You can then change the assignee from the dropdown." },
  { id: "4", question: "How do I export tickets?", answer: "On the Tickets page, click the 'Export Ticket' button in the header. You can export to CSV or PDF format." },
  { id: "5", question: "What does the SLA Breach Risk view show?", answer: "It shows all open and in-progress tickets that are approaching their SLA deadline, sorted by remaining time." },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium hover:text-muted-foreground"
      >
        {question}
        <ChevronDown
          className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{answer}</p>
      )}
    </div>
  )
}

export function HelpView() {
  const [activeTab, setActiveTab] = useState<Tab>("FAQ")
  const [query, setQuery] = useState("")

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(query.toLowerCase()) ||
      f.answer.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <PageShell
      crumbs={[{ label: "Help & Support" }]}
      title="Help & Support"
      description="Find answers to common questions or reach out to our team."
    >
      <div className="mt-6 flex items-center gap-1 rounded-xl border border-border bg-card/50 p-1 w-fit">
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

      {activeTab === "FAQ" && (
        <div className="mt-6 max-w-2xl">
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQ..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="rounded-2xl border border-border bg-card px-5">
            {filteredFaqs.map((faq) => (
              <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
            {filteredFaqs.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">No results found.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "Documentation" && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-2xl">
          {[
            { icon: BookOpen, title: "Getting Started", desc: "Set up your account and create your first ticket." },
            { icon: LifeBuoy, title: "SLA Management", desc: "Learn how to configure and monitor service levels." },
            { icon: MessageSquare, title: "Integrations Guide", desc: "Connect Kravio with Slack, GitHub, and more." },
            { icon: ExternalLink, title: "API Reference", desc: "Build custom integrations using our REST API." },
          ].map(({ icon: Icon, title, desc }) => (
            <button
              key={title}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:bg-secondary/20"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary">
                <Icon className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {activeTab === "Contact" && (
        <div className="mt-6 max-w-md">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold">Contact Support</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Our team responds within 24 hours on business days.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Subject</label>
                <input className="rounded-lg border border-border bg-input/30 px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30" placeholder="Describe your issue briefly" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Message</label>
                <textarea rows={4} className="resize-none rounded-lg border border-border bg-input/30 px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30" placeholder="Provide as much detail as possible..." />
              </div>
              <Button className="mt-1">Send Message</Button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  )
}
