"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import {
  LayoutDashboard,
  Component,
  Users,
  FileText,
  Settings,
  HelpCircle,
  BarChart2,
  Sun,
  Moon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const mainNav = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Components", href: "/components", icon: Component },
  { title: "Reports", href: "#", icon: FileText },
  { title: "Analytics", href: "/analytics", icon: BarChart2 },
  { title: "Users", href: "#", icon: Users },
]

const accountNav = [
  { title: "Help", href: "#", icon: HelpCircle },
  { title: "Settings", href: "#", icon: Settings },
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="hover:bg-accent hover:text-accent-foreground group flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 h-auto font-normal justify-start"
    >
      {isDark ? (
        <Sun className="text-muted-foreground shrink-0" size={20} />
      ) : (
        <Moon className="text-muted-foreground shrink-0" size={20} />
      )}
      <p className="hidden text-sm font-medium xl:block">
        {isDark ? "Light mode" : "Dark mode"}
      </p>
    </Button>
  )
}

export function DashboardNav() {
  const path = usePathname()

  return (
    <div className="flex h-full flex-col px-2">
      {/* Logo */}
      <Link href="/" className="my-10 flex px-4">
        <span className="hidden xl:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="pi-app" className="h-5 w-auto dark:invert" />
        </span>
        <span className="block xl:hidden">
          <span className="text-base font-bold text-[#3355FF]">π</span>
        </span>
      </Link>

      <span className="flex grow flex-col items-start justify-between">
        {/* Main nav */}
        <section className="w-full">
          <p className="text-muted-foreground mb-4 hidden px-4 text-sm font-semibold xl:block">
            Home
          </p>
          <nav className="grid items-start gap-1">
            {mainNav.map(({ title, href, icon: Icon }) => (
              <Link key={title} href={href} className="w-full">
                <span
                  className={cn(
                    "hover:bg-accent hover:text-accent-foreground group flex w-full items-center gap-2 rounded-md px-4 py-2",
                    path === href ? "bg-card" : "transparent"
                  )}
                >
                  <Icon className="text-muted-foreground shrink-0" size={20} />
                  <p className="hidden text-sm font-medium xl:block">{title}</p>
                </span>
              </Link>
            ))}
          </nav>
        </section>

        {/* Account nav */}
        <section className="w-full">
          <p className="text-muted-foreground mb-4 hidden px-4 text-sm font-semibold xl:block">
            Account
          </p>
          <nav className="mb-4 grid items-start gap-1">
            {accountNav.map(({ title, href, icon: Icon }) => (
              <Link key={title} href={href} className="w-full">
                <span
                  className={cn(
                    "hover:bg-accent hover:text-accent-foreground group flex w-full items-center gap-2 rounded-md px-4 py-2",
                    path === href ? "bg-card" : "transparent"
                  )}
                >
                  <Icon className="text-muted-foreground shrink-0" size={20} />
                  <p className="hidden text-sm font-medium xl:block">{title}</p>
                </span>
              </Link>
            ))}

            {/* Theme toggle */}
            <ThemeToggle />

            {/* User */}
            <span className="hover:bg-accent hover:text-accent-foreground group flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2">
              <div
                className="size-5 shrink-0 overflow-hidden rounded-full"
                style={{ background: "linear-gradient(144.06deg, #00d1ff 5.25%, #0065fd 93.7%)" }}
              />
              <p className="hidden text-sm font-medium xl:block">Admin</p>
            </span>
          </nav>

          <div className="text-muted-foreground mb-6 hidden flex-col gap-1 px-4 xl:flex">
            <Separator className="mb-3" />
            <span className="flex items-center gap-1.5">
              <p className="text-xs">Powered by </p>
              <span className="text-xs font-semibold">Pi Labs</span>
            </span>
          </div>
        </section>
      </span>
    </div>
  )
}
