import React, { Suspense } from "react";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
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
  const { company } = roleProfileSearchParamsCache.parse(searchParams);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary" />
        </div>
      }>
        <RolePageContent
          slug={slug}
          initialCompany={company}
        />
      </Suspense>
    </div>
  );
}
