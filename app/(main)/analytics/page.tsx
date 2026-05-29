"use client"

import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
  ResponsiveContainer,
} from "recharts"

const C = {
  blue: "#378ADD", teal: "#1D9E75", purple: "#7F77DD",
  coral: "#D85A30", amber: "#EF9F27", green: "#639922",
}

const retentionData = [
  { week: "W1", new: 320, returning: 980, churned: 45 },
  { week: "W2", new: 410, returning: 1020, churned: 38 },
  { week: "W3", new: 380, returning: 1100, churned: 52 },
  { week: "W4", new: 490, returning: 1180, churned: 31 },
  { week: "W5", new: 520, returning: 1240, churned: 28 },
  { week: "W6", new: 460, returning: 1310, churned: 42 },
  { week: "W7", new: 580, returning: 1390, churned: 22 },
  { week: "W8", new: 610, returning: 1450, churned: 19 },
]

const sessionData = [
  { hour: "00", sessions: 120 }, { hour: "02", sessions: 80 },
  { hour: "04", sessions: 60 }, { hour: "06", sessions: 140 },
  { hour: "08", sessions: 520 }, { hour: "10", sessions: 890 },
  { hour: "12", sessions: 1020 }, { hour: "14", sessions: 980 },
  { hour: "16", sessions: 1140 }, { hour: "18", sessions: 870 },
  { hour: "20", sessions: 640 }, { hour: "22", sessions: 310 },
]

const deviceData = [
  { name: "Mobile", value: 54, color: C.blue },
  { name: "Desktop", value: 33, color: C.purple },
  { name: "Tablet", value: 13, color: C.amber },
]

const engagementData = [
  { day: "Mon", pageviews: 12400, bounceRate: 38 },
  { day: "Tue", pageviews: 14100, bounceRate: 35 },
  { day: "Wed", pageviews: 16800, bounceRate: 32 },
  { day: "Thu", pageviews: 15200, bounceRate: 33 },
  { day: "Fri", pageviews: 18900, bounceRate: 29 },
  { day: "Sat", pageviews: 9800,  bounceRate: 44 },
  { day: "Sun", pageviews: 8200,  bounceRate: 47 },
]

const scatterData = [
  { sessions: 12, revenue: 340, size: 8 },  { sessions: 34, revenue: 820, size: 12 },
  { sessions: 56, revenue: 1200, size: 18 }, { sessions: 21, revenue: 560, size: 10 },
  { sessions: 78, revenue: 1900, size: 24 }, { sessions: 43, revenue: 1050, size: 14 },
  { sessions: 65, revenue: 1540, size: 20 }, { sessions: 29, revenue: 710, size: 11 },
  { sessions: 91, revenue: 2200, size: 28 }, { sessions: 48, revenue: 1120, size: 15 },
]

const geographyData = [
  { country: "USA",       users: 8420, revenue: 124000 },
  { country: "UK",        users: 3210, revenue: 48000  },
  { country: "Germany",   users: 2870, revenue: 41000  },
  { country: "Canada",    users: 2140, revenue: 32000  },
  { country: "France",    users: 1960, revenue: 28000  },
  { country: "Australia", users: 1540, revenue: 22000  },
  { country: "Japan",     users: 1280, revenue: 19000  },
  { country: "India",     users: 1120, revenue: 14000  },
]

const cohortData = [
  { month: "Jan", m0: 100, m1: 72, m2: 58, m3: 49, m4: 43, m5: 38 },
  { month: "Feb", m0: 100, m1: 68, m2: 54, m3: 46, m4: 41, m5: undefined },
  { month: "Mar", m0: 100, m1: 75, m2: 61, m3: 52, m4: undefined, m5: undefined },
  { month: "Apr", m0: 100, m1: 70, m2: 57, m3: undefined, m4: undefined, m5: undefined },
  { month: "May", m0: 100, m1: 73, m2: undefined, m3: undefined, m4: undefined, m5: undefined },
  { month: "Jun", m0: 100, m1: undefined, m2: undefined, m3: undefined, m4: undefined, m5: undefined },
]

interface TooltipProps { active?: boolean; payload?: { color: string; name: string; value: number }[]; label?: string }
const Tip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-medium text-foreground">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="size-2 rounded-sm" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-medium text-foreground">
            {typeof p.value === "number" && p.value > 999
              ? "$" + (p.value / 1000).toFixed(1) + "K" : p.value}
          </span>
        </div>
      ))}
    </div>
  )
}

const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
    <p className="mb-0.5 text-sm font-semibold text-foreground">{title}</p>
    {subtitle && <p className="mb-4 text-xs text-muted-foreground">{subtitle}</p>}
    {children}
  </div>
)

const Dot = ({ color, label }: { color: string; label: string }) => (
  <span className="mr-3 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
    <span className="size-2 rounded-sm" style={{ background: color }} />
    {label}
  </span>
)

