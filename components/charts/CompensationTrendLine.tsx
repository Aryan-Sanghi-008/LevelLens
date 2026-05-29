"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/formatters";
import { Skeleton } from "@/components/ui/skeleton";

export interface TrendLineData {
  period: string; // e.g. "Q1 2024"
  [companyKey: string]: string | number; // company1: medianComp, company2: medianComp
}

interface CompensationTrendLineProps {
  data: TrendLineData[];
  dataKeys: { key: string; name: string; color?: string }[];
  isLoading?: boolean;
}

const DEFAULT_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-md text-sm min-w-[150px]">
        <p className="font-semibold mb-2">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-muted-foreground">{entry.name}</span>
              </div>
              <span className="font-medium">{formatCurrency(entry.value, "INR", true)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function CompensationTrendLine({ data, dataKeys, isLoading }: CompensationTrendLineProps) {
  if (isLoading) return <CompensationTrendLine.Skeleton />;
  if (!data || data.length === 0) return <div className="h-[300px] flex items-center justify-center text-muted-foreground">No trend data available</div>;

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <XAxis 
            dataKey="period" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            dy={10}
          />
          <YAxis 
            tickFormatter={(value) => formatCurrency(value, "INR", true)}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          />
          <Tooltip content={<CustomTooltip />} />
          {dataKeys.length > 1 && (
            <Legend 
              iconType="circle" 
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
          )}
          {dataKeys.map((dk, idx) => (
            <Line
              key={dk.key}
              type="monotone"
              dataKey={dk.key}
              name={dk.name}
              stroke={dk.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length]}
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

CompensationTrendLine.Skeleton = function TrendLineSkeleton() {
  return (
    <div className="w-full h-[300px] relative py-6 px-4">
      {/* Grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between py-10 opacity-20">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-full h-px bg-muted-foreground border-dashed" />
        ))}
      </div>
      {/* Wavy skeleton line representation */}
      <svg className="w-full h-full text-muted opacity-50" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M0,80 Q25,20 50,50 T100,30" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    </div>
  );
};
