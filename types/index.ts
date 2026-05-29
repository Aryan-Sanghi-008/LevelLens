export enum NormalizedLevel {
  INTERN = "INTERN",
  JUNIOR = "JUNIOR",
  MID = "MID",
  SENIOR = "SENIOR",
  STAFF = "STAFF",
  PRINCIPAL = "PRINCIPAL",
  DIRECTOR = "DIRECTOR",
  VP = "VP",
  EXEC = "EXEC",
}

export interface CompensationRecord {
  id: string;
  company: {
    name: string;
    slug: string;
    logo?: string;
    industry?: string;
    size?: string;
  };
  role: string;
  normalizedLevel: NormalizedLevel;
  rawTitle: string;
  yearsOfExperience: number;
  location: {
    city: string;
    state?: string;
    country: string;
    region?: string;
  };
  baseSalary: number;
  stockPerYear: number;
  bonus: number;
  totalCompensation: number;
  currency: string;
  reportedAt: string; // ISO format date
  verified: boolean;
  dataSource?: string;
  tags?: string[];
}

export interface CompensationBreakdown {
  base: number;
  stock: number;
  bonus: number;
  total: number;
  currency: string;
  formatted: {
    base: string;
    stock: string;
    bonus: string;
    total: string;
  };
}

export interface FilterState {
  roles: string[];
  companies: string[];
  levels: NormalizedLevel[];
  locations: string[];
  minComp?: number;
  maxComp?: number;
  minYoe?: number;
  maxYoe?: number;
  currency?: string;
  verified?: boolean;
}

export interface SortState {
  field: keyof CompensationRecord;
  direction: "asc" | "desc";
}

export interface CompanyProfile {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  industry?: string;
  medianBase: number;
  medianTotal: number;
  p25Total: number;
  p75Total: number;
  p90Total: number;
  dataPointCount: number;
  levelDistribution: Record<NormalizedLevel, number>;
  roleDistribution: Record<string, number>;
}

export interface ComparisonSlot {
  companyId?: string;
  level?: NormalizedLevel;
  role?: string;
}
