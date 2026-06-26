"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Home,
  Inbox,
  MessageSquare,
  BarChart3,
  Zap,
  Boxes,
  Folder,
  Puzzle,
  Bell,
  Users,
  Settings,
  LogOut,
  type LucideIcon,
} from "lucide-react"

const navItems: { icon: LucideIcon; href: string; label: string }[] = [
  { icon: Home, href: "/dashboard", label: "Dashboard" },
  { icon: Inbox, href: "/", label: "Tickets" },
  { icon: BarChart3, href: "/analytics", label: "Analytics" },
  { icon: Zap, href: "/automations", label: "Automações" },
  { icon: Boxes, href: "/integrations", label: "Integrações" },
  { icon: Folder, href: "/documents", label: "Documentos" },
  { icon: Puzzle, href: "/extensions", label: "Extensões" },
  { icon: Bell, href: "/notifications", label: "Notificações" },
]

const bottomNavItems: { icon: LucideIcon; href: string; label: string }[] = [
  { icon: Users, href: "/team", label: "Equipe" },
  { icon: Settings, href: "/settings", label: "Configurações" },
]

export function StubPage({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-muted/50 p-0 lg:p-3">
      <div className="flex h-full w-full overflow-hidden rounded-none border-border bg-card lg:rounded-2xl lg:border lg:shadow-sm">
        {/* Icon rail */}
        <nav
          className="hidden w-14 shrink-0 flex-col items-center gap-1 border-r border-border bg-sidebar py-4 lg:flex"
          aria-label="Main"
        >
          <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <MessageSquare className="size-5" />
          </div>

          <div className="flex flex-1 flex-col items-center gap-1">
            {navItems.map(({ icon: Icon, href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  aria-label={label}
                  className={cn(
                    buttonVariants({ variant: active ? "secondary" : "ghost", size: "icon" }),
                    "size-9 rounded-lg text-muted-foreground",
                    active && "text-foreground",
                  )}
                >
                  <Icon className="size-5" />
                </Link>
              )
            })}
          </div>

          <div className="flex flex-col items-center gap-1">
            {bottomNavItems.map(({ icon: Icon, href, label }) => (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-9 rounded-lg text-muted-foreground",
                )}
              >
                <Icon className="size-5" />
              </Link>
            ))}
            <button
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-9 rounded-lg text-muted-foreground",
              )}
              aria-label="Sair"
            >
              <LogOut className="size-5" />
            </button>
          </div>
        </nav>

        {/* Content */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <header className="flex items-center gap-3 border-b border-border px-6 py-4">
            <Link
              href="/"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Tickets
            </Link>
            <span className="text-muted-foreground">/</span>
            <h1 className="font-heading text-base font-semibold">{title}</h1>
          </header>

          <div className="flex flex-1 flex-col items-center justify-center overflow-auto p-8">
            {children ?? (
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
                  <span className="text-3xl">🚧</span>
                </div>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="max-w-sm text-sm text-muted-foreground">
                  {description ?? "Esta seção está em desenvolvimento. Em breve estará disponível."}
                </p>
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "mt-2",
                  )}
                >
                  Voltar para Tickets
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
