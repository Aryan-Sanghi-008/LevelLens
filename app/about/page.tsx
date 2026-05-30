"use client";

import React from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Layers, 
  GitCompare, 
  Table2, 
  Cpu, 
  Globe, 
  Award,
  ArrowRight,
  LineChart
} from "lucide-react";

export default function AboutPage() {
  const pillars = [
    {
      icon: Layers,
      title: "Level Normalization",
      description: "We map company-specific titles (Intern to Exec) to a standard alignment matrix to solve title inflation instantly.",
      color: "text-brand-primary bg-brand-primary/10"
    },
    {
      icon: ShieldCheck,
      title: "High Data Integrity",
      description: "Enforces strict entry formatting and verified reports, rejecting dummy data wall fillers to keep market signals clean.",
      color: "text-emerald-500 bg-emerald-500/10"
    },
    {
      icon: Globe,
      title: "No-Paywall Open Access",
      description: "Enjoy zero paywalls, forced contribution walls, flashing ads, or intrusive redirects. Data is open to export and share.",
      color: "text-amber-500 bg-amber-500/10"
    }
  ];

  const features = [
    {
      icon: Table2,
      title: "TanStack Virtual Grids",
      desc: "Renders 500+ records at a buttery-smooth 60 FPS utilizing advanced DOM node recycling."
    },
    {
      icon: GitCompare,
      title: "State-of-the-Art Comparator",
      desc: "Compare base salary, stock distributions, and bonuses across multiple companies side-by-side."
    },
    {
      icon: Cpu,
      title: "URL-First State Architecture",
      desc: "All active filters, sort targets, and compared slots reside directly inside shareable search parameters."
    },
    {
      icon: LineChart,
      title: "Granular Salary Split Maps",
      desc: "Visualizes cash Base, Bonus, and RSU splits on interactive HSL-themed percentile ladders."
    }
  ];

  const techStack = [
    "Next.js 14 App Router", "TypeScript Strict", "Tailwind CSS", "Base UI", 
    "TanStack Table v8", "TanStack Virtual", "Recharts", "Nuqs", "Zustand", "Sonner"
  ];

  return (
    <PageShell
      title="About LevelLens"
      description="The open-access compensation intelligence platform designed for high-signal, high-integrity career benchmarking."
    >
      <div className="space-y-12 mt-2 md:mt-4 max-w-5xl mx-auto w-full select-none pb-12">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-brand-primary/5 p-8 md:p-12 shadow-md">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          <div className="relative z-10 space-y-6 max-w-3xl">
            <Badge className="bg-brand-primary/10 text-brand-primary border-none rounded-full px-3 py-1 font-semibold text-xs hover:bg-brand-primary/15">
              The Mission
            </Badge>
            <h2 className="text-2xl md:text-3.5xl font-bold tracking-tight text-foreground leading-tight">
              Democratizing Compensation and Solving Title Inflation.
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Existing salary databases fail professionals by emphasizing corporate titles over actual scope of work. 
              A &quot;Senior&quot; at a local firm might carry the responsibilities of a &quot;Junior&quot; at a tech giant, while a &quot;Staff Engineer&quot; 
              at a startup often maps to a &quot;Senior L5&quot; elsewhere. LevelLens aligns company-specific roles directly with standard 
              Normalized Levels, delivering a premium, dark-first career benchmarking platform focused completely on open, high-integrity financial access.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/">
                <Button className="h-10 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-brand-primary-foreground font-semibold text-xs gap-1.5 shadow-sm active:scale-95 transition-all">
                  Browse Salary Data
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/tools/ladder">
                <Button variant="outline" className="h-10 rounded-xl font-semibold text-xs border-border/80 hover:bg-muted/50 active:scale-95 transition-all">
                  View Career Ladders
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Pillars Section */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">Our Core Design Pillars</h3>
            <p className="text-xs md:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              We leverage strict visual safety, client-side caching, and modern virtualization to safeguard data high fidelity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <Card key={pillar.title} className="border border-border/50 bg-card hover:border-brand-primary/30 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group">
                <CardContent className="pt-6 space-y-4">
                  <div className={`p-2.5 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center ${pillar.color} transition-all duration-300 group-hover:scale-105`}>
                    <pillar.icon className="size-5" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-foreground">{pillar.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dynamic Features & Tech Stack Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Features Column */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-bold text-base md:text-lg flex items-center gap-2 border-b border-border/40 pb-2.5 select-none">
              <Award className="size-4.5 text-brand-primary" />
              Advanced Engineering Integrations
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feat) => (
                <div key={feat.title} className="flex gap-4 p-4 rounded-xl border border-border/40 bg-card hover:bg-muted/10 transition-colors duration-200">
                  <div className="p-2 h-9 w-9 rounded-lg bg-brand-primary/5 text-brand-primary flex items-center justify-center shrink-0">
                    <feat.icon className="size-4.5" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h4 className="font-semibold text-xs md:text-sm text-foreground truncate">{feat.title}</h4>
                    <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stacks Sidebar Column */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="font-bold text-base md:text-lg flex items-center gap-2 border-b border-border/40 pb-2.5 select-none">
              <Cpu className="size-4.5 text-brand-primary" />
              Technology Stack
            </h3>

            <Card className="border border-border/50 bg-card shadow-sm p-5 space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                LevelLens is engineered with maximum modern tech performance and robust, responsive HSL visualization variables.
              </p>
              <div className="flex flex-wrap gap-2 pt-1.5">
                {techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-muted text-foreground/80 hover:bg-muted/80 text-[10px] font-medium border-border/50 rounded-md px-2 py-0.5">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="pt-2 border-t border-border/40">
                <Link href="/levels" className="text-xs font-semibold text-brand-primary hover:text-brand-primary-hover flex items-center gap-1">
                  View Standard Levels Map
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </Card>
          </div>

        </div>

      </div>
    </PageShell>
  );
}
