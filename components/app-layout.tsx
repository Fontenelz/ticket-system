import { KravioSidebar } from "@/components/kravio-sidebar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-svh overflow-hidden bg-background">
      <KravioSidebar />
      <main className="min-w-0 flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
