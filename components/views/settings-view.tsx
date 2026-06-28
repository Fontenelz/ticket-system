"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PageShell } from "@/components/page-shell"
import { cn } from "@/lib/utils"

const tabs = ["General", "Team", "Notifications", "Billing"] as const
type Tab = (typeof tabs)[number]

const fieldClass =
  "w-full rounded-lg border border-border bg-input/30 px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 border-b border-border py-6 first:pt-0 last:border-0 md:grid-cols-3">
      <div className="md:col-span-1">
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{description}</p>}
      </div>
      <div className="flex flex-col gap-4 md:col-span-2">{children}</div>
    </div>
  )
}

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<Tab>("General")

  return (
    <PageShell
      crumbs={[{ label: "Settings" }]}
      title="Settings"
      description="Manage your workspace preferences and account configuration."
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

      <div className="mt-6 max-w-2xl rounded-2xl border border-border bg-card px-6">
        {activeTab === "General" && (
          <>
            <Section title="Workspace" description="Your workspace name and logo appear across the platform.">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Workspace name</label>
                <input defaultValue="Kravio Support" className={fieldClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Support email</label>
                <input defaultValue="support@kravio.io" type="email" className={fieldClass} />
              </div>
            </Section>
            <Section title="Profile" description="Your personal information visible to team members.">
              <div className="flex items-center gap-4">
                <Image
                  src="/avatar-achmad.png"
                  alt="Achmad Hakim"
                  width={56}
                  height={56}
                  className="size-14 rounded-full object-cover"
                />
                <Button variant="outline" size="sm">Change avatar</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">First name</label>
                  <input defaultValue="Achmad" className={fieldClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Last name</label>
                  <input defaultValue="Hakim" className={fieldClass} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Email</label>
                <input defaultValue="achmadhakim@gmail.com" type="email" className={fieldClass} />
              </div>
            </Section>
            <Section title="Timezone">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Timezone</label>
                <select className={fieldClass} defaultValue="Asia/Jakarta">
                  <option value="Asia/Jakarta">Asia/Jakarta (WIB, UTC+7)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                </select>
              </div>
            </Section>
            <div className="flex justify-end gap-2 py-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save changes</Button>
            </div>
          </>
        )}

        {activeTab === "Team" && (
          <Section title="Team Members" description="Manage who has access to this workspace.">
            {[
              { name: "Achmad Hakim", email: "achmadhakim@gmail.com", role: "Admin", avatar: "/avatar-achmad.png" },
              { name: "Michael Wong", email: "michael@kravio.io", role: "Manager", avatar: "/avatar-michael.png" },
              { name: "Olivia Rhye", email: "olivia@kravio.io", role: "Agent", avatar: "/avatar-olivia.png" },
              { name: "Sarah Lee", email: "sarah@kravio.io", role: "Agent", avatar: "/avatar-sarah.png" },
              { name: "John Doe", email: "john@kravio.io", role: "Agent", avatar: "/avatar-john.png" },
            ].map((member) => (
              <div key={member.email} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Image src={member.avatar} alt={member.name} width={36} height={36} className="size-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <select
                  defaultValue={member.role}
                  className="rounded-lg border border-border bg-input/30 px-2 py-1.5 text-xs outline-none focus:border-ring"
                >
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Agent</option>
                </select>
              </div>
            ))}
          </Section>
        )}

        {activeTab === "Notifications" && (
          <>
            {[
              { title: "New ticket assigned", description: "When a ticket is assigned to you." },
              { title: "SLA breach warning", description: "When a ticket is 2 hours from SLA deadline." },
              { title: "Ticket resolved", description: "When one of your tickets is marked resolved." },
              { title: "Customer feedback received", description: "When a CSAT response is submitted." },
              { title: "Weekly summary", description: "A summary of your team's performance every Monday." },
            ].map((setting) => (
              <Section key={setting.title} title={setting.title} description={setting.description}>
                <div className="flex flex-col gap-2">
                  {["Email", "In-app"].map((channel) => (
                    <label key={channel} className="flex items-center gap-3 text-sm">
                      <input type="checkbox" defaultChecked className="rounded border-border" />
                      {channel}
                    </label>
                  ))}
                </div>
              </Section>
            ))}
            <div className="flex justify-end gap-2 py-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save preferences</Button>
            </div>
          </>
        )}

        {activeTab === "Billing" && (
          <Section title="Current Plan" description="You are on the Pro plan.">
            <div className="rounded-xl border border-border bg-secondary/40 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Pro Plan</p>
                  <p className="text-xs text-muted-foreground">Up to 10 agents · Unlimited tickets</p>
                </div>
                <p className="text-xl font-semibold">$49<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">View invoices</Button>
              <Button variant="outline">Upgrade plan</Button>
            </div>
          </Section>
        )}
      </div>
    </PageShell>
  )
}
