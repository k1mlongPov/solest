import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Air Pulse Red",
    category: "Lifestyle",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80",
    tag: "BESTSELLER",
  },
  {
    id: 2,
    name: "Urban Runner",
    category: "Running",
    price: 74.99,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=700&auto=format&fit=crop&q=80",
    tag: "NEW",
  },
  {
    id: 3,
    name: "Street Classic",
    category: "Lifestyle",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=700&auto=format&fit=crop&q=80",
    tag: "POPULAR",
  },
  {
    id: 4,
    name: "Court Vision",
    category: "Basketball",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=700&auto=format&fit=crop&q=80",
    tag: "LIMITED",
  },
];
