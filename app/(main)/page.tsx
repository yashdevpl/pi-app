"use client"

import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  RadialBarChart, RadialBar, PieChart, Pie, Cell,
  ScatterChart, Scatter, ZAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
  ResponsiveContainer, Legend,
} from "recharts";

// ── Chart colors ONLY ─────────────────────────────────────────────────────────
const C = {
  blue: "#378ADD",
  teal: "#1D9E75",
  purple: "#7F77DD",
  coral: "#D85A30",
  amber: "#EF9F27",
  green: "#639922",
};

// ── Mock Data ─────────────────────────────────────────────────────────────────
const revenueData = [
  { month: "Jan", revenue: 42000, expenses: 28000, profit: 14000 },
  { month: "Feb", revenue: 53000, expenses: 31000, profit: 22000 },
  { month: "Mar", revenue: 48000, expenses: 27000, profit: 21000 },
  { month: "Apr", revenue: 61000, expenses: 34000, profit: 27000 },
  { month: "May", revenue: 55000, expenses: 30000, profit: 25000 },
  { month: "Jun", revenue: 67000, expenses: 36000, profit: 31000 },
  { month: "Jul", revenue: 72000, expenses: 38000, profit: 34000 },
  { month: "Aug", revenue: 69000, expenses: 35000, profit: 34000 },
  { month: "Sep", revenue: 78000, expenses: 41000, profit: 37000 },
  { month: "Oct", revenue: 84000, expenses: 44000, profit: 40000 },
  { month: "Nov", revenue: 91000, expenses: 47000, profit: 44000 },
  { month: "Dec", revenue: 98000, expenses: 50000, profit: 48000 },
];

const trafficData = [
  { day: "Mon", organic: 4200, paid: 1800, referral: 900 },
  { day: "Tue", organic: 3800, paid: 2100, referral: 1100 },
  { day: "Wed", organic: 5100, paid: 1600, referral: 800 },
  { day: "Thu", organic: 4700, paid: 2300, referral: 1300 },
  { day: "Fri", organic: 6200, paid: 2800, referral: 1600 },
  { day: "Sat", organic: 3100, paid: 1200, referral: 700 },
  { day: "Sun", organic: 2800, paid: 900, referral: 600 },
];

const pieData = [
  { name: "Direct", value: 35, color: C.blue },
  { name: "Organic", value: 28, color: C.teal },
  { name: "Paid", value: 20, color: C.purple },
  { name: "Social", value: 12, color: C.coral },
  { name: "Referral", value: 5, color: C.amber },
];

const radialData = [
  { name: "Conversion", value: 72, fill: C.blue },
  { name: "Retention", value: 85, fill: C.teal },
  { name: "Engagement", value: 61, fill: C.purple },
  { name: "Satisfaction", value: 93, fill: C.green },
];

const conversionData = [
  { stage: "Visitors", count: 24800 },
  { stage: "Leads", count: 8400 },
  { stage: "Prospects", count: 3200 },
  { stage: "Customers", count: 1100 },
  { stage: "Advocates", count: 420 },
];

const retentionData = [
  { week: "W1", new: 320, returning: 980, churned: 45 },
  { week: "W2", new: 410, returning: 1020, churned: 38 },
  { week: "W3", new: 380, returning: 1100, churned: 52 },
  { week: "W4", new: 490, returning: 1180, churned: 31 },
  { week: "W5", new: 520, returning: 1240, churned: 28 },
  { week: "W6", new: 460, returning: 1310, churned: 42 },
  { week: "W7", new: 580, returning: 1390, churned: 22 },
  { week: "W8", new: 610, returning: 1450, churned: 19 },
];

const sessionData = [
  { hour: "00", sessions: 120 }, { hour: "02", sessions: 80 },
  { hour: "04", sessions: 60 }, { hour: "06", sessions: 140 },
  { hour: "08", sessions: 520 }, { hour: "10", sessions: 890 },
  { hour: "12", sessions: 1020 }, { hour: "14", sessions: 980 },
  { hour: "16", sessions: 1140 }, { hour: "18", sessions: 870 },
  { hour: "20", sessions: 640 }, { hour: "22", sessions: 310 },
];

