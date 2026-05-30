"use client";

import * as React from "react";
import { CompanyLogo } from "@/components/shared/CompanyLogo";
import { useQueryStates } from "nuqs";
import { filterParsers } from "@/lib/searchParams";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { MOCK_COMPANIES } from "@/lib/data/mock/companies";

import { NormalizedLevel } from "@/types";
import { formatCurrency } from "@/lib/formatters";

import { ActiveFilters } from "./ActiveFilters";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ShieldCheck, Landmark, MapPin, Briefcase, Building, Layers, Sparkles, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";

// Pre-calculate facet lists
const ALL_ROLES = Array.from(new Set(MOCK_SALARIES.map(s => s.role))).sort();
const ALL_CITIES = Array.from(new Set(MOCK_SALARIES.map(s => s.location.city).filter(Boolean))) as string[];
const ALL_REGIONS = Array.from(new Set(MOCK_SALARIES.map(s => s.location.region).filter(Boolean))) as string[];
const ALL_COUNTRIES = Array.from(new Set(MOCK_SALARIES.map(s => s.location.country).filter(Boolean))) as string[];

export function FilterPanel() {
  const [filters, setFilters] = useQueryStates(filterParsers);

  // Search states for roles and companies
  const [roleSearch, setRoleSearch] = React.useState("");
  const [isRolesExpanded, setIsRolesExpanded] = React.useState(false);

  const [companySearch, setCompanySearch] = React.useState("");
  const [isCompaniesExpanded, setIsCompaniesExpanded] = React.useState(false);

  // Normalized Level Count
  const getLevelCount = (level: string) => MOCK_SALARIES.filter(s => s.normalizedLevel === level).length;

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
  };

  const handleLevelToggle = (level: string) => {
    setFilters({ levels: toggleArrayItem(filters.levels, level) });
  };

  // Role Filtering
  const filteredRoles = React.useMemo(() => {
    return ALL_ROLES.filter(role => 
      role.toLowerCase().includes(roleSearch.toLowerCase())
    );
  }, [roleSearch]);

  const displayedRoles = isRolesExpanded ? filteredRoles : filteredRoles.slice(0, 5);

  // Company Filtering
  const filteredCompanies = React.useMemo(() => {
    return MOCK_COMPANIES.filter(company => 
      company.name.toLowerCase().includes(companySearch.toLowerCase())
    );
  }, [companySearch]);

  const displayedCompanies = isCompaniesExpanded ? filteredCompanies : filteredCompanies.slice(0, 5);

  // Currency Slider Bounds Config
  const activeCurrency = filters.currency || "USD";
  const currencyConfigs: Record<string, { min: number; max: number; step: number; symbol: string }> = {
    USD: { min: 0, max: 1000000, step: 10000, symbol: "$" },
    INR: { min: 0, max: 15000000, step: 100000, symbol: "₹" },
    GBP: { min: 0, max: 800000, step: 5000, symbol: "£" }
  };

  const currentCurrencyConfig = currencyConfigs[activeCurrency] || currencyConfigs.USD;

  // Compensation Presets Config
  const presets: Record<string, { label: string; min: number; max: number | null }[]> = {
    INR: [
      { label: "₹10L–25L", min: 1000000, max: 2500000 },
      { label: "₹25L–50L", min: 2500000, max: 5000000 },
      { label: "₹50L–1Cr", min: 5000000, max: 10000000 },
      { label: "₹1Cr+", min: 10000000, max: null }
    ],
    USD: [
      { label: "$100K–250K", min: 100000, max: 250000 },
      { label: "$250K–500K", min: 250000, max: 500000 },
      { label: "$500K–1M", min: 500000, max: 1000000 },
      { label: "$1M+", min: 1000000, max: null }
    ],
    GBP: [
      { label: "£80K–200K", min: 80000, max: 200000 },
      { label: "£200K–400K", min: 200000, max: 400000 },
      { label: "£400K–800K", min: 400000, max: 800000 },
      { label: "£800K+", min: 800000, max: null }
    ]
  };

  const currentPresets = presets[activeCurrency] || presets.USD;

  const handleCurrencyChange = (val: string | null) => {
    if (!val) return;
    setFilters({
      currency: val === "USD" ? null : val,
      minComp: null,
      maxComp: null
    });
  };

  return (
    <div className="w-full space-y-4">
      <ActiveFilters />

      <Accordion 
        multiple
        defaultValue={["levels", "role", "company", "comp", "yoe", "verified", "currency", "location"]} 
        className="w-full space-y-3"
      >
        {/* 1. Normalized Level */}
        <AccordionItem value="levels" className="border border-border/80 rounded-xl bg-card px-4 shadow-sm hover:border-border transition-colors">
          <AccordionTrigger className="hover:no-underline py-3.5 text-sm font-semibold flex items-center gap-2">
            <Layers className="h-4 w-4 text-brand-primary/80" />
            <span>Normalized Level</span>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-4">
            <div className="grid grid-cols-2 gap-2">
              {Object.values(NormalizedLevel).map((level) => {
                const isSelected = filters.levels.includes(level);
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleLevelToggle(level)}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 active:scale-95 select-none",
                      isSelected 
                        ? "border-brand-primary/40 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/15 font-semibold shadow-sm" 
                        : "border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="truncate">{level}</span>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "text-[9px] font-normal px-1 py-0 select-none",
                        isSelected ? "bg-brand-primary/20 text-brand-primary" : "bg-muted text-muted-foreground/80"
                      )}
                    >
                      {getLevelCount(level)}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 2. Role / Function */}
        <AccordionItem value="role" className="border border-border/80 rounded-xl bg-card px-4 shadow-sm hover:border-border transition-colors">
          <AccordionTrigger className="hover:no-underline py-3.5 text-sm font-semibold flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-brand-primary/80" />
            <span>Role / Function</span>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-4 space-y-3">
            <input
              type="text"
              aria-label="Search roles"
              placeholder="Search roles..."
              value={roleSearch}
              onChange={(e) => setRoleSearch(e.target.value)}
              className="w-full h-8 px-3 rounded-lg border border-border/80 bg-background text-xs placeholder:text-muted-foreground/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:border-brand-primary transition-all"
            />
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {displayedRoles.length === 0 ? (
                <p className="text-xs text-muted-foreground/80 py-2 text-center">No roles found.</p>
              ) : (
                displayedRoles.map((role) => {
                  const isSelected = filters.roles.includes(role);
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setFilters({ roles: toggleArrayItem(filters.roles, role) })}
                      className={cn(
                        "flex items-center w-full px-2 py-1.5 rounded-md text-xs transition-colors text-left select-none",
                        isSelected 
                          ? "bg-brand-primary/10 text-brand-primary font-medium" 
                          : "hover:bg-muted text-foreground/90"
                      )}
                    >
                      <div className={cn(
                        "mr-2 flex h-3.5 w-3.5 items-center justify-center rounded-sm border transition-all",
                        isSelected 
                          ? "border-brand-primary bg-brand-primary text-brand-primary-foreground" 
                          : "border-border bg-background"
                      )}>
                        <Check className={cn("h-2.5 w-2.5 stroke-[3px]", isSelected ? "block" : "hidden")} />
                      </div>
                      <span className="truncate">{role}</span>
                    </button>
                  );
                })
              )}
            </div>
            {filteredRoles.length > 5 && (
              <button
                type="button"
                onClick={() => setIsRolesExpanded(!isRolesExpanded)}
                className="text-[10px] font-semibold text-brand-primary hover:text-brand-primary-hover flex items-center gap-1 select-none pt-1"
              >
                {isRolesExpanded ? "Show less" : `Show more (+${filteredRoles.length - 5})`}
              </button>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* 3. Company */}
        <AccordionItem value="company" className="border border-border/80 rounded-xl bg-card px-4 shadow-sm hover:border-border transition-colors">
          <AccordionTrigger className="hover:no-underline py-3.5 text-sm font-semibold flex items-center gap-2">
            <Building className="h-4 w-4 text-brand-primary/80" />
            <span>Company</span>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-4 space-y-3">
            <input
              type="text"
              aria-label="Search companies"
              placeholder="Search companies..."
              value={companySearch}
              onChange={(e) => setCompanySearch(e.target.value)}
              className="w-full h-8 px-3 rounded-lg border border-border/80 bg-background text-xs placeholder:text-muted-foreground/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:border-brand-primary transition-all"
            />
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {displayedCompanies.length === 0 ? (
                <p className="text-xs text-muted-foreground/80 py-2 text-center">No companies found.</p>
              ) : (
                displayedCompanies.map((company) => {
                  const isSelected = filters.companies.includes(company.slug);
                  return (
                    <button
                      key={company.slug}
                      type="button"
                      onClick={() => setFilters({ companies: toggleArrayItem(filters.companies, company.slug) })}
                      className={cn(
                        "flex items-center w-full px-2 py-1.5 rounded-md text-xs transition-colors text-left select-none",
                        isSelected 
                          ? "bg-brand-primary/10 text-brand-primary font-medium" 
                          : "hover:bg-muted text-foreground/90"
                      )}
                    >
                      <div className={cn(
                        "mr-2 flex h-3.5 w-3.5 items-center justify-center rounded-sm border transition-all",
                        isSelected 
                          ? "border-brand-primary bg-brand-primary text-brand-primary-foreground" 
                          : "border-border bg-background"
                      )}>
                        <Check className={cn("h-2.5 w-2.5 stroke-[3px]", isSelected ? "block" : "hidden")} />
                      </div>
                      <CompanyLogo
                        src={company.logo}
                        name={company.name}
                        alt={company.name || "Company"}
                        width={16}
                        height={16}
                        className="h-4 w-4 rounded-md mr-2 object-cover border border-border/40"
                      />
                      <span className="truncate">{company.name}</span>
                    </button>
                  );
                })
              )}
            </div>
            {filteredCompanies.length > 5 && (
              <button
                type="button"
                onClick={() => setIsCompaniesExpanded(!isCompaniesExpanded)}
                className="text-[10px] font-semibold text-brand-primary hover:text-brand-primary-hover flex items-center gap-1 select-none pt-1"
              >
                {isCompaniesExpanded ? "Show less" : `Show more (+${filteredCompanies.length - 5})`}
              </button>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* 4. Location */}
        <AccordionItem value="location" className="border border-border/80 rounded-xl bg-card px-4 shadow-sm hover:border-border transition-colors">
          <AccordionTrigger className="hover:no-underline py-3.5 text-sm font-semibold flex items-center gap-2">
            <MapPin className="h-4 w-4 text-brand-primary/80" />
            <span>Location</span>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-4">
            <Tabs defaultValue="city" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-3 h-8 bg-muted/60 p-0.5 rounded-lg">
                <TabsTrigger value="city" className="text-[11px] py-1 rounded-md">City</TabsTrigger>
                <TabsTrigger value="region" className="text-[11px] py-1 rounded-md">Region</TabsTrigger>
                <TabsTrigger value="country" className="text-[11px] py-1 rounded-md">Country</TabsTrigger>
              </TabsList>
              
              <TabsContent value="city" className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {ALL_CITIES.map(city => (
                  <div key={city} className="flex items-center space-x-2.5 py-0.5">
                    <Checkbox 
                      id={`loc-city-${city}`} 
                      checked={filters.location.includes(city)}
                      onCheckedChange={() => setFilters({ location: toggleArrayItem(filters.location, city) })}
                    />
                    <label htmlFor={`loc-city-${city}`} className="text-xs text-foreground/80 cursor-pointer font-medium select-none truncate">
                      {city}
                    </label>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="country" className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {ALL_COUNTRIES.map(country => (
                  <div key={country} className="flex items-center space-x-2.5 py-0.5">
                    <Checkbox 
                      id={`loc-country-${country}`} 
                      checked={filters.location.includes(country)}
                      onCheckedChange={() => setFilters({ location: toggleArrayItem(filters.location, country) })}
                    />
                    <label htmlFor={`loc-country-${country}`} className="text-xs text-foreground/80 cursor-pointer font-medium select-none truncate">
                      {country}
                    </label>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="region" className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {ALL_REGIONS.map(region => (
                  <div key={region} className="flex items-center space-x-2.5 py-0.5">
                    <Checkbox 
                      id={`loc-region-${region}`} 
                      checked={filters.location.includes(region)}
                      onCheckedChange={() => setFilters({ location: toggleArrayItem(filters.location, region) })}
                    />
                    <label htmlFor={`loc-region-${region}`} className="text-xs text-foreground/80 cursor-pointer font-medium select-none truncate">
                      {region}
                    </label>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>

        {/* 5. Total Compensation Range */}
        <AccordionItem value="comp" className="border border-border/80 rounded-xl bg-card px-4 shadow-sm hover:border-border transition-colors">
          <AccordionTrigger className="hover:no-underline py-3.5 text-sm font-semibold flex items-center gap-2">
            <Landmark className="h-4 w-4 text-brand-primary/80" />
            <span>Total Compensation</span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-5">
            <div className="flex justify-between items-center bg-muted/30 p-2 rounded-lg border border-border/50 text-xs font-semibold text-foreground/90 select-none">
              <span>{formatCurrency(filters.minComp || 0, activeCurrency, true)}</span>
              <span className="text-[10px] text-muted-foreground font-normal">to</span>
              <span>{filters.maxComp ? formatCurrency(filters.maxComp, activeCurrency, true) : `${formatCurrency(currentCurrencyConfig.max, activeCurrency, true)}+`}</span>
            </div>
            
            <Slider
              min={currentCurrencyConfig.min}
              max={currentCurrencyConfig.max}
              step={currentCurrencyConfig.step}
              value={[filters.minComp || currentCurrencyConfig.min, filters.maxComp || currentCurrencyConfig.max]}
              onValueChange={(val) => {
                const min = Array.isArray(val) ? val[0] : val;
                const max = Array.isArray(val) ? val[1] : currentCurrencyConfig.max;
                setFilters({
                  minComp: min === currentCurrencyConfig.min ? null : min,
                  maxComp: max === currentCurrencyConfig.max ? null : max
                });
              }}
              className="py-1"
            />

            <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-border/40 select-none">
              {currentPresets.map((preset) => {
                const isSelected = filters.minComp === preset.min && filters.maxComp === preset.max;
                return (
                  <Button 
                    key={preset.label}
                    variant={isSelected ? "default" : "outline"} 
                    size="sm" 
                    className={cn(
                      "text-[10px] h-8 font-medium rounded-lg transition-all",
                      isSelected && "shadow-xs bg-brand-primary hover:bg-brand-primary/90 text-brand-primary-foreground"
                    )}
                    onClick={() => setFilters({ minComp: preset.min, maxComp: preset.max })}
                  >
                    {preset.label}
                  </Button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 6. Years of Experience */}
        <AccordionItem value="yoe" className="border border-border/80 rounded-xl bg-card px-4 shadow-sm hover:border-border transition-colors">
          <AccordionTrigger className="hover:no-underline py-3.5 text-sm font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-primary/80" />
            <span>Years of Experience</span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 space-y-5">
            <div className="flex justify-between items-center bg-muted/30 p-2 rounded-lg border border-border/50 text-xs font-semibold text-foreground/90 select-none">
              <span>{filters.minYoe ?? 0} yrs</span>
              <span className="text-[10px] text-muted-foreground font-normal">to</span>
              <span>{filters.maxYoe === 20 || !filters.maxYoe ? "20+ yrs" : `${filters.maxYoe} yrs`}</span>
            </div>
            
            <Slider
              min={0}
              max={20}
              step={1}
              value={[filters.minYoe || 0, filters.maxYoe || 20]}
              onValueChange={(val) => {
                const min = Array.isArray(val) ? val[0] : val;
                const max = Array.isArray(val) ? val[1] : 20;
                setFilters({
                  minYoe: min === 0 ? null : min,
                  maxYoe: max === 20 ? null : max
                });
              }}
              className="py-1"
            />
          </AccordionContent>
        </AccordionItem>

        {/* 7. Verified Only */}
        <AccordionItem value="verified" className="border border-border/80 rounded-xl bg-card px-4 shadow-sm hover:border-border transition-colors">
          <AccordionTrigger className="hover:no-underline py-3.5 text-sm font-semibold flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand-primary/80" />
            <span>Verified Status</span>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-4">
            <div className="flex items-center justify-between py-1 bg-muted/10 px-2 rounded-lg border border-border/30">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                <span className="text-xs font-medium">Show Verified Only</span>
              </div>
              <Switch 
                checked={filters.verified || false} 
                onCheckedChange={(checked) => setFilters({ verified: checked ? true : null })} 
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 8. Currency */}
        <AccordionItem value="currency" className="border border-border/80 rounded-xl bg-card px-4 shadow-sm hover:border-border transition-colors">
          <AccordionTrigger className="hover:no-underline py-3.5 text-sm font-semibold flex items-center gap-2">
            <Sliders className="h-4 w-4 text-brand-primary/80" />
            <span>Currency Display</span>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-4 space-y-3">
            <Select 
              value={activeCurrency} 
              onValueChange={handleCurrencyChange}
            >
              <SelectTrigger className="w-full h-9 rounded-lg border-border/80 bg-background text-xs shadow-xs focus:ring-1 focus:ring-brand-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                <SelectItem value="USD" className="text-xs">USD ($) — United States Dollar</SelectItem>
                <SelectItem value="INR" className="text-xs">INR (₹) — Indian Rupee</SelectItem>
                <SelectItem value="GBP" className="text-xs">GBP (£) — British Pound</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-[10px] text-muted-foreground/80 leading-relaxed bg-muted/30 p-2 rounded-md border border-border/40">
              💡 Selecting a currency dynamically converts all salaries in the dataset to format and compare them perfectly!
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
