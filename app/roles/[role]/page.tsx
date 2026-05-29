import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { MOCK_COMPANIES } from "@/lib/data/mock/companies";
import { slugify, formatCurrency } from "@/lib/formatters";
import { LevelLadder } from "@/components/charts/LevelLadder";
import { SalaryTable } from "@/components/data/SalaryTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Briefcase, Building2, Calendar, Users } from "lucide-react";

export async function generateStaticParams() {
  const roles = new Set(MOCK_SALARIES.map(s => s.role));
  return Array.from(roles).map(role => ({
    role: slugify(role),
  }));
}

export default function RolePage({ params }: { params: { role: string } }) {
  const { role: slug } = params;
  
  // Find original role name from slug
  const matchingRoleRecord = MOCK_SALARIES.find(s => slugify(s.role) === slug);
  if (!matchingRoleRecord) {
    notFound();
  }
  
  const roleName = matchingRoleRecord.role;
  const records = MOCK_SALARIES.filter(s => s.role === roleName);
  
  // Stats
  const totalRecords = records.length;
  const sortedDates = records.map(r => new Date(r.reportedAt).getTime()).sort((a, b) => a - b);
  const minDate = new Date(sortedDates[0]);
  const maxDate = new Date(sortedDates[sortedDates.length - 1]);
  
  // Top 5 companies by median total comp for this role
  const companyMedians = new Map<string, number[]>();
  for (const r of records) {
    if (!companyMedians.has(r.company.slug)) companyMedians.set(r.company.slug, []);
    companyMedians.get(r.company.slug)!.push(r.totalCompensation);
  }
  
  const topCompanies = Array.from(companyMedians.entries())
    .map(([cSlug, comps]) => {
      const sorted = [...comps].sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];
      const meta = MOCK_COMPANIES.find(c => c.slug === cSlug);
      return { meta, median, count: comps.length };
    })
    .filter(c => c.meta)
    .sort((a, b) => b.median - a.median)
    .slice(0, 5);

  const overallTopCompany = topCompanies[0]?.meta?.name || "N/A";

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <div className="flex items-center gap-3 text-muted-foreground mb-2">
          <Briefcase className="size-5" />
          <span className="text-sm font-medium tracking-wide uppercase">Role Insights</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{roleName}</h1>
        <p className="text-muted-foreground">Compensation benchmarking and career progression ladder.</p>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Data Points</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecords}</div>
            <p className="text-xs text-muted-foreground mt-1">Verified compensation records</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Paying Company</CardTitle>
            <Building2 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallTopCompany}</div>
            <p className="text-xs text-muted-foreground mt-1">Highest median across all levels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Date Range</CardTitle>
            <Calendar className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {minDate.getFullYear()} - {maxDate.getFullYear()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Dataset recency</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 mt-4">
        {/* Main Content Area */}
        <div className="flex flex-col gap-6">
          <Tabs defaultValue="ladder" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="ladder">Level Ladder</TabsTrigger>
              <TabsTrigger value="table">Salary Table</TabsTrigger>
              <TabsTrigger value="companies">Companies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ladder" className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-bold">Career Progression</h2>
                <p className="text-sm text-muted-foreground mt-1">Median total compensation (INR) by level across the industry.</p>
              </div>
              <LevelLadder records={records} />
            </TabsContent>
            
            <TabsContent value="table">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-xl font-bold">Raw Data</h2>
                  <p className="text-sm text-muted-foreground mt-1">All compensation records for {roleName}.</p>
                </div>
                <SalaryTable data={records} />
              </div>
            </TabsContent>
            
            <TabsContent value="companies">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-xl font-bold">Top Companies</h2>
                  <p className="text-sm text-muted-foreground mt-1">Highest paying companies for this role.</p>
                </div>
                {/* Simple list for companies tab */}
                <div className="space-y-4">
                  {topCompanies.map((c, i) => (
                    <div key={c.meta!.slug} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground font-medium w-4">{i + 1}</span>
                        <Image src={c.meta!.logo || "https://ui-avatars.com/api/?name=Company"} alt={c.meta!.name || "Company"} width={32} height={32} className="size-8 rounded-md object-cover" />
                        <div>
                          <h4 className="font-semibold">{c.meta!.name}</h4>
                          <p className="text-xs text-muted-foreground">{c.count} records</p>
                        </div>
                      </div>
                      <div className="text-lg font-bold">
                        {formatCurrency(c.median, "INR", true)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Paying</CardTitle>
              <CardDescription>Highest median compensation for {roleName}s</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCompanies.map((c) => (
                  <div key={c.meta!.slug} className="flex items-center gap-3">
                    <Image src={c.meta!.logo || "https://ui-avatars.com/api/?name=Company"} alt={c.meta!.name || "Company"} width={24} height={24} className="size-6 rounded-md object-cover" />
                    <div className="flex-1 flex flex-col min-w-0">
                      <span className="text-sm font-medium truncate">{c.meta!.name}</span>
                      <span className="text-[10px] text-muted-foreground">{c.count} points</span>
                    </div>
                    <span className="text-sm font-semibold">{formatCurrency(c.median, "INR", true)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