const deviceData = [
  { name: "Mobile", value: 54, color: C.blue },
  { name: "Desktop", value: 33, color: C.purple },
  { name: "Tablet", value: 13, color: C.amber },
];

const cohortData = [
  { month: "Jan", m0: 100, m1: 72, m2: 58, m3: 49, m4: 43, m5: 38 },
  { month: "Feb", m0: 100, m1: 68, m2: 54, m3: 46, m4: 41 },
  { month: "Mar", m0: 100, m1: 75, m2: 61, m3: 52 },
  { month: "Apr", m0: 100, m1: 70, m2: 57 },
  { month: "May", m0: 100, m1: 73 },
  { month: "Jun", m0: 100 },
];

const scatterData = [
  { sessions: 12, revenue: 340, size: 8 }, { sessions: 34, revenue: 820, size: 12 },
  { sessions: 56, revenue: 1200, size: 18 }, { sessions: 21, revenue: 560, size: 10 },
  { sessions: 78, revenue: 1900, size: 24 }, { sessions: 43, revenue: 1050, size: 14 },
  { sessions: 65, revenue: 1540, size: 20 }, { sessions: 29, revenue: 710, size: 11 },
  { sessions: 91, revenue: 2200, size: 28 }, { sessions: 48, revenue: 1120, size: 15 },
  { sessions: 15, revenue: 420, size: 9 }, { sessions: 37, revenue: 890, size: 13 },
  { sessions: 82, revenue: 1980, size: 26 }, { sessions: 24, revenue: 630, size: 10 },
  { sessions: 60, revenue: 1410, size: 19 },
];

const geographyData = [
  { country: "USA", users: 8420, revenue: 124000 },
  { country: "UK", users: 3210, revenue: 48000 },
  { country: "Germany", users: 2870, revenue: 41000 },
  { country: "Canada", users: 2140, revenue: 32000 },
  { country: "France", users: 1960, revenue: 28000 },
  { country: "Australia", users: 1540, revenue: 22000 },
  { country: "Japan", users: 1280, revenue: 19000 },
  { country: "India", users: 1120, revenue: 14000 },
];

const engagementData = [
  { day: "Mon", pageviews: 12400, bounceRate: 38, avgTime: 3.2 },
  { day: "Tue", pageviews: 14100, bounceRate: 35, avgTime: 3.6 },
  { day: "Wed", pageviews: 16800, bounceRate: 32, avgTime: 4.1 },
  { day: "Thu", pageviews: 15200, bounceRate: 33, avgTime: 3.9 },
  { day: "Fri", pageviews: 18900, bounceRate: 29, avgTime: 4.4 },
  { day: "Sat", pageviews: 9800, bounceRate: 44, avgTime: 2.8 },
  { day: "Sun", pageviews: 8200, bounceRate: 47, avgTime: 2.5 },
];

const kpis = [
  { label: "Total Revenue", value: "$818K", delta: "+12.4%", up: true },
  { label: "Active Users", value: "24,871", delta: "+8.1%", up: true },
  { label: "Conversion Rate", value: "4.43%", delta: "-0.2%", up: false },
  { label: "Avg. Revenue", value: "$32.87", delta: "+3.7%", up: true },
];

// ── Shared Tooltip ────────────────────────────────────────────────────────────
interface TooltipProps { active?: boolean; payload?: { color: string; name: string; value: number }[]; label?: string; }
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--chart-border)",
      borderRadius: 8,
      padding: "10px 14px",
      fontSize: 12,
    }}>
      <p style={{ margin: "0 0 6px", fontWeight: 500, color: "var(--text-primary)" }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: p.color, display: "inline-block" }} />
          <span style={{ color: "var(--text-muted)" }}>{p.name}:</span>
          <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>
            {typeof p.value === "number" && p.value > 999
              ? "$" + (p.value / 1000).toFixed(1) + "K"
              : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// ── Card ──────────────────────────────────────────────────────────────────────
const Card = ({ title, subtitle, children, style = {} }: { title?: string; subtitle?: string; children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: "20px 22px",
    ...style,
  }}>
    {title && (
      <div style={{ marginBottom: 16 }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>{title}</p>
        {subtitle && <p style={{ margin: "3px 0 0", fontSize: 12, color: "var(--text-muted)" }}>{subtitle}</p>}
      </div>
    )}
    {children}
  </div>
);

// ── Legend Dot ────────────────────────────────────────────────────────────────
const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-muted)", marginRight: 12 }}>
    <span style={{ width: 8, height: 8, borderRadius: 2, background: color, display: "inline-block" }} />
    {label}
  </span>
);

