import type { Product } from "@/types/products";

const products: Product[] = [
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    description: "A polished dashboard starter for operational metrics.",
    price: 129,
    category: "Dashboards",
  },
  {
    id: "revenue-kit",
    name: "Revenue Kit",
    description: "Reusable revenue cards, charts, and table layouts.",
    price: 89,
    category: "Kits",
  },
  {
    id: "admin-shell",
    name: "Admin Shell",
    description: "Navigation, header, and sidebar primitives for admin apps.",
    price: 99,
    category: "Layouts",
  },
];

export async function getProducts() {
  return products;
}

export async function getCategories() {
  return [...new Set(products.map((product) => product.category))];
}
