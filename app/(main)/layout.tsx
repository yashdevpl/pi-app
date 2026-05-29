import { DashboardNav } from "@/components/layout/dashboard-nav"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="grid flex-1 grid-cols-[85px_1fr] overflow-hidden bg-muted xl:grid-cols-[240px_1fr] xl:gap-2">
        <aside className="sticky left-0 top-0 m-2 max-h-screen w-max overflow-y-auto xl:w-[240px]">
          <DashboardNav />
        </aside>
        <main className="bg-card my-auto mr-2 flex h-[98vh] flex-1 flex-col overflow-auto rounded-2xl border border-border shadow xl:mx-2">
          <div className="container w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}
