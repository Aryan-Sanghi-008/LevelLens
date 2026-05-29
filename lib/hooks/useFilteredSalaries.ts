import { useMemo } from 'react';
import { CompensationRecord, FilterState, SortState } from '@/types';
import { MOCK_SALARIES } from '@/lib/data/mock/salaries';
import { convertCurrency } from '@/lib/formatters';
import { useSubmissionStore } from '@/lib/hooks/useSubmissionStore';

interface UseFilteredSalariesResult {
  data: CompensationRecord[];
  totalCount: number;
  filteredCount: number;
  isFiltered: boolean;
}

export function useFilteredSalaries(
  filters: Partial<FilterState>,
  sort: SortState
): UseFilteredSalariesResult {
  const submissions = useSubmissionStore((s) => s.submissions);

  const result = useMemo(() => {
    const targetCurrency = filters.currency || "USD";

    // Merge user submissions (prepend so they appear first) with the mock dataset
    const ALL_SALARIES: CompensationRecord[] = [...submissions, ...MOCK_SALARIES];


    // Map all records to the target currency first
    // This allows mathematically correct comparisons, sorting, and displays.
    const mapped = ALL_SALARIES.map(r => {
      if (r.currency === targetCurrency) return r;
      return {
        ...r,
        baseSalary: Math.round(convertCurrency(r.baseSalary, r.currency, targetCurrency)),
        stockPerYear: Math.round(convertCurrency(r.stockPerYear, r.currency, targetCurrency)),
        bonus: Math.round(convertCurrency(r.bonus, r.currency, targetCurrency)),
        totalCompensation: Math.round(convertCurrency(r.totalCompensation, r.currency, targetCurrency)),
        currency: targetCurrency,
      };
    });

    let filtered = [...mapped];
    let isFiltered = false;

    // Apply Filters
    if (filters.roles && filters.roles.length > 0) {
      filtered = filtered.filter(r => filters.roles!.includes(r.role));
      isFiltered = true;
    }
    
    if (filters.companies && filters.companies.length > 0) {
      filtered = filtered.filter(r => filters.companies!.includes(r.company.slug));
      isFiltered = true;
    }
    
    if (filters.levels && filters.levels.length > 0) {
      filtered = filtered.filter(r => filters.levels!.includes(r.normalizedLevel));
      isFiltered = true;
    }
    
    if (filters.locations && filters.locations.length > 0) {
      filtered = filtered.filter(r => 
        filters.locations!.includes(r.location.city) || 
        filters.locations!.includes(r.location.country) ||
        (r.location.region && filters.locations!.includes(r.location.region))
      );
      isFiltered = true;
    }
    
    if (filters.minComp !== undefined && filters.minComp !== null) {
      filtered = filtered.filter(r => r.totalCompensation >= filters.minComp!);
      isFiltered = true;
    }
    
    if (filters.maxComp !== undefined && filters.maxComp !== null) {
      filtered = filtered.filter(r => r.totalCompensation <= filters.maxComp!);
      isFiltered = true;
    }
    
    if (filters.minYoe !== undefined && filters.minYoe !== null) {
      filtered = filtered.filter(r => r.yearsOfExperience >= filters.minYoe!);
      isFiltered = true;
    }
    
    if (filters.maxYoe !== undefined && filters.maxYoe !== null) {
      filtered = filtered.filter(r => r.yearsOfExperience <= filters.maxYoe!);
      isFiltered = true;
    }

    if (filters.verified === true) {
      filtered = filtered.filter(r => r.verified === true);
      isFiltered = true;
    }

    // Apply Sorting
    filtered.sort((a, b) => {
      let aVal = a[sort.field] as number | string;
      let bVal = b[sort.field] as number | string;

      if (sort.field === 'reportedAt') {
        aVal = new Date(aVal as string).getTime();
        bVal = new Date(bVal as string).getTime();
      }

      if (aVal === undefined) aVal = 0;
      if (bVal === undefined) bVal = 0;

      if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return {
      data: filtered,
      totalCount: ALL_SALARIES.length,
      filteredCount: filtered.length,
      isFiltered
    };
  }, [filters, sort, submissions]);

  return result;
}
