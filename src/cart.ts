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

interface CartItem {
  productId: number;
  size: number;
  quantity: number;
}

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Could not find the #app element.");
}

function loadCart(): CartItem[] {
  try {
    const savedCart = localStorage.getItem("solest-cart");

    if (!savedCart) return [];

    const parsed: unknown = JSON.parse(savedCart);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is CartItem => {
      return (
        typeof item.productId === "number" &&
        Number.isInteger(item.productId) &&
        products.some((product) => product.id === item.productId) &&
        typeof item.size === "number" &&
        Number.isInteger(item.size) &&
        item.size >= 38 &&
        item.size <= 45 &&
        typeof item.quantity === "number" &&
        Number.isInteger(item.quantity) &&
        item.quantity >= 1 &&
        item.quantity <= 100
      );
    });
  } catch {
    return [];
  }
}

let cart: CartItem[] = loadCart();

function saveCart(): void {
  try {
    localStorage.setItem("solest-cart", JSON.stringify(cart));
  } catch {
    alert("Could not save your cart. Please check browser storage.");
  }
}

function renderCart(): void {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  initializeTheme();

  app!.innerHTML = `
    <div class="min-h-screen bg-base-100 text-base-content">
      ${renderNavbar()}

      <main class="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">

        <!-- Section 1: Cart heading -->
        <section class="scroll-reveal mb-10">
          <p class="text-sm font-bold tracking-[0.2em] text-orange-400">
            YOUR SELECTION
          </p>

          <h1 class="mt-3 text-4xl font-black sm:text-5xl">
            Shopping cart
          </h1>

          <p class="mt-4 text-base-content/60">
            Review your sneakers before checking out.
          </p>
        </section>

        ${
          cart.length === 0
            ? `
              <!-- Empty cart -->
              <section class="scroll-reveal rounded-3xl border border-base-300 bg-base-200 px-6 py-16 text-center">
                <div class="text-5xl">👟</div>

                <h2 class="mt-6 text-2xl font-black">
                  Your cart is empty
                </h2>

                <p class="mt-3 text-base-content/60">
                  Looks like you haven't found your next pair yet.
                </p>

                <a
                  href="/shop.html"
                  class="mt-8 inline-block rounded-full bg-orange-500 px-7 py-3 font-bold transition hover:bg-orange-600"
                >
                  Explore sneakers &rarr;
                </a>
              </section>
            `
            : `
              <div class="grid items-start gap-8 lg:grid-cols-[1fr_340px]">

                <!-- Section 2: Cart items -->
                <section class="scroll-reveal space-y-4" aria-label="Cart items">

                  <div class="flex items-center justify-between gap-3">
                    <p class="text-sm text-base-content/60">
                      ${totalQuantity} item${totalQuantity === 1 ? "" : "s"} in your cart
                    </p>

                    <button
                      type="button"
                      data-action="clear"
                      class="text-sm font-semibold text-red-400 transition hover:text-red-300"
                    >
                      Clear cart
                    </button>
                  </div>

                  ${cart
                    .map((item) => {
                      const product = products.find(
                        (p) => p.id === item.productId,
                      )!;

                      return `
                      <article class="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-200 p-4 sm:flex-row sm:items-center sm:p-5">

                        <img
                          src="${product.image}"
                          alt="${product.name} sneakers"
                          class="h-36 w-full rounded-xl bg-white object-cover sm:w-36"
                        />

                        <div class="min-w-0 flex-1">
                          <p class="text-xs font-semibold uppercase tracking-wider text-orange-400">
                            ${product.category}
                          </p>

                          <h2 class="mt-2 text-lg font-bold">
                            ${product.name}
                          </h2>

                          <p class="mt-2 text-sm text-base-content/60">
                            Size: EU ${item.size}
                          </p>

                          <p class="mt-3 font-bold">
                            $${product.price.toFixed(2)} each
                          </p>
                        </div>

                        <div class="flex flex-wrap items-center justify-between gap-4 sm:flex-col sm:items-end">

                          <div class="flex items-center gap-3 rounded-full border border-white/15 px-2 py-1">
                            <button
                              type="button"
                              data-action="decrease"
                              data-product-id="${item.productId}"
                              data-size="${item.size}"
                              aria-label="Decrease ${product.name} quantity"
                              class="h-8 w-8 rounded-full transition hover:bg-white/10"
                            >
                              −
                            </button>

                            <span class="min-w-5 text-center font-bold">
                              ${item.quantity}
                            </span>

                            <button
                              type="button"
                              data-action="increase"
                              data-product-id="${item.productId}"
                              data-size="${item.size}"
                              aria-label="Increase ${product.name} quantity"
                              ${item.quantity >= 100 ? "disabled" : ""}
                              class="h-8 w-8 rounded-full transition hover:bg-white/10 disabled:opacity-40"
                            >
                              +
                            </button>
                          </div>

                          <p class="text-lg font-black">
                            $${(product.price * item.quantity).toFixed(2)}
                          </p>

                          <button
                            type="button"
                            data-action="remove"
                            data-product-id="${item.productId}"
                            data-size="${item.size}"
                            class="text-sm text-red-400 transition hover:text-red-300"
                          >
                            Remove
                          </button>

                        </div>
                      </article>
                    `;
                    })
                    .join("")}

                  <a
                    href="/shop.html"
                    class="inline-block pt-3 text-sm font-semibold text-orange-400 transition hover:text-orange-300"
                  >
                    &larr; Continue shopping
                  </a>
                </section>

                <!-- Section 3: Order summary -->
                <aside class="scroll-reveal rounded-2xl border border-base-300 bg-base-200 p-6 lg:sticky lg:top-28">
                  <h2 class="text-xl font-black">Order summary</h2>

                  <div class="mt-6 flex justify-between gap-4 text-sm">
                    <span class="text-base-content/60">Items (${totalQuantity})</span>
                    <span>$${subtotal.toFixed(2)}</span>
                  </div>

                  <div class="mt-4 flex justify-between gap-4 text-sm">
                    <span class="text-base-content/60">Shipping</span>
                    <span class="text-base-content/70">Not calculated</span>
                  </div>

                  <div class="mt-6 border-t border-base-300 pt-5">
                    <div class="flex items-center justify-between gap-4">
                      <span class="font-bold">Subtotal</span>
                      <span class="text-2xl font-black text-orange-400">
                        $${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <p class="mt-3 text-xs leading-5 text-slate-500">
                      Shipping and taxes are not included.
                      This is a student demo store.
                    </p>
                  </div>

                  <button
                    type="button"
                    data-action="checkout"
                    class="mt-7 w-full rounded-full bg-orange-500 px-6 py-4 font-bold transition hover:bg-orange-600"
                  >
                    Continue to checkout
                  </button>

                  <p id="checkout-message" class="mt-4 text-sm text-orange-400" aria-live="polite"></p>
                </aside>

              </div>
            `
        }

      </main>

      ${renderFooter()}
    </div>
  `;

  initializeThemeToggle();
  attachCartEvents();
  initializeMobileNav();
  initializeScrollReveal();
}

function attachCartEvents(): void {
  app!
    .querySelectorAll<HTMLButtonElement>("[data-action]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.action;

        if (action === "clear") {
          cart = [];
          saveCart();
          renderCart();
          return;
        }

        if (action === "checkout") {
          const message =
            app!.querySelector<HTMLParagraphElement>("#checkout-message");

          if (message) {
            message.textContent =
              "Checkout is a demo feature. No payment will be processed.";
          }

          return;
        }

        const productId = Number(button.dataset.productId);
        const size = Number(button.dataset.size);

        const itemIndex = cart.findIndex(
          (item) => item.productId === productId && item.size === size,
        );

        if (itemIndex === -1) return;

        if (action === "increase") {
          if (cart[itemIndex].quantity < 100) {
            cart[itemIndex].quantity++;
          }
        } else if (action === "decrease") {
          if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
          }
        } else if (action === "remove") {
          cart.splice(itemIndex, 1);
        }

        saveCart();
        renderCart();
      });
    });
}

renderCart();
