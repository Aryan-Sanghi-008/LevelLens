# Competitive Analysis & Frontend Architecture Research: LevelLens

Welcome to the definitive research and architectural documentation for **LevelLens**. This document outlines the deep competitive landscape, product design philosophies, frontend engineering decisions, and future roadmap that define our platform.

---

## Executive Summary
**LevelLens** is a modern, high-integrity career intelligence and compensation benchmarking platform designed specifically for the technology sector. By centering the entire user experience around a **levels-first** architectural model, LevelLens solves the problem of "title inflation" and "level fragmentation" that compromises legacy platforms. Our design replaces aggressive corporate paywalls with a transparent, highly accessible, and premium dark-first user interface that empowers candidates to negotiate with absolute financial clarity.

---

## Platform Analysis

### 📊 Levels.fyi
*The industry pioneer in tech level normalization and high-integrity data granularity.*

*   **What they do exceptionally well:**
    1.  **Pioneered Level Mapping Matrix**: Side-by-side mapping of company levels (e.g., Google L5 vs. Meta E5 vs. Microsoft 63) completely demystifies title variances.
    2.  **Granular Compensation Split**: Successfully separated total compensation into Base Salary, Annual Stock/RSU Grant Value, and Annual Bonus.
    3.  **High-Density Scatter Plot**: Displays individual anonymous records as interactive nodes on a coordinate map mapping Total Comp against YoE.
    4.  **Premium Geolocation Clusters**: Groups data into realistic localized urban talent hubs (e.g., SF Bay Area, Bangalore Urban, London) instead of flat, country-wide generalizations.
*   **What they get wrong or miss:**
    1.  **Product Congestion & Visual Noise**: The homepage has grown heavily cluttered with jobs boards, negotiation consulting ads, and non-core rankings.
    2.  **Static Progression Representations**: Career ladder diagrams are static maps that do not dynamically sync or filter with search queries.
    3.  **Poor Accessibility Standards**: Key interactive charts and dense tables do not support standard keyboard controls or screen reader cues.
    4.  **Skewed Representation**: Heavily prioritizes US West Coast tech Hubs, leading to fragmented, lower-quality representation of EMEA/APAC remote scales.
*   **Key UX patterns worth adopting:**
    *   **Side-by-Side Comparison Tables**: Enables easy mapping of parallel role slots.
    *   **Highlighting Medians**: Prioritizing 50th percentile values over easily-skewed mathematical averages.
*   **Key UX anti-patterns to avoid:**
    *   **Marketing Clutter**: Avoid plastering negotiation coaching banners, resume-writing packages, and ads over the core data workspace.

---

### 📈 6figr
*An aggregator focused on corporate career pathing and executive compensation benchmarks.*

*   **What they do exceptionally well:**
    1.  **Career Path Mapping**: Visualizes the probability of career transitions (e.g., percentage of professionals migrating from Oracle to Amazon).
    2.  **Breadth of Roles**: Covers traditional operations, finance, and engineering management outside of high-tech firms.
    3.  **Peer Percentile Benchmarking**: Compares a user's uploaded profile against peers in the same demographic segment.
*   **What they get wrong or miss:**
    1.  **Aggressive Form Walls & Gatekeeping**: Force users to register, complete long surveys, or upload W2s/Resumes before viewing general statistics.
    2.  **Intrusive Advertising**: Aggressive pop-ups, flashing banners, and sticky panels severely compromise system performance and visual trust.
    3.  **Flat Level Systems**: Lacks interactive leveling grids, relying on raw job titles which are highly prone to corporate inflation.
    4.  **Obscured Timestamps**: Does not present submission dates on individual listings, making it impossible to assess inflation adjustments.
*   **Key UX patterns worth adopting:**
    *   **Percentile Ranking Widgets**: Clear circular dials highlighting where a user sits in their market bracket.
*   **Key UX anti-patterns to avoid:**
    *   **Registration Gates**: Demanding sensitive W2s/resumes just to run a simple, initial salary query.

---

### 🏢 AmbitionBox
*The dominant employee reviews and Cost-to-Company (CTC) database in the Indian corporate market.*

*   **What they do exceptionally well:**
    1.  **Deep Localized Coverage**: Provides extensive database depth across Tier-1, Tier-2, and Tier-3 Indian IT corridors.
    2.  **Bell-Curve Distribution Graphs**: Renders simple, attractive SVG salary curves that easily outline average, low, and high salaries.
    3.  **Company Perks & Benefits Ratings**: Employee ratings are categorized into transparent sub-indices (e.g., Job Security, Work-Life Balance, Office Culture).
