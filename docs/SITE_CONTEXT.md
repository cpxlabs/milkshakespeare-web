# MilkShakespeare — Site Context & Brand Guide

## 1. Brand Overview

**MilkShakespeare** is a small, family-run café and collector's shop ("copshop") with approximately 10 team members. Despite its intimate size, the business maintains a strong digital presence — particularly on social media and video platforms — which drives both local foot traffic and online engagement.

The name is a playful blend of **milkshake** and **Shakespeare**, capturing the spirit of a place where artisanal beverages meet culture, literature, and play.

---

## 2. What We Are

MilkShakespeare is a hybrid space that combines several experiences under one roof:

| Experience | Description |
|---|---|
| **Cafeteria** | Specialty coffee, craft milkshakes, teas, and pastries — each inspired by literary and pop-culture references. |
| **Game Lounge** | Retro board games, chess, checkers, and similar classic tabletop games available to play in-store. |
| **Trading Card Games (TCG)** | A gathering spot for trading card game enthusiasts — buy, sell, trade, and play. |
| **Bookshop** | Curated selection of new and second-hand books across genres. |
| **Music & Vinyl** | CDs, vinyl records, and music memorabilia for collectors. |
| **Collectibles** | Retro game cartridges, rare cards, figurines, and other collectible items. |

---

## 3. Brand Personality

| Trait | Description |
|---|---|
| **Warm & Welcoming** | A family business that treats every customer like a friend. |
| **Nostalgic & Playful** | Celebrates retro culture, classic games, and timeless stories. |
| **Culturally Rich** | Bridges literature, music, games, and gastronomy. |
| **Digitally Savvy** | Professionally curated social media and video content that punches above our weight. |
| **Community-Driven** | A gathering place for local enthusiasts, gamers, readers, and collectors. |

---

## 4. Visual Identity

### Color Palette

| Token | Color | Hex | Usage |
|---|---|---|---|
| Primary | Prussian Blue | `#0b234a` | Headers, nav, primary actions |
| Secondary | Yale Blue | `#0d527c` | Supporting elements, section backgrounds |
| Accent | Metallic Gold | `#d3b03b` | Highlights, CTAs, premium indicators |
| Background | Ivory Mist | `#fffbe8` | Page background, light mode |
| Destructive | Red | `hsl(0 84.2% 60.2%)` | Error states, tragedy category accent |

### Typography
- **Headings**: Bold to extra-bold, tight tracking
- **Body**: Regular weight, generous line-height for readability
- **Accents**: Uppercase tracking-widest for labels and section headers

### Design Principles
1. **Simple & Direct** — clean layouts, no unnecessary decoration
2. **Responsive First** — cards and grids that work on mobile, tablet, and desktop
3. **Professional** — every element should feel polished and intentional
4. **Warm** — rounded corners, inviting colors, friendly copy

---

## 5. Menu Structure

The menu is organized into Shakespeare-themed categories. Each item has a name, description, price, and emoji badge.

### The Tragedies 🎭
| Item | Description | Price |
|---|---|---|
| Romeo & Juliet Berry 🍓 | Strawberry, raspberry, rose water, vanilla bean ice cream | R$ 22,90 |
| Hamlet's Dark Chocolate 🍫 | Belgian dark chocolate, espresso shot, whipped cream | R$ 24,90 |
| Macbeth's Midnight Mocha ☕ | Dark mocha, caramel, toffee crumble, midnight cocoa | R$ 23,90 |

### The Comedies 😄
| Item | Description | Price |
|---|---|---|
| Midsummer Night's Dream 🌸 | Lavender, vanilla bean, honeycomb, edible flowers | R$ 25,90 |
| The Tempest Tropical 🌴 | Mango, passion fruit, coconut cream, lime zest | R$ 23,90 |
| Twelfth Night Tiramisu ☕ | Espresso, mascarpone, ladyfinger crumble, cocoa dusting | R$ 26,90 |

### The Histories 👑
| Item | Description | Price |
|---|---|---|
| Henry's Royal Caramel 🍯 | Salted caramel, butter pecan, crown-shaped wafer | R$ 24,90 |
| Richard's Golden Crown ✨ | Golden milk, turmeric, honey, cinnamon, almond butter | R$ 22,90 |

### The Sonnets ✒️
| Item | Description | Price |
|---|---|---|
| Sonnet 18 — Summer's Day 🍑 | Peach, apricot, vanilla, a drizzle of golden honey | R$ 21,90 |
| Sonnet 130 — Honest Blend 🍓 | Classic vanilla with real strawberries — simple and true | R$ 19,90 |

---

## 6. User Features

### Authentication
Users can sign in using social accounts:
- **Google** — primary sign-in method
- **Facebook** — widely used by our audience
- **Instagram** — aligns with our social media focus

Guest browsing is always available. Authentication unlocks:
- Add-to-cart and order history
- Saved preferences
- Event notifications

### Shopping Cart
- Users can add menu items to a cart
- Adjust quantities in the cart view
- See a running total
- Cart is persisted locally via AsyncStorage

---

## 7. Target Audience

- **Local community** — regulars who visit for coffee, games, and socializing
- **Collectors** — people searching for rare cards, vinyl, retro games
- **Gamers** — TCG players, board game enthusiasts, chess/checkers players
- **Readers** — book lovers looking for curated selections
- **Social media followers** — people who discover us through Instagram, TikTok, YouTube

---

## 8. Content Tone

- **Conversational** but professional
- **Playful** references to Shakespeare and pop culture
- **Inclusive** — welcoming to all ages and interests
- **Passionate** — genuinely enthusiastic about what we offer

---

## 9. Technical Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo (SDK 50) |
| Language | TypeScript (strict mode) |
| Styling | NativeWind (Tailwind CSS for React Native) |
| Navigation | React Navigation (Drawer + Stack) |
| State | React Context API |
| i18n | i18next (English + Portuguese) |
| Storage | AsyncStorage (namespaced) |
| Icons | Lucide React Native |
| Testing | Jest + React Testing Library |
| Platform | Web, iOS, Android |

---

## 10. Screens

| Screen | Purpose |
|---|---|
| **Home** | Landing page with hero, about preview, featured items, CTA |
| **Menu** | Full menu with categories, prices, and add-to-cart |
| **About** | Brand story, mission, values, visit info |
| **Login** | Social sign-in (Google, Facebook, Instagram) |
| **Cart** | View cart items, adjust quantities, see total |

---

## 11. Future Considerations

- Online ordering and delivery integration
- Event calendar (game nights, book clubs, vinyl listening sessions)
- Loyalty program with points and rewards
- Push notifications for new arrivals and events
- Integration with social media feeds (Instagram, TikTok embeds)
- E-commerce for collectibles and merchandise
