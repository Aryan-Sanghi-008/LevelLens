"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { NormalizedLevel } from "@/types";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { NORMALIZED_LEVELS } from "@/lib/constants";
import { formatCurrency, getLevelColor } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Layers,
  TrendingUp,
  Users,
  Zap,
  BookOpen,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

/** Company-specific title equivalents for each normalized level */
const TITLE_MAPPING: Record<
  NormalizedLevel,
  { google: string; amazon: string; microsoft: string; flipkart: string; razorpay: string }
> = {
  [NormalizedLevel.INTERN]: {
    google: "STEP Intern",
    amazon: "SDE Intern",
    microsoft: "Explore Intern",
    flipkart: "SDE Intern",
    razorpay: "Engineering Intern",
  },
  [NormalizedLevel.JUNIOR]: {
    google: "L3",
    amazon: "SDE I",
    microsoft: "SDE (59–60)",
    flipkart: "SDE I",
    razorpay: "Engineer I",
  },
  [NormalizedLevel.MID]: {
    google: "L4",
    amazon: "SDE II",
    microsoft: "SDE II (61–62)",
    flipkart: "SDE II",
    razorpay: "Engineer II",
  },
  [NormalizedLevel.SENIOR]: {
    google: "L5",
    amazon: "SDE III",
    microsoft: "Senior SDE (63–64)",
    flipkart: "Senior SDE",
    razorpay: "Senior Engineer",
  },
  [NormalizedLevel.STAFF]: {
    google: "L6 / Staff",
    amazon: "Principal SDE",
    microsoft: "Principal SDE (65–66)",
    flipkart: "Staff Engineer",
    razorpay: "Staff Engineer",
  },
  [NormalizedLevel.PRINCIPAL]: {
    google: "L7 / Senior Staff",
    amazon: "Senior Principal",
    microsoft: "Sr. Principal (67)",
    flipkart: "Principal Engineer",
    razorpay: "Principal Engineer",
  },
  [NormalizedLevel.DIRECTOR]: {
    google: "L8 / Director Eng",
    amazon: "Distinguished Eng",
    microsoft: "Partner (68–69)",
    flipkart: "Director Eng",
    razorpay: "Director Eng",
  },
  [NormalizedLevel.VP]: {
    google: "L9 / VP Eng",
    amazon: "VP Engineering",
    microsoft: "Distinguished (70)",
    flipkart: "VP Engineering",
    razorpay: "VP Engineering",
  },
  [NormalizedLevel.EXEC]: {
    google: "L10+ / Fellow",
    amazon: "Fellow / SVP",
    microsoft: "Technical Fellow",
    flipkart: "CTO / Fellow",
    razorpay: "CTO",
  },
};

const COMPANIES = [
  { key: "google", name: "Google", color: "text-blue-600 dark:text-blue-400" },
  { key: "amazon", name: "Amazon", color: "text-orange-600 dark:text-orange-400" },
  { key: "microsoft", name: "Microsoft", color: "text-cyan-600 dark:text-cyan-400" },
  { key: "flipkart", name: "Flipkart", color: "text-yellow-600 dark:text-yellow-400" },
  { key: "razorpay", name: "Razorpay", color: "text-blue-500 dark:text-blue-300" },
] as const;

/** Detailed descriptions for each level */
const LEVEL_DETAILS: Record<
  NormalizedLevel,
  {
    scope: string;
    autonomy: string;
    growth: string;
    exampleTitles: string[];
  }
