# Craft Brief: Projects Page + Case Studies

## Feature Summary
A dedicated `/projects` page listing all projects with summary cards, each linking to an individual `/projects/[slug]` case study page with full detail, architecture, tech stack, and results. This gives the existing project grid on the homepage a deeper destination.

## Primary User Action
A hiring manager or technical peer clicks a project card → lands on a case study page that explains what was built, how it works, and why it matters.

## Design Direction
- **Color strategy:** Restrained (follows existing palette, no accent color)
- **Scene:** A technical peer at their desk, scanning for evidence of real engineering capability — not flash, just substance
- **Anchors:** The existing homepage design system (Satoshi, neutral-cool, border-defined surfaces, flat elevation) carries over identically
- **No visual probe** (harness lacks native image generation)

## Scope
- **Fidelity:** Production-ready
- **Breadth:** A list page + per-project pages
- **Interactivity:** Static cards with hover states, navigation through links
- **Time intent:** Polish until it ships

## Layout Strategy
- Projects list: single-column card stack on mobile, two-column grid on desktop (`repeat(auto-fit, minmax(320px, 1fr))`)
- Case study pages: follow the blog post layout structure (article with prose styling)
- Each card shows: title, subtitle, tech tags (pill-style like the homepage), and hover border/shadow treatment matching ProjectCard

## Key States
- **Default:** All projects displayed as cards with consistent layout
- **Empty:** "No projects yet" message
- **Edge:** Long titles/descriptions wrap cleanly; card grid works at all breakpoints; single-project edge case

## Content Requirements
- 2 initial projects (HFT Order Book Analysis, Quantitative Trading Strategy) matching existing homepage cards
- Each case study page has: full description, architecture notes, tech stack list, key results, link to GitHub/blog
- Projects defined as a data file or content collection for easy expansion

## Recommended References
- layout.md for the responsive card grid
- typeset.md for case study prose hierarchy

# Craft Brief: Experience / Full-Page Visual Resume

## Feature Summary
A dedicated `/experience` page with a richer layout than the homepage timeline. Side-by-side timeline, skill breakdown with proficiency, key achievements with metrics, and education — functioning as a full-page visual resume.

## Primary User Action
A hiring manager visits to evaluate depth of experience — scans role timeline, reads achievement bullets, cross-references skills.

## Design Direction
- **Color strategy:** Restrained (same as existing system)
- **Scene:** A recruiter or hiring manager who's already scanned the homepage and wants the full picture
- **Anchors:** The existing timeline component is the foundation; expand its visual language

## Scope
- **Fidelity:** Production-ready
- **Breadth:** Single page, all content static
- **Interactivity:** Hover states on timeline items, smooth scroll back-to-top
- **Time intent:** Polish until it ships

## Layout Strategy
- Two-column on desktop (timeline left 3/5, skill profiles right 2/5), single column on mobile
- Timeline uses the same vertical connector + dot pattern from the homepage
- Skill groups show proficiency as subtle progress bars or weight indicators
- Education section at the bottom as a simple list

## Key States
- **Default:** Rich timeline with roles, bullets, dates, and skill groups visible
- **Edge:** Long achievement text wraps within timeline boundaries; skill bars handle 0% and 100% edge cases

## Content Requirements
- Experience: Current role + internship (same content as homepage, reformatted)
- Education: Computer Science degree entry
- Skills: Same categories as the homepage skills section, plus optional proficiency levels
- All content static from a data file

# Craft Brief: Contact Section

## Feature Summary
A contact section on the homepage (between Skills and Posts) with email and LinkedIn links, styled as a simple card matching the existing design system.

## Primary User Action
A recruiter who's read through the page can quickly find a way to reach out without scrolling to the footer.

## Design Direction
- **Color strategy:** Restrained (follows existing system exactly)
- **Scene:** A hiring manager who's decided to reach out — removing the last barrier to contact
- **Anchors:** Styled like the existing Section component with a content card inside

## Scope
- **Fidelity:** Production-ready
- **Breadth:** One section on the homepage
- **Interactivity:** Links with hover states
- **Time intent:** Quick implementation

## Layout Strategy
- Single card matching Section layout (1/3 title + 2/3 content on desktop, stacked on mobile)
- Two links (email, LinkedIn) with icons, side by side or stacked
- Subtle hover effect consistent with ProjectCard

## Key States
- **Default:** Two links visible with icons
- **Edge:** Very long email addresses wrap gracefully

## Content Requirements
- Email: need user's email address
- LinkedIn: https://www.linkedin.com/in/gauryash/
- Icons: existing SVG icon patterns from the codebase
