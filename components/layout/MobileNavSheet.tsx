"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { slugify } from "@/lib/formatters";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { getMoreNavItems } from "@/lib/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetBody,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface MobileNavSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getRolesHref(): string {
  const firstRole = MOCK_SALARIES[0]?.role;
  if (!firstRole) return "/companies";
  return `/roles/${slugify(firstRole)}`;
}

export function MobileNavSheet({ open, onOpenChange }: MobileNavSheetProps) {
  const pathname = usePathname();
  const items = getMoreNavItems().map((item) =>
    item.href === "/roles" ? { ...item, href: getRolesHref() } : item
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh]">
        <SheetHeader>
          <SheetTitle>More</SheetTitle>
        </SheetHeader>
        <SheetBody className="space-y-1">
          {items.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href + item.title}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-muted",
                  active ? "text-brand-primary bg-muted/50" : "text-foreground"
                )}
              >
                <span className="flex items-center gap-3">
                  <item.icon className="size-4" />
                  {item.title}
                </span>
                {item.badge && (
                  <Badge variant="secondary" className="text-[10px]">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