> = {
  [NormalizedLevel.INTERN]: {
    scope: "Works on a well-scoped task with clear requirements. Output is a learning exercise as much as a deliverable.",
    autonomy: "Guided closely by a mentor. Not expected to make independent technical decisions.",
    growth: "The goal is to convert to a full-time offer. Success is measured by learning speed and code quality.",
    exampleTitles: ["SDE Intern", "Engineering Intern", "Summer Intern", "Explore Intern"],
  },
  [NormalizedLevel.JUNIOR]: {
    scope: "Owns small, well-defined tasks within a larger project. Works on code that is reviewed heavily.",
    autonomy: "Some supervision required. Expected to ask for help rather than struggle in silence.",
    growth: "Focus on learning the codebase, tooling, and team norms. Ramping up to full productivity.",
    exampleTitles: ["SDE I", "L3 (Google)", "Engineer I", "Junior Engineer", "Associate SDE"],
  },
  [NormalizedLevel.MID]: {
    scope: "Independently delivers features within a defined problem space. Understands the system end-to-end.",
    autonomy: "Works independently on most tasks. Seeks design review for larger changes.",
    growth: "Can mentor interns. Starting to participate in on-call rotations and incident response.",
    exampleTitles: ["SDE II", "L4 (Google)", "Engineer II", "Software Engineer"],
  },
  [NormalizedLevel.SENIOR]: {
    scope: "Leads delivery of complex features. Contributes significantly to technical design and architecture.",
    autonomy: "Fully independent execution. Defines the 'how' for their team's work.",
    growth: "Mentors junior/mid engineers actively. Drives RFC-level discussions and cross-team alignment.",
    exampleTitles: ["Senior SDE", "L5 (Google)", "SDE III (Amazon)", "Senior Engineer", "Senior Software Engineer"],
  },
  [NormalizedLevel.STAFF]: {
    scope: "Drives multi-team technical initiatives. Identifies problems before they're assigned.",
    autonomy: "Sets technical direction for a pillar or domain. Their technical judgment shapes product roadmap.",
    growth: "Expected to grow 2–3 other engineers as a force-multiplier. Often a default project lead for ambiguous problems.",
    exampleTitles: ["Staff Engineer", "L6 (Google)", "Principal SDE (Amazon)", "Staff SDE"],
  },
  [NormalizedLevel.PRINCIPAL]: {
    scope: "Company-wide or org-wide technical scope. Involved in defining the 5-year technical vision.",
    autonomy: "Highly autonomous. Creates new problem spaces rather than solving defined ones.",
    growth: "Mentors Staff engineers. Represents the company externally (conferences, open source).",
    exampleTitles: ["Principal Engineer", "L7 (Google)", "Senior Principal (Amazon)", "Distinguished Engineer"],
  },
  [NormalizedLevel.DIRECTOR]: {
    scope: "Manages multiple teams or technical domains. Owns both people and technical outcomes.",
    autonomy: "Sets strategy for an engineering org. Interfaces heavily with PM, design, and business leadership.",
    growth: "Grows senior managers and principal engineers. Defines hiring bar for the org.",
    exampleTitles: ["Director of Engineering", "L8 (Google)", "Distinguished Engineer (Amazon)", "Engineering Director"],
  },
  [NormalizedLevel.VP]: {
    scope: "Runs a large engineering organisation (100–500+ engineers). Accountable for multiple product areas.",
    autonomy: "Strategic authority. Defines the engineering culture and long-term headcount strategy.",
    growth: "Coaches Directors. Has direct influence on company-level OKRs.",
    exampleTitles: ["VP Engineering", "L9 (Google)", "VP Engineering (Amazon)", "VP of Product Engineering"],
  },
  [NormalizedLevel.EXEC]: {
    scope: "Highest technical or engineering leadership. Influences the entire company's technical identity.",
    autonomy: "Absolute technical authority. Often a board-level or company-defining hire.",
    growth: "Sets the tone for engineering culture globally. Usually a public face of the company.",
    exampleTitles: ["CTO", "Technical Fellow", "SVP Engineering", "L10 / Fellow (Google)"],
  },
};

const COMP_COLORS = {
  engineering: "hsl(221, 83%, 60%)",
  management: "hsl(280, 65%, 60%)",
};

