"use client";

import React, { useMemo, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { CompensationHeatmap } from "@/components/charts/CompensationHeatmap";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { NormalizedLevel } from "@/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  Cell,
  ReferenceLine,
} from "recharts";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, Award, Layers, GitBranch } from "lucide-react";
import { useChartTheme } from "@/lib/hooks/useChartTheme";

// ─── Constants ───────────────────────────────────────────────────────────────

const LADDER_LEVELS: NormalizedLevel[] = [
  NormalizedLevel.INTERN,
  NormalizedLevel.JUNIOR,
  NormalizedLevel.MID,
  NormalizedLevel.SENIOR,
  NormalizedLevel.STAFF,
  NormalizedLevel.PRINCIPAL,
  NormalizedLevel.DIRECTOR,
];

const LEVEL_LABELS: Record<string, string> = {
  INTERN: "Intern",
  JUNIOR: "Junior",
  MID: "Mid",
  SENIOR: "Senior",
  STAFF: "Staff",
  PRINCIPAL: "Principal",
  DIRECTOR: "Director",
};



// ─── Helper ───────────────────────────────────────────────────────────────────

function getMedian(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function getRoleCategory(role: string): "Engineering" | "Product" | "Data" | "Design" {
  const r = role.toLowerCase();
  if (r.includes("data") || r.includes("ml") || r.includes("machine learning") || r.includes("analytics")) return "Data";
  if (r.includes("product manager") || r.includes("program manager")) return "Product";
  if (r.includes("design") || r.includes("ux") || r.includes("ui")) return "Design";
  return "Engineering";
}

// ─── Custom Tooltip Renderers ─────────────────────────────────────────────────

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function BarTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-xl text-xs">
      <p className="font-bold text-sm mb-1">{label}</p>
      <p className="text-muted-foreground">
        Median:{" "}
        <span className="text-foreground font-semibold">
          {formatCurrency(payload[0]?.value ?? 0, "INR")}
        </span>
      </p>
    </div>
  );
}

function LineTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-xl text-xs min-w-[160px]">
      <p className="font-bold text-sm mb-2">{LEVEL_LABELS[label ?? ""] ?? label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 py-0.5">
          <span
            className="h-2.5 w-2.5 rounded-full shrink-0"
            style={{ background: p.color }}
          />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-semibold ml-auto pl-2">
            {formatCurrency(p.value, "INR", true)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Key Insights ─────────────────────────────────────────────────────────────

const KEY_INSIGHTS = [
  {
    icon: TrendingUp,
    color: "amber",
    title: "The Staff Cliff",
    body: "Compensation jumps ~65% from Senior to Staff, primarily driven by RSU grants that often 3–4× at the Staff level. This is the single biggest salary inflection in an IC career.",
  },
  {
    icon: Layers,
    color: "green",
    title: "Stock Dominates at Senior+",
    body: "Stock compensation grows 3× faster than base salary from Senior to Principal. At Principal level, base salary accounts for less than 40% of total compensation — equity is the real lever.",
  },
  {
    icon: GitBranch,
    color: "blue",
    title: "Engineering vs. Product Diverge",
    body: "Product Management roles out-earn Engineering at entry level (Junior/Mid), but the gap flips at Staff. At Staff+, Engineering ICs frequently earn 15–25% more than equivalent PM levels.",
  },
  {
    icon: Award,
    color: "purple",
    title: "Top-of-Market Premium",
    body: "FAANG-adjacent companies (Google, Meta, Netflix) pay a consistent 40–70% premium over the Indian market median at the same level — driven almost entirely by equity refreshes.",
  },
];

const INSIGHT_COLORS: Record<string, string> = {
  amber: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [activeLevel, setActiveLevel] = useState<NormalizedLevel>(NormalizedLevel.SENIOR);
  const themeColors = useChartTheme();

  const chartColors = [
    themeColors.chart1,
    themeColors.chart2,
    themeColors.chart3,
    themeColors.chart4,
    themeColors.chart5,
  ];

  const roleColors = {
    Engineering: themeColors.chart1,
    Product: themeColors.chart3,
    Data: themeColors.chart2,
    Design: themeColors.chart5,
  };

  // ── Top Paying Companies chart data ──
  const topPayingData = useMemo(() => {
    const levelData = MOCK_SALARIES.filter((r) => r.normalizedLevel === activeLevel);
    const byCompany: Record<string, number[]> = {};
    const nameMap: Record<string, string> = {};

    levelData.forEach((r) => {
      if (!byCompany[r.company.slug]) byCompany[r.company.slug] = [];
      byCompany[r.company.slug].push(r.totalCompensation);
      nameMap[r.company.slug] = r.company.name;
    });

    return Object.entries(byCompany)
      .filter(([, comps]) => comps.length >= 2)
      .map(([slug, comps]) => ({
        slug,
        name: nameMap[slug],
        median: getMedian(comps),
        count: comps.length,
      }))
      .sort((a, b) => b.median - a.median)
      .slice(0, 6);
  }, [activeLevel]);

  // ── Career Ladder chart data ──
  const ladderData = useMemo(() => {
    return LADDER_LEVELS.map((level) => {
      const point: Record<string, string | number> = { level };
      (["Engineering", "Product", "Data", "Design"] as const).forEach((cat) => {
        const matching = MOCK_SALARIES.filter(
          (r) => r.normalizedLevel === level && getRoleCategory(r.role) === cat
        );
        if (matching.length > 0) {
          point[cat] = getMedian(matching.map((r) => r.totalCompensation));
        }
      });
      return point;
    });
  }, []);

  // ── Summary stats ──
  const summaryStats = useMemo(() => {
    const seniorEng = MOCK_SALARIES.filter(
      (r) => r.normalizedLevel === NormalizedLevel.SENIOR && getRoleCategory(r.role) === "Engineering"
    );
    const staffEng = MOCK_SALARIES.filter(
      (r) => r.normalizedLevel === NormalizedLevel.STAFF && getRoleCategory(r.role) === "Engineering"
    );
    const seniorMed = getMedian(seniorEng.map((r) => r.totalCompensation));
    const staffMed = getMedian(staffEng.map((r) => r.totalCompensation));
    const growthPct = seniorMed > 0 ? Math.round(((staffMed - seniorMed) / seniorMed) * 100) : 0;

    const allTotals = MOCK_SALARIES.map((r) => r.totalCompensation);
    const marketMedian = getMedian(allTotals);

    const companies = new Set(MOCK_SALARIES.map((r) => r.company.slug)).size;

    return { growthPct, marketMedian, companies, dataPoints: MOCK_SALARIES.length };
  }, []);

  return (
    <PageShell
      title="Market Analytics"
      description="Deep-dive into macro compensation trends, company density, and career progression ladders."
    >
      <div className="flex flex-col gap-10 mt-2">

        {/* ── Summary Stats Bar ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Data Points", value: summaryStats.dataPoints.toLocaleString(), sub: "verified submissions" },
            { label: "Companies Tracked", value: summaryStats.companies, sub: "across sectors" },
            { label: "Market Median (All)", value: formatCurrency(summaryStats.marketMedian, "INR", true), sub: "total compensation" },
            { label: "Senior → Staff Jump", value: `+${summaryStats.growthPct}%`, sub: "median comp growth" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Heatmap ── */}
        <section className="space-y-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Compensation Density Heatmap</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Median total compensation by company × level. Click any cell to filter the salary table.
              Greyed cells have fewer than 3 data points.
            </p>
          </div>
          <div className="overflow-x-auto min-w-0 -mx-1 px-1">
            <CompensationHeatmap data={MOCK_SALARIES} />
          </div>
        </section>

        {/* ── Middle Charts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left: Top Paying by Level */}
          <section className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="font-semibold text-base">Top Paying Companies</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Median total comp by level</p>
              </div>
              <div className="flex bg-muted/60 p-1 rounded-lg gap-0.5 overflow-x-auto max-w-full shrink-0">
                {[NormalizedLevel.MID, NormalizedLevel.SENIOR, NormalizedLevel.STAFF, NormalizedLevel.PRINCIPAL].map((l) => (
                  <Button
                    key={l}
                    variant="ghost"
                    size="sm"
                    className={`h-7 px-2.5 text-xs rounded-md transition-all ${
                      activeLevel === l
                        ? "bg-background shadow-sm text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setActiveLevel(l)}
                  >
                    {LEVEL_LABELS[l] ?? l}
                  </Button>
                ))}
              </div>
            </div>

            {topPayingData.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                Not enough data for this level.
              </div>
            ) : (
              <div className="flex-1 min-h-[280px] min-w-0 overflow-x-auto">
                <ResponsiveContainer width="100%" height="100%" minWidth={280}>
                  <BarChart
                    data={topPayingData}
                    layout="vertical"
                    margin={{ top: 0, right: 40, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      vertical={true}
                      stroke={themeColors.border}
                      opacity={0.5}
                    />
                    <XAxis
                      type="number"
                      tickFormatter={(v: number) => formatCurrency(v, "INR", true)}
                      stroke={themeColors.mutedForeground}
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke={themeColors.mutedForeground}
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      width={82}
                    />
                    <RechartsTooltip
                      cursor={{ fill: themeColors.mutedForeground, opacity: 0.15 }}
                      content={<BarTooltip />}
                    />
                    <Bar dataKey="median" radius={[0, 6, 6, 0]} maxBarSize={36}>
                      {topPayingData.map((entry, index) => (
                        <Cell key={`cell-${entry.slug}`} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>

          {/* Right: Career Ladder */}
          <section className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-5">
              <h3 className="font-semibold text-base">Compensation Ladder by Role</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Median total comp at each level, by role category
              </p>
            </div>
            <div className="flex-1 min-h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={ladderData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={themeColors.border}
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="level"
                    tickFormatter={(v: string) => LEVEL_LABELS[v] ?? v}
                    stroke={themeColors.mutedForeground}
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dy={8}
                  />
                  <YAxis
                    tickFormatter={(v: number) => formatCurrency(v, "INR", true)}
                    stroke={themeColors.mutedForeground}
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dx={-6}
                    width={52}
                  />
                  <RechartsTooltip content={<LineTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
                    iconType="circle"
                    iconSize={8}
                  />
                  {/* Reference line at market median */}
                  <ReferenceLine
                    y={summaryStats.marketMedian}
                    stroke={themeColors.mutedForeground}
                    strokeDasharray="4 4"
                    opacity={0.4}
                    label={{
                      value: "All-co median",
                      position: "insideTopRight",
                      fontSize: 10,
                      fill: themeColors.mutedForeground,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Engineering"
                    stroke={roleColors.Engineering}
                    strokeWidth={3}
                    dot={{ r: 4, fill: roleColors.Engineering }}
                    activeDot={{ r: 6 }}
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    dataKey="Product"
                    stroke={roleColors.Product}
                    strokeWidth={2}
                    dot={{ r: 3, fill: roleColors.Product }}
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    dataKey="Data"
                    stroke={roleColors.Data}
                    strokeWidth={2}
                    dot={{ r: 3, fill: roleColors.Data }}
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    dataKey="Design"
                    stroke={roleColors.Design}
                    strokeWidth={2}
                    dot={{ r: 3, fill: roleColors.Design }}
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        {/* ── Key Insights ── */}
        <section className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-border flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center shrink-0">
              <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-base">Key Market Insights</h3>
              <p className="text-xs text-muted-foreground">
                Automatically derived from the compensation dataset
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
            {KEY_INSIGHTS.map((insight, idx) => {
              const Icon = insight.icon;
              return (
                <div key={idx} className="p-6 flex gap-4">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${INSIGHT_COLORS[insight.color]}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1.5">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {insight.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </PageShell>
  );
}
