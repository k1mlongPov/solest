import "./style.css";
import { products } from "./data/products";
import {
  renderNavbar,
  initializeThemeToggle,
  initializeMobileNav,
} from "./components/navbar";
import { renderFooter } from "./components/footer";
import { addToCart, getCartCount } from "./utils/cart";
import { initializeTheme } from "./utils/theme";
import { initializeScrollReveal } from "./utils/scroll-reveal";

let cartCount = 0;

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Could not find the #app element.");
}

initializeTheme();

app.innerHTML = `
  <div class="min-h-screen bg-base-100 text-base-content">

    <!-- Navigation -->
    ${renderNavbar()}

    <main>
      <!-- Hero Section -->
      <section class="relative overflow-hidden">
        <div class="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24 lg:px-8 lg:py-28">

          <div class="relative z-10">
            <p class="hero-animate mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-orange-400">
              <span class="h-2 w-2 rounded-full bg-orange-500"></span>
              STEP INTO SOMETHING NEW
            </p>

            <h1 class="hero-animate-delay-1 max-w-2xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              YOUR STYLE.<br />
              YOUR <span class="text-orange-500">SOLE.</span>
            </h1>

            <p class="hero-animate-delay-2 mt-6 max-w-lg text-base leading-7 text-base-content/60 sm:text-lg">
              Discover sneakers that move with you.
              From everyday essentials to standout streetwear,
              find your next favorite pair at SOLEST.
            </p>

            <div class="hero-animate-delay-2 mt-9 flex flex-wrap items-center gap-4">
              <a href="#trending"
                class="rounded-full bg-orange-500 px-7 py-4 font-bold text-base-content transition duration-300 hover:-translate-y-1 hover:bg-orange-600">
                Explore Collection &rarr;
              </a>

              <a href="#categories"
                class="rounded-full border border-base-300 px-7 py-4 font-semibold transition hover:border-white hover:bg-white/5">
                Discover More
              </a>
            </div>

            <div class="hero-animate-delay-1 mt-12 flex gap-8 border-t border-base-300 pt-7">
              <div>
                <p class="text-2xl font-black">100+</p>
                <p class="mt-1 text-sm text-base-content/60">Sneaker Styles</p>
              </div>
              <div>
                <p class="text-2xl font-black">3</p>
                <p class="mt-1 text-sm text-base-content/60">Main Categories</p>
              </div>
              <div>
                <p class="text-2xl font-black">24/7</p>
                <p class="mt-1 text-sm text-base-content/60">Online Shopping</p>
              </div>
            </div>
          </div>

          <div class="hero-animate relative">
            <div class="absolute inset-10 rounded-full bg-orange-500/20 blur-3xl"></div>

            <div class="relative rotate-2 overflow-hidden rounded-3xl border border-base-300 bg-[#1b202b] p-3 shadow-2xl transition duration-500 hover:rotate-0">
              <img
                src="${products[0].image}"
                alt="Red sneaker featured in the SOLEST collection"
                class="h-80 w-full rounded-2xl object-cover sm:h-105"
              />

              <div class="absolute bottom-7 left-7 right-7 flex items-center justify-between rounded-2xl border border-base-300 text-white/90 p-5 backdrop-blur-md">
                <div>
                  <p class="text-xs font-semibold tracking-widest text-orange-400">FEATURED DROP</p>
                  <p class="mt-2 text-lg font-bold">Air Pulse Red</p>
                  <p class="mt-1 text-sm text-white/60">Everyday collection</p>
                </div>
                <p class="text-xl font-black">$89.99</p>
              </div>
            </div>

            <div class="absolute -right-2 top-8 rounded-full bg-orange-500 px-5 py-3 text-sm font-black text-base-content shadow-xl sm:-right-4">
              NEW DROP
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section id="categories" class="scroll-reveal border-y border-base-300 bg-base-200">
        <div class="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div class="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="text-sm font-bold tracking-[0.2em] text-orange-400">FIND YOUR FIT</p>
              <h2 class="mt-3 text-3xl font-black sm:text-4xl">Shop by category</h2>
            </div>
            <p class="max-w-md text-sm leading-6 text-base-content/60">
              Every day has a different pace. Find the sneakers
              that match your movement and your style.
            </p>
          </div>

          <div class="grid gap-5 sm:grid-cols-3">

            <a href="#trending" data-category="Running"
              class="group rounded-2xl border border-base-300 bg-base-100 p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-500/60">
              <span class="text-3xl">↗</span>
              <h3 class="mt-8 text-xl font-bold">Running</h3>
              <p class="mt-2 text-sm text-base-content/60">Built for every stride.</p>
              <p class="mt-6 text-sm font-bold text-orange-400">Explore category &rarr;</p>
            </a>

            <a href="#trending" data-category="Lifestyle"
              class="group rounded-2xl border border-base-300  bg-base-100 p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-500/60">
              <span class="text-3xl">✳</span>
              <h3 class="mt-8 text-xl font-bold">Lifestyle</h3>
              <p class="mt-2 text-sm text-base-content/60">Everyday looks, elevated.</p>
              <p class="mt-6 text-sm font-bold text-orange-400">Explore category &rarr;</p>
            </a>

            <a href="#trending" data-category="Basketball"
              class="group rounded-2xl border border-base-300  bg-base-100 p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-500/60">
              <span class="text-3xl">◎</span>
              <h3 class="mt-8 text-xl font-bold">Basketball</h3>
              <p class="mt-2 text-sm text-base-content/60">Make every move count.</p>
              <p class="mt-6 text-sm font-bold text-orange-400">Explore category &rarr;</p>
            </a>

          </div>
        </div>
      </section>

      <!-- Trending Products Section -->
      <section id="trending" class="scroll-reveal mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div class="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="text-sm font-bold tracking-[0.2em] text-orange-400">THE LATEST PICKS</p>
            <h2 class="mt-3 text-3xl font-black sm:text-4xl">Trending sneakers</h2>
            <p class="mt-3 text-base-content/60">Fresh styles. Timeless attitude.</p>
          </div>

          <button id="show-all"
            class="rounded-full border border-base-300 px-5 py-3 text-sm font-semibold transition hover:border-orange-500 hover:text-orange-400">
            View all products &rarr;
          </button>
        </div>

        <div id="product-grid" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          ${products
            .map(
              (product) => `
            <article class="product-card group overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition duration-300 hover:-translate-y-1 hover:border-orange-500/50">

              <div class="relative overflow-hidden bg-white">
                <img
                  src="${product.image}"
                  alt="${product.name} sneakers"
                  loading="lazy"
                  class="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span class="absolute left-4 top-4 rounded-full  bg-base-100 px-3 py-1.5 text-[10px] font-bold tracking-widest text-base-content">
                  ${product.tag}
                </span>
              </div>

              <div class="p-5">
                <p class="text-xs font-semibold uppercase tracking-wider text-orange-400">
                  ${product.category}
                </p>
                <a
                  href="/product.html?id=${product.id}"
                  class="mt-2 block text-lg font-bold transition hover:text-orange-400"
                >
                  ${product.name}
                </a>
              

                <div class="mt-5 flex items-center justify-between gap-3">
                  <p class="text-lg font-black">$${product.price.toFixed(2)}</p>

                  <button
                    data-product-id="${product.id}"
                    class="add-to-cart rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#10131b] transition hover:bg-orange-500 hover:text-base-content">
                    + Add
                  </button>
                </div>
              </div>
            </article>
          `,
            )
            .join("")}
        </div>

        <p id="cart-message" aria-live="polite" class="mt-6 text-sm text-orange-400"></p>
      </section>

      <!-- Brand Story Section -->
      <section id="about" class="scroll-reveal border-t border-base-300 bg-base-200">
        <div class="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 md:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p class="text-sm font-bold tracking-[0.2em] text-orange-400">MORE THAN SNEAKERS</p>
            <h2 class="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              Walk your own path.
            </h2>
          </div>

          <div>
            <p class="leading-7 text-base-content/60">
              SOLEST is built around self-expression, everyday comfort,
              and the confidence to move your own way. Discover your
              style, find your fit, and make every step count.
            </p>
            <a href="#trending"
              class="mt-6 inline-block font-bold text-orange-400 transition hover:text-orange-300">
              Find your next pair &rarr;
            </a>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    ${renderFooter()}

  </div>
`;
initializeThemeToggle();
initializeMobileNav();
initializeScrollReveal();
// Simple cart interaction for our static demonstration.
const cartCountElement = document.querySelector<HTMLSpanElement>("#cart-count");
const cartMessage =
  document.querySelector<HTMLParagraphElement>("#cart-message");

