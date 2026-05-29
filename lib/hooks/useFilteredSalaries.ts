import { useMemo } from 'react';
import { CompensationRecord, FilterState, SortState } from '@/types';
import { MOCK_SALARIES } from '@/lib/data/mock/salaries';

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
  const result = useMemo(() => {
    let filtered = [...MOCK_SALARIES];
    
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
        filters.locations!.includes(r.location.country)
      );
      isFiltered = true;
    }
    
    if (filters.minComp !== undefined) {
      filtered = filtered.filter(r => r.totalCompensation >= filters.minComp!);
      isFiltered = true;
    }
    
    if (filters.maxComp !== undefined) {
      filtered = filtered.filter(r => r.totalCompensation <= filters.maxComp!);
      isFiltered = true;
    }
    
    if (filters.minYoe !== undefined) {
      filtered = filtered.filter(r => r.yearsOfExperience >= filters.minYoe!);
      isFiltered = true;
    }
    
    if (filters.maxYoe !== undefined) {
      filtered = filtered.filter(r => r.yearsOfExperience <= filters.maxYoe!);
      isFiltered = true;
    }

    if (filters.currency && filters.currency !== "") {
      filtered = filtered.filter(r => r.currency === filters.currency);
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
      totalCount: MOCK_SALARIES.length,
      filteredCount: filtered.length,
      isFiltered
    };
  }, [filters, sort]);

  return result;
}
