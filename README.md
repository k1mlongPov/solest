# SOLEST — Sneaker Marketplace

**Find your sole. Make your move.** 👟

SOLEST is a responsive sneaker marketplace website built as a frontend student project. It features a modern shopping experience with product discovery, sneaker details, a shopping cart, and a light/dark theme.

## ✨ Features

- **Home page** — Hero section, sneaker categories, trending products, and brand story.
- **Shop page** — Browse sneakers, search products, and filter by category.
- **Product details** — View product information, select a shoe size, choose a quantity, and add products to the cart.
- **Shopping cart** — Manage quantities, remove items, clear the cart, and view the subtotal.
- **About page** — Explore the SOLEST brand story, values, and contact form demo.
- **Persistent cart** — Cart items are stored in browser `localStorage`.
- **Light and dark themes** — Switch themes and keep your preference when navigating between pages.
- **Responsive navigation** — Desktop navigation and a collapsible mobile menu.
- **Animations** — Product hover effects, hero entrance animation, and scroll-reveal effects.
- **SEO basics** — Page-specific titles and descriptions, plus Open Graph metadata.
- **Reusable components** — Shared navbar, footer, product data, TypeScript types, and utility functions.

## 🛠️ Tech Stack

- HTML5
- Tailwind CSS v4
- TypeScript
- Vite
- daisyUI
- Browser `localStorage`

## 📄 Pages

| Page            | Description                                          |
| --------------- | ---------------------------------------------------- |
| Home            | Introduction, categories, and featured sneakers      |
| Shop            | Product search, category filters, and product grid   |
| Product Details | Product information, size selection, and Add to Cart |
| Cart            | Cart management and order summary                    |
| About           | Brand story, values, and contact form demo           |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) — use a current supported version
- npm, included with Node.js
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/k1mlongPov/solest.git
   ```

2. Open the project directory:

   ```bash
   cd solest
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal, usually `http://localhost:5173/`.

### Production Build

Build the project for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```text
solest/
├── public/
├── src/
│   ├── components/
│   │   ├── navbar.ts
│   │   └── footer.ts
│   ├── data/
│   │   └── products.ts
│   ├── types/
│   │   └── product.ts
│   ├── utils/
│   │   ├── cart.ts
│   │   ├── theme.ts
│   │   └── scroll-reveal.ts
│   ├── main.ts
│   ├── shop.ts
│   ├── product-detail.ts
│   ├── cart.ts
│   ├── about.ts
│   └── style.css
├── index.html
├── shop.html
├── product.html
├── cart.html
├── about.html
├── package.json
├── package-lock.json
├── vite.config.ts
└── README.md
```

_Note: The structure above describes the main files. Your actual repository may include additional configuration files or assets._

## 🛍️ Demo Notes

SOLEST is a frontend demonstration project using sample sneaker products and prices.

- Cart data and theme preferences are stored locally in the browser.
- The contact form displays a demonstration response and does not send real emails.
- Checkout is a demonstration flow; no real payments are processed.
- Product images may be loaded from external image URLs.

## 🎨 Design

The SOLEST interface uses a bold sneaker-store aesthetic with orange accents, modern typography, product photography, reusable UI components, and light/dark themes.

The Figma design covers the five main desktop pages and uses reusable design tokens for consistent styling.

## 👨‍🎓 Project Information

**Project:** SOLEST — Sneaker Marketplace  
**Type:** Frontend student project  
**Purpose:** Demonstrate frontend development, responsive design, reusable components, and interactive shopping UI.

---

_SOLEST — Find your sole. Make your move._