// ── CSS Variables injected once ───────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    :root {
      --bg-page:    #f9f9f9;
      --bg-card:    #ffffff;
      --bg-subtle:  #f3f3f3;
      --chart-border: #e8e8e8;
      --text-primary: #111111;
      --text-secondary: #444444;
      --text-muted: #888888;
      --text-faint: #bbbbbb;
      --btn-active-bg: #111111;
      --btn-active-text: #ffffff;
      --btn-idle-bg: #ffffff;
      --btn-idle-text: #555555;
      --delta-up-bg: #f0f7ec;
      --delta-up-text: #3a6b10;
      --delta-down-bg: #fdf0ec;
      --delta-down-text: #8f3a1e;
      --track-bg: #ebebeb;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg-page:    #111111;
        --bg-card:    #1c1c1c;
        --bg-subtle:  #252525;
        --chart-border: #2e2e2e;
        --text-primary: #f0f0f0;
        --text-secondary: #aaaaaa;
        --text-muted: #666666;
        --text-faint: #444444;
        --btn-active-bg: #f0f0f0;
        --btn-active-text: #111111;
        --btn-idle-bg: #1c1c1c;
        --btn-idle-text: #888888;
        --delta-up-bg: #1a2e10;
        --delta-up-text: #7ebd42;
        --delta-down-bg: #2e1a10;
        --delta-down-text: #e07a52;
        --track-bg: #2e2e2e;
      }
    }
    * { box-sizing: border-box; }
    body { margin: 0; }
  `}</style>
);

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <GlobalStyle />
      <div style={{
        minHeight: "100vh",
        background: "var(--bg-page)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "28px 32px",
        color: "var(--text-primary)",
      }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.4px", color: "var(--text-primary)" }}>
              Analytics Dashboard
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--text-muted)" }}>
              May 2026 · All metrics vs last month
            </p>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["overview", "traffic", "funnel", "analytics"].map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                style={{
                  padding: "7px 16px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 500,
                  border: "1px solid var(--border)",
                  background: activeTab === t ? "var(--btn-active-bg)" : "var(--btn-idle-bg)",
                  color: activeTab === t ? "var(--btn-active-text)" : "var(--btn-idle-text)",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "background 0.15s, color 0.15s",
                }}
              >{t}</button>
            ))}
          </div>
        </div>

        {/* ── KPI Row ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
          {kpis.map(k => (
            <div key={k.label} style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "18px 20px",
            }}>
              <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 500, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.6px" }}>
                {k.label}
              </p>
              <p style={{ margin: "0 0 10px", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
                {k.value}
              </p>
              <span style={{
                fontSize: 11,
                fontWeight: 500,
                padding: "3px 8px",
                borderRadius: 20,
                background: k.up ? "var(--delta-up-bg)" : "var(--delta-down-bg)",
                color: k.up ? "var(--delta-up-text)" : "var(--delta-down-text)",
              }}>
                {k.delta} vs last month
              </span>
            </div>
          ))}
        </div>

        {/* ── Overview Tab ── */}
        {activeTab === "overview" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 14 }}>
              <Card title="Revenue Overview" subtitle="Revenue · Expenses · Profit (2025–2026)">
                <div style={{ marginBottom: 10 }}>
                  <LegendDot color={C.blue} label="Revenue" />
                  <LegendDot color={C.coral} label="Expenses" />
                  <LegendDot color={C.teal} label="Profit" />
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.blue} stopOpacity={0.18} />
                        <stop offset="95%" stopColor={C.blue} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gTeal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.teal} stopOpacity={0.18} />
                        <stop offset="95%" stopColor={C.teal} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => "$" + (v / 1000).toFixed(0) + "K"} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="revenue" name="Revenue" stroke={C.blue} fill="url(#gBlue)" strokeWidth={2} dot={false} />
                    <Area type="monotone" dataKey="profit" name="Profit" stroke={C.teal} fill="url(#gTeal)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="expenses" name="Expenses" stroke={C.coral} strokeWidth={2} strokeDasharray="5 3" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card title="Traffic Sources" subtitle="Breakdown by acquisition channel">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={52} outerRadius={78} dataKey="value" paddingAngle={3}>
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                    </Pie>
                    <Tooltip formatter={(v) => String(v) + "%"} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 0", marginTop: 6 }}>
                  {pieData.map(d => (
                    <span key={d.name} style={{ width: "50%", display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-secondary)" }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                      {d.name}
                      <strong style={{ color: "var(--text-primary)", marginLeft: "auto", paddingRight: 8 }}>{d.value}%</strong>
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 14 }}>
              <Card title="Performance Metrics" subtitle="Goal attainment (%)">
                <ResponsiveContainer width="100%" height={220}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius={20} outerRadius={90} data={radialData} startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={4} background={{ fill: "var(--track-bg)" }} />
                    <Tooltip formatter={v => v + "%"} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px 0", marginTop: 4 }}>
                  {radialData.map(d => (
                    <span key={d.name} style={{ width: "50%", display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-secondary)" }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: d.fill, flexShrink: 0 }} />
                      {d.name}
                      <strong style={{ color: "var(--text-primary)", marginLeft: "auto", paddingRight: 8 }}>{d.value}%</strong>
                    </span>
                  ))}
                </div>
              </Card>

              <Card title="Monthly Breakdown" subtitle="Revenue vs Expenses per month">
                <div style={{ marginBottom: 10 }}>
                  <LegendDot color={C.blue} label="Revenue" />
                  <LegendDot color={C.amber} label="Expenses" />
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={3}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-border)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => "$" + (v / 1000).toFixed(0) + "K"} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="revenue" name="Revenue" fill={C.blue} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" name="Expenses" fill={C.amber} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </>
        )}

        {/* ── Traffic Tab ── */}
        {activeTab === "traffic" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Card title="Weekly Traffic by Channel" subtitle="Organic · Paid · Referral" style={{ gridColumn: "1 / -1" }}>
              <div style={{ marginBottom: 10 }}>
                <LegendDot color={C.teal} label="Organic" />
                <LegendDot color={C.purple} label="Paid" />
                <LegendDot color={C.amber} label="Referral" />
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={trafficData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-border)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => (v / 1000).toFixed(1) + "K"} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="organic" name="Organic" fill={C.teal} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="paid" name="Paid" fill={C.purple} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="referral" name="Referral" fill={C.amber} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Organic vs Paid Trend" subtitle="7-day comparison">
              <div style={{ marginBottom: 10 }}>
                <LegendDot color={C.teal} label="Organic" />
                <LegendDot color={C.purple} label="Paid" />
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trafficData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-border)" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="organic" name="Organic" stroke={C.teal} strokeWidth={2.5} dot={{ r: 4, fill: C.teal }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="paid" name="Paid" stroke={C.purple} strokeWidth={2.5} dot={{ r: 4, fill: C.purple }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Traffic Source Share" subtitle="This week">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={[
                    { name: "Organic", value: 52, color: C.teal },
                    { name: "Paid", value: 30, color: C.purple },
                    { name: "Referral", value: 18, color: C.amber },
                  ]} cx="50%" cy="50%" outerRadius={85} dataKey="value" paddingAngle={2}>
                    {[C.teal, C.purple, C.amber].map((c, i) => <Cell key={i} fill={c} stroke="none" />)}
                  </Pie>
                  <Tooltip formatter={v => v + "%"} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 6 }}>
                {[["Organic", "52%", C.teal], ["Paid", "30%", C.purple], ["Referral", "18%", C.amber]].map(([l, v, c]) => (
                  <span key={l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-secondary)" }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
                    {l} <strong style={{ color: "var(--text-primary)" }}>{v}</strong>
                  </span>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ── Funnel Tab ── */}
        {activeTab === "funnel" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Card title="Conversion Funnel" subtitle="Pipeline from visitor to advocate">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={conversionData} layout="vertical" margin={{ top: 4, right: 20, left: 60, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-border)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => (v / 1000).toFixed(0) + "K"} />
                  <YAxis type="category" dataKey="stage" tick={{ fontSize: 12, fill: "var(--text-secondary)", fontWeight: 500 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Count" radius={[0, 4, 4, 0]}>
                    {conversionData.map((_, i) => (
                      <Cell key={i} fill={[C.blue, C.teal, C.purple, C.amber, C.coral][i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Stage Drop-off Rates" subtitle="% lost between each stage">
              {conversionData.slice(0, -1).map((d, i) => {
                const next = conversionData[i + 1];
                const pct = Math.round((1 - next.count / d.count) * 100);
                const colors = [C.blue, C.teal, C.purple, C.amber];
                return (
                  <div key={d.stage} style={{ marginBottom: 18 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                      <span style={{ color: "var(--text-secondary)" }}>{d.stage} → {next.stage}</span>
                      <span style={{ fontWeight: 600, color: colors[i] }}>{pct}% drop</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 4, background: "var(--track-bg)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: (100 - pct) + "%", background: colors[i], borderRadius: 4, transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                );
              })}
            </Card>

            <Card title="Monthly Conversion Rate" subtitle="% of visitors who purchased" style={{ gridColumn: "1 / -1" }}>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={revenueData.map((d, i) => ({ ...d, rate: [3.8, 4.1, 3.6, 4.4, 4.2, 4.7, 4.3, 4.9, 4.6, 5.1, 4.8, 5.3][i] }))}
                  margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => v + "%"} domain={[3, 6]} />
                  <Tooltip formatter={v => v + "%"} />
                  <Line type="monotone" dataKey="rate" name="Conv. Rate" stroke={C.purple} strokeWidth={2.5} dot={{ r: 4, fill: C.purple }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {/* ── Analytics Tab ── */}
        {activeTab === "analytics" && (
          <>
            {/* Row 1: User Retention + Session Heatmap */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 14 }}>
              <Card title="User Retention by Week" subtitle="New · Returning · Churned">
                <div style={{ marginBottom: 10 }}>
                  <LegendDot color={C.teal} label="Returning" />
                  <LegendDot color={C.blue} label="New" />
                  <LegendDot color={C.coral} label="Churned" />
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={retentionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-border)" vertical={false} />
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="returning" name="Returning" stackId="a" fill={C.teal} radius={[0,0,0,0]} />
                    <Bar dataKey="new" name="New" stackId="a" fill={C.blue} radius={[4,4,0,0]} />
                    <Bar dataKey="churned" name="Churned" fill={C.coral} radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card title="Device Breakdown" subtitle="Sessions by device type">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={deviceData} cx="50%" cy="50%" outerRadius={75} dataKey="value" paddingAngle={3} label={({ name, value }) => `${value}%`} labelLine={false}>
                      {deviceData.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                    </Pie>
                    <Tooltip formatter={(v) => String(v) + "%"} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 8 }}>
                  {deviceData.map(d => <LegendDot key={d.name} color={d.color} label={d.name} />)}
                </div>
              </Card>
            </div>

            {/* Row 2: Sessions by Hour + Engagement */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <Card title="Sessions by Hour" subtitle="Average daily distribution">
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={sessionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gPurple" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.purple} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={C.purple} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-border)" />
                    <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v: string) => v + "h"} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                    <ReferenceLine y={500} stroke={C.coral} strokeDasharray="4 2" label={{ value: "avg", fontSize: 10, fill: C.coral }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="sessions" name="Sessions" stroke={C.purple} fill="url(#gPurple)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card title="Page Engagement" subtitle="Pageviews · Bounce Rate · Avg. Time">
                <div style={{ marginBottom: 10 }}>
                  <LegendDot color={C.blue} label="Pageviews (K)" />
                  <LegendDot color={C.amber} label="Bounce %" />
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={engagementData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-border)" />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => (v / 1000).toFixed(0) + "K"} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => v + "%"} domain={[20, 55]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line yAxisId="left" type="monotone" dataKey="pageviews" name="Pageviews" stroke={C.blue} strokeWidth={2.5} dot={false} />
                    <Line yAxisId="right" type="monotone" dataKey="bounceRate" name="Bounce %" stroke={C.amber} strokeWidth={2.5} dot={false} strokeDasharray="5 3" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Row 3: Scatter + Geography */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <Card title="Sessions vs Revenue" subtitle="Bubble size = engagement score">
                <ResponsiveContainer width="100%" height={240}>
                  <ScatterChart margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-border)" />
                    <XAxis dataKey="sessions" name="Sessions" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} label={{ value: "Sessions", position: "insideBottom", offset: -2, fontSize: 10, fill: "var(--text-muted)" }} />
                    <YAxis dataKey="revenue" name="Revenue" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => "$" + (v / 1000).toFixed(0) + "K"} />
                    <ZAxis dataKey="size" range={[40, 400]} />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(v) => String(v)} />
                    <Scatter data={scatterData} fill={C.blue} fillOpacity={0.7} />
                  </ScatterChart>
                </ResponsiveContainer>
              </Card>

              <Card title="Top Countries" subtitle="Users & revenue by geography">
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
                  {geographyData.map((d, i) => {
                    const maxUsers = geographyData[0].users;
                    const pct = Math.round((d.users / maxUsers) * 100);
                    const barColors = [C.blue, C.teal, C.purple, C.amber, C.coral, C.green, C.blue, C.teal];
                    return (
                      <div key={d.country}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
                          <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>{d.country}</span>
                          <span style={{ color: "var(--text-muted)", fontSize: 11 }}>
                            {d.users.toLocaleString()} users · ${(d.revenue / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <div style={{ height: 6, borderRadius: 3, background: "var(--track-bg)", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: pct + "%", background: barColors[i], borderRadius: 3, transition: "width 0.5s ease" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Row 4: Cohort Retention */}
            <Card title="Cohort Retention" subtitle="% of users still active after N months">
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "6px 10px", color: "var(--text-muted)", fontWeight: 500, borderBottom: "1px solid var(--chart-border)" }}>Cohort</th>
                      {["M+0", "M+1", "M+2", "M+3", "M+4", "M+5"].map(m => (
                        <th key={m} style={{ textAlign: "center", padding: "6px 10px", color: "var(--text-muted)", fontWeight: 500, borderBottom: "1px solid var(--chart-border)" }}>{m}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cohortData.map((row) => {
                      const vals = [row.m0, row.m1, row.m2, row.m3, row.m4, row.m5];
                      return (
                        <tr key={row.month}>
                          <td style={{ padding: "7px 10px", color: "var(--text-secondary)", fontWeight: 500 }}>{row.month} 2025</td>
                          {vals.map((v, i) => {
                            if (v === undefined) return <td key={i} style={{ padding: "7px 10px" }} />;
                            const opacity = v / 100;
                            return (
                              <td key={i} style={{ padding: "7px 10px", textAlign: "center" }}>
                                <span style={{
                                  display: "inline-block", padding: "2px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600,
                                  background: `${C.blue}${Math.round(opacity * 40 + 15).toString(16).padStart(2, "0")}`,
                                  color: opacity > 0.7 ? C.blue : "var(--text-secondary)",
                                }}>
                                  {v}%
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

        {/* ── Footer ── */}
        <p style={{ marginTop: 28, fontSize: 11, color: "var(--text-faint)", textAlign: "center" }}>
          Last updated May 29, 2026 · Data refreshes every 24 hours
        </p>

      </div>
    </>
  );
}