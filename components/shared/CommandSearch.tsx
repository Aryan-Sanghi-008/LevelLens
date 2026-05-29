"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CompanyLogo } from "@/components/shared/CompanyLogo";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useSearchStore } from "@/lib/hooks/useSearchStore";
import { MOCK_COMPANIES } from "@/lib/data/mock/companies";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { NormalizedLevel } from "@/types";
import { Clock, X, Briefcase, Zap, GraduationCap, Loader2 } from "lucide-react";
import { getLevelColor, getLevelBadgeVariant } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const LEVEL_DESCRIPTIONS: Record<NormalizedLevel, string> = {
  [NormalizedLevel.INTERN]: "Students or fresh graduates on training",
  [NormalizedLevel.JUNIOR]: "Entry-level positions (0-2 years exp)",
  [NormalizedLevel.MID]: "Mid-level independent contributors",
  [NormalizedLevel.SENIOR]: "Senior contributors and domain experts",
  [NormalizedLevel.STAFF]: "Staff engineers leading projects",
  [NormalizedLevel.PRINCIPAL]: "Principal architects and tech leads",
  [NormalizedLevel.DIRECTOR]: "Directors managing multiple teams",
  [NormalizedLevel.VP]: "Vice Presidents leading departments",
  [NormalizedLevel.EXEC]: "C-level executives (CTO, CEO)",
};

const QUICK_FILTERS = [
  {
    title: "Senior engineers in Bangalore",
    action: "/?levels=SENIOR&roles=Software Engineer&locations=Bangalore",
  },
  {
    title: "Staff+ at FAANG",
    action: "/?levels=STAFF,PRINCIPAL,DIRECTOR,VP,EXEC&companies=meta,google,netflix,amazon,apple",
  },
  {
    title: "₹50L+ Frontend",
    action: "/?roles=Frontend Engineer&minComp=5000000",
  },
];

export function CommandSearch() {
  const { isOpen, setOpen } = useSearchStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Calculate unique roles and counts
  const roleStats = useMemo(() => {
    const stats: Record<string, number> = {};
    for (const salary of MOCK_SALARIES) {
      stats[salary.role] = (stats[salary.role] || 0) + 1;
    }
    return Object.entries(stats).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }, []);

  // Keyboard shortcut (CMD+K or CTRL+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  // Load recent searches on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("levelLensRecentSearches");
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Debounce logic
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsTyping(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  const saveRecentSearch = (term: string) => {
    if (!term) return;
    const nextSearches = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
    setRecentSearches(nextSearches);
    try {
      localStorage.setItem("levelLensRecentSearches", JSON.stringify(nextSearches));
    } catch {
      // ignore
    }
  };

  const handleSelect = (url: string, term?: string) => {
    if (term) saveRecentSearch(term);
    setOpen(false);
    setQuery("");
    router.push(url);
  };

  const removeRecentSearch = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    const nextSearches = recentSearches.filter(t => t !== term);
    setRecentSearches(nextSearches);
    try {
      localStorage.setItem("levelLensRecentSearches", JSON.stringify(nextSearches));
    } catch {
      // ignore
    }
  };

  // Filter lists based on query
  const q = debouncedQuery.toLowerCase();
  
  const filteredRoles = q ? roleStats.filter(r => r.name.toLowerCase().includes(q)).slice(0, 5) : [];
  const filteredCompanies = q ? MOCK_COMPANIES.filter(c => c.name.toLowerCase().includes(q)).slice(0, 5) : [];
  const filteredLevels = q ? Object.entries(LEVEL_DESCRIPTIONS).filter(([level, desc]) => 
    level.toLowerCase().includes(q) || desc.toLowerCase().includes(q)
  ).slice(0, 5) : [];

  return (
    <CommandDialog open={isOpen} onOpenChange={setOpen} title="Global Search" description="Search for roles, companies, or levels.">
      <div className="relative">
        <CommandInput 
          placeholder="Search roles, companies, or levels..." 
          value={query}
          onValueChange={setQuery}
        />
        {isTyping && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
      
      <CommandList>
        <CommandEmpty>No results for &quot;{query}&quot;. Try a broader term.</CommandEmpty>

        {/* Empty State / Default View */}
        {!q && !isTyping && (
          <>
            {recentSearches.length > 0 && (
              <CommandGroup heading="Recent Searches">
                {recentSearches.map(term => (
                  <CommandItem 
                    key={term} 
                    value={`recent-${term}`}
                    onSelect={() => {
                      setQuery(term);
                    }}
                    className="flex justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-muted-foreground" />
                      <span>{term}</span>
                    </div>
                    <div 
                      role="button"
                      onClick={(e) => removeRecentSearch(e, term)}
                      className="rounded-full p-1 hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-3" />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            <CommandGroup heading="Quick Filters">
              {QUICK_FILTERS.map(filter => (
                <CommandItem 
                  key={filter.title}
                  value={filter.title}
                  onSelect={() => handleSelect(filter.action, filter.title)}
                >
                  <Zap className="size-4 text-amber-500" />
                  <span>{filter.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {/* Results View */}
        {q && !isTyping && (
          <>
            {filteredRoles.length > 0 && (
              <CommandGroup heading="Roles">
                {filteredRoles.map(role => (
                  <CommandItem 
                    key={role.name} 
                    value={`role-${role.name}`}
                    onSelect={() => handleSelect(`/?roles=${encodeURIComponent(role.name)}`, role.name)}
                  >
                    <Briefcase className="size-4 text-muted-foreground" />
                    <span className="flex-1">{role.name}</span>
                    <span className="text-xs text-muted-foreground">{role.count} records</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {filteredCompanies.length > 0 && (
              <>
                {filteredRoles.length > 0 && <CommandSeparator />}
                <CommandGroup heading="Companies">
                  {filteredCompanies.map(company => (
                    <CommandItem 
                      key={company.slug} 
                      value={`company-${company.name}`}
                      onSelect={() => handleSelect(`/companies/${company.slug}`, company.name)}
                    >
                      <CompanyLogo
                        src={company.logo}
                        name={company.name}
                        alt={company.name || "Company"}
                        width={16}
                        height={16}
                        className="size-4 rounded-full object-cover"
                      />
                      <span className="flex-1">{company.name}</span>
                      <span className="text-xs text-muted-foreground">{company.industry}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            {filteredLevels.length > 0 && (
              <>
                {(filteredRoles.length > 0 || filteredCompanies.length > 0) && <CommandSeparator />}
                <CommandGroup heading="Levels">
                  {filteredLevels.map(([level, desc]) => {
                    const l = level as NormalizedLevel;
                    return (
                      <CommandItem 
                        key={level} 
                        value={`level-${level}`}
                        onSelect={() => handleSelect(`/?levels=${level}`, level)}
                      >
                        <GraduationCap className="size-4 text-muted-foreground" />
                        <span className="flex-1">
                          <Badge variant={getLevelBadgeVariant(l)} className={cn("px-1.5 py-0 text-[10px]", getLevelColor(l))}>
                            {l}
                          </Badge>
                        </span>
                        <span className="text-xs text-muted-foreground truncate max-w-[200px]">{desc}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
