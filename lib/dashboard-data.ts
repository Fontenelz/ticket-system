export type Trend = "up" | "down"

export type Metric = {
  label: string
  value: string
  delta: string
  trend: Trend
  spark: { x: number; y: number }[]
}

export const metrics: Metric[] = [
  {
    label: "Current Tickets",
    value: "3,484",
    delta: "+7.1%",
    trend: "up",
    spark: [
      { x: 1, y: 30 },
      { x: 2, y: 42 },
      { x: 3, y: 35 },
      { x: 4, y: 50 },
      { x: 5, y: 40 },
      { x: 6, y: 62 },
      { x: 7, y: 48 },
      { x: 8, y: 70 },
    ],
  },
  {
    label: "Daily Avg. Resolution",
    value: "486",
    delta: "+2%",
    trend: "up",
    spark: [
      { x: 1, y: 28 },
      { x: 2, y: 35 },
      { x: 3, y: 30 },
      { x: 4, y: 45 },
      { x: 5, y: 38 },
      { x: 6, y: 52 },
      { x: 7, y: 47 },
      { x: 8, y: 60 },
    ],
  },
  {
    label: "SLA Compliance Rate",
    value: "92%",
    delta: "-1.3%",
    trend: "down",
    spark: [
      { x: 1, y: 55 },
      { x: 2, y: 40 },
      { x: 3, y: 62 },
      { x: 4, y: 45 },
      { x: 5, y: 58 },
      { x: 6, y: 38 },
      { x: 7, y: 52 },
      { x: 8, y: 35 },
    ],
  },
]

export const volumeTrend = [
  { month: "Jan", value: 2840 },
  { month: "Feb", value: 3120 },
  { month: "Mar", value: 3450 },
  { month: "Apr", value: 2980 },
  { month: "May", value: 3670 },
  { month: "Jun", value: 3200 },
  { month: "Jul", value: 2950 },
  { month: "Aug", value: 3840 },
  { month: "Sep", value: 4100 },
  { month: "Oct", value: 3750 },
  { month: "Nov", value: 4280 },
  { month: "Dec", value: 3890 },
]

export type Activity = {
  id: string
  type: "ticket" | "client" | "agent" | "breach" | "kb" | "feedback"
  title: string
  time: string
  description: string
  highlight?: string
}

export const activities: Activity[] = [
  {
    id: "1",
    type: "ticket",
    title: "Ticket Updated",
    time: "11:20 AM",
    description: "Ticket #2319 SLA updated",
  },
  {
    id: "2",
    type: "client",
    title: "New Client Added",
    time: "11:15 AM",
    description: "PT. Alpha Indonesia registered",
  },
  {
    id: "3",
    type: "agent",
    title: "Agent Reassigned",
    time: "11:00 AM",
    description: "Ticket #2322 moved to Michael Wong",
    highlight: "Michael Wong",
  },
  {
    id: "4",
    type: "breach",
    title: "SLA Breach Risk",
    time: "10:45 AM",
    description: 'Ticket #2320 "Login issue"',
  },
  {
    id: "5",
    type: "kb",
    title: "Knowledge Base",
    time: "10:30 AM",
    description: 'New article published: "Login Troubleshooting"',
  },
  {
    id: "6",
    type: "feedback",
    title: "Customer Feedback",
    time: "10:30 AM",
    description: '"Great support response, thanks Sarah!"',
  },
]

export type SlaPriority = "High" | "Medium" | "Low"
export type SlaStatus = "In Review" | "Delivered" | "In Progress"

export type SlaRow = {
  id: string
  subject: string
  priority: SlaPriority
  assignee: { name: string; avatar: string }
  status: SlaStatus
  createdDate: string
  slaDue: string
}

export const slaRows: SlaRow[] = [
  {
    id: "#2319",
    subject: "Payment failed on invoice",
    priority: "High",
    assignee: { name: "John Doe", avatar: "/avatar-john.png" },
    status: "In Review",
    createdDate: "2025-08-18",
    slaDue: "2h left",
  },
  {
    id: "#2320",
    subject: "Login issue",
    priority: "Medium",
    assignee: { name: "Sarah Lee", avatar: "/avatar-sarah.png" },
    status: "Delivered",
    createdDate: "2025-08-19",
    slaDue: "1h left",
  },
  {
    id: "#2321",
    subject: "Feature request export",
    priority: "Low",
    assignee: { name: "John Doe", avatar: "/avatar-john.png" },
    status: "In Progress",
    createdDate: "2025-08-19",
    slaDue: "1d left",
  },
  {
    id: "#2322",
    subject: "Contract renewal issue",
    priority: "Medium",
    assignee: { name: "Michael Wong", avatar: "/avatar-michael.png" },
    status: "In Progress",
    createdDate: "2025-08-20",
    slaDue: "9h left",
  },
]