const addButtons = document.querySelectorAll<HTMLButtonElement>(".add-to-cart");

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = Number(button.dataset.productId);

    if (!Number.isInteger(productId) || productId <= 0) {
      return;
    }

    // Temporary default size: EU 42
    addToCart(productId, 42, 1);

    const cartCountElement = document.querySelector("#cart-count");

    if (cartCountElement) {
      cartCountElement.textContent = String(getCartCount());
    }

    button.textContent = "Added!";
  });
});

// Filter the visible products when a category is selected.
document
  .querySelectorAll<HTMLAnchorElement>("[data-category]")
  .forEach((link) => {
    link.addEventListener("click", () => {
      const category = link.dataset.category;

      const filteredProducts = products.filter(
        (product) => product.category === category,
      );

      const grid = document.querySelector<HTMLDivElement>("#product-grid");

      if (!grid || !category) {
        return;
      }

      grid.innerHTML = filteredProducts
        .map(
          (product) => `
      <article class="overflow-hidden rounded-2xl border border-base-300 bg-base-200">
        <img
          src="${product.image}"
          alt="${product.name} sneakers"
          class="h-64 w-full bg-white object-cover"
        />
        <div class="p-5">
          <p class="text-xs font-semibold text-orange-400">${product.category}</p>
          <h3 class="mt-2 text-lg font-bold">${product.name}</h3>
          <p class="mt-3 font-black">$${product.price.toFixed(2)}</p>
          <button data-product-id="${product.id}"
            class="add-to-cart mt-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#10131b]">
            + Add
          </button>
        </div>
      </article>
    `,
        )
        .join("");

      // Reconnect the Add buttons after replacing the product cards.
      grid
        .querySelectorAll<HTMLButtonElement>(".add-to-cart")
        .forEach((button) => {
          button.addEventListener("click", () => {
            const product = products.find(
              (item) => item.id === Number(button.dataset.productId),
            );

            if (!product || !cartCountElement || !cartMessage) {
              return;
            }

            cartCount++;
            cartCountElement.textContent = String(cartCount);
            cartMessage.textContent = `${product.name} added to your demo cart!`;
          });
        });

      const heading = document.querySelector<HTMLElement>("#trending h2");

      if (heading) {
        heading.textContent = `${category} sneakers`;
      }
    });
  });

// Restore all products.
document
  .querySelector<HTMLButtonElement>("#show-all")
  ?.addEventListener("click", () => {
    window.location.reload();
  });
