import { getCompanyProfile, getGlobalLevelMedians } from "@/lib/data/companyStats";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { formatCurrency, getPercentileBand, getLevelColor, getLevelBadgeVariant } from "@/lib/formatters";
import { NormalizedLevel } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LevelDistributionBar } from "@/components/charts/LevelDistributionBar";
import {
  CompanyCompensationCards,
  type LevelCompRow,
} from "@/components/data/CompanyCompensationCards";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

export async function CompanyProfileTabs({ slug }: { slug: string }) {
  const profile = getCompanyProfile(slug);
  const globalMedians = getGlobalLevelMedians();
  if (!profile) notFound();

  const { levelDistribution, levelCompensation } = profile;

  const chartData = Object.entries(levelDistribution)
    .filter(([, count]) => count > 0)
    .map(([level, count]) => ({
      level: level as NormalizedLevel,
      count,
    }));

  const compRows: LevelCompRow[] = Object.values(NormalizedLevel)
    .map((level) => {
      const comp = levelCompensation[level];
      if (!comp || comp.count === 0) return null;
      return { level, ...comp };
    })
    .filter((r): r is LevelCompRow => r !== null);

  const rolesMap = new Map<string, number[]>();
  MOCK_SALARIES.filter((r) => r.company.slug === slug).forEach((r) => {
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

  const locationData = Object.entries(profile.locationDistribution)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <Tabs defaultValue="compensation" className="w-full mt-4">
      <TabsList className="flex w-full max-w-none h-auto overflow-x-auto justify-start gap-1 mb-6 p-1 md:grid md:max-w-2xl md:grid-cols-4 md:overflow-visible">
        <TabsTrigger value="compensation" className="shrink-0">
          Compensation
        </TabsTrigger>
        <TabsTrigger value="levels" className="shrink-0">
          Levels
        </TabsTrigger>
        <TabsTrigger value="roles" className="shrink-0">
          Roles
        </TabsTrigger>
        <TabsTrigger value="locations" className="shrink-0">
          Locations
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="compensation"
        className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
      >
        <CompanyCompensationCards rows={compRows} globalMedians={globalMedians} />
        <div className="hidden md:block overflow-x-auto">
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
              {Object.values(NormalizedLevel).map((level) => {
                const comp = levelCompensation[level];
                if (!comp || comp.count === 0) return null;

                const globalMedian = globalMedians[level] || 1;
                const diffRatio = comp.total / globalMedian;

                let colorClass = "text-foreground";
                if (diffRatio > 1.2)
                  colorClass =
                    "text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10";
                else if (diffRatio > 1.05)
                  colorClass = "text-emerald-500 font-medium bg-emerald-500/5";
                else if (diffRatio < 0.8)
                  colorClass = "text-red-600 dark:text-red-400 font-bold bg-red-500/10";
                else if (diffRatio < 0.95)
                  colorClass = "text-red-500 font-medium bg-red-500/5";

                return (
                  <tr key={level} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <Badge
                        variant={getLevelBadgeVariant(level)}
                        className={cn("px-1.5 py-0 text-[10px]", getLevelColor(level))}
                      >
                        {level}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {formatCurrency(comp.base, "INR", true)}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {comp.stock > 0 ? formatCurrency(comp.stock, "INR", true) : "-"}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {comp.bonus > 0 ? formatCurrency(comp.bonus, "INR", true) : "-"}
                    </td>
                    <td className={cn("px-6 py-4 transition-colors", colorClass)}>
                      {formatCurrency(comp.total, "INR", true)}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">
                      {comp.count}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TabsContent>

      <TabsContent
        value="levels"
        className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm overflow-x-auto"
      >
        <h2 className="text-xl font-bold mb-6">Level Distribution</h2>
        <LevelDistributionBar data={chartData} />
      </TabsContent>

      <TabsContent
        value="roles"
        className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
      >
        <div className="md:hidden divide-y divide-border">
          {roleData.map((r) => (
            <div
              key={r.role}
              className="flex items-center justify-between px-4 py-3"
            >
              <div>
                <p className="font-medium text-sm">{r.role}</p>
                <p className="text-xs text-muted-foreground">{r.count} data points</p>
              </div>
              <p className="font-bold text-sm">
                {formatCurrency(r.median, "INR", true)}
              </p>
            </div>
          ))}
        </div>
        <table className="hidden md:table w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Median Total Comp</th>
              <th className="px-6 py-4">Data Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {roleData.map((r) => (
              <tr key={r.role} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium">{r.role}</td>
                <td className="px-6 py-4 font-bold">
                  {formatCurrency(r.median, "INR", true)}
                </td>
                <td className="px-6 py-4 text-muted-foreground">{r.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TabsContent>

      <TabsContent
        value="locations"
        className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
      >
        <div className="md:hidden divide-y divide-border">
          {locationData.map((l) => (
            <div
              key={l.city}
              className="flex items-center justify-between px-4 py-3"
            >
              <p className="font-medium text-sm">{l.city}</p>
              <p className="text-sm text-muted-foreground">{l.count} points</p>
            </div>
          ))}
        </div>
        <table className="hidden md:table w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Data Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {locationData.map((l) => (
              <tr key={l.city} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium">{l.city}</td>
                <td className="px-6 py-4 text-muted-foreground">{l.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TabsContent>
    </Tabs>
  );
}
