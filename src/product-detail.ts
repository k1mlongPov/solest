import "./style.css";
import { products } from "./data/products";
import {
  renderNavbar,
  initializeThemeToggle,
  initializeMobileNav,
} from "./components/navbar";
import { renderFooter } from "./components/footer";
import { initializeTheme } from "./utils/theme";
import { initializeScrollReveal } from "./utils/scroll-reveal";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Could not find the #app element.");
}

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const product = products.find((item) => item.id === productId);

if (!product) {
  initializeTheme();
  app.innerHTML = `
    <div class="min-h-screen bg-base-100 text-base-content">
      ${renderNavbar()}
      <main class="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 class="text-3xl font-black">Sneaker not found</h1>
        <p class="mt-4 text-base-content/60">
          We couldn't find that product in our collection.
        </p>
        <a href="/shop.html"
          class="mt-8 inline-block rounded-full bg-orange-500 px-6 py-3 font-bold">
          Back to Shop
        </a>
      </main>
      ${renderFooter()}
    </div>
  `;
} else {
  document.title = `${product.name} | SOLEST`;

  const sizes = [38, 39, 40, 41, 42, 43, 44, 45];

  initializeTheme();

  app.innerHTML = `
    <div class="min-h-screen bg-base-100 text-base-content">
      ${renderNavbar()}

      <main>
        <!-- Section 1: Breadcrumb -->
        <section class="scroll-reveal mx-auto max-w-7xl px-5 pt-8 lg:px-8">
          <p class="text-sm text-base-content/60">
            <a href="/" class="hover:text-orange-400">Home</a>
            <span class="mx-2">/</span>
            <a href="/shop.html" class="hover:text-orange-400">Shop</a>
            <span class="mx-2">/</span>
            <span class="text-base-content">${product.name}</span>
          </p>
        </section>

        <!-- Section 2: Product details -->
        <section class="scroll-reveal mx-auto grid max-w-7xl gap-10 px-5 py-10 md:grid-cols-2 lg:gap-16 lg:px-8 lg:py-16">

          <div class="overflow-hidden rounded-3xl bg-base-200">
            <img
              src="${product.image}"
              alt="${product.name} sneakers"
              class="h-full max-h-150 min-h-80 w-full object-cover"
            />
          </div>

          <div class="flex flex-col justify-center">
            <p class="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
              ${product.tag} · ${product.category}
            </p>

            <h1 class="mt-4 text-4xl font-black sm:text-5xl">
              ${product.name}
            </h1>

            <p class="mt-5 text-3xl font-black">
              $${product.price.toFixed(2)}
            </p>

            <p class="mt-6 leading-7 text-base-content/60">
              Discover your next everyday favorite with SOLEST.
              The ${product.name} brings a distinctive look to your
              sneaker collection. Pair it with your favorite outfits
              and make every step your own.
            </p>

            <div class="mt-8">
              <label for="shoe-size" class="font-bold">
                Select size (EU)
              </label>

              <div class="mt-3 grid grid-cols-4 gap-3">
                ${sizes
                  .map(
                    (size) => `
                  <button
                    type="button"
                    data-size="${size}"
                    aria-pressed="false"
                    class="size-button rounded-xl border border-base-300 py-3 font-semibold transition hover:border-orange-500"
                  >
                    ${size}
                  </button>
                `,
                  )
                  .join("")}
              </div>

              <p id="size-error" class="mt-2 text-sm text-red-400" aria-live="polite"></p>
            </div>

            <div class="mt-8">
              <label for="quantity" class="font-bold">Quantity</label>
              <input
                id="quantity"
                type="number"
                min="1"
                max="10"
                step="1"
                value="1"
                class="mt-3 block w-28 rounded-xl border border-base-300 bg-base-200 px-4 py-3 text-base-content outline-none focus:border-orange-500"
              />
            </div>

            <button
              id="add-product"
              type="button"
              class="mt-8 w-full rounded-full bg-orange-500 px-7 py-4 font-bold transition hover:bg-orange-600 sm:w-auto"
            >
              Add to Cart — $${product.price.toFixed(2)}
            </button>

            <p id="product-message" class="mt-4 text-sm text-orange-400" aria-live="polite"></p>

            <p class="mt-5 text-sm text-slate-500">
              Demo store · Sample prices · No real payment processing
            </p>
          </div>
        </section>

        <!-- Section 3: Product information -->
        <section class="scroll-reveal border-y border-base-300 bg-base-200">
          <div class="mx-auto max-w-7xl px-5 py-12 lg:px-8">
            <h2 class="text-2xl font-black">Product information</h2>

            <div class="mt-7 grid gap-6 sm:grid-cols-3">
              <div>
                <p class="text-sm text-base-content/60">Category</p>
                <p class="mt-2 font-bold">${product.category}</p>
              </div>

              <div>
                <p class="text-sm text-base-content/60">Product name</p>
                <p class="mt-2 font-bold">${product.name}</p>
              </div>

              <div>
                <p class="text-sm text-base-content/60">Product ID</p>
                <p class="mt-2 font-bold">SL-${product.id.toString().padStart(3, "0")}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 4: Related products -->
        <section class="scroll-reveal mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <p class="text-sm font-bold tracking-[0.2em] text-orange-400">
            KEEP EXPLORING
          </p>

          <h2 class="mt-3 text-3xl font-black">You might also like</h2>

          <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            ${products
              .filter((item) => item.id !== product.id)
              .slice(0, 3)
              .map(
                (item) => `
                <a
                  href="/product.html?id=${item.id}"
                  class="group overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition hover:-translate-y-1 hover:border-orange-500/50"
                >
                  <img
                    src="${item.image}"
                    alt="${item.name} sneakers"
                    loading="lazy"
                    class="h-56 w-full bg-base-content object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <div class="p-5">
                    <p class="text-sm text-orange-400">${item.category}</p>
                    <h3 class="mt-2 font-bold">${item.name}</h3>
                    <p class="mt-3 font-black">$${item.price.toFixed(2)}</p>
                  </div>
                </a>
              `,
              )
              .join("")}
          </div>
        </section>
      </main>

      ${renderFooter()}
    </div>
  `;

  initializeThemeToggle();
  initializeMobileNav();
  initializeScrollReveal();

  // Select a sneaker size.
  let selectedSize: number | null = null;

  const sizeError = document.querySelector<HTMLParagraphElement>("#size-error");
  const message =
    document.querySelector<HTMLParagraphElement>("#product-message");
  const quantityInput = document.querySelector<HTMLInputElement>("#quantity");
  const addButton = document.querySelector<HTMLButtonElement>("#add-product");

  document
    .querySelectorAll<HTMLButtonElement>(".size-button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        selectedSize = Number(button.dataset.size);

        document
          .querySelectorAll<HTMLButtonElement>(".size-button")
          .forEach((sizeButton) => {
            const selected = sizeButton === button;

            sizeButton.setAttribute("aria-pressed", String(selected));
            sizeButton.classList.toggle("border-orange-500", selected);
            sizeButton.classList.toggle("bg-orange-500", selected);
            sizeButton.classList.toggle("text-base-content", selected);
          });

        if (sizeError) sizeError.textContent = "";
        if (message) message.textContent = "";
      });
    });

  addButton?.addEventListener("click", () => {
    if (!message || !sizeError || !quantityInput) return;

    if (selectedSize === null) {
      sizeError.textContent = "Please select a size first.";
      return;
    }

    const quantity = Number(quantityInput.value);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      message.textContent = "";
      sizeError.textContent =
        "Choose a whole-number quantity between 1 and 10.";
      return;
    }

    // Store selected items for the upcoming Cart page.
    type CartItem = {
      productId: number;
      size: number;
      quantity: number;
    };

    let cart: CartItem[] = [];

    try {
      const savedCart = localStorage.getItem("solest-cart");
      cart = savedCart ? (JSON.parse(savedCart) as CartItem[]) : [];

      if (!Array.isArray(cart)) cart = [];
    } catch {
      cart = [];
    }

    const existingItem = cart.find(
      (item) => item.productId === product.id && item.size === selectedSize,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        size: selectedSize,
        quantity,
      });
    }

    try {
      localStorage.setItem("solest-cart", JSON.stringify(cart));
    } catch {
      message.textContent =
        "Could not save your cart. Please check browser storage.";
      return;
    }

    const total = product.price * quantity;

    message.textContent = `${quantity} × ${product.name} (EU ${selectedSize}) added. Total: $${total.toFixed(2)}`;
    sizeError.textContent = "";

    const cartCountElement =
      document.querySelector<HTMLSpanElement>("#cart-count");

    if (cartCountElement) {
      cartCountElement.textContent = String(
        cart.reduce((sum, item) => sum + item.quantity, 0),
      );
    }
  });
}
