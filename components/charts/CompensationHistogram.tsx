"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/formatters";
import { Skeleton } from "@/components/ui/skeleton";
import { useChartTheme } from "@/lib/hooks/useChartTheme";

export interface HistogramData {
  bucketStr: string;
  min: number;
  max: number;
  count: number;
}

interface CompensationHistogramProps {
  data: HistogramData[];
  isLoading?: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: HistogramData }[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as HistogramData;
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-md text-sm">
        <p className="font-semibold text-muted-foreground mb-1">
          {formatCurrency(data.min, "INR", true)} - {formatCurrency(data.max, "INR", true)}
        </p>
        <p><span className="text-foreground font-bold">{data.count}</span> records</p>
      </div>
    );
  }
  return null;
};

export function CompensationHistogram({ data, isLoading }: CompensationHistogramProps) {
  const theme = useChartTheme();

  if (isLoading) return <CompensationHistogram.Skeleton />;
  if (!data || data.length === 0) return <div className="h-[200px] flex items-center justify-center text-muted-foreground">No data available</div>;

  return (
    <div className="w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          barCategoryGap={1}
        >
          <XAxis 
            dataKey="bucketStr" 
            axisLine={true}
            tickLine={false}
            tick={{ fontSize: 10, fill: theme.mutedForeground }}
            interval="preserveStartEnd"
            minTickGap={30}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: theme.mutedForeground }}
            allowDecimals={false}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: theme.mutedForeground, opacity: 0.15 }} 
          />
          <Bar 
            dataKey="count" 
            fill={theme.chart1} 
            radius={[2, 2, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

CompensationHistogram.Skeleton = function HistogramSkeleton() {
  // A bell curve skeleton
  const heights = [10, 20, 40, 70, 90, 100, 85, 60, 30, 15, 5];
  
  return (
    <div className="w-full h-[200px] flex items-end justify-between py-6 px-4 gap-[2px]">
      {heights.map((h, i) => (
        <Skeleton 
          key={i} 
          className="w-full rounded-t-sm rounded-b-none" 
          style={{ height: `${h}%` }} 
        />
      ))}
    </div>
  );
};
