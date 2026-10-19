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

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Could not find the #app element.");
}

let selectedCategory = "All";
let searchTerm = "";

initializeTheme();

app.innerHTML = `
  <div class="min-h-screen bg-base-100 text-base-content">
    ${renderNavbar()}

    <main>
      <!-- Section 1: Shop heading -->
      <section class="scroll-reveal border-b border-base-300">
        <div class="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <p class="text-sm font-bold tracking-[0.2em] text-orange-400">
            THE SOLEST COLLECTION
          </p>

          <h1 class="mt-4 text-4xl font-black sm:text-6xl">
            Find your next <span class="text-orange-500">sole.</span>
          </h1>

          <p class="mt-5 max-w-xl leading-7 text-base-content/60">
            Explore sneakers for every move, every mood, and every day.
            Find the pair that fits your style.
          </p>

          <p class="mt-6 text-sm text-base-content/70">
            Showing <span id="product-count">${products.length}</span> products
          </p>
        </div>
      </section>

      <!-- Section 2: Search and filters -->
      <section class="scroll-reveal mx-auto max-w-7xl px-5 pt-10 lg:px-8">
        <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <label for="product-search" class="sr-only">
            Search sneakers
          </label>

          <input
            id="product-search"
            type="search"
            placeholder="Search sneakers..."
            class="w-full rounded-xl border border-base-300 bg-base-200 px-5 py-4 text-base-content outline-none placeholder:text-slate-500 focus:border-orange-500 md:max-w-md"
          />

          <div class="flex flex-wrap gap-2" aria-label="Filter by category">
            ${["All", "Running", "Lifestyle", "Basketball"]
              .map(
                (category) => `
              <button
                type="button"
                data-filter="${category}"
                aria-pressed="${category === "All"}"
                class="category-filter rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  category === "All"
                    ? "border-orange-500 bg-orange-500 text-base-content"
                    : "border-white/15 text-base-content/70 hover:border-orange-500 hover:text-orange-400"
                }"
              >
                ${category}
              </button>
            `,
              )
              .join("")}
          </div>
        </div>
      </section>

      <!-- Section 3: Product listing -->
      <section class="scroll-reveal mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <div
          id="shop-product-grid"
          class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        ></div>

        <p
          id="empty-message"
          class="hidden py-16 text-center text-base-content/60"
          aria-live="polite"
        >
          No sneakers found. Try another search.
        </p>

        <p
          id="shop-message"
          class="mt-6 text-sm text-orange-400"
          aria-live="polite"
        ></p>
      </section>
    </main>

    ${renderFooter()}
  </div>
`;

initializeThemeToggle();
initializeMobileNav();
initializeScrollReveal();

const grid = document.querySelector<HTMLDivElement>("#shop-product-grid");
const searchInput = document.querySelector<HTMLInputElement>("#product-search");
const productCount = document.querySelector<HTMLSpanElement>("#product-count");
const emptyMessage =
  document.querySelector<HTMLParagraphElement>("#empty-message");

function renderProducts(): void {
  if (!grid || !productCount || !emptyMessage) return;

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  productCount.textContent = String(filteredProducts.length);
  emptyMessage.classList.toggle("hidden", filteredProducts.length > 0);

  grid.innerHTML = filteredProducts
    .map(
      (product) => `
    <article class="product-card group overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition duration-300 hover:-translate-y-1 hover:border-orange-500/50">
      <div class="overflow-hidden bg-white">
        <img
          src="${product.image}"
          alt="${product.name} sneakers"
          loading="lazy"
          class="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
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
            type="button"
            data-product-id="${product.id}"
            class="add-to-cart rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#10131b] transition hover:bg-orange-500 hover:text-base-content"
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  `,
    )
    .join("");

  const addButtons =
    document.querySelectorAll<HTMLButtonElement>(".add-to-cart");

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
}

// Search as the user types.
searchInput?.addEventListener("input", () => {
  searchTerm = searchInput.value.trim();
  renderProducts();
});

// Filter by category.
document
  .querySelectorAll<HTMLButtonElement>(".category-filter")
  .forEach((button) => {
    button.addEventListener("click", () => {
      selectedCategory = button.dataset.filter ?? "All";

      document
        .querySelectorAll<HTMLButtonElement>(".category-filter")
        .forEach((filter) => {
          const isSelected = filter.dataset.filter === selectedCategory;

          filter.setAttribute("aria-pressed", String(isSelected));

          filter.classList.toggle("border-orange-500", isSelected);
          filter.classList.toggle("bg-orange-500", isSelected);
          filter.classList.toggle("text-base-content", isSelected);

          filter.classList.toggle("border-white/15", !isSelected);
          filter.classList.toggle("text-base-content/70", !isSelected);
        });

      renderProducts();
    });
  });

renderProducts();
