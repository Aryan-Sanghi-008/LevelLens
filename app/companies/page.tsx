"use client";

import React, { useState, useMemo } from "react";
import { getAllCompanyProfiles, mergeCompanies } from "@/lib/data/companyStats";
import { CompanyCard } from "@/components/data/CompanyCard";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSubmissionStore } from "@/lib/hooks/useSubmissionStore";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";

const INDUSTRIES = ["All", "Technology", "Finance", "Consulting", "E-commerce", "Media & Entertainment"];
const SIZES = ["All", "1,000+", "5,000+", "10,000+", "50,000+", "100,000+"];

export default function CompaniesPage() {
  const submissions = useSubmissionStore((s) => s.submissions);

  const allProfiles = useMemo(() => {
    const allSalaries = [...submissions, ...MOCK_SALARIES];
    const allCompanies = mergeCompanies(submissions);
    return getAllCompanyProfiles(allSalaries, allCompanies);
  }, [submissions]);
  
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [sizeFilter, setSizeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("median_desc");

  const filteredAndSorted = useMemo(() => {
    let result = allProfiles;

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.industry?.toLowerCase().includes(q));
    }

    // Industry Filter
    if (industryFilter !== "All") {
      result = result.filter(p => p.industry === industryFilter);
    }

    // Size Filter
    if (sizeFilter !== "All") {
      result = result.filter(p => p.meta.size === sizeFilter);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "median_desc": return b.medianTotal - a.medianTotal;
        case "median_asc": return a.medianTotal - b.medianTotal;
        case "data_points": return b.dataPointCount - a.dataPointCount;
        case "name_asc": return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

    return result;
  }, [allProfiles, search, industryFilter, sizeFilter, sortBy]);

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 border-b border-border pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Companies</h1>
          <p className="text-muted-foreground">Explore compensation data across top tech companies.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full md:w-[280px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search companies..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={sortBy} onValueChange={(val) => val && setSortBy(val)}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="size-4" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="median_desc">Highest Comp</SelectItem>
              <SelectItem value="median_asc">Lowest Comp</SelectItem>
              <SelectItem value="data_points">Most Data</SelectItem>
              <SelectItem value="name_asc">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2">Industry:</span>
          {INDUSTRIES.map(ind => (
            <Badge 
              key={ind}
              variant={industryFilter === ind ? "default" : "outline"}
              className="cursor-pointer px-3 py-1 hover:bg-muted transition-colors"
              onClick={() => setIndustryFilter(ind)}
            >
              {ind}
            </Badge>
          ))}
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2">Headcount:</span>
          {SIZES.map(size => (
            <Badge 
              key={size}
              variant={sizeFilter === size ? "default" : "secondary"}
              className="cursor-pointer px-3 py-1 hover:bg-muted/80 transition-colors"
              onClick={() => setSizeFilter(size)}
            >
              {size}
            </Badge>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredAndSorted.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSorted.map(profile => (
            <CompanyCard key={profile.slug} profile={profile} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No companies found"
          description="Try adjusting your filters or search term."
          icon={Search}
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("");
                setIndustryFilter("All");
                setSizeFilter("All");
              }}
            >
              Clear filters
            </Button>
          }
          className="py-20"
        />
      )}
    </div>
  );
}
