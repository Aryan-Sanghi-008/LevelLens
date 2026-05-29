import Image from "next/image";
import { getCompanyProfile } from "@/lib/data/companyStats";
import { formatCurrency, getLevelBadgeVariant, getLevelColor } from "@/lib/formatters";
import { NormalizedLevel } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  ExternalLink,
  Calendar,
  Users,
  TrendingUp,
  BarChart3,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

export async function CompanyProfileHero({ slug }: { slug: string }) {
  const profile = getCompanyProfile(slug);
  if (!profile) notFound();

  const { meta, medianTotal, p90Total, dataPointCount, levelDistribution } = profile;
  const topLevelEntry = Object.entries(levelDistribution).sort((a, b) => b[1] - a[1])[0];
  const topLevel = topLevelEntry ? (topLevelEntry[0] as NormalizedLevel) : "N/A";

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 border-b border-border pb-8">
        <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl border-4 border-background bg-muted shadow-md overflow-hidden z-10">
          {meta.logo ? (
            <Image
              src={meta.logo || "https://ui-avatars.com/api/?name=Company"}
              alt={meta.name || "Company"}
              width={64}
              height={64}
              className="size-full object-cover"
            />
          ) : (
            <Building2 className="size-12 text-muted-foreground/50" />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{meta.name}</h1>
            <Badge variant="secondary" className="px-2 py-0.5">
              {meta.industry}
            </Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
            {meta.description}
          </p>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Median Total Comp
            </CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(medianTotal, "INR", true)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all roles & levels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              90th Percentile
            </CardTitle>
            <BarChart3 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">
              {formatCurrency(p90Total, "INR", true)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Top 10% earners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Data Points
            </CardTitle>
            <Database className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dataPointCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Verified records</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Most Common Level
            </CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge
                variant={getLevelBadgeVariant(topLevel as NormalizedLevel)}
                className={cn(
                  "text-base px-2 py-0.5",
                  getLevelColor(topLevel as NormalizedLevel)
                )}
              >
                {topLevel}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {topLevelEntry?.[1]} records
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