const FAQ_ITEMS = [
  {
    q: "What if I'm between two levels?",
    a: "Most engineers sit in a 'level band' — performing above their current level but not yet fully at the next. When submitting data, pick the level your company officially assigned you on paper, not where you feel you operate. The raw title field captures more nuance.",
  },
  {
    q: "How do you verify level mappings?",
    a: "We cross-reference publicly available career ladders (many companies publish these), offer letters submitted by community members, and LinkedIn profiles. For companies with ambiguous ladders, we mark mappings as 'approximate'. The community can flag incorrect mappings.",
  },
  {
    q: "What about non-engineering roles?",
    a: "The normalised levels apply across functions. A Product Manager 'Senior' maps to the same scope/autonomy bar as an Engineering 'Senior' — leading a feature end-to-end independently. Design, Data Science, and PM roles all use the same 9-level spine, which makes cross-functional compensation comparisons possible.",
  },
  {
    q: "Why not just use years of experience?",
    a: "YoE is a terrible proxy for level. A 2-year engineer who built production systems at a fast-growing startup may operate at Senior level. A 10-year engineer in a very stable corporate environment may still be mid-level. Scope, autonomy, and impact are better signals — and that's exactly what normalised levels capture.",
  },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

function getMedian(arr: number[]): number {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
}

function getP25(arr: number[]): number {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.floor(s.length * 0.25)] ?? 0;
}

function getP75(arr: number[]): number {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.floor(s.length * 0.75)] ?? 0;
}

// ─── Mini comp bar ────────────────────────────────────────────────────────────

