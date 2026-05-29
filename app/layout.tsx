import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { CommandSearch } from "@/components/shared/CommandSearch";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s | LevelLens",
    default: "LevelLens - Compensation & Career Benchmarking",
  },
  description: "Detailed tech compensation, multi-company level mapping, and career insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <div className="relative flex min-h-screen flex-col">
                <Suspense
                  fallback={
                    <header className="sticky top-0 z-50 h-14 w-full shrink-0 border-b border-border bg-background" />
                  }
                >
                  <Header />
                </Suspense>
                <div className="flex flex-1 items-start w-full">
                  <Sidebar />
                  <main className="flex-1 overflow-y-auto pb-14 md:pb-0">
                    {children}
                  </main>
                </div>
                <BottomNav />
              </div>
              <CommandSearch />
              <Toaster richColors closeButton />
            </TooltipProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
