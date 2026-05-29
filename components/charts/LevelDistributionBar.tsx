"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { NormalizedLevel } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useChartTheme } from "@/lib/hooks/useChartTheme";
import { useTheme } from "next-themes";

export interface LevelDistributionData {
  level: NormalizedLevel;
  count: number;
}

interface LevelDistributionBarProps {
  data: LevelDistributionData[];
  isLoading?: boolean;
}

// Convert Tailwind classes from getLevelColor to approximate hex colors for recharts
const LEVEL_HEX_COLORS: Record<NormalizedLevel, string> = {
  [NormalizedLevel.INTERN]: "#94a3b8",
  [NormalizedLevel.JUNIOR]: "#60a5fa",
  [NormalizedLevel.MID]: "#34d399",
  [NormalizedLevel.SENIOR]: "#fbbf24",
  [NormalizedLevel.STAFF]: "#fb923c",
  [NormalizedLevel.PRINCIPAL]: "#f87171",
  [NormalizedLevel.DIRECTOR]: "#c084fc",
  [NormalizedLevel.VP]: "#a78bfa",
  [NormalizedLevel.EXEC]: "#1e293b",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as LevelDistributionData;
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-md text-sm">
        <p className="font-semibold mb-1">{data.level}</p>
        <p className="text-muted-foreground"><span className="text-foreground font-medium">{data.count}</span> records</p>
      </div>
    );
  }
  return null;
};

export function LevelDistributionBar({ data, isLoading }: LevelDistributionBarProps) {
  const theme = useChartTheme();
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  if (isLoading) return <LevelDistributionBar.Skeleton />;
  if (!data || data.length === 0) return <div className="h-[300px] flex items-center justify-center text-muted-foreground">No distribution data</div>;

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.border} opacity={0.2} />
          <XAxis 
            dataKey="level" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: theme.mutedForeground }}
            interval={0}
            angle={-45}
            textAnchor="end"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: theme.mutedForeground }}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: theme.mutedForeground, opacity: 0.15 }} 
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => {
              const baseColor = LEVEL_HEX_COLORS[entry.level] || "#3b82f6";
              // Exec defaults to a dark blue-grey that is hard to see on near-black background
              const fill = entry.level === NormalizedLevel.EXEC && isDarkMode 
                ? "#cbd5e1" 
                : baseColor;
              return <Cell key={`cell-${index}`} fill={fill} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

LevelDistributionBar.Skeleton = function LevelDistributionBarSkeleton() {
  return (
    <div className="w-full h-[300px] flex items-end justify-between py-6 px-4 gap-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton 
          key={i} 
          className="w-full rounded-t-md rounded-b-none" 
          style={{ height: `${20 + Math.random() * 60}%` }} 
        />
      ))}
    </div>
  );
};
