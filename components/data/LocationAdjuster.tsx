"use client";

import React, { useState, useMemo } from "react";
import { LOCATION_INDEX, adjustForLocation, getLocationComparison } from "@/lib/locationAdjustment";
import { formatCurrency } from "@/lib/formatters";
import { ArrowRightLeft, MapPin, Building2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { MOCK_COMPANIES } from "@/lib/data/mock/companies";
import Image from "next/image";

export function LocationAdjuster() {
  const [amountInput, setAmountInput] = useState<string>("4000000"); // Default 40L
  const [fromCity, setFromCity] = useState<string>("Bangalore");
  const [toCity, setToCity] = useState<string>("San Francisco");

  const amount = parseFloat(amountInput.replace(/,/g, "")) || 0;

  const adjustedAmount = useMemo(() => {
    return adjustForLocation(amount, fromCity, toCity);
  }, [amount, fromCity, toCity]);

  const comparison = useMemo(() => {
    return getLocationComparison(fromCity, toCity);
  }, [fromCity, toCity]);

  const handleSwap = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  // Find top companies in the target city paying above market (mock logic)
  const topCompaniesInTargetCity = useMemo(() => {
    const cityRecords = MOCK_SALARIES.filter(r => r.location.city.toLowerCase().includes(toCity.toLowerCase()));
    
    // Group by company
    const companyMedians: Record<string, { company: string; total: number; count: number }> = {};
    cityRecords.forEach(r => {
      const slug = r.company.slug;
      if (!companyMedians[slug]) {
        companyMedians[slug] = { company: slug, total: 0, count: 0 };
      }
      companyMedians[slug].total += r.totalCompensation;
      companyMedians[slug].count += 1;
    });

    const results = Object.values(companyMedians)
      .map(c => ({
        slug: c.company,
        median: c.total / c.count,
        count: c.count
      }))
      .sort((a, b) => b.median - a.median)
      .slice(0, 3)
      .map(c => {
        const meta = MOCK_COMPANIES.find(comp => comp.slug === c.slug);
        return { ...c, meta };
      })
      .filter(c => c.meta); // ensure valid company
      
    return results;
  }, [toCity]);

  // Find Min and Max COL to plot the axis
  const maxCol = Math.max(...LOCATION_INDEX.map(c => c.colIndex));
  const minCol = Math.min(...LOCATION_INDEX.map(c => c.colIndex));

  return (
    <div className="flex flex-col gap-6">
      
      {/* Calculator Section */}
      <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-sm space-y-5">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <TrendingUp className="size-4 text-brand-primary" />
          Purchasing Power Calculator
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Current Compensation (INR)</label>
            <Input 
              value={amountInput} 
              onChange={(e) => setAmountInput(e.target.value)} 
              type="number" 
              className="font-mono"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">From City</label>
              <Select value={fromCity} onValueChange={(v) => v && setFromCity(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LOCATION_INDEX.map(c => (
                    <SelectItem key={c.city} value={c.city}>{c.city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" size="icon" className="shrink-0 mt-6 rounded-full" onClick={handleSwap}>
              <ArrowRightLeft className="size-4" />
            </Button>

            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">To City</label>
              <Select value={toCity} onValueChange={(v) => v && setToCity(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LOCATION_INDEX.map(c => (
                    <SelectItem key={c.city} value={c.city}>{c.city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-2">
          <div className="text-sm text-muted-foreground">Equivalent Standard of Living</div>
          <div className="text-3xl font-bold tracking-tight text-foreground">
            {formatCurrency(adjustedAmount, "INR")}
          </div>
          <p className="text-sm font-medium mt-2 leading-relaxed">
            Your <span className="font-bold text-foreground">{formatCurrency(amount, "INR")}</span> in {fromCity} is equivalent to <span className="font-bold text-brand-primary">{formatCurrency(adjustedAmount, "INR")}</span> in {toCity} in purchasing power terms.
          </p>
          <p className="text-xs text-muted-foreground">
            {comparison.explanation}
          </p>
        </div>
      </div>

      {/* Axis Plot */}
      <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-sm">
        <h3 className="font-semibold text-sm mb-6 flex items-center gap-2">
          <MapPin className="size-4 text-brand-primary" />
          Cost of Living Index
        </h3>
        
        <div className="relative h-16 w-full mb-2">
          {/* Axis line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 rounded-full" />
          
          {LOCATION_INDEX.map(c => {
            const isSelected = c.city === fromCity || c.city === toCity;
            const isFrom = c.city === fromCity;
            // Map index to percentage between min and max (with padding)
            const padding = 10;
            const pct = padding + ((c.colIndex - minCol) / (maxCol - minCol)) * (100 - padding * 2);
            
            return (
              <div 
                key={c.city} 
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${pct}%`, zIndex: isSelected ? 10 : 1 }}
              >
                <div 
                  className={`size-3 rounded-full border-2 transition-all duration-300 ${
                    isSelected 
                      ? isFrom ? "bg-amber-500 border-background size-4 shadow-md" : "bg-brand-primary border-background size-4 shadow-md" 
                      : "bg-muted-foreground/30 border-background"
                  }`} 
                  title={`${c.city} (Index: ${c.colIndex})`}
                />
                {isSelected && (
                  <div className={`absolute top-5 text-[10px] font-bold whitespace-nowrap ${isFrom ? "text-amber-600" : "text-brand-primary"}`}>
                    {c.city}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
          <span>Cheaper</span>
          <span>More Expensive</span>
        </div>
      </div>

      {/* Top Companies Section */}
      {topCompaniesInTargetCity.length > 0 && (
        <div className="p-5 rounded-2xl bg-card border border-border/50 shadow-sm space-y-4">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Building2 className="size-4 text-brand-primary" />
            Top paying in {toCity}
          </h3>
          <div className="space-y-3">
            {topCompaniesInTargetCity.map((c, i) => (
              <div key={c.slug} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-xs font-bold text-muted-foreground/50 w-3">{i + 1}</span>
                <Image src={c.meta!.logo || "https://ui-avatars.com/api/?name=Company"} alt={c.meta!.name || "Company"} width={24} height={24} className="size-6 rounded-md object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{c.meta!.name}</div>
                </div>
                <div className="text-sm font-bold">{formatCurrency(c.median, "INR")}</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
