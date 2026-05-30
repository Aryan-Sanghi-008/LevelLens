import {
  createParser,
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";
import { NormalizedLevel } from "@/types";

// Custom parser to map slots: company-slug|role-slug|level joined by |, slots joined by ,
export const parseAsSlots = createParser({
  parse(queryValue) {
    if (!queryValue) return [];
    return queryValue
      .split(",")
      .map((s) => {
        const parts = s.split("|");
        if (parts.length < 3) return null;
        const [companyId, role, level] = parts;
        return { companyId, role, level: level as NormalizedLevel };
      })
      .filter((s): s is { companyId: string; role: string; level: NormalizedLevel } => s !== null);
  },
  serialize(value) {
    if (!value || value.length === 0) return "";
    return value.map((s) => `${s.companyId}|${s.role}|${s.level}`).join(",");
  },
});


export const filterParsers = {
  levels: parseAsArrayOf(parseAsString).withDefault([]),
  roles: parseAsArrayOf(parseAsString).withDefault([]),
  companies: parseAsArrayOf(parseAsString).withDefault([]),
  location: parseAsArrayOf(parseAsString).withDefault([]),
  minComp: parseAsInteger,
  maxComp: parseAsInteger,
  minYoe: parseAsInteger,
  maxYoe: parseAsInteger,
  currency: parseAsString,
  verified: parseAsBoolean,
  sort: parseAsString.withDefault("totalComp"),
  order: parseAsString.withDefault("desc"),
  page: parseAsInteger.withDefault(1),
};

// Helper for resetting
export const defaultFilters = {
  levels: null,
  roles: null,
  companies: null,
  location: null,
  minComp: null,
  maxComp: null,
  minYoe: null,
  maxYoe: null,
  currency: null,
  verified: null,
  sort: null,
  order: null,
  page: null,
};

export const homepageSearchParamsCache = createSearchParamsCache(filterParsers);

export const companyProfileSearchParamsCache = createSearchParamsCache({
  tab: parseAsString.withDefault("compensation"),
  level: parseAsString.withDefault("ALL"),
});

export const roleProfileSearchParamsCache = createSearchParamsCache({
  company: parseAsString.withDefault(""),
});
