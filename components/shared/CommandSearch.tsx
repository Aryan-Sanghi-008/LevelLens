"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { CompanyLogo } from "@/components/shared/CompanyLogo";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/lib/hooks/useSearchStore";
import { useSubmissionStore } from "@/lib/hooks/useSubmissionStore";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { NormalizedLevel } from "@/types";
import {
  Clock,
  X,
  Briefcase,
  Zap,
  GraduationCap,
  Loader2,
  Search,
} from "lucide-react";
import { getLevelColor, getLevelBadgeVariant } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { mergeCompanies } from "@/lib/data/companyStats";

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
    action:
      "/?levels=STAFF,PRINCIPAL,DIRECTOR,VP,EXEC&companies=meta,google,netflix,amazon,apple",
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
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submissions = useSubmissionStore((s) => s.submissions);
  const allSalaries = useMemo(() => [...submissions, ...MOCK_SALARIES], [submissions]);

  // Calculate unique roles and counts
  const roleStats = useMemo(() => {
    const stats: Record<string, number> = {};
    for (const salary of allSalaries) {
      stats[salary.role] = (stats[salary.role] || 0) + 1;
    }
    return Object.entries(stats)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [allSalaries]);

  const allCompanies = useMemo(() => {
    return mergeCompanies(submissions);
  }, [submissions]);

  // Keyboard shortcut (CMD+K or CTRL+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === "Escape" && isOpen) {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen, isOpen]);

  // When isOpen becomes true (triggered externally e.g. mobile button), focus input
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

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

  // Reset active index when dropdown content changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [debouncedQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setOpen]);

  const saveRecentSearch = useCallback(
    (term: string) => {
      if (!term) return;
      const nextSearches = [
        term,
        ...recentSearches.filter((t) => t !== term),
      ].slice(0, 5);
      setRecentSearches(nextSearches);
      try {
        localStorage.setItem(
          "levelLensRecentSearches",
          JSON.stringify(nextSearches)
        );
      } catch {
        // ignore
      }
    },
    [recentSearches]
  );

  const handleSelect = useCallback(
    (url: string, term?: string) => {
      if (term) saveRecentSearch(term);
      setOpen(false);
      setQuery("");
      router.push(url);
    },
    [saveRecentSearch, setOpen, router]
  );

  const removeRecentSearch = useCallback(
    (e: React.MouseEvent, term: string) => {
      e.stopPropagation();
      const nextSearches = recentSearches.filter((t) => t !== term);
      setRecentSearches(nextSearches);
      try {
        localStorage.setItem(
          "levelLensRecentSearches",
          JSON.stringify(nextSearches)
        );
      } catch {
        // ignore
      }
    },
    [recentSearches]
  );

  // Filter lists based on query
  const q = debouncedQuery.toLowerCase();

  const filteredRoles = useMemo(
    () => q ? roleStats.filter((r) => r.name.toLowerCase().includes(q)).slice(0, 5) : [],
    [q, roleStats]
  );
  const filteredCompanies = useMemo(
    () => q ? allCompanies.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 5) : [],
    [q, allCompanies]
  );
  const filteredLevels = useMemo(
    () => q
      ? Object.entries(LEVEL_DESCRIPTIONS)
          .filter(
            ([level, desc]) =>
              level.toLowerCase().includes(q) || desc.toLowerCase().includes(q)
          )
          .slice(0, 5)
      : [],
    [q]
  );

  const hasResults =
    filteredRoles.length > 0 ||
    filteredCompanies.length > 0 ||
    filteredLevels.length > 0;
  const showEmpty = q && !isTyping && !hasResults;

  // Build flat list of selectable items for keyboard navigation
  const allItems = useMemo(() => {
    const items: Array<{ url: string; term?: string }> = [];
    if (!q) {
      recentSearches.forEach((term) => items.push({ url: "", term }));
      QUICK_FILTERS.forEach((f) => items.push({ url: f.action, term: f.title }));
    } else {
      filteredRoles.forEach((r) =>
        items.push({
          url: `/?roles=${encodeURIComponent(r.name)}`,
          term: r.name,
        })
      );
      filteredCompanies.forEach((c) =>
        items.push({ url: `/companies/${c.slug}`, term: c.name })
      );
      filteredLevels.forEach(([level]) =>
        items.push({ url: `/?levels=${level}`, term: level })
      );
    }
    return items;
  }, [q, recentSearches, filteredRoles, filteredCompanies, filteredLevels]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, allItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && allItems[activeIndex]) {
        const item = allItems[activeIndex];
        if (item.url) {
          handleSelect(item.url, item.term);
        } else if (item.term) {
          setQuery(item.term);
        }
      } else if (query.trim()) {
        handleSelect(`/?q=${encodeURIComponent(query.trim())}`, query.trim());
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className={cn(
      "relative w-full max-w-md items-center",
      // Always shown on desktop; on mobile only visible when isOpen
      "hidden md:flex",
      isOpen && "!flex"
    )}>
      {/* Search Input */}
      <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        placeholder="Search role, company, or level..."
        className="h-9 w-full rounded-md bg-muted/50 pl-9 pr-12 text-sm focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring/50 cursor-text transition-colors border border-transparent focus:border-ring/30"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          if (!isOpen) setOpen(true);
        }}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="search-dropdown-list"
        aria-autocomplete="list"
        aria-label="Search roles, companies, or levels"
      />

      {/* Keyboard shortcut hint / loading */}
      <div className="absolute right-1.5 flex h-5 items-center gap-1">
        {isTyping ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
        ) : !query ? (
          <div className="flex h-5 items-center rounded border border-border bg-background px-1.5 text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </div>
        ) : (
          <button
            className="flex h-5 w-5 items-center justify-center rounded hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground"
            onMouseDown={(e) => {
              e.preventDefault();
              setQuery("");
              setDebouncedQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          id="search-dropdown-list"
          role="listbox"
          className={cn(
            "absolute top-[calc(100%+6px)] left-0 w-full min-w-[360px] max-w-[480px] rounded-xl border border-border bg-popover shadow-xl ring-1 ring-foreground/5 overflow-hidden z-[200] animate-in fade-in-0 zoom-in-95 duration-100",
            // On mobile: fixed below header, full width
            "md:absolute fixed top-14 left-2 right-2 md:left-0 md:right-auto max-md:max-w-none max-md:rounded-xl"
          )}
        >
          {/* Empty state */}
          {showEmpty && (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              No results for &quot;{query}&quot;. Try a broader term.
            </div>
          )}

          {/* Default view: recent searches + quick filters */}
          {!q && !isTyping && (
            <div className="py-1">
              {recentSearches.length > 0 && (
                <>
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Recent Searches
                  </div>
                  {recentSearches.map((term, idx) => {
                    const itemIdx = idx;
                    return (
                      <div
                        key={term}
                        role="option"
                        aria-selected={activeIndex === itemIdx}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 cursor-pointer text-sm transition-colors",
                          activeIndex === itemIdx
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-muted/60"
                        )}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setQuery(term);
                          inputRef.current?.focus();
                        }}
                        onMouseEnter={() => setActiveIndex(itemIdx)}
                      >
                        <div className="flex items-center gap-2.5">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span>{term}</span>
                        </div>
                        <button
                          className="rounded-full p-0.5 hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground"
                          onMouseDown={(e) => removeRecentSearch(e, term)}
                          aria-label={`Remove ${term} from recent searches`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                  <div className="mx-3 my-1 h-px bg-border/60" />
                </>
              )}

              <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Quick Filters
              </div>
              {QUICK_FILTERS.map((filter, idx) => {
                const itemIdx = recentSearches.length + idx;
                return (
                  <div
                    key={filter.title}
                    role="option"
                    aria-selected={activeIndex === itemIdx}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 cursor-pointer text-sm transition-colors",
                      activeIndex === itemIdx
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted/60"
                    )}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(filter.action, filter.title);
                    }}
                    onMouseEnter={() => setActiveIndex(itemIdx)}
                  >
                    <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>{filter.title}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Results view */}
          {q && !isTyping && hasResults && (
            <div className="py-1">
              {filteredRoles.length > 0 && (
                <>
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Roles
                  </div>
                  {filteredRoles.map((role, idx) => {
                    const itemIdx = idx;
                    return (
                      <div
                        key={role.name}
                        role="option"
                        aria-selected={activeIndex === itemIdx}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2 cursor-pointer text-sm transition-colors",
                          activeIndex === itemIdx
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-muted/60"
                        )}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelect(
                            `/?roles=${encodeURIComponent(role.name)}`,
                            role.name
                          );
                        }}
                        onMouseEnter={() => setActiveIndex(itemIdx)}
                      >
                        <Briefcase className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="flex-1 truncate">{role.name}</span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {role.count} records
                        </span>
                      </div>
                    );
                  })}
                </>
              )}

              {filteredCompanies.length > 0 && (
                <>
                  {filteredRoles.length > 0 && (
                    <div className="mx-3 my-1 h-px bg-border/60" />
                  )}
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Companies
                  </div>
                  {filteredCompanies.map((company, idx) => {
                    const itemIdx = filteredRoles.length + idx;
                    return (
                      <div
                        key={company.slug}
                        role="option"
                        aria-selected={activeIndex === itemIdx}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2 cursor-pointer text-sm transition-colors",
                          activeIndex === itemIdx
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-muted/60"
                        )}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelect(
                            `/companies/${company.slug}`,
                            company.name
                          );
                        }}
                        onMouseEnter={() => setActiveIndex(itemIdx)}
                      >
                        <CompanyLogo
                          src={company.logo}
                          name={company.name}
                          alt={company.name || "Company"}
                          width={16}
                          height={16}
                          className="h-4 w-4 rounded-full object-cover shrink-0"
                        />
                        <span className="flex-1 truncate">{company.name}</span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {company.industry}
                        </span>
                      </div>
                    );
                  })}
                </>
              )}

              {filteredLevels.length > 0 && (
                <>
                  {(filteredRoles.length > 0 || filteredCompanies.length > 0) && (
                    <div className="mx-3 my-1 h-px bg-border/60" />
                  )}
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Levels
                  </div>
                  {filteredLevels.map(([level, desc], idx) => {
                    const l = level as NormalizedLevel;
                    const itemIdx =
                      filteredRoles.length + filteredCompanies.length + idx;
                    return (
                      <div
                        key={level}
                        role="option"
                        aria-selected={activeIndex === itemIdx}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2 cursor-pointer text-sm transition-colors",
                          activeIndex === itemIdx
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-muted/60"
                        )}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelect(`/?levels=${level}`, level);
                        }}
                        onMouseEnter={() => setActiveIndex(itemIdx)}
                      >
                        <GraduationCap className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <Badge
                          variant={getLevelBadgeVariant(l)}
                          className={cn(
                            "px-1.5 py-0 text-[10px] shrink-0",
                            getLevelColor(l)
                          )}
                        >
                          {l}
                        </Badge>
                        <span className="text-xs text-muted-foreground truncate">
                          {desc}
                        </span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 px-3 py-3 text-sm text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Searching...</span>
            </div>
          )}

          {/* Footer hint */}
          <div className="flex items-center justify-between border-t border-border/60 bg-muted/30 px-3 py-1.5">
            <span className="text-[10px] text-muted-foreground">
              ↑↓ Navigate · Enter Select · Esc Close
            </span>
            <span className="text-[10px] text-muted-foreground">
              ⌘K to open
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile search trigger — just opens the dropdown panel in the header
export function MobileSearchButton() {
  const setOpen = useSearchStore((state) => state.setOpen);
  return (
    <button
      className="md:hidden flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors"
      onClick={() => setOpen(true)}
      aria-label="Search"
    >
      <Search className="h-5 w-5 text-muted-foreground" />
    </button>
  );
}
