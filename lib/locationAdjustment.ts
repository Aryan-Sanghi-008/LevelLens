export interface CityIndex {
  city: string;
  country: string;
  colIndex: number; // Cost of living relative to Mumbai = 100
  rentIndex: number;
  techSalaryPremium: number; // Represents average multiplier for tech salaries
}

export const LOCATION_INDEX: CityIndex[] = [
  { city: "Bangalore", country: "India", colIndex: 100, rentIndex: 100, techSalaryPremium: 1.2 },
  { city: "Mumbai", country: "India", colIndex: 105, rentIndex: 140, techSalaryPremium: 1.0 },
  { city: "Delhi", country: "India", colIndex: 98, rentIndex: 90, techSalaryPremium: 0.95 },
  { city: "Hyderabad", country: "India", colIndex: 92, rentIndex: 85, techSalaryPremium: 1.1 },
  { city: "Pune", country: "India", colIndex: 88, rentIndex: 80, techSalaryPremium: 1.05 },
  { city: "Chennai", country: "India", colIndex: 90, rentIndex: 75, techSalaryPremium: 0.9 },
  { city: "remote-india", country: "India", colIndex: 80, rentIndex: 50, techSalaryPremium: 0.9 },
  { city: "San Francisco", country: "USA", colIndex: 380, rentIndex: 500, techSalaryPremium: 4.5 },
  { city: "New York", country: "USA", colIndex: 360, rentIndex: 450, techSalaryPremium: 4.0 },
  { city: "London", country: "UK", colIndex: 290, rentIndex: 300, techSalaryPremium: 3.0 },
  { city: "Singapore", country: "Singapore", colIndex: 250, rentIndex: 350, techSalaryPremium: 2.5 },
  { city: "Dubai", country: "UAE", colIndex: 230, rentIndex: 250, techSalaryPremium: 2.2 },
  { city: "remote-global", country: "Global", colIndex: 200, rentIndex: 100, techSalaryPremium: 2.5 },
  { city: "Zurich", country: "Switzerland", colIndex: 420, rentIndex: 300, techSalaryPremium: 3.5 },
  { city: "Berlin", country: "Germany", colIndex: 260, rentIndex: 200, techSalaryPremium: 2.0 },
];

export function getCityIndex(cityName: string): CityIndex | undefined {
  return LOCATION_INDEX.find(c => c.city.toLowerCase() === cityName.toLowerCase());
}

/**
 * Converts a compensation amount from one city's purchasing power to another.
 */
export function adjustForLocation(amount: number, fromCity: string, toCity: string): number {
  const from = getCityIndex(fromCity);
  const to = getCityIndex(toCity);

  if (!from || !to) return amount;

  // Simple purchasing power parity calculation based on colIndex
  // If moving from a cheaper city (80) to a more expensive one (160), amount should double to maintain purchasing power
  const ratio = to.colIndex / from.colIndex;
  
  return amount * ratio;
}

/**
 * Returns a plain-language explanation of the cost of living difference.
 */
export function getLocationComparison(fromCity: string, toCity: string): { ratio: number; explanation: string } {
  const from = getCityIndex(fromCity);
  const to = getCityIndex(toCity);

  if (!from || !to) {
    return { ratio: 1, explanation: "Location data unavailable for comparison." };
  }

  if (from.city === to.city) {
    return { ratio: 1, explanation: "Both locations have the same cost of living." };
  }

  const ratio = to.colIndex / from.colIndex;
  const percentage = Math.abs(Math.round((ratio - 1) * 100));

  let explanation = "";
  if (ratio > 1) {
    explanation = `${to.city} is approximately ${percentage}% more expensive to live in than ${from.city}.`;
  } else {
    explanation = `${to.city} is approximately ${percentage}% cheaper to live in than ${from.city}.`;
  }

  return { ratio, explanation };
}