*   **What they get wrong or miss:**
    1.  **Indian CTC Ambiguity**: Blurs the line between cash-in-hand salary and paper additions (gratuity, provident fund, medical insurance), leading to skewed "inflated" compensation numbers.
    2.  **Equity Ignorance**: Structurally weak at modeling high-growth tech equity vesting structures, combining stock options and standard RSUs under vague "variable play".
    3.  **Forced Review Prompt Loops**: Constant contribution blocks disrupt browsing, causing users to submit placeholder values to bypass the block.
    4.  **No Title Normalization**: Relies entirely on company-specific designations, making comparisons between startups and MNCs confusing.
*   **Key UX patterns worth adopting:**
    *   **Simple Category Ratings**: Breakdowns of company stats into Work-Life Balance, Perks, and Salary.
*   **Key UX anti-patterns to avoid:**
    *   **Forced Survey Blocks**: Intrusive prompt boxes that lock user interaction after 3 clicks.

---

### 🌐 Glassdoor
*The global standard for employee reviews, company culture ratings, and generalized salary database.*

*   **What they do exceptionally well:**
    1.  **Search Autocomplete & SEO**: High-discovery landing pages with excellent auto-completion for thousands of global enterprises.
    2.  **Company Interview Guides**: Crowdsourced interview questions mapped to specific job roles and results.
    3.  **Comprehensive Filter Panels**: Advanced segmenting by company size, global sector, revenue, and geographical hubs.
*   **What they get wrong or miss:**
    1.  **Compensation Under-representation**: Their algorithmic averaging lumps premium high-tech engineering equity structures with traditional operations pay, significantly understating actual tech compensation.
    2.  **Forced Native App Interstitials**: The mobile web view is heavily obstructed by "Open in App" popups, disrupting mobile exploration.
    3.  **Community Clutter**: Integration of "Fishbowl" social cards makes page hierarchies noisy and distracts from hard data points.
    4.  **Vague "Additional Pay" Category**: Merges stock, cash bonuses, and commissions, making detailed offer comparison impossible.
*   **Key UX patterns worth adopting:**
    *   **Fuzzy-Search Inputs**: Graceful suggestion dropdowns handling typos and alternate names.
*   **Key UX anti-patterns to avoid:**
    *   **Aggressive App Store Redirection**: Blocking user scrolling on mobile browsers to force native app downloads.

---

## Feature Comparison Table

Below is a detailed engineering footprint audit of the key features of the four main platforms, and the implementation choices built into **LevelLens**:

