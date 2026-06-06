# Audit Report: Yash Gaur — Resume

Generated via `/impeccable audit` using Impeccable v3.5.0

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | **2/4** | Multiple `h1`/`h2` elements used as card content headings; no skip-link; small touch targets |
| 2 | Performance | **3/4** | All images use `loading='eager'` regardless of viewport position |
| 3 | Responsive Design | **3/4** | Several touch targets below 44×44px minimum on mobile (Labels, nav links, back-to-top) |
| 4 | Theming | **4/4** | Excellent token system, full dark mode, consistent variable usage |
| 5 | Anti-Patterns | **4/4** | Zero AI tells detected. Clean, intentional design. |
| **Total** | | **16/20** | **Good** — address the weak dimensions |

## Anti-Patterns Verdict

**PASS** — This site does not look AI-generated.

- No gradient text, glassmorphism, or hero-metric templates
- No cream/sand background (cool-blue-tinted neutral instead: `#FBFCFE`)
- No purple-to-blue gradients
- No cards-within-cards
- No numbered section markers (01 / 02 / 03)
- No bounce/elastic easing
- No Inter font (uses Satoshi)
- No rounded-square icon tiles above every heading

The design is restrained, content-forward, and confident. The single uppercase tracked eyebrow (TimelineItem's company name badge) is used once in a context where it carries meaning, not as a repeated section scaffold. This is a voice, not a tell.

## Executive Summary

**Audit Health Score: 16/20 (Good)**

- P0 issues: 0
- P1 issues: 3
- P2 issues: 4
- P3 issues: 2

**Top 3 critical issues:**
1. **Semantic heading hierarchy broken** — `Card.astro` and `ProjectCard.astro` use `<h1>`/`<h2>` for content headings, conflicting with the page's real `<h1>`
2. **Insufficient touch targets** — Labels, nav links, and back-to-top button all below 44×44px on mobile
3. **No skip-to-content link** — Keyboard users must tab through all nav items before reaching main content

---

## Detailed Findings by Severity

### P1 — Major

**1. [P1] Broken heading hierarchy in Card components**
- **Location:** `src/components/Card.astro` (lines 45-47), `src/components/ProjectCard.astro` (lines 42-43)
- **Category:** Accessibility
- **Impact:** Screen readers encounter multiple `<h1>` elements on the same page, destroying the document outline. Users navigating by heading will hear conflicting top-level landmarks.
- **WCAG:** 1.3.1 Info and Relationships (Level A), 2.4.1 Bypass Blocks (Level A)
- **Recommendation:** Change Card headings from `<h1>`/`<h2>` to `<h3>`/`<p>` or `<h4>`/`<p>`. The component doesn't know its position in the page hierarchy, so use the lowest reasonable level (`h3` for heading, `p` for subheading), or make the heading level configurable via a prop.
- **Suggested command:** `/impeccable harden card-components`

**2. [P1] No skip-to-content link**
- **Location:** `src/layouts/BaseLayout.astro` (entire file)
- **Category:** Accessibility
- **Impact:** Keyboard users and screen reader users cannot bypass the Header navigation to reach main content. Every page load requires tabbing through all nav items first.
- **WCAG:** 2.4.1 Bypass Blocks (Level A)
- **Recommendation:** Add a visually-hidden skip-link as the first focusable element in `<body>`, linking to `<main>`. Common pattern: `sr-only` until focused, then appears at top of page.
- **Suggested command:** `/impeccable harden skip-link`

**3. [P1] Focus indicators missing or broken**
- **Location:** `src/components/layout/Footer.astro` (line 12, 17 — commented out), global
- **Category:** Accessibility
- **Impact:** Without visible focus indicators, keyboard users cannot tell which element is focused. The only focus styles in the codebase are commented out and only work in dark mode (`dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600` — which also *removes* the default outline without providing a light-mode replacement).
- **WCAG:** 2.4.7 Focus Visible (Level AA)
- **Recommendation:** Add `focus-visible:ring-2 focus-visible:ring-ring` to all interactive elements (links, buttons). Ensure the ring is visible in both light and dark modes.
- **Suggested command:** `/impeccable harden focus-styles`

### P2 — Minor

**4. [P2] All images use loading='eager'**
- **Location:** `src/components/Card.astro` (line 39), `src/components/ProjectCard.astro` (line 37), `src/components/blog/Hero.astro` (line 28)
- **Category:** Performance
- **Impact:** Below-the-fold images load immediately on page load, delaying LCP and increasing bandwidth usage for content the user may never scroll to. The blog hero uses `fetchpriority='high'` which is correct for above-the-fold, but the Card/ProjectCard images are likely below the fold.
- **Recommendation:** Use `loading='lazy'` for Card and ProjectCard images (below-fold candidates). Keep `loading='eager'` + `fetchpriority='high'` on the blog hero (above-the-fold).
- **Suggested command:** `/impeccable optimize image-loading`

**5. [P2] Insufficient touch targets on mobile**
- **Location:** `src/components/Button.astro` (line 9: `px-2 py-1`), `src/components/layout/Header.astro`, `src/layouts/BlogPost.astro` (line 55: `h-8 w-8`)
- **Category:** Responsive Design / Accessibility
- **Impact:** The back-to-top button is 32×32px on mobile (requires 44×44px per WCAG). Nav links and Label/Button components lack explicit padding to meet the minimum touch target on mobile viewports.
- **WCAG:** 2.5.8 Target Size (Level AA, minimum 24×24px; Apple HIG/Google Material recommend 44×44px)
- **Recommendation:** Increase the back-to-top button to at least `h-11 w-11` (44px) on mobile. Add `py-2` to nav links and Label component for adequate touch area.
- **Suggested command:** `/impeccable adapt touch-targets`

**6. [P2] Back-to-top button uses smooth scrolling without reduced-motion check**
- **Location:** `src/layouts/BlogPost.astro` (script, line: `behavior: 'smooth'`)
- **Category:** Accessibility
- **Impact:** For users with vestibular disorders who prefer reduced motion, smooth scrolling can cause discomfort. The scroll behavior doesn't check `prefers-reduced-motion`.
- **WCAG:** 2.3.3 Animation from Interactions (Level AAA)
- **Recommendation:** Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and use `behavior: 'auto'` when it's true.
- **Suggested command:** `/impeccable harden motion-preferences`

**7. [P2] Timeline item uses `<p>` for the uppercase company eyebrow**
- **Location:** `src/components/TimelineItem.astro` (line 29: `text-xs font-medium uppercase tracking-[0.18em]`)
- **Category:** Accessibility
- **Impact:** All-caps text with wide tracking can be harder to read for users with dyslexia or cognitive disabilities, especially at small sizes (12px).
- **Recommendation:** While the eyebrow is visually distinctive and used once (acceptable per the impeccable skill's guidance), consider using `max(0.75rem, 12px)` to ensure a minimum readable size. Alternatively, keep lowercase with standard tracking and use position/boldness for emphasis instead.
- **Suggested command:** `/impeccable typeset timeline-typography`

### P3 — Polish

**8. [P3] 404 page body uses two separate `<p>` elements for one message**
- **Location:** `src/pages/404.astro` (lines 14-15)
- **Impact:** Minor — the two paragraphs "Oops, something went wrong." and "Sorry, we couldn't find your page." could be combined into one for cleaner copy. Not a functional issue.
- **Recommendation:** Combine into a single sentence: "Oops, we couldn't find that page."
- **Suggested command:** `/impeccable clarify 404-copy`

**9. [P3] Commented-out footer links with hardcoded gray colors**
- **Location:** `src/components/layout/Footer.astro` (lines 12-22, commented out)
- **Impact:** Not live code, but the commented-out classes use Tailwind's `text-gray-600` and `text-gray-800` which bypass the design token system. If uncommented later, they'd break theming consistency.
- **Recommendation:** Either remove the comments or update the classes to use the project's CSS variable tokens (`text-muted-foreground`, `text-foreground`).
- **Suggested command:** `/impeccable polish footer`

---

## Patterns & Systemic Issues

- **Component heading levels are not configurable.** Both Card and ProjectCard hardcode `<h1>`/`<h2>`, making them unsafe to use in any context other than a standalone page. A `headingLevel` prop would solve this systemically.
- **Touch targets are not explicitly sized.** Several interactive elements rely on content-based sizing, which on mobile can fall below accessibility minimums. A systemic review of all interactive element padding at `sm:` breakpoints would fix this.
- **Focus styles are absent.** No interactive element in the active codebase has `focus-visible` styling. This is a systemic gap, not a one-off miss.

## Positive Findings

- **Excellent anti-pattern discipline.** The detector found zero AI tells. The design is distinctive and intentional — the cool-blue-tinted neutral palette, single Satoshi typeface, border-based surface separation, and flat-by-default elevation all contribute to a professional, non-generic feel.
- **Full dark mode support** with no gaps. Every color token has a dark mode equivalent, theme switching works correctly, and the `astro:after-swap` hook preserves theme across view transitions.
- **Clean semantic structure** on the page level. The homepage uses proper `<section>` elements, `<nav>` with `aria-label`, and `aria-label` on social links. The blog layout uses `<article>` and `<aside>` (TOC) correctly.
- **Responsive layout** uses `flex-wrap`, `sm:` breakpoints, and percentage-based widths. No hard-coded widths, no horizontal scroll issues.
- **Good use of IntersectionObserver** for the back-to-top visibility trigger — performant and minimal.
- **Font loading** with `font-display: swap` and variable font (Satoshi) keeps both performance and typography quality high.

## Recommended Actions

1. **[P1] `/impeccable harden heading-semantics`** — Fix Card/ProjectCard heading levels, add skip-link, add focus-visible styles. Highest priority for accessibility compliance.
2. **[P2] `/impeccable adapt touch-targets`** — Increase back-to-top button to 44×44px, add padding to nav links and Labels. Ships the responsive gaps.
3. **[P2] `/impeccable optimize image-loading`** — Set below-fold Card/ProjectCard images to `loading='lazy'`. Quick performance win.
4. **[P2] `/impeccable harden motion-preferences`** — Add `prefers-reduced-motion` check to smooth scrolling. Quick accessibility win.
5. **[P3] `/impeccable polish cleanup`** — Optional: fix 404 copy, clean up commented footer code.

---

You can ask me to run these one at a time, all at once, or in any order you prefer.

Re-run `/impeccable audit` after fixes to see your score improve.
