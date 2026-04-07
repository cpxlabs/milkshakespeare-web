# Homepage Redesign — Stitch Mockup Implementation Plan

## Overview

Redesign the MilkShakespeare homepage to match the premium, editorial-style UI created in Stitch. The new design emphasizes warm ivory/parchment backgrounds, rich imagery placeholders, serif-inspired typography, and a magazine-like layout with distinct content sections.

---

## Design Analysis (from Stitch mockup)

### Visual Style
- **Warm ivory/parchment background** (`#fffbe8` — already our `--background`)
- **Dark Prussian Blue text** (`#0b234a` — already our `--primary` / `--foreground`)
- **Metallic Gold accents** (`#d3b03b` — already our `--accent`)
- **Rich card styling** with subtle shadows and rounded corners
- **Editorial typography** — large display headings with bold/italic mix
- **Dark image cards** with overlay text for featured drinks

### Sections (top to bottom)

1. **Top Navigation Bar**
   - "Milkshakespeare" logo with crown icon
   - "STRATFORD" location label
   - "EST. 1564" established date

2. **Hero Section**
   - Large headline: "Where **Prose** meets the **Palate**."
   - Subtext: "A curated sanctuary for the literary soul. Savor artisanal milkshakes crafted from forgotten recipes and contemporary imagination."
   - Gold CTA button: "Reserve Your Table"
   - Text link: "View Menu"

3. **Featured Drink of the Month**
   - Full-width image banner with milkshake photo
   - Overlay card: "The Midsummer Night's Cream" — SPECIAL OF THE MONTH

4. **Chapter Select (Navigation Cards)**
   - Heading: "Explore the Menu"
   - Subtitle: "From Romeo's Red Velvet to Hamlet's Dark Chocolate"
   - Two action cards:
     - "Daily Riddle" — WIN A FREE TOPPING
     - "Book a Table" — GUARANTEED QUIET CORNER

5. **Library Section**
   - Headline: "A Library Built for the **Thirsty Mind**."
   - Body text about the 2,000-book collection
   - Attribution: "The Curator"
   - Shakespeare quote: "I would give all my fame for a pot of ale and safety." — Henry V

6. **Rare Editions (Menu Preview)**
   - Section title: "The Rare Editions"
   - Subtitle: "HAND-CRAFTED ARTISAN SHAKES"
   - "VIEW CATALOG" link
   - Individual drink cards with image, name, price, description:
     - The Ophelia — £8.50
     - The Macbeth — £9.00
     - Puck's Mischief — £7.75

7. **Footer**
   - CTA section with visit info

---

## Implementation Plan

### Phase 1: Locale & Content Updates
- [ ] Add new i18n keys to `en.json` for all new sections
- [ ] Add corresponding keys to `pt-BR.json`
- [ ] New content: hero copy, featured drink, chapter select, library section, rare editions

### Phase 2: Tailwind / Style Extensions
- [ ] Add `font-serif` support to tailwind config (for editorial headings)
- [ ] Ensure warm card variants are available (parchment-toned cards)

### Phase 3: HomeScreen Rewrite
- [ ] Rewrite `HomeScreen.tsx` with new section structure
- [ ] Top nav bar with brand identity
- [ ] Hero with bold/italic mixed typography and CTA
- [ ] Featured drink of the month banner
- [ ] Chapter Select cards
- [ ] Library section with quote
- [ ] Rare Editions drink cards with prices
- [ ] Footer CTA

### Phase 4: Test Updates
- [ ] Update `HomeScreen.test.tsx` to match new translated content
- [ ] Ensure all sections render without crashes

### Phase 5: Validation
- [ ] Run linter
- [ ] Run tests
- [ ] Visual review

---

## Content Mapping

| Section | i18n Key Prefix | Notes |
|---------|----------------|-------|
| Nav Bar | `home.nav*` | EST. 1564, STRATFORD |
| Hero | `home.hero*` | New editorial copy |
| Featured Drink | `home.featured*` | Midsummer Night's Cream |
| Chapter Select | `home.chapter*` | Explore Menu, Daily Riddle, Book a Table |
| Library | `home.library*` | Thirsty Mind, The Curator, Henry V quote |
| Rare Editions | `home.rare*` | Ophelia, Macbeth, Puck's Mischief |
| Footer | `home.cta*` | Existing keys mostly reusable |

---

## Technical Notes

- **No new dependencies needed** — all styling achievable with NativeWind/Tailwind
- **Images**: Using emoji/icon placeholders initially; real images can be added as assets later
- **Responsive**: Design is mobile-first, matching the Stitch mobile mockup
- **Existing brand colors** already match the design palette perfectly
- **Currency**: Design uses £ (GBP) — will use locale-appropriate pricing

---

**Created**: 2026-04-07
**Status**: In Progress
