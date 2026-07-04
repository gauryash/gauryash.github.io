---
title: 'Custom Open Graph Images'
publishDate: '27 January 2024'
description: 'How I set up custom social preview cards for this blog, and why the design choices behind them matter more than the automation.'
tags: ['blog', 'design', 'meta']
ogImage: '/social-card.png'
---

A blog post without a social preview card is a blank box in a feed. When someone shares a link, the open graph image is the first thing they see — often before they read a single word of the content.

The default approach is automation: `@vercel/satori` renders a template from your post title and description at build time. It works, but it produces the same visual structure for every post. The signal-to-noise ratio is low: the reader learns nothing from the card beyond what the title already tells them.

I wanted something different.

## The constraint

The social card for each post should be:

- **Informative at a glance.** A title and a visual cue that hint at the content.
- **On brand.** The same neutral-cool palette, Satoshi typeface, and border-defined surfaces as the site itself. No gradient accents, no decorative flourishes.
- **Built once, set per post.** The `ogImage` frontmatter field lets me opt out of satori's generated card and point to a custom image. This post uses `/social-card.png`, which lives in the public directory. Every post gets its own card when the content warrants it.

## The process

Each card is designed in isolation. I export a 1200×630 PNG from a minimal canvas — just enough space for the title set in Satoshi at a weight and size that fits. The background matches the site's `--background` (`#FBFCFE`), with a subtle border treatment that echoes the card components on the homepage.

No automation layer. No dynamic rendering. Just one image per post, made deliberately, placed in `public/`, and referenced in the frontmatter. The effort per card is about five minutes. The result is that every shared link carries a preview that feels like part of the site, not a template artifact.

## Why not automate?

Automated OG images are table stakes. Satori, Vercel's OG edge rendering, Puppeteer-based generators — they all produce a card that says "this page has a title." But a card that says "this page has a title AND was thought about" is a different signal. The reader might not consciously register the difference, but they register the care.

For a personal site where the design system is intentionally restrained, the social card is one of the few places a reader encounters the brand outside the page context. It should carry the same visual discipline. That means: no auto-generated gradient backgrounds, no random accent colors pulled from nowhere, no mismatched typography. Just the same neutral-cool palette, the same font, the same commitment to whitespace.

## How to set it up

In the frontmatter of any post, add:

```yaml
ogImage: '/path/to/your-image.png'
```

The image lives anywhere in `public/`. Keep it at 1200×630 (the standard OG aspect ratio). Export it as PNG with sRGB color space — social platforms vary in how they handle color profiles, and sRGB is the safest common denominator.

That's it. No plugins, no build pipeline changes, no edge functions. One line of frontmatter, one file in `public/`, one intentional design decision per post.
