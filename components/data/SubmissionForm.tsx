"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { NormalizedLevel } from "@/types";
import { NORMALIZED_LEVELS, CURRENCIES } from "@/lib/constants";
import { MOCK_COMPANIES } from "@/lib/data/mock/companies";
import { useSubmissionStore } from "@/lib/hooks/useSubmissionStore";
import { formatCurrency, slugify } from "@/lib/formatters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Building2,
  Briefcase,
  BadgeDollarSign,
  ShieldCheck,
  Upload,
  Sparkles,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  // Step 1
  companyName: string;
  jobTitle: string;
  normalizedLevel: NormalizedLevel | "";
  totalYoe: number | "";
  companyYoe: number | "";

  // Step 2
  currency: string;
  baseSalary: number | "";
  stockPerYear: number | "";
  bonus: number | "";
  city: string;
  country: string;
  effectiveMonth: string;
  effectiveYear: number | "";

  // Step 3
  linkedinUrl: string;
  tags: string[];
  consent: boolean;
}

const INITIAL_FORM: FormData = {
  companyName: "",
  jobTitle: "",
  normalizedLevel: "",
  totalYoe: "",
  companyYoe: "",
  currency: "INR",
  baseSalary: "",
  stockPerYear: "",
  bonus: "",
  city: "",
  country: "India",
  effectiveMonth: "",
  effectiveYear: "",
  linkedinUrl: "",
  tags: [],
  consent: false,
};

const AVAILABLE_TAGS = [
  "New hire",
  "Post-promotion",
  "Refresher grant",
  "Negotiated",
  "Mid-cycle raise",
  "Annual review",
  "Competing offer",
  "ESOP",
  "Remote",
];

const INDIAN_CITIES = [
  "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai",
  "Kolkata", "Ahmedabad", "Noida", "Gurgaon", "Jaipur", "Kochi",
];

const GLOBAL_CITIES = [
  "San Francisco", "New York", "Seattle", "London", "Singapore",
  "Dubai", "Berlin", "Zurich", "Toronto", "Sydney", "Amsterdam",
];

const ALL_CITIES = [...INDIAN_CITIES, ...GLOBAL_CITIES];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const COMPANY_NAMES = MOCK_COMPANIES.map((c) => c.name);

