"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { BOTTOM_NAV_ITEMS } from "@/lib/navigation";
import { useComparisonStore } from "@/lib/hooks/useComparisonStore";
import { Badge } from "@/components/ui/badge";
import { MobileNavSheet } from "@/components/layout/MobileNavSheet";
import { useState, useEffect } from "react";

export function BottomNav() {
  const pathname = usePathname();
  const comparisonCount = useComparisonStore((s) => s.slots.length);
  const [moreOpen, setMoreOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;

    const handleResize = () => {
      const vv = window.visualViewport;
      if (!vv) return;
      // If the visual viewport height is significantly smaller than the inner height, the keyboard is open
      const isKeyboardOpen = window.innerHeight - vv.height > 150;
      setIsVisible(!isKeyboardOpen);
    };

    window.visualViewport.addEventListener("resize", handleResize);
    window.visualViewport.addEventListener("scroll", handleResize);
    handleResize();

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed bottom-0 inset-x-0 z-50 flex h-14 items-stretch border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden transition-transform duration-200",
          isVisible ? "translate-y-0" : "translate-y-full pointer-events-none"
        )}
        aria-label="Main navigation"
      >
        {BOTTOM_NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const showBadge = item.href === "/compare" && comparisonCount > 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors",
                active ? "text-brand-primary" : "text-muted-foreground"
              )}
            >
              <span className="relative">
                <item.icon className={cn("size-5", active && "text-brand-primary")} />
                {showBadge && (
                  <Badge
                    variant="default"
                    className="absolute -top-1.5 -right-2 h-4 min-w-4 px-1 text-[9px] font-bold bg-brand-primary text-brand-primary-foreground"
                  >
                    {comparisonCount}
                  </Badge>
                )}
              </span>
              <span>{item.title}</span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => setMoreOpen(true)}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium text-muted-foreground"
        >
          <MoreHorizontal className="size-5" />
          <span>More</span>
        </button>
      </nav>

      <MobileNavSheet open={moreOpen} onOpenChange={setMoreOpen} />
    </>
  );
}
