import { CompensationRecord, NormalizedLevel } from "@/types";
import { MOCK_COMPANIES } from "./companies";

const ROLES = [
  "Software Engineer",
  "SDE",
  "Backend Engineer",
  "Frontend Engineer",
  "ML Engineer",
  "Data Scientist",
  "Data Analyst",
  "Product Manager",
  "Product Designer",
  "QA Engineer",
  "Engineering Manager",
  "Director of Engineering",
  "CTO",
] as const;

const LEVELS = Object.values(NormalizedLevel);

const LOCATIONS = [
  { city: "San Francisco", state: "CA", country: "United States", region: "North America" },
  { city: "Seattle", state: "WA", country: "United States", region: "North America" },
  { city: "New York", state: "NY", country: "United States", region: "North America" },
  { city: "Austin", state: "TX", country: "United States", region: "North America" },
  { city: "London", country: "United Kingdom", region: "Europe" },
  { city: "Berlin", country: "Germany", region: "Europe" },
  { city: "Toronto", state: "ON", country: "Canada", region: "North America" },
  { city: "Singapore", country: "Singapore", region: "Asia Pacific" },
  { city: "Bangalore", state: "Karnataka", country: "India", region: "Asia Pacific" },
  { city: "Hyderabad", state: "Telangana", country: "India", region: "Asia Pacific" },
  { city: "Pune", state: "Maharashtra", country: "India", region: "Asia Pacific" },
  { city: "Mumbai", state: "Maharashtra", country: "India", region: "Asia Pacific" },
] as const;

const DATA_SOURCES = ["Offer Letter", "Self-reported", "Levels.fyi", "Blind"] as const;
const TAG_POOL = ["Remote", "On-site", "Hybrid", "Sign-on Bonus", "self-reported"] as const;

/** Deterministic pseudo-random in [0, 1) from seed */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

const LEVEL_YOE: Record<NormalizedLevel, [number, number]> = {
  [NormalizedLevel.INTERN]: [0, 0],
  [NormalizedLevel.JUNIOR]: [0, 2],
  [NormalizedLevel.MID]: [2, 5],
  [NormalizedLevel.SENIOR]: [5, 9],
  [NormalizedLevel.STAFF]: [8, 12],
  [NormalizedLevel.PRINCIPAL]: [10, 15],
  [NormalizedLevel.DIRECTOR]: [12, 18],
  [NormalizedLevel.VP]: [15, 22],
  [NormalizedLevel.EXEC]: [18, 30],
};

const LEVEL_BASE_USD: Record<NormalizedLevel, [number, number]> = {
  [NormalizedLevel.INTERN]: [60000, 90000],
  [NormalizedLevel.JUNIOR]: [90000, 140000],
  [NormalizedLevel.MID]: [130000, 180000],
  [NormalizedLevel.SENIOR]: [170000, 250000],
  [NormalizedLevel.STAFF]: [220000, 320000],
  [NormalizedLevel.PRINCIPAL]: [280000, 400000],
  [NormalizedLevel.DIRECTOR]: [320000, 480000],
  [NormalizedLevel.VP]: [400000, 600000],
  [NormalizedLevel.EXEC]: [500000, 900000],
};

function lerp(min: number, max: number, t: number): number {
  return Math.round(min + (max - min) * t);
}

export function generateMockSalaries(count: number): CompensationRecord[] {
  const records: CompensationRecord[] = [];

  for (let i = 0; i < count; i++) {
    const company = MOCK_COMPANIES[i % MOCK_COMPANIES.length];
    const role = pick(ROLES, i * 7 + 1);
    const level = pick(LEVELS, i * 11 + 3);
    const location = pick(LOCATIONS, i * 13 + 5);
    const isIndia = location.country === "India";
    const currency = isIndia ? "INR" : "USD";
    const usdScale = isIndia ? 85 : 1;

    const t = seededRandom(i * 17 + 9);
    const [baseMin, baseMax] = LEVEL_BASE_USD[level];
    const baseSalary = lerp(baseMin, baseMax, t) * usdScale;
    const stockRatio = seededRandom(i * 19 + 11);
    const stockPerYear =
      level === NormalizedLevel.INTERN
        ? 0
        : Math.round(baseSalary * stockRatio * (isIndia ? 0.4 : 0.6));
    const bonus =
      level === NormalizedLevel.INTERN
        ? 0
        : Math.round(baseSalary * seededRandom(i * 23 + 13) * 0.25);
    const totalCompensation = baseSalary + stockPerYear + bonus;

    const [yoeMin, yoeMax] = LEVEL_YOE[level];
    const yearsOfExperience = lerp(yoeMin, yoeMax, seededRandom(i * 29 + 17));

    const monthsAgo = Math.floor(seededRandom(i * 31 + 19) * 36);
    const reportedAt = new Date();
    reportedAt.setMonth(reportedAt.getMonth() - monthsAgo);

    const tagCount = seededRandom(i * 37 + 21) > 0.7 ? 2 : 1;
    const tags: string[] = [];
    for (let t = 0; t < tagCount; t++) {
      const tag = pick(TAG_POOL, i * 41 + t * 7);
      if (!tags.includes(tag)) tags.push(tag);
    }

    const verified = !tags.includes("self-reported") && seededRandom(i * 43 + 23) > 0.25;
    const levelNum = Math.floor(seededRandom(i * 47 + 27) * 3) + 1;

    records.push({
      id: `rec_${i.toString(36)}_${company.slug.slice(0, 4)}`,
      company: {
        name: company.name,
        slug: company.slug,
        logo: company.logo,
        industry: company.industry,
        size: company.size,
      },
      role,
      normalizedLevel: level,
      rawTitle: `${role} ${levelNum}`,
      yearsOfExperience,
      location: { ...location },
      baseSalary,
      stockPerYear,
      bonus,
      totalCompensation,
      currency,
      reportedAt: reportedAt.toISOString(),
      verified,
      dataSource: pick(DATA_SOURCES, i * 53 + 29),
      tags,
    });
  }

  return records;
}
