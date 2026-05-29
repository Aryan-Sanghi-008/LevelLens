"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-6 border border-destructive/20 bg-destructive/5 rounded-xl text-center select-none w-full">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-3 shadow-xs">
            <AlertCircle className="h-5 w-5" />
          </div>
          <h4 className="font-bold text-sm text-foreground mb-1">
            Section loading failed
          </h4>
          <p className="text-xs text-muted-foreground max-w-sm mb-4 leading-relaxed">
            There was an error loading this specific block. Other features remain fully operational.
          </p>
          <Button
            variant="outline"
            size="xs"
            onClick={this.handleReset}
            className="h-8 rounded-lg text-xs font-semibold gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reload section
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
