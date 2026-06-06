---
name: Yash Gaur - Resume
description: A personal resume and portfolio site for a Quantitative Engineer
colors:
  neutral-bg-light: "#FBFCFE"
  neutral-bg-dark: "#0A0A0F"
  ink-light: "#0A0A0F"
  ink-dark: "#FAFAFA"
  surface-light: "#FFFFFF"
  surface-dark: "#0A0A0F"
  muted-bg-light: "#F4F4F5"
  muted-bg-dark: "#27272A"
  muted-ink-light: "#71717A"
  muted-ink-dark: "#A1A1AA"
  boundary-light: "#E4E4E7"
  boundary-dark: "#27272A"
  emphasis-light: "#18181B"
  emphasis-dark: "#FAFAFA"
typography:
  display:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 500
    lineHeight: 1.5
  title:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "1rem"
  xl: "1.25rem"
spacing:
  xs: "0.375rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  section: "2.5rem"
components:
  card:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.xl}"
    padding: "1.25rem 1rem"
  button-label:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.625rem"
  project-card:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.xl}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.md}"
  theme-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.md}"
    padding: "0.375rem"
  input:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.md}"
---

# Design System: Yash Gaur — Resume

## 1. Overview

**Creative North Star: "The Professional Brief"**

A resume site that communicates competence through clarity. Every element serves the content — nothing decorative, nothing extra. The design takes the discipline of quantitative engineering and translates it into clean typography, restrained spacing, and precise hierarchy. Information is organized like a well-structured report: skimmable at a glance, rewarding on close reading.

This system explicitly rejects SaaS landing-page clichés (gradient accents, big hero CTAs, numbered section markers), creative-portfolio flourishes (heavy animations, decorative textures), and the generic AI design tell (cream/sand backgrounds, purple-blue gradients, cards within cards). Instead, it opts for a neutral-cool palette with crisp borders defining surfaces, a single clean geometric typeface, and motion that only appears as a response to interaction.

**Key Characteristics:**
- Content-first hierarchy with maximal readability
- Border-defined surfaces (no shadows at rest)
- Single-family typography (Satoshi) with weight contrast for hierarchy
- Neutral-cool palette with a faint blue undertone
- Responsive to interaction, still at rest
- Dark and light modes with equivalent structural clarity

## 2. Colors

A restrained neutral-cool palette with a faint blue cast. The light mode background is a near-white with minimal blue chroma (`210 33% 99%`); the dark mode is a near-black with matching undertone. All surfaces are separated by borders, not shadows.

### Primary

The palette is monochromatic-neutral. No secondary or tertiary accent color is defined — the system relies on weight, spacing, and hierarchy for emphasis rather than color.

### Neutral

- **Cool Paper** (`hsl(210 33% 99%)` / `#FBFCFE`): Light mode page background. Almost-white with a trace of blue coolth, avoiding the generic warm-cream AI default.
- **Deep Slate** (`hsl(240 10% 3.9%)` / `#0A0A0F`): Dark mode page background. Near-black with subtle blue undertone.
- **Ink** (`hsl(240 10% 3.9%)` light / `hsl(0 0% 98%)` dark): Primary body text. High contrast against its respective background (≥10:1).
- **Muted Ink** (`hsl(240 3.8% 46.1%)` light / `hsl(240 5% 64.9%)` dark): Secondary text, metadata, dates, subheadings. Maintains ≥4.5:1 contrast against backgrounds.
- **Boundary** (`hsl(240 5.9% 90%)` light / `hsl(240 3.7% 15.9%)` dark): Borders defining card edges, inputs, and UI elements. The primary separator — shadows are not used at rest.
- **Subtle Surface** (`hsl(240 4.8% 95.9%)` light / `hsl(240 3.7% 15.9%)` dark): Hover states for interactive elements and muted backgrounds.
- **Pure Surface** (`hsl(0 0% 100%)` light / `hsl(240 10% 3.9%)` dark): Card and elevated surface backgrounds.

### Named Rules

**The No-Accent Rule.** The system uses no accent color. Visual emphasis is communicated through typographic weight, spacing, and position — not through color contrast. This is intentional: in a resume context, the content's substance, not decorative color, conveys importance.

## 3. Typography

**Display Font:** Satoshi (variable, with system-ui fallback)
**Body Font:** Satoshi (variable, with system-ui fallback)

**Character:** A single clean geometric sans-serif in variable weight. Satoshi is precise but not cold — its slightly squared curves and open counters give it a technical yet approachable feel. Using one family across all roles creates cohesion; hierarchy comes entirely from weight, size, and spacing.

### Hierarchy

- **Display** (700, `2.25rem` / 36px, 1.25 line-height): The name "Yash Gaur" on the homepage hero. Used once per page.
- **Title** (500, `1.125rem` / 18px, 1.5 line-height): Card headings, section emphasis.
- **Label** (500, `1.05rem` / ~17px, 1.5 line-height): Navigation links, eyebrow text.
- **Body** (400, `1rem` / 16px, 1.75 line-height): All prose, descriptions, paragraphs. Max line length capped at 65–75ch by the `max-w-[60rem]` container.
- **Small** (400, `0.875rem` / 14px, 1.5 line-height): Metadata dates, secondary labels, footer text.

### Named Rules

