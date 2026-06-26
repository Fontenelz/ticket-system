export type TicketStatus = "New" | "Open" | "Pending" | "Resolved" | "Escalated"
export type TicketCategory =
  | "Billing"
  | "Technical Issue"
  | "Account & Login"
  | "Subscription"
  | "Other"
export type TicketPriority = "Urgent" | "High" | "Medium" | "Low"

export type TimelineEvent = {
  id: string
  type: "created" | "assigned" | "ai" | "status" | "comment"
  title: string
  time: string
}

export type Ticket = {
  id: string
  code: string
  title: string
  category: TicketCategory
  status: TicketStatus
  priority: TicketPriority
  date: string
  customer: {
    name: string
    email: string
    avatar: string
    verified: boolean
  }
  assignee: {
    name: string
    avatar: string
  }
  summary: string
  confidence: number
  resolution: { label: string; done: boolean }[]
  references: { code: string; title: string }[]
  timeline: TimelineEvent[]
}

const avatars = {
  brenda: "/avatar-woman-portrait.png",
  john: "/avatar-man-portrait.png",
  sara: "/avatar-woman-glasses.png",
  mike: "/avatar-man-beard.png",
}

const priorityByIndex: TicketPriority[] = ["Urgent", "High", "Medium", "Low"]

const baseTitles: {
  title: string
  category: TicketCategory
  status: TicketStatus
}[] = [
  { title: "Payment charged twice", category: "Billing", status: "Open" },
  { title: "Unable to reset password", category: "Account & Login", status: "Pending" },
  { title: "App crashes on checkout", category: "Technical Issue", status: "Escalated" },
  { title: "Invoice not downloadable", category: "Billing", status: "Resolved" },
  { title: "Subscription auto-renewed unexpectedly", category: "Subscription", status: "Open" },
  { title: "Email verification link expired", category: "Account & Login", status: "Pending" },
  { title: "Slow loading dashboard", category: "Technical Issue", status: "Open" },
  { title: "Refund request for last month", category: "Billing", status: "Pending" },
  { title: "Cannot change payment method", category: "Subscription", status: "Open" },
  { title: "Error 500 when exporting data", category: "Technical Issue", status: "Escalated" },
  { title: "Subscription auto-renewed unexpectedly", category: "Subscription", status: "Resolved" },
  { title: "App crashes on checkout", category: "Technical Issue", status: "Resolved" },
  { title: "Payment charged twice", category: "Billing", status: "Resolved" },
  { title: "Error 500 when exporting data", category: "Technical Issue", status: "Resolved" },
  { title: "Subscription auto-renewed unexpectedly", category: "Subscription", status: "Resolved" },
  { title: "Refund request for last month", category: "Billing", status: "Resolved" },
  { title: "Slow loading dashboard", category: "Technical Issue", status: "Resolved" },
  { title: "Cannot change payment method", category: "Subscription", status: "Resolved" },
]

const customers = [
  { name: "Brenda Kim", email: "brendakim@gmail.com", avatar: avatars.brenda, verified: true },
  { name: "Lucas Reis", email: "lucas.reis@outlook.com", avatar: avatars.mike, verified: false },
  { name: "Sara Lopes", email: "sara.lopes@gmail.com", avatar: avatars.sara, verified: true },
]

const assignees = [
  { name: "John Doe", avatar: avatars.john },
  { name: "Mike Ross", avatar: avatars.mike },
  { name: "Sara Lima", avatar: avatars.sara },
]

export const tickets: Ticket[] = baseTitles.map((base, i) => {
  const num = 981 + i
  const customer = customers[i % customers.length]
  const assignee = assignees[i % assignees.length]
  return {
    id: `t-${num}`,
    code: `AV-${num}`,
    title: base.title,
    category: base.category,
    status: base.status,
    priority: priorityByIndex[i % priorityByIndex.length],
    date: `Jun ${((i % 27) + 1).toString().padStart(2, "0")}, 2026`,
    customer,
    assignee,
    summary:
      base.category === "Billing"
        ? "Customer was charged twice for the same transaction on their credit card."
        : "Customer reported an issue that requires investigation and a follow-up response.",
    confidence: 78 + ((i * 3) % 20),
    resolution: [
      { label: "Verify the duplicate transaction in system.", done: true },
      { label: "Check if both charges were processed successfully.", done: false },
      { label: "Initiate refund for the duplicate charge.", done: false },
      { label: "Send confirmation email with refund timeline.", done: false },
    ],
    references: [
      { code: "KB-3041", title: "Duplicate Payment Handling" },
      { code: "KB-1872", title: "Refund Process" },
    ],
    timeline: [
      { id: "e1", type: "assigned", title: `Assigned to ${assignee.name}`, time: "Today, 10:45 AM" },
      { id: "e2", type: "ai", title: "AI generated summary and resolution", time: "Today, 10:32 AM" },
      { id: "e3", type: "created", title: `Ticket created by ${customer.name}`, time: "Today, 10:30 AM" },
    ],
  }
})

export const views: { label: string; status: TicketStatus | "All"; count: number }[] = [
  { label: "All Tickets", status: "All", count: 1036 },
  { label: "New", status: "New", count: 52 },
  { label: "Open", status: "Open", count: 291 },
  { label: "Pending", status: "Pending", count: 89 },
  { label: "Resolved", status: "Resolved", count: 526 },
  { label: "Escalated", status: "Escalated", count: 78 },
]

export const categories: TicketCategory[] = [
  "Billing",
  "Technical Issue",
  "Account & Login",
  "Subscription",
  "Other",
]

export const priorities: TicketPriority[] = ["Urgent", "High", "Medium", "Low"]
