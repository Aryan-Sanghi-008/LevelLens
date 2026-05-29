import { CompensationRecord } from "@/types";
import { generateMockSalaries } from "./generateSalaries";

/** 500 deterministic mock compensation records for performance testing */
export const MOCK_SALARIES: CompensationRecord[] = generateMockSalaries(500);
