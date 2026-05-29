"use client";

import React, { useMemo, useState, useRef, useCallback } from "react";
import { CompensationRecord, NormalizedLevel } from "@/types";
import { formatCurrency } from "@/lib/formatters";
import { useRouter } from "next/navigation";

const LEVELS: NormalizedLevel[] = [
  NormalizedLevel.INTERN,
  NormalizedLevel.JUNIOR,
  NormalizedLevel.MID,
  NormalizedLevel.SENIOR,
  NormalizedLevel.STAFF,
  NormalizedLevel.PRINCIPAL,
  NormalizedLevel.DIRECTOR,
  NormalizedLevel.VP,
  NormalizedLevel.EXEC,
];

const LEVEL_LABELS: Record<NormalizedLevel, string> = {
  [NormalizedLevel.INTERN]: "Intern",
  [NormalizedLevel.JUNIOR]: "Junior",
  [NormalizedLevel.MID]: "Mid",
  [NormalizedLevel.SENIOR]: "Senior",
  [NormalizedLevel.STAFF]: "Staff",
  [NormalizedLevel.PRINCIPAL]: "Principal",
  [NormalizedLevel.DIRECTOR]: "Director",
  [NormalizedLevel.VP]: "VP",
  [NormalizedLevel.EXEC]: "Exec",
};

interface CellData {
  median: number;
  count: number;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  company: string;
  level: string;
  median: number;
  count: number;
}

/**
 * Interpolates a colour between two HSL stops based on a 0–1 ratio.
 * Below-market → hsl(210, 20%, 92%) (cool grey-blue)
 * Above-market → hsl(142, 71%, 30%) (deep green)
 */
export function compToColor(value: number, min: number, max: number): string {
  if (min === max) return "hsl(142, 71%, 40%)";
  const ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));

  // Hue interpolation: 210 → 142
  const h = Math.round(210 + (142 - 210) * ratio);
  // Saturation: 20% → 71%
  const s = Math.round(20 + (71 - 20) * ratio);
  // Lightness: 92% → 26%
  const l = Math.round(92 - (92 - 26) * ratio);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

interface CompensationHeatmapProps {
  data: CompensationRecord[];
  /** If provided, clicking a cell calls this instead of router.push */
  onCellClick?: (company: string, level: NormalizedLevel) => void;
}

