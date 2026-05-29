import React from "react";
import { cn } from "@/lib/utils";

interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function PageShell({ title, description, actions, children, className, ...props }: PageShellProps) {
  return (
    <div className={cn("flex-1 space-y-4 p-4 md:p-8 pt-6", className)} {...props}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 pb-4 border-b border-border/50">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-muted-foreground text-sm mt-1">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
      <div className="min-h-[500px]">
        {children}
      </div>
    </div>
  );
}
