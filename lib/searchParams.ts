import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

// Custom parser to map comma-separated strings if needed, though parseAsArrayOf(parseAsString) works fine
export const filterParsers = {
  levels: parseAsArrayOf(parseAsString).withDefault([]),
  roles: parseAsArrayOf(parseAsString).withDefault([]),
  companies: parseAsArrayOf(parseAsString).withDefault([]),
  locations: parseAsArrayOf(parseAsString).withDefault([]),
  minComp: parseAsInteger,
  maxComp: parseAsInteger,
  minYoe: parseAsInteger,
  maxYoe: parseAsInteger,
  currency: parseAsString,
  verified: parseAsBoolean,
};

// Helper for resetting
export const defaultFilters = {
  levels: null,
  roles: null,
  companies: null,
  locations: null,
  minComp: null,
  maxComp: null,
  minYoe: null,
  maxYoe: null,
  currency: null,
  verified: null,
};
