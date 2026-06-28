import { Bell, LayoutGrid, Settings } from "lucide-react"
import Link from "next/link"

interface Crumb {
  label: string
  href?: string
}

interface PageShellProps {
  crumbs: Crumb[]
  title: string
  description?: string
  actions?: React.ReactNode
  children?: React.ReactNode
}

export function PageShell({ crumbs, title, description, actions, children }: PageShellProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-border px-6 py-3.5">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
          <LayoutGrid className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground">Overview</span>
          {crumbs.map((crumb, i) => (
            <span key={i} className="contents">
              <span className="text-muted-foreground">/</span>
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className={
                    i < crumbs.length - 1
                      ? "text-muted-foreground hover:text-foreground"
                      : "font-medium text-foreground"
                  }
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={
                    i < crumbs.length - 1
                      ? "text-muted-foreground"
                      : "font-medium text-foreground"
                  }
                >
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
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

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-y-auto bg-background px-6 py-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
        {children}
      </div>
    </div>
  )
}
