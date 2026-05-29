import { MOCK_COMPANIES, MockCompany } from "./mock/companies";
import { MOCK_SALARIES } from "./mock/salaries";
import { CompanyProfile, NormalizedLevel } from "@/types";
import { getPercentileBand } from "@/lib/formatters";

export interface ExtendedCompanyProfile extends CompanyProfile {
  meta: MockCompany;
  locationDistribution: Record<string, number>;
  levelCompensation: Record<NormalizedLevel, {
    base: number;
    stock: number;
    bonus: number;
    total: number;
    count: number;
  }>;
}

export function getCompanyProfile(slug: string): ExtendedCompanyProfile | null {
  const meta = MOCK_COMPANIES.find(c => c.slug === slug);
  if (!meta) return null;

  const records = MOCK_SALARIES.filter(r => r.company.slug === slug);
  if (records.length === 0) return null;

  const totalComps = records.map(r => r.totalCompensation);
  const baseComps = records.map(r => r.baseSalary);
  
  const { p25: p25Total, p50: medianTotal, p75: p75Total, p90: p90Total } = getPercentileBand(0, totalComps);
  const medianBase = getPercentileBand(0, baseComps).p50;

  const levelDistribution = {} as Record<NormalizedLevel, number>;
  const roleDistribution: Record<string, number> = {};
  const locationDistribution: Record<string, number> = {};
  
  // Level compensation aggregates
  const levelRecords = new Map<NormalizedLevel, typeof records>();
  
  Object.values(NormalizedLevel).forEach(l => {
    levelDistribution[l as NormalizedLevel] = 0;
    levelRecords.set(l as NormalizedLevel, []);
  });

  records.forEach(r => {
    levelDistribution[r.normalizedLevel]++;
    roleDistribution[r.role] = (roleDistribution[r.role] || 0) + 1;
    locationDistribution[r.location.city] = (locationDistribution[r.location.city] || 0) + 1;
    levelRecords.get(r.normalizedLevel)!.push(r);
  });

  const levelCompensation = {} as Record<NormalizedLevel, { base: number; stock: number; bonus: number; total: number; count: number }>;
  
  for (const [level, recs] of Array.from(levelRecords.entries())) {
    if (recs.length === 0) {
      levelCompensation[level] = { base: 0, stock: 0, bonus: 0, total: 0, count: 0 };
      continue;
    }
    
    levelCompensation[level] = {
      base: getPercentileBand(0, recs.map(r => r.baseSalary)).p50,
      stock: getPercentileBand(0, recs.map(r => r.stockPerYear)).p50,
      bonus: getPercentileBand(0, recs.map(r => r.bonus)).p50,
      total: getPercentileBand(0, recs.map(r => r.totalCompensation)).p50,
      count: recs.length,
    };
  }

  return {
    id: slug,
    name: meta.name,
    slug: meta.slug,
    logo: meta.logo,
    industry: meta.industry,
    medianBase,
    medianTotal,
    p25Total,
    p75Total,
    p90Total,
    dataPointCount: records.length,
    levelDistribution,
    roleDistribution,
    locationDistribution,
    levelCompensation,
    meta,
  };
}

export function getAllCompanyProfiles(): ExtendedCompanyProfile[] {
  return MOCK_COMPANIES.map(c => getCompanyProfile(c.slug)).filter(Boolean) as ExtendedCompanyProfile[];
}

export function getGlobalLevelMedians(): Record<NormalizedLevel, number> {
  const medians = {} as Record<NormalizedLevel, number>;
  Object.values(NormalizedLevel).forEach(level => {
    const records = MOCK_SALARIES.filter(r => r.normalizedLevel === level);
    medians[level as NormalizedLevel] = records.length > 0 ? getPercentileBand(0, records.map(r => r.totalCompensation)).p50 : 0;
  });
  return medians;
}
