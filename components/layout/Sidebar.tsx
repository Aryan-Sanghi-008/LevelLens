"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Table2, 
  Building2, 
  Briefcase, 
  GitCompare, 
  TrendingUp, 
  MapPin, 
  Info, 
  BookOpen,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_DATA: NavSection[] = [
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
    title: "Resources",
    items: [
      { title: "How Levels Work", href: "/resources/levels", icon: BookOpen },
      { title: "About", href: "/about", icon: Info },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[260px] flex-col border-r border-border bg-background md:flex shrink-0 min-h-[calc(100vh-56px)] sticky top-14">
      <nav className="flex-1 space-y-8 p-4 py-6">
        {NAV_DATA.map((section) => (
          <div key={section.title}>
            <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:text-foreground",
                        isActive 
                          ? "border-l-2 border-brand-primary text-foreground bg-transparent pl-[6px]" 
                          : "border-l-2 border-transparent text-muted-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className={cn("h-4 w-4", isActive ? "text-brand-primary" : "text-muted-foreground")} />
                        {item.title}
                      </div>
                      {item.badge && (
                        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium leading-none text-muted-foreground">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