const barColors = [C.blue, C.teal, C.purple, C.amber, C.coral, C.green, C.blue, C.teal]

export default function AnalyticsPage() {
  return (
    <div className="space-y-4 p-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Analytics</h1>
        <p className="text-xs text-muted-foreground mt-0.5">User behaviour, traffic, and engagement metrics</p>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title="User Retention by Week" subtitle="New · Returning · Churned (stacked)">
            <div className="mb-3">
              <Dot color={C.teal} label="Returning" />
              <Dot color={C.blue} label="New" />
              <Dot color={C.coral} label="Churned" />
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={retentionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="returning" name="Returning" stackId="a" fill={C.teal} />
                <Bar dataKey="new" name="New" stackId="a" fill={C.blue} radius={[4,4,0,0]} />
                <Bar dataKey="churned" name="Churned" fill={C.coral} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Device Breakdown" subtitle="Sessions by device type">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={deviceData} cx="50%" cy="50%" outerRadius={70} dataKey="value" paddingAngle={3}
                label={({ value }) => `${value}%`} labelLine={false}>
                {deviceData.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
              </Pie>
              <Tooltip formatter={(v) => String(v) + "%"} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {deviceData.map(d => <Dot key={d.name} color={d.color} label={d.name} />)}
          </div>
        </ChartCard>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Sessions by Hour" subtitle="Average daily distribution">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={sessionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.purple} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={C.purple} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v: string) => v + "h"} />
              <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
              <ReferenceLine y={500} stroke={C.coral} strokeDasharray="4 2" label={{ value: "avg", fontSize: 10, fill: C.coral }} />
              <Tooltip content={<Tip />} />
              <Area type="monotone" dataKey="sessions" name="Sessions" stroke={C.purple} fill="url(#gPurple)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Page Engagement" subtitle="Pageviews vs Bounce Rate">
          <div className="mb-2">
            <Dot color={C.blue} label="Pageviews (K)" />
            <Dot color={C.amber} label="Bounce %" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={engagementData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => (v / 1000).toFixed(0) + "K"} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => v + "%"} domain={[20, 55]} />
              <Tooltip content={<Tip />} />
              <Line yAxisId="left" type="monotone" dataKey="pageviews" name="Pageviews" stroke={C.blue} strokeWidth={2.5} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="bounceRate" name="Bounce %" stroke={C.amber} strokeWidth={2.5} dot={false} strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Sessions vs Revenue" subtitle="Bubble size = engagement score">
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 4, right: 4, left: -20, bottom: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="sessions" name="Sessions" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} label={{ value: "Sessions", position: "insideBottom", offset: -8, fontSize: 10, fill: "var(--color-muted-foreground)" }} />
              <YAxis dataKey="revenue" name="Revenue" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => "$" + (v / 1000).toFixed(0) + "K"} />
              <ZAxis dataKey="size" range={[40, 400]} />
              <Tooltip formatter={(v) => String(v)} />
              <Scatter data={scatterData} fill={C.blue} fillOpacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Countries" subtitle="Users & revenue by geography">
          <div className="mt-1 space-y-3">
            {geographyData.map((d, i) => {
              const pct = Math.round((d.users / geographyData[0].users) * 100)
              return (
                <div key={d.country}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-foreground">{d.country}</span>
                    <span className="text-muted-foreground">{d.users.toLocaleString()} · ${(d.revenue / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: pct + "%", background: barColors[i] }} />
                  </div>
                </div>
              )
            })}
          </div>
        </ChartCard>
      </div>

      {/* Row 4 — Cohort table */}
      <ChartCard title="Cohort Retention" subtitle="% of users still active after N months">
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr>
                <th className="text-left px-3 py-2 text-muted-foreground font-medium border-b border-border">Cohort</th>
                {["M+0","M+1","M+2","M+3","M+4","M+5"].map(m => (
                  <th key={m} className="text-center px-3 py-2 text-muted-foreground font-medium border-b border-border">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohortData.map(row => {
                const vals = [row.m0, row.m1, row.m2, row.m3, row.m4, row.m5]
                return (
                  <tr key={row.month} className="border-b border-border last:border-0">
                    <td className="px-3 py-2 font-medium text-foreground">{row.month} 2025</td>
                    {vals.map((v, i) =>
                      v === undefined
                        ? <td key={i} className="px-3 py-2" />
                        : (
                          <td key={i} className="px-3 py-2 text-center">
                            <span className="inline-block rounded px-2 py-0.5 text-[11px] font-semibold"
                              style={{ background: `${C.blue}${Math.round((v / 100) * 40 + 15).toString(16).padStart(2,"0")}`, color: v > 70 ? C.blue : "var(--color-muted-foreground)" }}>
                              {v}%
                            </span>
                          </td>
                        )
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  )
}
