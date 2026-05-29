import type { LucideIcon } from "lucide-react";
import {
  Table2,
  Building2,
  Briefcase,
  GitCompare,
  TrendingUp,
  MapPin,
  Info,
  BookOpen,
  BarChart3,
  PlusCircle,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAV_DATA: NavSection[] = [
  {
    title: "Explore",
    items: [
      { title: "Salary Table", href: "/", icon: Table2 },
      { title: "Companies", href: "/companies", icon: Building2 },
      { title: "Roles", href: "/roles", icon: Briefcase },
      { title: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Tools",
    items: [
      { title: "Compare", href: "/compare", icon: GitCompare },
      { title: "Level Ladder", href: "/tools/ladder", icon: TrendingUp },
      { title: "Location Adjust", href: "/tools/location", icon: MapPin },
    ],
  },
  {
    title: "Contribute",
    items: [
      { title: "Submit Data", href: "/submit", icon: PlusCircle, badge: "New" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Levels Guide", href: "/levels", icon: BookOpen },
      { title: "About", href: "/about", icon: Info },
    ],
  },
];

/** Primary bottom-nav targets (mobile) */
export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { title: "Home", href: "/", icon: Table2 },
  { title: "Companies", href: "/companies", icon: Building2 },
  { title: "Compare", href: "/compare", icon: GitCompare },
];

/** Items shown in the "More" sheet (everything not in bottom nav) */
export function getMoreNavItems(): NavItem[] {
  const bottomHrefs = new Set(BOTTOM_NAV_ITEMS.map((i) => i.href));
  return NAV_DATA.flatMap((s) => s.items).filter((i) => !bottomHrefs.has(i.href));
}
