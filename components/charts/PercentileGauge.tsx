"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface PercentileGaugeProps {
  percentile: number; // 0 to 100
  label?: string;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function PercentileGauge({ 
  percentile, 
  label = "Percentile", 
  size = "md",
  isLoading = false 
}: PercentileGaugeProps) {
  
  if (isLoading) return <PercentileGauge.Skeleton size={size} />;

  // Constrain percentile
  const clamped = Math.max(0, Math.min(100, percentile));
  
  // Dimensions
  let width, height, radius, strokeWidth, textBase, textSm;
  
  switch (size) {
    case "sm":
      width = 80; height = 40; radius = 35; strokeWidth = 6; textBase = "text-lg"; textSm = "text-[10px]";
      break;
    case "lg":
      width = 200; height = 100; radius = 90; strokeWidth = 12; textBase = "text-4xl"; textSm = "text-sm";
      break;
    case "md":
    default:
      width = 140; height = 70; radius = 60; strokeWidth = 10; textBase = "text-2xl"; textSm = "text-xs";
      break;
  }

  // Path properties
  const circumference = Math.PI * radius; // Semicircle
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  // Determine color based on percentile
  let color = "var(--color-primary, #3b82f6)"; // Default blue
  if (clamped < 25) color = "var(--color-destructive, #ef4444)"; // Red for low
  else if (clamped > 75) color = "var(--color-success, #10b981)"; // Green for high

  return (
    <div className="flex flex-col items-center justify-center relative" style={{ width }}>
      <svg 
        width={width} 
        height={height + strokeWidth / 2} 
        viewBox={`0 0 ${width} ${height + strokeWidth / 2}`}
        className="overflow-visible"
      >
        {/* Background Arc */}
        <path
          d={`M ${strokeWidth/2} ${height} A ${radius} ${radius} 0 0 1 ${width - strokeWidth/2} ${height}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-muted opacity-30"
        />
        
        {/* Foreground Arc */}
        <path
          d={`M ${strokeWidth/2} ${height} A ${radius} ${radius} 0 0 1 ${width - strokeWidth/2} ${height}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      <div className="absolute bottom-0 flex flex-col items-center translate-y-1/4">
        <span className={cn("font-bold tracking-tight", textBase)}>{clamped}</span>
        <span className={cn("text-muted-foreground font-medium uppercase", textSm)}>{label}</span>
      </div>
    </div>
  );
}

PercentileGauge.Skeleton = function GaugeSkeleton({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  let width, height;
  switch (size) {
    case "sm": width = 80; height = 40; break;
    case "lg": width = 200; height = 100; break;
    case "md":
    default: width = 140; height = 70; break;
  }

  return (
    <div className="flex flex-col items-center justify-center relative" style={{ width, height: height + 20 }}>
      <Skeleton className="w-full h-full rounded-t-full rounded-b-none" />
      <div className="absolute bottom-2 flex flex-col items-center gap-1 bg-background p-1">
        <Skeleton className="h-6 w-8" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
};