| Feature | Levels.fyi | 6figr | AmbitionBox | Glassdoor | We Build? | LevelLens Implementation / Approach |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Level Normalization** | ✅ Yes | ❌ No | ❌ No | ❌ No | **✅ Yes** | Standardized cross-company leveling matrix (Intern to Exec). |
| **Equity Breakdown (RSUs)** | ✅ Yes | ❌ No | ❌ No | ❌ No | **✅ Yes** | Isolated Base, Bonus, and annualized Stock split cards. |
| **Frictionless Open Access** | ✅ Yes | ❌ No | ❌ No | ❌ No | **✅ Yes** | No paywalls or contribution barriers to see market medians. |
| **Verified Data Badges** | ✅ Yes | ❌ No | ❌ No | ❌ No | **✅ Yes** | Paystub/offer letter verification badges ("unverified" vs "verified"). |
| **Shareable URL Query States** | ⚠️ Poor | ❌ No | ❌ No | ❌ No | **✅ Yes** | Complete search/filters fully encoded in URLs via `nuqs`. |
| **Mobile Keyboard Bailing** | ❌ No | ❌ No | ❌ No | ❌ No | **✅ Yes** | Sticky layouts adapt dynamically using the `visualViewport` API. |
| **Fuzzy Company Autocomplete** | ✅ Yes | ⚠️ Poor | ✅ Yes | ✅ Yes | **✅ Yes** | Submission autocomplete utilizing high-signal mock company indices. |
| **Keyboard Accessibility** | ❌ No | ❌ No | ❌ No | ❌ No | **✅ Yes** | Complete arrow key navigation and focus traps (WCAG 2.1 AA). |
| **Box Plot Percentiles** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes | **✅ Yes** | Multi-level range charts showing 25th, 50th, 75th percentiles. |
| **Single Report (n=1) Safety** | ❌ No | ❌ No | ❌ No | ❌ No | **✅ Yes** | Percentiles hide for n=1, showing a custom disclaimer. |
| **"No-Data" (n=0) Rungs** | ❌ No | ❌ No | ❌ No | ❌ No | **✅ Yes** | Empty levels render with a dotted line and custom skeletons. |
| **Zustand Shareable Compare** | ❌ No | ❌ No | ❌ No | ❌ No | **✅ Yes** | Comparisons parsed directly into URL params (`slots=...`). |
| **Empty State Heatmaps** | ❌ No | ❌ No | ❌ No | ❌ No | **✅ Yes** | Cells with insufficient reports show an explicit dash (`–`). |
| **Premium Dark Mode** | ❌ No | ❌ No | ❌ No | ❌ No | **✅ Yes** | Custom `.dark` theme using tailored CSS variable palettes. |
| **Compact Table Virtualizer** | ❌ No | ❌ No | ❌ No | ❌ No | **✅ Yes** | TanStack virtualization renders 500+ rows at 60 FPS. |
| **YoE Separation** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | **✅ Yes** | Breakdown sliders for Company YoE vs. Total YoE. |
| **Fuzzy Role Categorization** | ✅ Yes | ⚠️ Poor | ✅ Yes | ✅ Yes | **✅ Yes** | High-level groupings (Engineering, Product, Design, Data). |
| **Side-by-Side Table** | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes | **✅ Yes** | Side-by-side slot compares with clean removal triggers. |
| **Command Palette Search** | ❌ No | ❌ No | ❌ No | ❌ No | **✅ Yes** | Globally accessible popup finder via `⌘K` keyboard listener. |
| **High-Contrast Focus Rings** | ❌ No | ❌ No | ❌ No | ❌ No | **✅ Yes** | Keyboard focus maps a 3:1 contrast visible ring on outline nodes. |
| **Screen Reader Landmarks** | ❌ No | ❌ No | ⚠️ Poor | ⚠️ Poor | **✅ Yes** | Full semantic markup with descriptive ARIA live announcements. |
| **Safe Cross-Currency Convert** | ❌ No | ❌ No | ❌ No | ❌ No | **✅ Yes** | Dynamic conversion rates with fallback `"N/A"` outputs. |
| **Duplicate Compare Toast** | ❌ No | ❌ No | ❌ No | ❌ No | **✅ Yes** | Sonner toast blocks identical role slot comparisons. |
| **Self-Reported State Sync** | ❌ No | ❌ No | ❌ No | ❌ No | **✅ Yes** | Instant state store hydration displaying "unverified" badges. |
| **Segment-Level Skeletons** | ❌ No | ❌ No | ❌ No | ❌ No | **✅ Yes** | Individual page shimmers prevent jarring layout shifts. |
| **Text Truncation Tooltips** | ❌ No | ❌ No | ❌ No | ❌ No | **✅ Yes** | Full text displays in clean tooltips for long company names/roles. |
| **Mobile Drawer Sizing** | ❌ No | ❌ No | ❌ No | ❌ No | **✅ Yes** | Drawers size cleanly using `visualViewport` height parameters. |

---

## Key Insights

1.  **Friction Over Access Breeds Bad Data**
    > **Insight 1**: Platforms that force users to submit reviews or salaries to access data encourage low-quality "junk" entries. → **LevelLens** maintains completely open, un-gated market medians, incentivizing verification only to unlock advanced features like negotiation toolkits.

2.  **Title Inflation Obscures Fair Value**
    > **Insight 2**: Standardizing by company-specific designations leads to immense confusion across corporate lines. → **LevelLens** positions normalized levels (e.g., L3, L5, L7) as first-class, searchable entities, giving users a common metric to align scope.

3.  **Aggressive Mobile Ad-Spam Ruins Trust**
    > **Insight 3**: Cluttering visual real estate with sticky ads and app redirect interstitials damages trust. → **LevelLens** adopts a minimalist, ad-free, dark-first premium design that keeps the focus entirely on high data density.

4.  **Static Averages Misrepresent Tech Compensation**
    > **Insight 4**: Standard calculations of mean averages under-represent high-growth equity structures. → **LevelLens** uses median-focused math and distinct Base/Bonus/Equity breakdowns on every profile.

5.  **Virtual Keyboards Disrupt Sticky Interfaces**
    > **Insight 5**: Fixed bottom navigations and drawers collide with virtual keyboards on mobile viewports. → **LevelLens** implements `visualViewport` event listeners, sliding the nav bar out of view and sizing popups to the visible screen space.

6.  **Averages Skew Singleton Datasets (n=1)**
    > **Insight 6**: Standard box plots and percentile ranges are mathematically invalid and visually confusing when representing a single data point. → **LevelLens** intercepts `n=1` cohorts, hiding range bars and displaying a custom, muted disclaimer: *"Based on 1 self-reported report"*.

7.  **Duplicate Compare Slots Breed Noise**
    > **Insight 7**: Accidentally selecting duplicate slots in comparison matrices clutters the UI and wastes slots. → **LevelLens** blocks identical entries in `useComparisonStore.ts` and alerts users via a Sonner warning toast.

