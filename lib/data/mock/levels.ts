import { NormalizedLevel } from "@/types";

export interface LevelContext {
  level: NormalizedLevel;
  typicalTitles: string[];
  yoeRange: string;
  scopeDescription: string;
  differentiator: string;
}

export const LEVEL_CONTEXTS: Record<NormalizedLevel, LevelContext> = {
  [NormalizedLevel.INTERN]: {
    level: NormalizedLevel.INTERN,
    typicalTitles: ["Software Engineering Intern", "Product Intern", "Summer Analyst"],
    yoeRange: "0",
    scopeDescription: "Works on well-scoped, non-critical tasks with heavy mentorship. Focuses on learning tools and processes.",
    differentiator: "Not expected to design systems; heavily reliant on senior engineers for direction.",
  },
  [NormalizedLevel.JUNIOR]: {
    level: NormalizedLevel.JUNIOR,
    typicalTitles: ["Software Engineer 1", "SDE I", "Associate PM", "Data Analyst"],
    yoeRange: "0-2",
    scopeDescription: "Executes well-defined tasks and bug fixes. Contributes to features under guidance.",
    differentiator: "Requires supervision; learning best practices; not yet fully autonomous.",
  },
  [NormalizedLevel.MID]: {
    level: NormalizedLevel.MID,
    typicalTitles: ["Software Engineer 2", "SDE II", "Product Manager", "Data Scientist"],
    yoeRange: "2-5",
    scopeDescription: "Fully autonomous contributor. Can take a feature from design to production. Reviews code for juniors.",
    differentiator: "Operates independently on complex tasks; starts influencing local team architecture.",
  },
  [NormalizedLevel.SENIOR]: {
    level: NormalizedLevel.SENIOR,
    typicalTitles: ["Senior Software Engineer", "SDE III", "Senior PM", "Senior Data Scientist"],
    yoeRange: "5-8+",
    scopeDescription: "Owns large components or entirely new features. Mentors juniors and mid-level engineers. Solves ambiguous problems.",
    differentiator: "Force multiplier for the team; anticipates technical debt; heavily involved in system design.",
  },
  [NormalizedLevel.STAFF]: {
    level: NormalizedLevel.STAFF,
    typicalTitles: ["Staff Engineer", "Staff PM", "Principal Data Scientist (Tier 1)"],
    yoeRange: "8-12+",
    scopeDescription: "Sets technical direction for multiple teams. Solves the hardest, organization-level engineering problems.",
    differentiator: "Impact spans across teams; defines architectural standards; aligns engineering with business goals.",
  },
  [NormalizedLevel.PRINCIPAL]: {
    level: NormalizedLevel.PRINCIPAL,
    typicalTitles: ["Principal Engineer", "Group PM", "Director of Data Science"],
    yoeRange: "12-15+",
    scopeDescription: "Mission-critical impact. Often the final technical authority in a large org or entire startup.",
    differentiator: "Company-wide impact; influences multi-year technical strategy; invents novel solutions.",
  },
  [NormalizedLevel.DIRECTOR]: {
    level: NormalizedLevel.DIRECTOR,
    typicalTitles: ["Director of Engineering", "Director of Product", "VP of Data"],
    yoeRange: "10-15+",
    scopeDescription: "Manages managers (EMs). Responsible for organizational structure, budgeting, and massive product areas.",
    differentiator: "Focus shifts significantly from technical execution to organizational leadership and scaling.",
  },
  [NormalizedLevel.VP]: {
    level: NormalizedLevel.VP,
    typicalTitles: ["VP of Engineering", "VP of Product", "SVP"],
    yoeRange: "15+",
    scopeDescription: "Executive leadership over massive organizations. Owns the strategic roadmap and large-scale P&L.",
    differentiator: "Operates at the highest levels of corporate strategy; builds organizations from scratch.",
  },
  [NormalizedLevel.EXEC]: {
    level: NormalizedLevel.EXEC,
    typicalTitles: ["CTO", "CPO", "Chief Data Officer", "Founder"],
    yoeRange: "15+",
    scopeDescription: "Highest level of company leadership. Represents the company externally and defines its entire technical existence.",
    differentiator: "Accountable to the board/CEO; makes existential technical and product decisions.",
  },
};