// ─── Step definitions ─────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Your Role", icon: Briefcase },
  { id: 2, label: "Compensation", icon: BadgeDollarSign },
  { id: 3, label: "Verify & Submit", icon: ShieldCheck },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldLabel({
  children,
  required,
  hint,
  htmlFor,
}: {
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
  htmlFor?: string;
}) {
  const [showHint, setShowHint] = useState(false);
  return (
    <label htmlFor={htmlFor} className="flex items-center gap-1.5 text-sm font-medium mb-1.5">
      {children}
      {required && <span className="text-destructive">*</span>}
      {hint && (
        <span className="relative ml-0.5">
          <button
            type="button"
            onMouseEnter={() => setShowHint(true)}
            onMouseLeave={() => setShowHint(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="h-3.5 w-3.5" />
          </button>
          {showHint && (
            <span className="absolute left-6 top-0 z-50 w-56 rounded-lg border border-border bg-popover px-3 py-2 text-xs text-muted-foreground shadow-xl">
              {hint}
            </span>
          )}
        </span>
      )}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-destructive">{message}</p>;
}

function Autocomplete({
  value,
  onChange,
  suggestions,
  placeholder,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  suggestions: string[];
  placeholder?: string;
  id?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query.length > 0
    ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : [];

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <Input
        id={id}
        value={query}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="h-10 text-sm"
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-popover py-1 shadow-xl">
          {filtered.map((s) => (
            <li key={s}>
              <button
                type="button"
                className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2"
                onMouseDown={() => {
                  onChange(s);
                  setQuery(s);
                  setOpen(false);
                }}
              >
                <Building2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LiveTotalComp({
  base,
  stock,
  bonus,
  currency,
}: {
  base: number | "";
  stock: number | "";
  bonus: number | "";
  currency: string;
}) {
  const total = (Number(base) || 0) + (Number(stock) || 0) + (Number(bonus) || 0);
  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "₹";

  return (
    <div className="mt-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-4">
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
        Total Compensation (auto-calculated)
      </p>
      <p className="text-3xl font-bold tracking-tight">
        {total > 0 ? formatCurrency(total, currency) : (
          <span className="text-muted-foreground font-normal text-lg">
            Fill in above to calculate
          </span>
        )}
      </p>
      {total > 0 && (
        <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
          <span>Base: {symbol}{(Number(base) || 0).toLocaleString()}</span>
          <span>·</span>
          <span>Stock: {symbol}{(Number(stock) || 0).toLocaleString()}</span>
          <span>·</span>
          <span>Bonus: {symbol}{(Number(bonus) || 0).toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}

// ─── Confetti ─────────────────────────────────────────────────────────────────

function ConfettiPiece({ i }: { i: number }) {
  const colors = ["#3b82f6", "#22c55e", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"];
  const color = colors[i % colors.length];
  const left = (i * 7.3) % 100;
  const delay = (i * 0.08) % 1;
  const size = 6 + (i % 4) * 2;
  const duration = 1.2 + (i % 3) * 0.4;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: "-20px",
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: i % 2 === 0 ? "50%" : "2px",
        background: color,
        animation: `confettiFall ${duration}s ease-in ${delay}s forwards`,
        zIndex: 9999,
        transform: `rotate(${i * 37}deg)`,
      }}
    />
  );
}

function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <>
      {Array.from({ length: 48 }, (_, i) => (
        <ConfettiPiece key={i} i={i} />
      ))}
    </>
  );
}

// ─── Validation ───────────────────────────────────────────────────────────────

type Errors = Partial<Record<keyof FormData, string>>;

function validateStep(step: number, data: FormData): Errors {
  const errors: Errors = {};
  if (step === 1) {
    if (!data.companyName.trim()) errors.companyName = "Company name is required";
    if (!data.jobTitle.trim()) errors.jobTitle = "Job title is required";
    if (!data.normalizedLevel) errors.normalizedLevel = "Please select a level";
    if (data.totalYoe === "" || Number(data.totalYoe) < 0)
      errors.totalYoe = "Enter years of experience";
  }
  if (step === 2) {
    if (!data.baseSalary || Number(data.baseSalary) <= 0)
      errors.baseSalary = "Base salary is required";
    if (!data.city.trim()) errors.city = "City is required";
    if (!data.effectiveMonth) errors.effectiveMonth = "Select a month";
    if (!data.effectiveYear || Number(data.effectiveYear) < 2015)
      errors.effectiveYear = "Enter a valid year (2015–present)";
  }
  if (step === 3) {
    if (!data.consent) errors.consent = "You must consent to submit";
  }
  return errors;
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────

function Step1({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: Errors;
  onChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Company */}
      <div>
        <FieldLabel required htmlFor="company-name">Company Name</FieldLabel>
        <Autocomplete
          id="company-name"
          value={data.companyName}
          onChange={(v) => onChange("companyName", v)}
          suggestions={COMPANY_NAMES}
          placeholder="e.g. Google, Flipkart, Zepto…"
        />
        <FieldError message={errors.companyName} />
      </div>

      {/* Job title */}
      <div>
        <FieldLabel required htmlFor="job-title">Job Title</FieldLabel>
        <Input
          id="job-title"
          value={data.jobTitle}
          onChange={(e) => onChange("jobTitle", e.target.value)}
          placeholder="e.g. Software Engineer 2, Senior PM…"
          className="h-10 text-sm"
        />
        <FieldError message={errors.jobTitle} />
      </div>

      {/* Level selector */}
      <div>
        <FieldLabel required>Normalized Level</FieldLabel>
        <p className="text-xs text-muted-foreground mb-3">
          Pick the level that best matches your role — use the descriptions to self-identify.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {NORMALIZED_LEVELS.map(({ level, label, description, typicalYoe }) => {
            const isSelected = data.normalizedLevel === level;
            return (
              <button
                key={level}
                type="button"
                id={`level-${level}`}
                onClick={() => onChange("normalizedLevel", level)}
                className={cn(
                  "rounded-xl border-2 p-3 text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/40 hover:bg-accent/40"
                )}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-[10px] text-muted-foreground bg-muted rounded px-1.5 py-0.5">
                    {typicalYoe} yrs
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </button>
            );
          })}
        </div>
        <FieldError message={errors.normalizedLevel} />
      </div>

      {/* Experience */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel required htmlFor="total-yoe" hint="Total professional experience across all employers">
            Total YoE
          </FieldLabel>
          <Input
            id="total-yoe"
            type="number"
            min={0}
            max={40}
            value={data.totalYoe === "" ? "" : String(data.totalYoe)}
            onChange={(e) =>
              onChange("totalYoe", e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="e.g. 5"
            className="h-10 text-sm"
          />
          <FieldError message={errors.totalYoe} />
        </div>
        <div>
          <FieldLabel htmlFor="company-yoe" hint="How long you've been at this specific company">
            At this company
          </FieldLabel>
          <Input
            id="company-yoe"
            type="number"
            min={0}
            max={40}
            value={data.companyYoe === "" ? "" : String(data.companyYoe)}
            onChange={(e) =>
              onChange("companyYoe", e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="e.g. 2"
            className="h-10 text-sm"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────

function Step2({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: Errors;
  onChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}) {
  const symbol = CURRENCIES.find((c) => c.code === data.currency)?.symbol ?? "₹";

  return (
    <div className="space-y-6">
      {/* Currency */}
      <div>
        <FieldLabel required>Currency</FieldLabel>
        <div className="flex gap-2 flex-wrap">
          {CURRENCIES.map((cur) => (
            <button
              key={cur.code}
              type="button"
              id={`currency-${cur.code}`}
              onClick={() => onChange("currency", cur.code)}
              className={cn(
                "px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all",
                data.currency === cur.code
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/40"
              )}
            >
              {cur.symbol} {cur.code}
            </button>
          ))}
        </div>
      </div>

      {/* Salary fields */}
      <div className="space-y-4">
        <div>
          <FieldLabel required htmlFor="base-salary">Base Salary (annual)</FieldLabel>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
              {symbol}
            </span>
            <Input
              id="base-salary"
              type="number"
              min={0}
              value={data.baseSalary === "" ? "" : String(data.baseSalary)}
              onChange={(e) =>
                onChange("baseSalary", e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="e.g. 2500000"
              className="h-10 text-sm pl-8"
            />
          </div>
          <FieldError message={errors.baseSalary} />
        </div>

        <div>
          <FieldLabel
            htmlFor="stock-per-year"
            hint="Enter the annual vesting value of your RSUs — not the total 4-year grant. E.g., if you got ₹48L over 4 years, enter ₹12L."
          >
            Annual Stock / RSU
          </FieldLabel>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
              {symbol}
            </span>
            <Input
              id="stock-per-year"
              type="number"
              min={0}
              value={data.stockPerYear === "" ? "" : String(data.stockPerYear)}
              onChange={(e) =>
                onChange("stockPerYear", e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Annual vesting value"
              className="h-10 text-sm pl-8"
            />
          </div>
        </div>

        <div>
          <FieldLabel htmlFor="annual-bonus" hint="Target or typical bonus, not guaranteed. Use the amount you expect to receive in a normal year.">
            Annual Bonus
          </FieldLabel>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
              {symbol}
            </span>
            <Input
              id="annual-bonus"
              type="number"
              min={0}
              value={data.bonus === "" ? "" : String(data.bonus)}
              onChange={(e) =>
                onChange("bonus", e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Target annual bonus"
              className="h-10 text-sm pl-8"
            />
          </div>
        </div>
      </div>

      {/* Live total */}
      <LiveTotalComp
        base={data.baseSalary}
        stock={data.stockPerYear}
        bonus={data.bonus}
        currency={data.currency}
      />

      {/* Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel required htmlFor="city">City</FieldLabel>
          <Autocomplete
            id="city"
            value={data.city}
            onChange={(v) => onChange("city", v)}
            suggestions={ALL_CITIES}
            placeholder="e.g. Bangalore"
          />
          <FieldError message={errors.city} />
        </div>
        <div>
          <FieldLabel htmlFor="country">Country</FieldLabel>
          <Autocomplete
            id="country"
            value={data.country}
            onChange={(v) => onChange("country", v)}
            suggestions={["India", "United States", "United Kingdom", "Germany", "Singapore", "Canada", "Australia"]}
            placeholder="e.g. India"
          />
        </div>
      </div>

      {/* Date */}
      <div>
        <FieldLabel required htmlFor="effective-month" hint="When did this compensation package become effective?">
          Effective Date
        </FieldLabel>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <select
              id="effective-month"
              value={data.effectiveMonth}
              onChange={(e) => onChange("effectiveMonth", e.target.value)}
              className={cn(
                "h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 dark:bg-input/30",
                !data.effectiveMonth && "text-muted-foreground"
              )}
            >
              <option value="" disabled>Month</option>
              {MONTHS.map((m, idx) => (
                <option key={m} value={String(idx + 1).padStart(2, "0")}>{m}</option>
              ))}
            </select>
            <FieldError message={errors.effectiveMonth} />
          </div>
          <div>
            <Input
              id="effective-year"
              type="number"
              min={2015}
              max={new Date().getFullYear()}
              value={data.effectiveYear === "" ? "" : String(data.effectiveYear)}
              onChange={(e) =>
                onChange("effectiveYear", e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder={String(new Date().getFullYear())}
              className="h-10 text-sm"
              aria-label="Effective Year"
            />
            <FieldError message={errors.effectiveYear} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right max-w-[55%]">{value || "—"}</span>
    </div>
  );
}

function Step3({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: Errors;
  onChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}) {
  const currency = data.currency;
  const totalComp =
    (Number(data.baseSalary) || 0) +
    (Number(data.stockPerYear) || 0) +
    (Number(data.bonus) || 0);
  const levelInfo = NORMALIZED_LEVELS.find((l) => l.level === data.normalizedLevel);

  return (
    <div className="space-y-6">
      {/* Optional verification */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-4">
        <div>
          <FieldLabel htmlFor="linkedin-url">LinkedIn URL (optional)</FieldLabel>
          <p className="text-xs text-muted-foreground mb-2">
            Helps us verify your role. Never displayed publicly.
          </p>
          <Input
            id="linkedin-url"
            type="url"
            value={data.linkedinUrl}
            onChange={(e) => onChange("linkedinUrl", e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
            className="h-10 text-sm"
          />
        </div>

        <div>
          <FieldLabel htmlFor="offer-upload">Upload Offer Letter (optional)</FieldLabel>
          <p className="text-xs text-muted-foreground mb-2">
            PDF or image. Used only for verification — never stored publicly.
          </p>
          <label
            htmlFor="offer-upload"
            className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 p-5 cursor-pointer hover:border-primary/40 hover:bg-accent/30 transition-colors"
          >
            <Upload className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Click to upload or drag & drop
            </span>
            <span className="text-xs text-muted-foreground">
              PDF, JPG, PNG up to 5MB
            </span>
            <input
              id="offer-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="sr-only"
              onChange={() => {}}
            />
          </label>
        </div>
      </div>

      {/* Tags */}
      <div>
        <FieldLabel hint="Select all that apply — helps us annotate your data for context.">
          Context Tags
        </FieldLabel>
        <div className="flex flex-wrap gap-2 mt-1">
          {AVAILABLE_TAGS.map((tag) => {
            const active = data.tags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                id={`tag-${tag.replace(/\s+/g, "-").toLowerCase()}`}
                onClick={() =>
                  onChange(
                    "tags",
                    active ? data.tags.filter((t) => t !== tag) : [...data.tags, tag]
                  )
                }
                className={cn(
                  "px-3 py-1.5 rounded-full border text-xs font-medium transition-all",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                )}
              >
                {active && <Check className="h-3 w-3 inline mr-1" />}
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Review summary */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="bg-muted/50 px-4 py-2.5">
          <h4 className="text-sm font-semibold">Review Your Submission</h4>
        </div>
        <div className="px-4 divide-y divide-border">
          <ReviewRow label="Company" value={data.companyName} />
          <ReviewRow label="Title" value={data.jobTitle} />
          <ReviewRow label="Level" value={levelInfo?.label ?? data.normalizedLevel} />
          <ReviewRow label="Total YoE" value={data.totalYoe !== "" ? `${data.totalYoe} years` : "—"} />
          <ReviewRow label="Location" value={[data.city, data.country].filter(Boolean).join(", ")} />
          <ReviewRow label="Currency" value={data.currency} />
          <ReviewRow label="Base Salary" value={data.baseSalary !== "" ? formatCurrency(Number(data.baseSalary), currency) : "—"} />
          <ReviewRow label="Annual Stock" value={data.stockPerYear !== "" ? formatCurrency(Number(data.stockPerYear), currency) : "—"} />
          <ReviewRow label="Annual Bonus" value={data.bonus !== "" ? formatCurrency(Number(data.bonus), currency) : "—"} />
          <ReviewRow label="Total Comp" value={totalComp > 0 ? formatCurrency(totalComp, currency) : "—"} />
          <ReviewRow label="Effective" value={data.effectiveMonth && data.effectiveYear !== "" ? `${MONTHS[Number(data.effectiveMonth) - 1]} ${data.effectiveYear}` : "—"} />
          {data.tags.length > 0 && (
            <ReviewRow label="Tags" value={data.tags.join(", ")} />
          )}
        </div>
      </div>

      {/* Consent */}
      <div className={cn(
        "flex items-start gap-3 rounded-xl border-2 p-4 transition-colors",
        data.consent ? "border-primary/30 bg-primary/5" : "border-border"
      )}>
        <Checkbox
          id="consent"
          checked={data.consent}
          onCheckedChange={(checked) => onChange("consent", !!checked)}
          className="mt-0.5 shrink-0"
        />
        <label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
          I confirm that this compensation data is accurate to the best of my knowledge, and I
          consent to it being displayed anonymously on LevelLens for benchmarking purposes.
        </label>
      </div>
      <FieldError message={errors.consent} />
    </div>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────

export function SubmissionForm() {
  const router = useRouter();
  const addSubmission = useSubmissionStore((s) => s.addSubmission);

  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const onChange = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const goNext = useCallback(() => {
    const errs = validateStep(step, data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, data]);

  const goBack = useCallback(() => {
    setStep((s) => s - 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = useCallback(() => {
    const errs = validateStep(3, data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const totalComp =
      (Number(data.baseSalary) || 0) +
      (Number(data.stockPerYear) || 0) +
      (Number(data.bonus) || 0);

    const id = `usr_${Math.random().toString(36).slice(2, 9)}`;
    const effectiveDateISO = data.effectiveMonth && data.effectiveYear !== ""
      ? new Date(Number(data.effectiveYear), Number(data.effectiveMonth) - 1, 1).toISOString()
      : new Date().toISOString();

    addSubmission({
      id,
      company: {
        name: data.companyName,
        slug: slugify(data.companyName),
      },
      role: data.jobTitle,
      normalizedLevel: data.normalizedLevel as NormalizedLevel,
      rawTitle: data.jobTitle,
      yearsOfExperience: Number(data.totalYoe) || 0,
      location: {
        city: data.city,
        country: data.country,
      },
      baseSalary: Number(data.baseSalary) || 0,
      stockPerYear: Number(data.stockPerYear) || 0,
      bonus: Number(data.bonus) || 0,
      totalCompensation: totalComp,
      currency: data.currency,
      reportedAt: effectiveDateISO,
      verified: false,
      dataSource: "Self-reported",
      tags: [...data.tags, "self-reported"],
    });

    setSubmitted(true);
    setShowConfetti(true);
    toast.success("Thanks! Your data has been added.", {
      description: "It will appear in the salary table as self-reported.",
      duration: 5000,
    });

    setTimeout(() => setShowConfetti(false), 2200);
  }, [data, addSubmission]);

  // ── Success State ──────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center animate-in zoom-in-50 duration-500">
          <Sparkles className="h-9 w-9 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">You&apos;re awesome! 🎉</h2>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Your compensation data has been added to the table and is visible to the community.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => { setData(INITIAL_FORM); setStep(1); setSubmitted(false); }}>
            Submit Another
          </Button>
          <Button onClick={() => router.push("/")}>
            View the Table
          </Button>
        </div>
      </div>
    );
  }

  // ── Stepper progress ───────────────────────────────────────────────────────

  return (
    <div className="max-w-2xl mx-auto">
      <Confetti active={showConfetti} />

      {/* Stepper */}
      <nav aria-label="Form progress" className="mb-8">
        <ol className="flex items-center gap-0">
          {STEPS.map((s, idx) => {
            const isCompleted = step > s.id;
            const isActive = step === s.id;
            const Icon = s.icon;

            return (
              <React.Fragment key={s.id}>
                <li className="flex flex-col items-center gap-1.5 flex-1">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                      isCompleted
                        ? "border-primary bg-primary text-primary-foreground"
                        : isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium whitespace-nowrap",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {s.label}
                  </span>
                </li>
                {idx < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 -mt-5 mx-1 transition-all duration-500",
                      step > s.id ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>

      {/* Step card */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="bg-muted/30 border-b border-border px-6 py-4">
          <h3 className="font-semibold text-base">
            Step {step} of {STEPS.length} — {STEPS[step - 1]?.label}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {step === 1 && "Tell us about your role and level."}
            {step === 2 && "Enter your compensation details — all amounts are annual."}
            {step === 3 && "Optional verification, then review and submit."}
          </p>
        </div>

        <div className="p-6">
          {step === 1 && <Step1 data={data} errors={errors} onChange={onChange} />}
          {step === 2 && <Step2 data={data} errors={errors} onChange={onChange} />}
          {step === 3 && <Step3 data={data} errors={errors} onChange={onChange} />}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4 bg-muted/20">
          <Button
            variant="ghost"
            onClick={step === 1 ? () => router.back() : goBack}
            className="gap-1.5"
          >
            <ChevronLeft className="h-4 w-4" />
            {step === 1 ? "Cancel" : "Back"}
          </Button>

          <span className="text-xs text-muted-foreground">
            {step} / {STEPS.length}
          </span>

          {step < STEPS.length ? (
            <Button onClick={goNext} className="gap-1.5">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="gap-1.5 bg-primary hover:bg-primary/90"
              disabled={!data.consent}
            >
              <Check className="h-4 w-4" />
              Submit Data
            </Button>
          )}
        </div>
      </div>

      {/* Trust note */}
      <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
        <ShieldCheck className="h-3.5 w-3.5" />
        Your identity is never revealed. Only aggregated data is shown publicly.
      </p>
    </div>
  );
}