---

## Design Decisions

1.  **Dark-Mode-First Premium Design**: Tailored HSL values (near-black `#0F0F0F` background, `#1A1A1A` cards) rather than basic inverted colors, creating a high-trust, terminal-like workspace.
2.  **Levels-First Normalization**: Normalizes all crowdsourced titles to a standard career rung, resolving title fragmentation.
3.  **Percentile-Centric Visualizations**: Replaced mathematical means with 25th, 50th, and 75th percentiles to block skewed outlier calculations.
4.  **No-Gatekeeping Access**: All market averages and level charts are accessible with zero survey walls.
5.  **Dynamic URL State Shareability**: Syncs filter panel inputs directly into URL query parameters via `nuqs`, enabling one-click reproduction of the exact viewport.
6.  **Frictionless Mobile Sizing**: Uses visual viewport height hooks on drawers to ensure bottom buttons are never obscured.
7.  **Dotted Connection for Missing Levels**: Empty levels in the progression ladder remain visible but render as a vertical dashed connector to showcase career hierarchy.
8.  **Singleton Safety (n=1)**: Conditionally hides range whiskers for single-report cohorts, showing only the lone value and an explicit footnote.
9.  **Safe Exchange Conversion**: Safe currency wrappers that output `"N/A"` in the UI if rates are missing or conversion variables fail, preventing layout crashes.
10. **Duplicate Compare Blockers**: Intercepts slot selection to prevent comparison of identical roles, alerting the user via Sonner.

---

## Frontend Architecture Decisions

### 1. Next.js App Router (React Server Components)
*   **Rationale**: Server components execute data aggregation and initial HTML generation on the server, ensuring rapid page loads and optimized SEO templates.
*   **Tradeoff**: Demands strict separation of server/client code (e.g. adding `"use client"` directives for interactive components), slightly increasing state-management overhead.

### 2. URL State Sync via `nuqs`
*   **Rationale**: Bypasses traditional router push operations, allowing shallow, non-blocking URL parameters sync that keeps filters completely shareable.
*   **Tradeoff**: Extensive parameter parsing can result in long URLs (e.g. `?levels=SENIOR,STAFF&roles=swe`), but this is a worthy tradeoff for perfect state recovery.

### 3. TanStack Table (`@tanstack/react-table`)
*   **Rationale**: Headless table architecture separates sorting, selection, and filtering logic from the UI layer, giving us absolute freedom over CSS styling and mobile responsiveness.
*   **Tradeoff**: Requires boilerplate setup compared to fully styled UI tables, but enables pristine bespoke implementation.

### 4. TanStack Virtual (`@tanstack/react-virtual`)
*   **Rationale**: Instead of paginating or rendering hundreds of heavy DOM nodes, virtual scrolling renders only the visible rows, guaranteeing smooth 60 FPS rendering on massive data tables.
*   **Tradeoff**: Requires fixed row heights and absolute positioning hooks, slightly increasing initial container styling complexity.

### 5. Recharts for Visualizations
*   **Rationale**: Recharts uses React component structures to build SVGs, making custom theme overrides and responsive grid rendering easy.
*   **Tradeoff**: Heavier than canvas-based alternatives, but perfect for rendering highly responsive, accessible corporate charts.

### 6. Zustand for Client-Side Global State Management
*   **Rationale**: Lightweight, hook-based state store that avoids Redux boilerplate and matches perfectly with server hydration.
*   **Tradeoff**: Requires manual synchronization with URLs for shared comparison slots, which we resolved cleanly using bidirectional `useEffect` syncer blocks.

---

## What I Would Build Next

1.  **Automated Paystub/Offer Letter Verification Engine (OCR)**:
    Implement an AI-powered upload parser. Using secure, client-side OCR, candidates can upload paystubs, W2s, or PDF offer letters. The system will automatically scrape relevant figures, redact personal information, and mark the listing with a verified badge.
2.  **Interactive Equity Vesting & Stock Projection Simulator**:
    A premium client-side chart where candidates can toggle stock vesting formats (e.g., standard 25% annual vs. frontloaded 33% Meta-style vs. ByteDance monthly) and project growth curves based on real-time stock ticker market shifts.
3.  **Local Income Tax & Purchasing Power Bracket Estimator**:
    Build a dynamic engine that computes localized income taxes (federal, state, municipal, and cess) and cost-of-living index offsets, showing candidates their actual cash-in-pocket purchasing equivalence when comparing global offers.
4.  **Global Remote-Work Salary Alignment Map**:
    A geographic benchmarking dashboard showing remote compensation scales mapped against regional talent hubs, helping remote engineers identify pay premiums and locate employers with borderless hiring contracts.
