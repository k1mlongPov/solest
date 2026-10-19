export interface CartItem {
  productId: number;
  size: number;
  quantity: number;
}

const CART_KEY = "solest-cart";

export function getCart(): CartItem[] {
  try {
    const savedCart = localStorage.getItem(CART_KEY);

    if (!savedCart) {
      return [];
    }

    const cart: unknown = JSON.parse(savedCart);

    if (!Array.isArray(cart)) {
      return [];
    }

    return cart.filter((item): item is CartItem => {
      return (
        typeof item.productId === "number" &&
        Number.isInteger(item.productId) &&
        typeof item.size === "number" &&
        Number.isInteger(item.size) &&
        typeof item.quantity === "number" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
      );
    });
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(
  productId: number,
  size: number,
  quantity: number,
): void {
  const cart = getCart();

  const existingItem = cart.find(
    (item) => item.productId === productId && item.size === size,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, size, quantity });
  }

  saveCart(cart);
}

export function getCartCount(): number {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}