export function CompensationHeatmap({ data, onCellClick }: CompensationHeatmapProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    company: "",
    level: "",
    median: 0,
    count: 0,
  });

  const { topCompanies, matrix, min, max } = useMemo(() => {
    // 1. Get company counts
    const counts: Record<string, number> = {};
    const cMap: Record<string, { name: string; slug: string }> = {};

    data.forEach((r) => {
      counts[r.company.slug] = (counts[r.company.slug] || 0) + 1;
      cMap[r.company.slug] = r.company;
    });

    const top = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 14)
      .map(([slug]) => cMap[slug]);

    // 2. Build matrix
    let minMed = Infinity;
    let maxMed = -Infinity;

    const mat: Record<string, Record<string, CellData>> = {};
    LEVELS.forEach((l) => {
      mat[l] = {};
    });

    top.forEach((c) => {
      LEVELS.forEach((l) => {
        const cellData = data.filter(
          (r) => r.company.slug === c.slug && r.normalizedLevel === l
        );
        if (cellData.length >= 3) {
          const sorted = cellData
            .map((r) => r.totalCompensation)
            .sort((a, b) => a - b);
          const median = sorted[Math.floor(sorted.length / 2)];
          mat[l][c.slug] = { median, count: sorted.length };
          if (median < minMed) minMed = median;
          if (median > maxMed) maxMed = median;
        }
      });
    });

    return {
      topCompanies: top,
      matrix: mat,
      min: minMed === Infinity ? 0 : minMed,
      max: maxMed === -Infinity ? 1 : maxMed,
    };
  }, [data]);

  const handleMouseMove = useCallback(
    (
      e: React.MouseEvent<SVGGElement>,
      companyName: string,
      level: string,
      cell: CellData
    ) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setTooltip({
        visible: true,
        x: e.clientX - rect.left + 12,
        y: e.clientY - rect.top - 8,
        company: companyName,
        level,
        median: cell.median,
        count: cell.count,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip((t) => ({ ...t, visible: false }));
  }, []);

  const handleCellClick = useCallback(
    (companySlug: string, level: NormalizedLevel) => {
      if (onCellClick) {
        onCellClick(companySlug, level);
      } else {
        router.push(`/?companies=${companySlug}&levels=${level}`);
      }
    },
    [onCellClick, router]
  );

  if (!topCompanies || topCompanies.length === 0) return null;

  const CELL_W = 82;
  const CELL_H = 42;
  const HEADER_W = 88;
  const HEADER_H = 52;
  const CORNER_R = 5;

  const totalW = HEADER_W + topCompanies.length * CELL_W;
  const totalH = HEADER_H + LEVELS.length * CELL_H;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto rounded-xl border border-border bg-card shadow-sm relative"
    >
      <div className="min-w-max p-3">
        <svg
          width={totalW}
          height={totalH}
          className="text-sm font-medium select-none"
        >
          {/* Column headers */}
          {topCompanies.map((c, i) => (
            <g key={c.slug} transform={`translate(${HEADER_W + i * CELL_W}, 0)`}>
              <text
                x={CELL_W / 2}
                y={HEADER_H - 10}
                textAnchor="middle"
                fill="currentColor"
                className="text-[11px] font-semibold"
                opacity={0.75}
              >
                {c.name.length > 10 ? c.name.substring(0, 9) + "…" : c.name}
              </text>
            </g>
          ))}

          {/* Row headers */}
          {LEVELS.map((l, i) => (
            <g key={l} transform={`translate(0, ${HEADER_H + i * CELL_H})`}>
              <text
                x={HEADER_W - 12}
                y={CELL_H / 2}
                dy={4}
                textAnchor="end"
                fill="currentColor"
                className="text-[11px] font-semibold uppercase tracking-wider"
                opacity={0.55}
              >
                {LEVEL_LABELS[l]}
              </text>
            </g>
          ))}

          {/* Grid cells */}
          {LEVELS.map((l, i) =>
            topCompanies.map((c, j) => {
              const cell = matrix[l]?.[c.slug];
              const x = HEADER_W + j * CELL_W;
              const y = HEADER_H + i * CELL_H;
              const pad = 3;

              if (!cell) {
                return (
                  <g key={`${l}-${c.slug}`} transform={`translate(${x}, ${y})`}>
                    <rect
                      width={CELL_W - pad * 2}
                      height={CELL_H - pad * 2}
                      x={pad}
                      y={pad}
                      rx={CORNER_R}
                      fill="currentColor"
                      opacity={0.04}
                    />
                    <text
                      x={CELL_W / 2}
                      y={CELL_H / 2}
                      dy={4}
                      textAnchor="middle"
                      fill="currentColor"
                      opacity={0.18}
                      fontSize={13}
                      fontWeight={700}
                    >
                      –
                    </text>
                  </g>
                );
              }

              const color = compToColor(cell.median, min, max);
              const ratio = (cell.median - min) / (max - min || 1);
              const isDark = ratio > 0.45;

              return (
                <g
                  key={`${l}-${c.slug}`}
                  transform={`translate(${x}, ${y})`}
                  style={{ cursor: "pointer" }}
                  onMouseMove={(e) =>
                    handleMouseMove(e, c.name, LEVEL_LABELS[l], cell)
                  }
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleCellClick(c.slug, l)}
                >
                  <rect
                    width={CELL_W - pad * 2}
                    height={CELL_H - pad * 2}
                    x={pad}
                    y={pad}
                    rx={CORNER_R}
                    fill={color}
                  />
                  <text
                    x={CELL_W / 2}
                    y={CELL_H / 2}
                    dy={4}
                    textAnchor="middle"
                    fill={isDark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.82)"}
                    fontSize={11}
                    fontWeight={700}
                  >
                    {formatCurrency(cell.median, "INR", true)}
                  </text>
                </g>
              );
            })
          )}

          {/* Legend axis line */}
          <line
            x1={HEADER_W}
            y1={HEADER_H - 1}
            x2={totalW}
            y2={HEADER_H - 1}
            stroke="currentColor"
            opacity={0.08}
          />
          <line
            x1={HEADER_W - 1}
            y1={HEADER_H}
            x2={HEADER_W - 1}
            y2={totalH}
            stroke="currentColor"
            opacity={0.08}
          />
        </svg>
      </div>

      {/* Custom Tooltip — positioned relative to container */}
      {tooltip.visible && (
        <div
          className="pointer-events-none absolute z-50 rounded-lg border border-border bg-popover text-popover-foreground shadow-xl px-3 py-2 text-xs"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translateY(-100%)",
            minWidth: 180,
          }}
        >
          <div className="font-semibold text-sm">
            {tooltip.company} · {tooltip.level}
          </div>
          <div className="mt-1 text-muted-foreground">
            <span className="text-foreground font-bold">
              {formatCurrency(tooltip.median, "INR")}
            </span>{" "}
            median
          </div>
          <div className="mt-0.5 text-muted-foreground">
            n = {tooltip.count} data points
          </div>
        </div>
      )}

      {/* Color scale legend */}
      <div className="flex items-center gap-2 px-4 pb-3 pt-1">
        <span className="text-[10px] text-muted-foreground">Below market</span>
        <div
          className="h-2 flex-1 rounded-full"
          style={{
            background:
              "linear-gradient(to right, hsl(210,20%,92%), hsl(175,45%,55%), hsl(142,71%,30%))",
          }}
        />
        <span className="text-[10px] text-muted-foreground">Above market</span>
        <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-muted-foreground">
          <span className="inline-block h-3 w-3 rounded-sm bg-foreground/10" />
          &lt;3 data points
        </span>
      </div>
    </div>
  );
}
