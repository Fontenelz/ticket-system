export type TicketStatus = "Resolved" | "Open" | "In Progress" | "Failed"
export type TicketPriority = "Critical" | "High" | "Medium" | "Low"
export type TicketCategory =
  | "Security"
  | "Frontend"
  | "Backend"
  | "Database"
  | "Devops"

export interface Ticket {
  id: string
  ticketId: string
  subject: string
  assignee: {
    name: string
    avatar: string
  }
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  description: string
  createdAt: string
  updatedAt: string
}

const assignee = {
  name: "Olivia Rhye",
  avatar: "/avatar-olivia.png",
}

export const tickets: Ticket[] = [
  {
    id: "1",
    ticketId: "TRG-001",
    subject: "Critical Authentication Vulnerability",
    assignee,
    category: "Security",
    priority: "Critical",
    status: "Resolved",
    description:
      "A critical vulnerability was found in the authentication flow allowing session tokens to be reused after logout. Patched by rotating tokens on every sign-out event.",
    createdAt: "Jan 12, 2025",
    updatedAt: "Jan 14, 2025",
  },
  {
    id: "2",
    ticketId: "TRG-002",
    subject: "Search Functionality Broken",
    assignee,
    category: "Frontend",
    priority: "Critical",
    status: "Failed",
    description:
      "Global search returns empty results for valid queries. The debounce handler is throwing an unhandled exception on special characters.",
    createdAt: "Jan 11, 2025",
    updatedAt: "Jan 13, 2025",
  },
  {
    id: "3",
    ticketId: "TRG-003",
    subject: "Dashboard Loading Performance",
    assignee,
    category: "Frontend",
    priority: "High",
    status: "Open",
    description:
      "The dashboard takes over 6 seconds to load on first paint. Investigating bundle size and unnecessary re-renders on the widgets grid.",
    createdAt: "Jan 10, 2025",
    updatedAt: "Jan 12, 2025",
  },
  {
    id: "4",
    ticketId: "TRG-004",
    subject: "API Rate Limiting Issues",
    assignee,
    category: "Backend",
    priority: "Medium",
    status: "In Progress",
    description:
      "Clients are intermittently hitting rate limits even under normal usage. Reviewing the sliding window implementation in the gateway.",
    createdAt: "Jan 9, 2025",
    updatedAt: "Jan 11, 2025",
  },
  {
    id: "5",
    ticketId: "TRG-005",
    subject: "Mobile Responsive Layout Bug",
    assignee,
    category: "Frontend",
    priority: "Low",
    status: "Failed",
    description:
      "The settings page overflows horizontally on viewports below 360px. Caused by a fixed-width table that does not collapse.",
    createdAt: "Jan 8, 2025",
    updatedAt: "Jan 10, 2025",
  },
  {
    id: "6",
    ticketId: "TRG-006",
    subject: "Database Connection Pool Exhaustion",
    assignee,
    category: "Devops",
    priority: "Critical",
    status: "Resolved",
    description:
      "Connection pool was exhausted during peak traffic. Increased pool size and added connection reaping for idle sessions.",
    createdAt: "Jan 7, 2025",
    updatedAt: "Jan 9, 2025",
  },
  {
    id: "7",
    ticketId: "TRG-007",
    subject: "Email Notification Delays",
    assignee,
    category: "Backend",
    priority: "Low",
    status: "In Progress",
    description:
      "Transactional emails are delayed by up to 20 minutes. The queue worker is backing up due to a slow third-party provider.",
    createdAt: "Jan 6, 2025",
    updatedAt: "Jan 8, 2025",
  },
  {
    id: "8",
    ticketId: "TRG-008",
    subject: "SSL Certificate Expiry Alert",
    assignee,
    category: "Devops",
    priority: "Medium",
    status: "Resolved",
    description:
      "SSL certificate for the marketing subdomain is expiring in 7 days. Automated renewal via the ACME client.",
    createdAt: "Jan 5, 2025",
    updatedAt: "Jan 7, 2025",
  },
  {
    id: "9",
    ticketId: "TRG-009",
    subject: "Form Validation Error Messages",
    assignee,
    category: "Frontend",
    priority: "Critical",
    status: "Resolved",
    description:
      "Validation messages are not announced to screen readers. Added aria-live regions and associated error text with inputs.",
    createdAt: "Jan 4, 2025",
    updatedAt: "Jan 6, 2025",
  },
  {
    id: "10",
    ticketId: "TRG-010",
    subject: "Memory Leak in Background Jobs",
    assignee,
    category: "Backend",
    priority: "Medium",
    status: "In Progress",
    description:
      "Worker processes grow unbounded over 24 hours. Tracing retained references in the scheduled report generator.",
    createdAt: "Jan 3, 2025",
    updatedAt: "Jan 5, 2025",
  },
  {
    id: "11",
    ticketId: "TRG-011",
    subject: "Critical Authentication Vulnerability",
    assignee,
    category: "Database",
    priority: "High",
    status: "Resolved",
    description:
      "Follow-up hardening on the auth service to enforce short-lived refresh tokens and device binding.",
    createdAt: "Jan 2, 2025",
    updatedAt: "Jan 4, 2025",
  },
  {
    id: "12",
    ticketId: "TRG-012",
    subject: "Dashboard Loading Performance",
    assignee,
    category: "Frontend",
    priority: "High",
    status: "Open",
    description:
      "Second pass on dashboard performance focused on lazy loading charts and memoizing expensive selectors.",
    createdAt: "Jan 1, 2025",
    updatedAt: "Jan 3, 2025",
  },
  {
    id: "13",
    ticketId: "TRG-013",
    subject: "API Rate Limiting Issues",
    assignee,
    category: "Backend",
    priority: "Low",
    status: "Resolved",
    description:
      "Added per-key burst allowances and clearer 429 responses with Retry-After headers.",
    createdAt: "Dec 30, 2024",
    updatedAt: "Jan 1, 2025",
  },
  {
    id: "14",
    ticketId: "TRG-014",
    subject: "Mobile Responsive Layout Bug",
    assignee,
    category: "Database",
    priority: "Medium",
    status: "In Progress",
    description:
      "Navigation drawer overlaps content on tablet breakpoints. Reworking the z-index stacking context.",
    createdAt: "Dec 29, 2024",
    updatedAt: "Dec 31, 2024",
  },
  {
    id: "15",
    ticketId: "TRG-015",
    subject: "Critical Authentication Vulnerability",
    assignee,
    category: "Database",
    priority: "Critical",
    status: "Open",
    description:
      "Reported CSRF gap on a legacy endpoint. Adding same-site cookie enforcement and origin checks.",
    createdAt: "Dec 28, 2024",
    updatedAt: "Dec 30, 2024",
  },
  {
    id: "16",
    ticketId: "TRG-016",
    subject: "Database Connection Pool Exhaustion",
    assignee,
    category: "Database",
    priority: "Low",
    status: "Resolved",
    description:
      "Added monitoring dashboards and alerts for connection saturation to prevent recurrence.",
    createdAt: "Dec 27, 2024",
    updatedAt: "Dec 29, 2024",
  },
]

export const categories: TicketCategory[] = [
  "Security",
  "Frontend",
  "Backend",
  "Database",
  "Devops",
]
export const priorities: TicketPriority[] = ["Critical", "High", "Medium", "Low"]
export const statuses: TicketStatus[] = [
  "Resolved",
  "Open",
  "In Progress",
  "Failed",
]