**The One-Family Rule.** All typography uses Satoshi. No mixing of display and body families. Variety comes from weight contrast (400 / 500 / 700), not font switching.

**The No-Monospace Rule.** Code blocks use expressive-code with their own theming, but inline code and technical terms use the body font. The system does not define a dedicated monospace role.

## 4. Elevation

The system is flat by default. Surfaces are separated by `hsl` borders (1px `solid`), not by shadows. This choice is structural: in a resume context, clarity of layout matters more than simulated depth. Borders cleanly define containment without adding visual noise.

Shadows appear only as a transient response to interaction:
- **Card / ProjectCard hover**: a soft `box-shadow` at `hover:shadow-sm` level, combined with a subtle border lightening (`hover:border-foreground/25`). This signals interactivity without breaking the flat-at-rest rule.
- **No shadows at rest on any surface.**

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to state (hover). The border is the separator; the shadow is the signal.

## 5. Components

### Buttons / Labels

Tags and inline action labels. Used for location, employer, LinkedIn, and similar metadata chips.

- **Shape:** Rounded rectangle, `rounded-lg` (0.5rem / 8px radius). Optional `pill` variant at `rounded-xl`.
- **Default:** White background (`bg-primary-foreground`), 1px solid border (`border-border`), 0.375rem 0.625rem padding, 0.875rem text at 500 weight.
- **Hover:** Background shifts to `bg-input` (the muted surface). No shadow — the background change is sufficient.
- **Type:** Rendered as `<a>` by default, with an inline-flex layout for icon+text alignment. Gap of `0.25rem` between icon and label.

### Cards

Generic content containers used for the "About" section body and similar content blocks.

- **Shape:** Rounded-2xl (1.25rem / 20px radius), 1px solid border (`border-border`).
- **Background:** White (`bg-primary-foreground`), with 1.25rem horizontal / 0.75rem vertical internal padding.
- **States:** No hover effect. Static containers only.
- **Shadow Strategy:** None at rest. Refer to Elevation section.

### Project Cards

Content preview cards for project entries on the homepage.

- **Shape:** Rounded-2xl (1.25rem), 1px solid border (`border-border`).
- **Background:** White (`bg-primary-foreground`), with content padded at 1.25rem horizontal / 1rem vertical.
- **States (interactive):** On hover, the border lightens to `border-foreground/25` and a subtle `shadow-sm` appears. This is the only shadow in the system.
- **Optional image:** Full-width rounded-2xl top crop with flat bottom edge, 192px height, `object-cover`.

### Navigation (Header)

Top-level site navigation with brand mark and page links.

- **Layout:** Horizontal flex, full-width, with brand on the left and nav items + theme toggle on the right.
- **Brand ("resume"):** 1.25rem / 20px text at 600 weight. No hover effect — it's a home link.
- **Nav links ("Blog", "Tools"):** 1.05rem text at 500 weight. On hover, opacity reduces to `text-foreground/75`.
- **Theme toggle:** Icon button, `rounded-md` (0.375rem), 1px solid border, `p-1.5`. On hover, background fills to `bg-border`. Contains sun/moon SVG icons that swap on dark mode.
- **Mobile:** Stacks to wrap on small screens; `sm:flex-nowrap` enforces single-row layout above 640px.

### Timeline

Chronological experience list on the homepage.

- **Structure:** Vertical list with a left-aligned visual connector (implicit, via the vertical stacking).
- **Items:** Each has an eyebrow ("Futures First"), heading ("Quantitative Engineer"), date ("Sep 2023 - Present"), and bulleted description list. Text uses `text-muted-foreground` for the description body, standard `text-foreground` for the heading.
- **Spacing:** `gap-y-3` between items. Description bullets use `ml-4 list-disc`.

## 6. Do's and Don'ts

### Do:

- **Do** use Satoshi for everything — display, body, labels. Consistency of typeface is a deliberate choice.
- **Do** let borders define surfaces. No shadows except on interactive hover states.
- **Do** keep the palette neutral-cool. No accent color. Emphasis comes from weight, spacing, and position.
- **Do** maintain high contrast: body text ≥10:1, muted text ≥4.5:1 against background.
- **Do** test every heading at every breakpoint for overflow — especially the 4xl name on narrow viewports.
- **Do** use `text-wrap: balance` on headings and `text-wrap: pretty` on body prose.
- **Do** respect reduced motion: all hover transitions should degrade gracefully.

### Don't:

- **Don't** add an accent color. The system communicates through typographic contrast, not color contrast.
- **Don't** use shadows at rest. Borders separate surfaces; shadows only appear on interaction.
- **Don't** add a second typeface. One family with weight contrast is sufficient.
- **Don't** use gradient text, glassmorphism, or decorative background textures. The resume context demands clarity, not decoration.
- **Don't** wrap cards inside cards. The card is the terminal container.
- **Don't** add numbered section markers (01 / 02 / 03) or small uppercase tracked eyebrows above every section — those are telltale AI scaffolding patterns.
- **Don't** use cream, sand, or beige backgrounds. The neutral-cool palette with its faint blue cast differentiates this from the generic warm-neutral AI default.
- **Don't** animate layout properties. Transitions are limited to background-color and border-color changes on interactive elements.
- **Don't** use bounce or elastic easing curves. Any motion should use ease-out or linear curves.
