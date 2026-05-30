"use client";

import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { LocationAdjuster } from "@/components/data/LocationAdjuster";
import { LocationHeatmap } from "@/components/charts/LocationHeatmap";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Info } from "lucide-react";

export default function LocationAdjustToolPage() {
  return (
    <PageShell
      title="Location Adjust Tool"
      description="Calculate purchasing power equivalence and view cost-of-living index offsets across regional tech hubs."
    >
      <div className="space-y-6 mt-2 md:mt-4 max-w-7xl mx-auto w-full">
        
        {/* Intro Info Card */}
        <Card className="border border-border/50 bg-card shadow-xs">
          <CardContent className="pt-5 flex gap-4 select-none">
            <div className="p-2.5 rounded-xl bg-brand-primary/10 text-brand-primary shrink-0 h-10 w-10 flex items-center justify-center">
              <Info className="size-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                Regional Purchasing Power Parity
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
                Salaries vary heavily across cities due to Cost of Living index discrepancies. 
                Use this calculator to find the equivalent standard-of-living purchasing power between two regions, 
                and see actual compensation densities mapped visually across geographic tech clusters.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Calculator & Heatmap Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Adjuster Calculator Column */}
          <div className="lg:col-span-2">
            <LocationAdjuster />
          </div>

          {/* Regional Heatmap Sidebar Column */}
          <div className="lg:col-span-1">
            <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col items-center">
              <h3 className="font-semibold text-sm self-start mb-4 flex items-center gap-2 select-none">
                <MapPin className="size-4.5 text-brand-primary" />
                Regional Compensation Densities
              </h3>
              <div className="w-full flex justify-center bg-muted/10 rounded-xl border border-border/30 overflow-hidden">
                <LocationHeatmap data={MOCK_SALARIES} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </PageShell>
  );
}
