import { NormalizedLevel, SortState } from "@/types";

export const NORMALIZED_LEVELS = [
  {
    level: NormalizedLevel.INTERN,
    label: "Intern",
    description: "Currently enrolled in a degree program, working temporarily.",
    typicalYoe: "0",
  },
  {
    level: NormalizedLevel.JUNIOR,
    label: "Junior / Entry Level",
    description: "Recent graduate or early career professional.",
    typicalYoe: "0-2",
  },
  {
    level: NormalizedLevel.MID,
    label: "Mid Level",
    description: "Independent contributor, requires minimal supervision.",
    typicalYoe: "2-5",
  },
  {
    level: NormalizedLevel.SENIOR,
    label: "Senior",
    description: "Leads projects, mentors juniors, shapes architecture.",
    typicalYoe: "5-8+",
  },
  {
    level: NormalizedLevel.STAFF,
    label: "Staff",
    description: "High impact across multiple teams, strategic technical direction.",
    typicalYoe: "8-12+",
  },
  {
    level: NormalizedLevel.PRINCIPAL,
    label: "Principal",
    description: "Mission-critical impact, company-wide technical leadership.",
    typicalYoe: "12-15+",
  },
  {
    level: NormalizedLevel.DIRECTOR,
    label: "Director",
    description: "Manages multiple teams or departments, high-level strategy.",
    typicalYoe: "10-15+",
  },
  {
    level: NormalizedLevel.VP,
    label: "VP",
    description: "Executive leadership over large organizations.",
    typicalYoe: "15+",
  },
  {
    level: NormalizedLevel.EXEC,
    label: "Executive (C-Suite)",
    description: "Highest level of company leadership.",
    typicalYoe: "15+",
  },
];

export const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "E-commerce",
  "Consulting",
  "Media & Entertainment",
  "Automotive",
  "Aerospace",
  "Retail",
  "Education",
];

export const REGIONS = [
  "North America",
  "Europe",
  "Asia Pacific",
  "Latin America",
  "Middle East & Africa",
];

export const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "IN", name: "India" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "DE", name: "Germany" },
  { code: "AU", name: "Australia" },
  { code: "SG", name: "Singapore" },
  { code: "FR", name: "France" },
  { code: "NL", name: "Netherlands" },
  { code: "CH", name: "Switzerland" },
];

export const CURRENCIES = [
  { code: "USD", symbol: "$", rateToUSD: 1.0 },
  { code: "INR", symbol: "₹", rateToUSD: 0.012 },
  { code: "EUR", symbol: "€", rateToUSD: 1.08 },
  { code: "GBP", symbol: "£", rateToUSD: 1.26 },
  { code: "CAD", symbol: "C$", rateToUSD: 0.74 },
  { code: "AUD", symbol: "A$", rateToUSD: 0.65 },
  { code: "SGD", symbol: "S$", rateToUSD: 0.74 },
];

export const DEFAULT_CURRENCY = "USD";

export const TABLE_PAGE_SIZES = [25, 50, 100];

export const SORT_OPTIONS: { label: string; field: SortState["field"]; direction: SortState["direction"] }[] = [
  { label: "Total Compensation (High to Low)", field: "totalCompensation", direction: "desc" },
  { label: "Total Compensation (Low to High)", field: "totalCompensation", direction: "asc" },
  { label: "Base Salary (High to Low)", field: "baseSalary", direction: "desc" },
  { label: "Years of Experience (High to Low)", field: "yearsOfExperience", direction: "desc" },
  { label: "Years of Experience (Low to High)", field: "yearsOfExperience", direction: "asc" },
  { label: "Most Recent", field: "reportedAt", direction: "desc" },
];
