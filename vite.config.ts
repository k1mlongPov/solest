import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [tailwindcss()],

  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), "index.html"),
        shop: resolve(process.cwd(), "shop.html"),
        product: resolve(process.cwd(), "product.html"),
        cart: resolve(process.cwd(), "cart.html"),
        about: resolve(process.cwd(), "about.html"),
      },
    },
  },
});
