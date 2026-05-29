import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export interface ChartThemeColors {
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  mutedForeground: string;
  border: string;
  foreground: string;
  background: string;
  card: string;
}

export function useChartTheme() {
  const { resolvedTheme } = useTheme();
  
  // Default values to prevent layout shift during SSR or before hydration
  const [colors, setColors] = useState<ChartThemeColors>(() => ({
    chart1: "hsl(214, 100%, 45%)",
    chart2: "hsl(174, 85%, 42%)",
    chart3: "hsl(43, 100%, 50%)",
    chart4: "hsl(348, 83%, 47%)",
    chart5: "hsl(280, 65%, 60%)",
    mutedForeground: "hsl(215.4, 16.3%, 46.9%)",
    border: "hsl(214.3, 31.8%, 91.4%)",
    foreground: "hsl(222.2, 84%, 4.9%)",
    background: "hsl(210, 40%, 98%)",
    card: "hsl(0, 0%, 100%)",
  }));

  useEffect(() => {
    const getVar = (name: string, fallback: string): string => {
      if (typeof window === "undefined") return fallback;
      
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
        
      if (!value) return fallback;
      
      // If the variable is just numbers/percentages (like shadcn standard format "210 40% 98%"),
      // wrap it in hsl() so it's a valid CSS color string for Recharts/SVG attributes.
      if (/^\d+(\.\d+)?\s+\d+%\s+\d+(\.\d+)?%$/.test(value)) {
        return `hsl(${value})`;
      }
      
      return value;
    };

    setColors({
      chart1: getVar("--chart-1", "hsl(214, 100%, 45%)"),
      chart2: getVar("--chart-2", "hsl(174, 85%, 42%)"),
      chart3: getVar("--chart-3", "hsl(43, 100%, 50%)"),
      chart4: getVar("--chart-4", "hsl(348, 83%, 47%)"),
      chart5: getVar("--chart-5", "hsl(280, 65%, 60%)"),
      mutedForeground: getVar("--muted-foreground", "hsl(215.4, 16.3%, 46.9%)"),
      border: getVar("--border", "hsl(214.3, 31.8%, 91.4%)"),
      foreground: getVar("--foreground", "hsl(222.2, 84%, 4.9%)"),
      background: getVar("--background", "hsl(210, 40%, 98%)"),
      card: getVar("--card", "hsl(0, 0%, 100%)"),
    });
  }, [resolvedTheme]);

  return colors;
}
