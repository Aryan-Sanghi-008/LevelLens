import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { MOCK_COMPANIES } from "@/lib/data/mock/companies";
import { slugify } from "@/lib/formatters";
import { roleProfileSearchParamsCache } from "@/lib/searchParams";
import { RolePageContent } from "./RolePageContent";

export async function generateStaticParams() {
  const roles = new Set(MOCK_SALARIES.map((s) => s.role));
  return Array.from(roles).map((role) => ({
    role: slugify(role),
  }));
}

export default function RolePage({
  params,
  searchParams,
}: {
  params: { role: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { role: slug } = params;

  const matchingRoleRecord = MOCK_SALARIES.find((s) => slugify(s.role) === slug);
  if (!matchingRoleRecord) {
    notFound();
  }

  const roleName = matchingRoleRecord.role;
  const records = MOCK_SALARIES.filter((s) => s.role === roleName);

  const totalRecords = records.length;
  const sortedDates = records.map((r) => new Date(r.reportedAt).getTime()).sort((a, b) => a - b);
  const minDate = new Date(sortedDates[0]);
  const maxDate = new Date(sortedDates[sortedDates.length - 1]);

  const companyMedians = new Map<string, number[]>();
  for (const r of records) {
    if (!companyMedians.has(r.company.slug)) companyMedians.set(r.company.slug, []);
    companyMedians.get(r.company.slug)!.push(r.totalCompensation);
  }

  const topCompanies = Array.from(companyMedians.entries())
    .map(([cSlug, comps]) => {
      const sorted = [...comps].sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];
      const meta = MOCK_COMPANIES.find((c) => c.slug === cSlug);
      return { meta, median, count: comps.length };
    })
    .filter((c): c is { meta: typeof MOCK_COMPANIES[number]; median: number; count: number } => !!c.meta)
    .sort((a, b) => b.median - a.median)
    .slice(0, 5);

  const overallTopCompany = topCompanies[0]?.meta?.name || "N/A";
  const { company } = roleProfileSearchParamsCache.parse(searchParams);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary" />
        </div>
      }>
        <RolePageContent
          roleName={roleName}
          records={records}
          totalRecords={totalRecords}
          overallTopCompany={overallTopCompany}
          minYear={minDate.getFullYear()}
          maxYear={maxDate.getFullYear()}
          topCompanies={topCompanies}
          initialCompany={company}
        />
      </Suspense>
    </div>
  );
}
