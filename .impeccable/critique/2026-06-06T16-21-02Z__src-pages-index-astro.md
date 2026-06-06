---
target: landing page (src/pages/index.astro)
total_score: 30
p0_count: 0
p1_count: 3
p2_count: 2
timestamp: 2026-06-06T16-21-02Z
slug: src-pages-index-astro
---
# Critique: Landing Page — Yash Gaur Resume

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | No active nav state (Home vs Blog look identical); no "current page" indicator |
| 2 | Match System / Real World | 4/4 | Standard resume conventions, well-organized, immediately readable |
| 3 | User Control and Freedom | 4/4 | Full browser nav works; no traps or unexpected flows |
| 4 | Consistency and Standards | 4/4 | Superb — single font, consistent border treatment, same section pattern |
| 5 | Error Prevention | 4/4 | Static site, no form data to lose; clean 404 page |
| 6 | Recognition Rather Than Recall | 4/4 | All content visible and labeled; no buried navigation |
| 7 | Flexibility and Efficiency | 2/4 | No search, no anchor links, no skip-to-section for long page |
| 8 | Aesthetic and Minimalist Design | 4/4 | Content-first, generous whitespace, every element serves a purpose |
| 9 | Error Recovery | N/A | No interactive error paths |
| 10 | Help and Documentation | 1/4 | No tooltips, no context hints; assumes resume literacy |
| **Total** | | **30/36** | **Good** |

## Anti-Patterns Verdict

**PASS — Does not look AI-generated.**

- No gradient text, glassmorphism, hero-metric templates, cream/sand bg, purple-blue gradients, cards-within-cards, numbered section markers, or uppercase tracked eyebrows (single TimelineItem badge is contextual).
- Detector CLI scan found zero violations across all scanned files.
- The cool-blue-tinted neutral (#FBFCFE) palette and single-family typography are the strongest differentiators from the AI-generic warm-beige default.

## Overall Impression

The design system is genuinely excellent — restrained, intentional, professional. The palette choice, border-defined surfaces, single typeface, and deliberate rejection of accent color create a cohesive identity that stands apart from both template sites and AI-generated defaults. The blog posts demonstrate real depth and authentic voice.

The problem is under the hood. The content — skills, experience bullets, project cards — is conspicuously thin. The design makes promises the content doesn't keep: a beautiful timeline with one bullet per role, skill categories with 1–2 entries each, project cards that link to nothing. A hiring manager who lands here will admire the design and then question the substance.

## What's Working

1. **Design system discipline.** The neutral-cool palette, Satoshi-only typography, flat-by-default elevation with border-defined surfaces create a cohesive, professional identity that's genuinely distinctive. The "no accent color" rule is a mature choice that serves the resume context.

2. **Blog content is genuinely good.** "Building a Real-Time Order Book Visualizer" and "Custom Open Graph Images" demonstrate real technical depth and authentic voice. This is the strongest content on the site and the primary reason a technical reader would leave impressed.

3. **Accessibility foundations are solid.** Skip-to-content link, global focus-visible ring, full keyboard navigation, proper dark/light mode contrast, reduced-motion support — all implemented as core infrastructure, not afterthoughts.

## Priority Issues

### P1 — Credibility and Conversion

**[P1] Skills section is thin and miscategorized**
- **File:** `src/pages/index.astro` (lines 11–15)
- **Why:** 8 skills for an HFT Quant Engineer. "HFT" and "Quantitative Analysis" listed as skills (they're domains). C++ under "Backend," Python alone under "Languages." Missing: SQL, git, Linux, statistics, distributed systems.
- **Fix:** Restructure categories to match industry expectations. Move C++ to Languages. Add missing engineering fundamentals. Separate domain labels from technical skills.
- **Command:** `layout landing-skills`

**[P1] Experience section has no substance**
- **File:** `src/pages/index.astro` (lines 67–76)
- **Why:** Current role (~2.5 years) has one bullet: "Working with Python and React.js for quantitative analysis and dashboard creation." The single most-scanned section for hiring managers is empty.
- **Fix:** 3–5 bullets per role with specific projects, technologies, impact.
- **Command:** `clarify landing-experience`

**[P1] Project cards have no links**
- **File:** `src/pages/index.astro` (lines 80–97)
- **Why:** Two project cards with no `href`, no click-through to repos, case studies, or relevant blog posts. They display labels, not evidence.
- **Fix:** Link HFT Order Book card to the order-book-visualizer blog post. Link Trading Strategy card to a GitHub repo or remove until content exists.
- **Command:** `harden project-cards`

### P2 — Copy and Interaction

**[P2] About section copy is generic**
- **File:** `src/pages/index.astro` (lines 33–38)
- **Why:** "I am a Computer Science graduate" dates the copy. "Highly analytical and process-oriented" is a resume cliché. Says nothing specific about HFT, market data, or the actual role.
- **Fix:** Rewrite to be specific and differentiated. Name the problem space (HFT market data, real-time dashboards) rather than using generic data-professional language.
- **Command:** `clarify about-copy`

**[P2] No text-wrap: balance on headings**
- **Files:** `index.astro`, `Section.astro`, `TimelineItem.astro`
- **Why:** DESIGN.md explicitly calls for `text-wrap: balance` on h1–h3 and `text-wrap: pretty` on body prose. Neither is implemented. Minor but a gap against the stated system.
- **Fix:** Add `style="text-wrap: balance"` to all headings, `style="text-wrap: pretty"` to body paragraphs.
- **Command:** `typeset heading-wrap`

### P3 — Polish

**[P3] target="_blank" links missing noopener noreferrer**
- **Files:** `index.astro` (LinkedIn), `Footer.astro`, `ToolSection.astro`
- **Fix:** Add `rel="noopener noreferrer"` to all external `target="_blank"` links.

**[P3] No active nav state**
- **File:** `Header.astro`
- **Fix:** Set `aria-current="page"` on active nav link; add subtle visual indicator.

**[P3] Label touch targets below 44px**
- **File:** `Label.astro`
- **Fix:** Increase padding for mobile touch targets (already partially fixed in previous audit pass).

## Persona Red Flags

**Alex (Power User / Hiring Manager)**
- Scans skills → 8 items → questions depth
- Looks for GitHub links on projects → none → cannot verify claims
- Scans experience bullets → one per role → underwhelming
- Blog posts save the impression, but only if they scroll that far

**Jordan (First-Timer)**
- Hero clearly communicates identity ✅
- Generic About copy adds nothing beyond the hero
- No "what I'm looking for" statement — unclear if this is job-seeking, consulting, or just a blog

**Casey (Mobile User)**
- Label touch targets below 44px
- Content stacks well vertically ✅
- Nav wraps on small screens ✅

## Minor Observations

- LinkedIn icon uses `text-foreground/75` while Location/Employer icons don't — minor opacity inconsistency
- Timeline component's decorative vertical line and dot are well-executed craft details
- `font-display: swap` on Satoshi prevents layout shift
- `astro:after-swap` view transition theme restoration is a nice touch

## Questions to Consider

1. The project cards have no links — but you have a blog post about order book visualization that directly relates to the "HFT Order Book Analysis" card. Why not connect them?

2. Eight skills for an HFT engineer. What are the daily tools (SQL, git, Linux, bash, statistics) that didn't make the list? Is this curated for brevity or is it genuinely your full toolkit?

3. One bullet for a 2.5-year role. What specific projects or systems have you actually built? A single concrete achievement ("reduced dashboard load time by 60%", "served 15 traders with real-time P&L") would be worth more than a paragraph of generics.
