// Server component

import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MOCK_COMPANIES } from "@/lib/data/mock/companies";
import { getCompanyProfile, getGlobalLevelMedians } from "@/lib/data/companyStats";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { formatCurrency, getPercentileBand, getLevelColor, getLevelBadgeVariant } from "@/lib/formatters";
import { NormalizedLevel } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, ExternalLink, Calendar, Users, TrendingUp, BarChart3, Database } from "lucide-react";
import { LevelDistributionBar } from "@/components/charts/LevelDistributionBar";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return MOCK_COMPANIES.map((company) => ({
    slug: company.slug,
  }));
}

export default function CompanyProfilePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  const profile = getCompanyProfile(slug);
  const globalMedians = getGlobalLevelMedians();
  
  if (!profile) {
    return notFound();
  }

  const { meta, medianTotal, p90Total, dataPointCount, levelDistribution, levelCompensation } = profile;

  // Determine top level by volume
  const topLevelEntry = Object.entries(levelDistribution).sort((a, b) => b[1] - a[1])[0];
  const topLevel = topLevelEntry ? (topLevelEntry[0] as NormalizedLevel) : "N/A";

  // Data for Levels BarChart
  const chartData = Object.entries(levelDistribution)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, count]) => count > 0)
    .map(([level, count]) => ({
      level: level as NormalizedLevel,
      count,
    }));

  // Roles Tab Data
  const rolesMap = new Map<string, number[]>();
  MOCK_SALARIES.filter(r => r.company.slug === slug).forEach(r => {
    if (!rolesMap.has(r.role)) rolesMap.set(r.role, []);
    rolesMap.get(r.role)!.push(r.totalCompensation);
  });
  const roleData = Array.from(rolesMap.entries())
    .map(([role, comps]) => ({
      role,
      count: comps.length,
      median: getPercentileBand(0, comps).p50,
    }))
    .sort((a, b) => b.median - a.median);

  // Locations Tab Data
  const locationData = Object.entries(profile.locationDistribution)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 border-b border-border pb-8">
        <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl border-4 border-background bg-muted shadow-md overflow-hidden z-10">
          {meta.logo ? (
            <Image src={meta.logo || "https://ui-avatars.com/api/?name=Company"} alt={meta.name || "Company"} width={64} height={64} className="size-full object-cover" />
          ) : (
            <Building2 className="size-12 text-muted-foreground/50" />
          )}
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{meta.name}</h1>
            <Badge variant="secondary" className="px-2 py-0.5">{meta.industry}</Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl text-sm md:text-base">{meta.description}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2 pt-2">
            <div className="flex items-center gap-1.5">
              <MapPin className="size-4" />
              <span>{meta.hq}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="size-4" />
              <span>{meta.size}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              <span>Founded {meta.founded}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ExternalLink className="size-4" />
              <span>{meta.funding}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Median Total Comp</CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(medianTotal, "INR", true)}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all roles & levels</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">90th Percentile</CardTitle>
            <BarChart3 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">{formatCurrency(p90Total, "INR", true)}</div>
            <p className="text-xs text-muted-foreground mt-1">Top 10% earners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Data Points</CardTitle>
            <Database className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dataPointCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Verified records</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Most Common Level</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge variant={getLevelBadgeVariant(topLevel as NormalizedLevel)} className={cn("text-base px-2 py-0.5", getLevelColor(topLevel as NormalizedLevel))}>
                {topLevel}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{topLevelEntry?.[1]} records</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="compensation" className="w-full mt-4">
        <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-6">
          <TabsTrigger value="compensation">Compensation</TabsTrigger>
          <TabsTrigger value="levels">Levels</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="compensation" className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Level</th>
                  <th className="px-6 py-4">Base (Median)</th>
                  <th className="px-6 py-4">Stock (Median)</th>
                  <th className="px-6 py-4">Bonus (Median)</th>
                  <th className="px-6 py-4">Total (Median)</th>
                  <th className="px-6 py-4">Records</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {Object.values(NormalizedLevel).map(level => {
                  const comp = levelCompensation[level];
                  if (!comp || comp.count === 0) return null;
                  
                  const globalMedian = globalMedians[level] || 1;
                  const diffRatio = comp.total / globalMedian;
                  
                  // Color intensity based on ratio vs global median
                  let colorClass = "text-foreground";
                  if (diffRatio > 1.2) colorClass = "text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10";
                  else if (diffRatio > 1.05) colorClass = "text-emerald-500 font-medium bg-emerald-500/5";
                  else if (diffRatio < 0.8) colorClass = "text-red-600 dark:text-red-400 font-bold bg-red-500/10";
                  else if (diffRatio < 0.95) colorClass = "text-red-500 font-medium bg-red-500/5";

                  return (
                    <tr key={level} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <Badge variant={getLevelBadgeVariant(level)} className={cn("px-1.5 py-0 text-[10px]", getLevelColor(level))}>
                          {level}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">{formatCurrency(comp.base, "INR", true)}</td>
                      <td className="px-6 py-4 text-muted-foreground">{comp.stock > 0 ? formatCurrency(comp.stock, "INR", true) : "-"}</td>
                      <td className="px-6 py-4 text-muted-foreground">{comp.bonus > 0 ? formatCurrency(comp.bonus, "INR", true) : "-"}</td>
                      <td className={cn("px-6 py-4 transition-colors", colorClass)}>
                        {formatCurrency(comp.total, "INR", true)}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-xs">{comp.count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="levels" className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Level Distribution</h2>
          <LevelDistributionBar data={chartData} />
        </TabsContent>
        
        <TabsContent value="roles" className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Median Total Comp</th>
                <th className="px-6 py-4">Data Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {roleData.map(r => (
                <tr key={r.role} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium">{r.role}</td>
                  <td className="px-6 py-4 font-bold">{formatCurrency(r.median, "INR", true)}</td>
                  <td className="px-6 py-4 text-muted-foreground">{r.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
        
        <TabsContent value="locations" className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Data Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {locationData.map(l => (
                <tr key={l.city} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium">{l.city}</td>
                  <td className="px-6 py-4 text-muted-foreground">{l.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
