import React from "react";
import { CompanyProfileSkeleton } from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <CompanyProfileSkeleton />
    </div>
  );
}
