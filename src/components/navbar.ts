import { applyTheme, getSavedTheme } from "../utils/theme";

interface SavedCartItem {
  productId: number;
  size: number;
  quantity: number;
}

function getSavedCartCount(): number {
  try {
    const savedCart = localStorage.getItem("solest-cart");

    if (!savedCart) return 0;

    const cart: SavedCartItem[] = JSON.parse(savedCart);

    if (!Array.isArray(cart)) return 0;

    return cart.reduce((total, item) => {
      if (
        typeof item.quantity === "number" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
      ) {
        return total + item.quantity;
      }

      return total;
    }, 0);
  } catch {
    return 0;
  }
}

export function renderNavbar(): string {
  const cartCount = getSavedCartCount();

  return `
    
    <header class="sticky top-0 z-50 border-b border-base-300 bg-base-100/95 text-base-content backdrop-blur-md">
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <!-- Mobile menu button -->
          <button
            id="mobile-menu-toggle"
            type="button"
            class="btn btn-ghost btn-square md:hidden"
            aria-label="Open navigation menu"
            aria-expanded="false"
            aria-controls="mobile-menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <!-- Mobile navigation links -->
          <div
            id="mobile-menu"
            class="absolute left-0 top-full hidden w-full border-b border-base-300 bg-base-100 p-5 shadow-lg md:hidden"
          >
            <nav class="flex flex-col gap-4 text-base-content">
              <a href="/" class="transition hover:text-orange-500">Home</a>
              <a href="/shop.html" class="transition hover:text-orange-500">Shop</a>
              <a href="/about.html" class="transition hover:text-orange-500">About</a>
            </nav>
          </div>

        <a href="/" class="text-2xl font-black tracking-tight">
          SOLE<span class="text-orange-500">ST.</span>
        </a>

        
        <!-- Desktop navigation -->
        <div class="hidden items-center gap-8 text-sm text-base-content/70 md:flex">
          <a href="/" class="transition hover:text-orange-500">Home</a>
          <a href="/shop.html" class="transition hover:text-orange-500">Shop</a>
          <a href="/about.html" class="transition hover:text-orange-500">About</a>
        </div>

        


        
        <div class="flex items-center gap-3">
          
          <label class="swap swap-rotate cursor-pointer rounded-full p-2">
            <input
              id="theme-toggle"
              type="checkbox"
              class="theme-controller"
              value="dark"
              aria-label="Toggle dark mode"
            />

            <!-- Sun icon -->
            <svg
              class="swap-off h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
            </svg>

            <!-- Moon icon -->
            <svg
              class="swap-on h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21 14.2A8.5 8.5 0 0 1 9.8 3 8.5 8.5 0 1 0 21 14.2Z"/>
            </svg>
          </label>


          <a href="/cart.html"
            class="rounded-full border border-base-300 px-4 py-2 text-sm font-semibold transition hover:border-orange-500 hover:text-orange-400">
            Cart (<span id="cart-count">${cartCount}</span>)
          </a>
        </div>


      </nav>
    </header>
  `;
}

export function initializeMobileNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>(
    "#mobile-menu-toggle",
  );
  const menu = document.querySelector<HTMLDivElement>("#mobile-menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", String(!isExpanded));
    toggle.setAttribute(
      "aria-label",
      isExpanded ? "Open navigation menu" : "Close navigation menu",
    );

    menu.classList.toggle("hidden", isExpanded);
  });
}

export function initializeThemeToggle(): void {
  const toggle = document.querySelector<HTMLInputElement>("#theme-toggle");

  if (!toggle) return;

  const savedTheme = getSavedTheme();

  toggle.checked = savedTheme === "dark";

  toggle.addEventListener("change", () => {
    applyTheme(toggle.checked ? "dark" : "light");
  });
}