function MiniCompBar({
  p25,
  p50,
  p75,
  min,
  max,
  currency,
}: {
  p25: number;
  p50: number;
  p75: number;
  min: number;
  max: number;
  currency: string;
}) {
  const range = max - min || 1;
  const p25Pct = ((p25 - min) / range) * 100;
  const p50Pct = ((p50 - min) / range) * 100;
  const p75Pct = ((p75 - min) / range) * 100;
  const bandLeft = p25Pct;
  const bandWidth = p75Pct - p25Pct;

  return (
    <div className="space-y-1.5">
      <div className="relative h-3 rounded-full bg-muted overflow-hidden">
        {/* IQR band */}
        <div
          className="absolute top-0 h-full rounded-full bg-primary/30"
          style={{ left: `${bandLeft}%`, width: `${bandWidth}%` }}
        />
        {/* Median tick */}
        <div
          className="absolute top-0 h-full w-0.5 bg-primary"
          style={{ left: `${p50Pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>P25: {formatCurrency(p25, currency, true)}</span>
        <span className="font-semibold text-foreground">
          Median: {formatCurrency(p50, currency, true)}
        </span>
        <span>P75: {formatCurrency(p75, currency, true)}</span>
      </div>
    </div>
  );
}

// ─── Level Badge ──────────────────────────────────────────────────────────────

function LevelBadge({ level }: { level: NormalizedLevel }) {
  const label = NORMALIZED_LEVELS.find((l) => l.level === level)?.label ?? level;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider",
        getLevelColor(level)
      )}
    >
      {label}
    </span>
  );
}

// ─── Normalisation Table ──────────────────────────────────────────────────────

function NormalisationTable() {
  const [hoveredRow, setHoveredRow] = useState<NormalizedLevel | null>(null);

  return (
    <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
      <table className="w-full min-w-[700px] text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="sticky left-0 bg-muted/60 px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground z-10">
              Level
            </th>
            {COMPANIES.map((c) => (
              <th
                key={c.key}
                className={cn(
                  "px-4 py-3 text-left text-xs font-bold uppercase tracking-wider",
                  c.color
                )}
              >
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {NORMALIZED_LEVELS.map(({ level }) => {
            const mapping = TITLE_MAPPING[level];
            const isHovered = hoveredRow === level;
            return (
              <tr
                key={level}
                onMouseEnter={() => setHoveredRow(level)}
                onMouseLeave={() => setHoveredRow(null)}
                className={cn(
                  "transition-colors",
                  isHovered ? "bg-muted/50" : "hover:bg-muted/20"
                )}
              >
                <td className="sticky left-0 bg-card px-4 py-3 z-10">
                  <LevelBadge level={level} />
                </td>
                {COMPANIES.map((c) => (
                  <td key={c.key} className="px-4 py-3 text-muted-foreground">
                    <span
                      className={cn(
                        "font-mono text-xs px-2 py-0.5 rounded bg-muted",
                        isHovered && "text-foreground"
                      )}
                    >
                      {mapping[c.key]}
                    </span>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Level Accordion ─────────────────────────────────────────────────────────

function LevelAccordion() {
  const compStats = useMemo(() => {
    const allTotals = MOCK_SALARIES.map((r) => r.totalCompensation);
    const globalMin = Math.min(...allTotals);
    const globalMax = Math.max(...allTotals);

    return NORMALIZED_LEVELS.map(({ level }) => {
      const matching = MOCK_SALARIES.filter(
        (r) => r.normalizedLevel === level && r.currency === "INR"
      ).map((r) => r.totalCompensation);

      return {
        level,
        p25: getP25(matching),
        p50: getMedian(matching),
        p75: getP75(matching),
        count: matching.length,
        globalMin,
        globalMax,
      };
    });
  }, []);

  return (
    <Accordion multiple defaultValue={[NormalizedLevel.SENIOR]}>
      {NORMALIZED_LEVELS.map(({ level, label, typicalYoe }) => {
        const details = LEVEL_DETAILS[level];
        const stats = compStats.find((s) => s.level === level);
        const hasData = stats && stats.p50 > 0;

        return (
          <AccordionItem key={level} value={level}>
            <AccordionTrigger className="py-4 hover:no-underline">
              <div className="flex items-center gap-3 flex-1">
                <LevelBadge level={level} />
                <div className="text-left">
                  <div className="font-semibold text-sm">{label}</div>
                  <div className="text-xs text-muted-foreground">
                    ~{typicalYoe} years experience
                  </div>
                </div>
                {hasData && (
                  <div className="ml-auto mr-4 text-right hidden sm:block">
                    <div className="text-xs text-muted-foreground">Median (INR)</div>
                    <div className="text-sm font-bold text-foreground">
                      {formatCurrency(stats!.p50, "INR", true)}
                    </div>
                  </div>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pb-2 space-y-5">
                {/* Scope cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { icon: Layers, label: "Scope", text: details.scope },
                    { icon: Zap, label: "Autonomy", text: details.autonomy },
                    { icon: TrendingUp, label: "Growth", text: details.growth },
                  ].map(({ icon: Icon, label: cardLabel, text }) => (
                    <div
                      key={cardLabel}
                      className="rounded-xl border border-border bg-muted/30 p-3.5 space-y-1.5"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <Icon className="h-3.5 w-3.5" />
                        {cardLabel}
                      </div>
                      <p className="text-xs leading-relaxed text-foreground/80">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Example titles */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Example Titles
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {details.exampleTitles.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full border border-border text-xs text-muted-foreground font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Comp bar */}
                {hasData && stats!.count >= 3 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Compensation Range (India · INR) — {stats!.count} data points
                    </p>
                    <MiniCompBar
                      p25={stats!.p25}
                      p50={stats!.p50}
                      p75={stats!.p75}
                      min={stats!.globalMin}
                      max={stats!.globalMax}
                      currency="INR"
                    />
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

// ─── Ladder Chart ─────────────────────────────────────────────────────────────

const LADDER_LEVELS = [
  NormalizedLevel.JUNIOR,
  NormalizedLevel.MID,
  NormalizedLevel.SENIOR,
  NormalizedLevel.STAFF,
  NormalizedLevel.PRINCIPAL,
  NormalizedLevel.DIRECTOR,
];

const LEVEL_SHORT: Record<string, string> = {
  JUNIOR: "Junior",
  MID: "Mid",
  SENIOR: "Senior",
  STAFF: "Staff",
  PRINCIPAL: "Principal",
  DIRECTOR: "Director",
};

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function LadderTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-xl text-xs min-w-[180px]">
      <p className="font-bold text-sm mb-2">{LEVEL_SHORT[label ?? ""] ?? label}</p>
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
      <p className="text-muted-foreground mt-2 border-t border-border pt-1.5 text-[10px]">
        Click to explore this level
      </p>
    </div>
  );
}

function LadderChart() {
  const router = useRouter();

  const ladderData = useMemo(() => {
    return LADDER_LEVELS.map((level) => {
      const engRecords = MOCK_SALARIES.filter(
        (r) =>
          r.normalizedLevel === level &&
          r.currency === "INR" &&
          !r.role.toLowerCase().includes("product manager") &&
          !r.role.toLowerCase().includes("design")
      ).map((r) => r.totalCompensation);

      // Management track: simulate EM premium at Staff+
      const mgmtMultiplier =
        level === NormalizedLevel.STAFF
          ? 0.95
          : level === NormalizedLevel.PRINCIPAL
          ? 1.08
          : level === NormalizedLevel.DIRECTOR
          ? 1.22
          : 1.0;

      const engMedian = getMedian(engRecords);
      const mgmtMedian = engMedian > 0 ? Math.round(engMedian * mgmtMultiplier) : 0;

      return {
        level,
        Engineering: engMedian || undefined,
        Management: mgmtMedian || undefined,
      };
    });
  }, []);

  const handleDotClick = (level: NormalizedLevel) => {
    router.push(`/?levels=${level}`);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="font-bold text-base">The Compensation Ladder</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Engineering IC vs. Management tracks · Click a point to explore that level
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          {[
            { label: "Engineering IC", color: COMP_COLORS.engineering },
            { label: "Management", color: COMP_COLORS.management },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: color }}
              />
              <span className="text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={ladderData}
            margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
              opacity={0.5}
            />
            <XAxis
              dataKey="level"
              tickFormatter={(v: string) => LEVEL_SHORT[v] ?? v}
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={8}
            />
            <YAxis
              tickFormatter={(v: number) => formatCurrency(v, "INR", true)}
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dx={-6}
              width={52}
            />
            <RechartsTooltip content={<LadderTooltip />} />

            {/* Divergence annotation */}
            <ReferenceLine
              x={NormalizedLevel.STAFF}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="4 4"
              opacity={0.4}
              label={{
                value: "Tracks diverge",
                position: "top",
                fontSize: 10,
                fill: "hsl(var(--muted-foreground))",
              }}
            />

            <Line
              type="monotone"
              dataKey="Engineering"
              stroke={COMP_COLORS.engineering}
              strokeWidth={3}
              connectNulls
              dot={(props: Record<string, unknown>) => {
                const { cx, cy, payload } = props as { cx: number; cy: number; payload: { level: NormalizedLevel } };
                return (
                  <circle
                    key={`eng-dot-${payload.level}`}
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill={COMP_COLORS.engineering}
                    stroke="white"
                    strokeWidth={2}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDotClick(payload.level)}
                  />
                );
              }}
              activeDot={{
                r: 8,
                stroke: COMP_COLORS.engineering,
                strokeWidth: 2,
                fill: "white",
                style: { cursor: "pointer" },
              }}
            />
            <Line
              type="monotone"
              dataKey="Management"
              stroke={COMP_COLORS.management}
              strokeWidth={2}
              strokeDasharray="6 3"
              connectNulls
              dot={(props: Record<string, unknown>) => {
                const { cx, cy, payload } = props as { cx: number; cy: number; payload: { level: NormalizedLevel } };
                return (
                  <circle
                    key={`mgmt-dot-${payload.level}`}
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill={COMP_COLORS.management}
                    stroke="white"
                    strokeWidth={2}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDotClick(payload.level)}
                  />
                );
              }}
              activeDot={{ r: 7, stroke: COMP_COLORS.management, strokeWidth: 2, fill: "white" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground text-center">
        Management track premium emerges at Staff+ as EM scope expands significantly.
        Below Staff, IC and EM comp is roughly equivalent.
      </p>
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FaqSection() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="bg-muted/30 border-b border-border px-6 py-4 flex items-center gap-2.5">
        <HelpCircle className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-bold text-base">Frequently Asked Questions</h3>
      </div>
      <div className="px-6">
        <Accordion multiple>
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={i} value={String(i)}>
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="text-sm font-semibold text-left pr-4">{item.q}</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground leading-relaxed pb-2">
                  {item.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LevelsPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6 max-w-5xl mx-auto space-y-16">

      {/* ── Hero ── */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
          <BookOpen className="h-3.5 w-3.5" />
          Level Intelligence
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Why your title{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
              doesn&apos;t tell
            </span>{" "}
            the whole story
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A &ldquo;Senior Engineer&rdquo; at Flipkart and an &ldquo;L5&rdquo; at Google are
            doing the same job — but you&apos;d never know that from their job titles alone.
            LevelLens normalises across companies so you can finally compare apples to apples.
          </p>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap gap-4">
          {[
            { icon: CheckCircle2, text: "9 standardised levels" },
            { icon: Users, text: "20+ companies mapped" },
            { icon: TrendingUp, text: "Updated continuously" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="h-4 w-4 text-primary shrink-0" />
              {text}
            </div>
          ))}
        </div>

        {/* Problem callout */}
        <div className="rounded-xl border-l-4 border-primary bg-primary/5 p-5 max-w-2xl">
          <p className="text-sm font-semibold mb-1">The title inflation problem</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Companies routinely inflate titles to attract candidates or retain employees — without
            changing compensation. Amazon calls their second-level engineers &ldquo;SDE II&rdquo;,
            Google calls the same level &ldquo;L4&rdquo;, and a startup might call it
            &ldquo;Senior Engineer&rdquo;. Without normalisation, comparing salaries across
            companies is meaningless.
          </p>
        </div>
      </section>

      {/* ── Title Mapping Table ── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            The Normalisation Map
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            How each LevelLens level maps to equivalent titles across major companies.
            Hover a row to highlight it.
          </p>
        </div>
        <NormalisationTable />
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground" />
          Mappings are approximate and community-maintained. Level definitions vary across teams even within the same company.
        </p>
      </section>

      {/* ── What each level means ── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">What each level really means</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Scope, autonomy, growth expectations, and compensation ranges — for every level.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="divide-y divide-border px-5">
            <LevelAccordion />
          </div>
        </div>
      </section>

      {/* ── Comp Ladder Chart ── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">The compensation ladder</h2>
          <p className="text-sm text-muted-foreground mt-1">
            How median total compensation grows across levels. Engineering IC vs. Engineering
            Manager tracks diverge meaningfully at Staff+.
          </p>
        </div>
        <LadderChart />

        {/* Key observation callout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: "The Senior plateau",
              body: "Most engineers spend the longest time at Senior — the bar for Staff is high and widely misunderstood.",
            },
            {
              title: "Staff is a phase change",
              body: "The jump from Senior to Staff is not just a promo — it's a fundamentally different job with multi-team scope.",
            },
            {
              title: "Management premium at scale",
              body: "Below Staff, IC and EM pay is roughly equal. The management premium only materialises at Director+.",
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-4 space-y-1.5 shadow-sm"
            >
              <div className="flex items-center gap-1.5">
                <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0" />
                <p className="text-sm font-semibold">{title}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Common questions</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Everything you wanted to know about how LevelLens normalises compensation data.
          </p>
        </div>
        <FaqSection />
      </section>

      {/* ── CTA ── */}
      <section className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Now that you understand the levels —
        </h2>
        <p className="text-muted-foreground">
          Put them to use. Browse compensation data filtered by your exact level.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Explore Salary Table
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/analytics"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
          >
            View Market Analytics
          </Link>
        </div>
      </section>

    </div>
  );
}
