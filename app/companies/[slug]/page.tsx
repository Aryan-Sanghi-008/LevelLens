import React, { Suspense } from "react";
import { MOCK_COMPANIES } from "@/lib/data/mock/companies";
import { CompanyProfileSkeleton, ChartSkeleton } from "@/components/shared/Skeletons";
import { CompanyProfileHero } from "./_sections/CompanyProfileHero";
import { CompanyProfileTabs } from "./_sections/CompanyProfileTabs";
import { companyProfileSearchParamsCache } from "@/lib/searchParams";

export async function generateStaticParams() {
  return MOCK_COMPANIES.map((company) => ({
    slug: company.slug,
  }));
}

export default function CompanyProfilePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { slug } = params;

  const { tab, level } = companyProfileSearchParamsCache.parse(searchParams);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <Suspense fallback={<CompanyProfileSkeleton />}>
        <CompanyProfileHero slug={slug} />
      </Suspense>

      <Suspense fallback={<ChartSkeleton className="h-64" />}>
        <CompanyProfileTabs slug={slug} initialTab={tab} initialLevel={level} />
      </Suspense>
    </div>
  );
}
