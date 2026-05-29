import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { MOCK_COMPANIES } from "@/lib/data/mock/companies";
import { getCompanyProfile } from "@/lib/data/companyStats";
import { CompanyProfileSkeleton, ChartSkeleton } from "@/components/shared/Skeletons";
import { CompanyProfileHero } from "./_sections/CompanyProfileHero";
import { CompanyProfileTabs } from "./_sections/CompanyProfileTabs";

export async function generateStaticParams() {
  return MOCK_COMPANIES.map((company) => ({
    slug: company.slug,
  }));
}

export default function CompanyProfilePage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!getCompanyProfile(slug)) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <Suspense fallback={<CompanyProfileSkeleton />}>
        <CompanyProfileHero slug={slug} />
      </Suspense>

      <Suspense fallback={<ChartSkeleton className="h-64" />}>
        <CompanyProfileTabs slug={slug} />
      </Suspense>
    </div>
  );
}
