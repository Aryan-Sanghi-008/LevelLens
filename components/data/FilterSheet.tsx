"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetBody,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal } from "lucide-react";

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeFilterCount?: number;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function FilterSheet({
  open,
  onOpenChange,
  activeFilterCount = 0,
  children,
  footer,
}: FilterSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[92vh] flex flex-col p-0">
        <SheetHeader className="border-b border-border shrink-0">
          <div className="flex items-center gap-2 pr-10">
            <SlidersHorizontal className="size-5 text-brand-primary" />
            <SheetTitle>Filters</SheetTitle>
            {activeFilterCount > 0 && (
              <Badge
                variant="default"
                className="bg-brand-primary text-brand-primary-foreground h-5 min-w-5 rounded-full px-1.5 text-[10px] font-bold"
              >
                {activeFilterCount}
              </Badge>
            )}
          </div>
        </SheetHeader>
        <SheetBody className="flex-1 min-h-0 pb-4">{children}</SheetBody>
        {footer && (
          <div className="shrink-0 border-t border-border p-4 bg-background">
            {footer}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
