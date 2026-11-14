import rawMenu from "./menu.json";

import kurkureImg from "@/assets/kurkure-momo.jpg";
import steamImg from "@/assets/about-momos.jpg";
import tandooriImg from "@/assets/tandoori-momo.jpg";
import jholImg from "@/assets/jhol-momo.jpg";
import noodlesImg from "@/assets/noodles.jpg";
import burgerImg from "@/assets/burger-pizza.jpg";
import indianImg from "@/assets/indian-biryani.jpg";
import drinksImg from "@/assets/drinks-dessert.jpg";

export type Diet = "veg" | "non-veg";
export type Variant = { label: string; price: number };
export type MenuItem = {
  name: string;
  description?: string;
  diet?: Diet;
  price?: number;
  variants?: Variant[];
};
export type MenuCategory = { id: string; name: string; items: MenuItem[] };

/** Full menu as published on the existing ordering site (categories, items, prices). */
export const menu = rawMenu as MenuCategory[];

/** Display groups used only to organise the existing categories into tabs. */
export const menuGroups: {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
  categoryIds: string[];
}[] = [
  {
    id: "momos",
    label: "Momos",
    image: kurkureImg,
    imageAlt: "Crispy kurkure momos with spicy dip",
    categoryIds: [
      "steam-momo", "fried-momo", "kurkure-momo", "pan-fried-momo", "schezwan-momo",
      "afghani-malai-momo", "barbeque-momo", "chilli-garlic-momo", "manchurian-momo",
      "tandoori-momos", "sizzler-momo", "jhol-momo", "momo-platter", "momo-pizza",
    ],
  },
  {
    id: "chinese",
    label: "Chinese",
    image: noodlesImg,
    imageAlt: "Chilli garlic noodles in a black bowl",
    categoryIds: [
      "starters", "soup", "thukpa", "noodles", "fried-rice", "noodle-combos",
      "fried-rice-combos", "chilli-mashroom", "chicken-lolipop", "maggi",
    ],
  },
  {
    id: "fast-food",
    label: "Burgers, Pizza & More",
    image: burgerImg,
    imageAlt: "Crispy chicken burger, fries and a slice of cheese pizza",
    categoryIds: [
      "burgers", "kurkure-burger", "burger-combos", "fries", "fried-chicken-bucket",
      "bucket-meals", "popcorn", "meal-combo", "mixed-combo", "pizza", "pasta",
      "sandwich", "rolls", "wraps", "bao", "pav-bhaji", "extra-cheese",
    ],
  },
  {
    id: "indian",
    label: "Indian",
    image: indianImg,
    imageAlt: "Chicken biryani, butter chicken and tandoori roti",
    categoryIds: [
      "indian-course", "gravy-and-dry-item", "chicken-curry", "mutton", "soya-chaap",
      "soyaa-chaap-combo", "chana-masala-combo", "veg-biryani", "chicken-biryani",
      "egg-biryani", "roti", "breads", "papad",
    ],
  },
  {
    id: "drinks",
    label: "Drinks & Desserts",
    image: drinksImg,
    imageAlt: "Mocktails, a chocolate shake and gulab jamun",
    categoryIds: [
      "mocktail", "shakes", "coffee", "tea", "cold-drink's", "masala-cold-drink",
      "water", "dessert", "hot-gulab-jamun",
    ],
  },
];

/** Every category belongs to exactly one tab; anything new lands in "More". */
export function groupedMenu() {
  const byId = new Map(menu.map((c) => [c.id, c]));
  const used = new Set<string>();
  const groups = menuGroups.map((g) => ({
    ...g,
    categories: g.categoryIds
      .map((id) => byId.get(id))
      .filter((c): c is MenuCategory => {
        if (c) used.add(c.id);
        return Boolean(c);
      }),
  }));
  const rest = menu.filter((c) => !used.has(c.id));
  if (rest.length) {
    groups.push({ id: "more", label: "More", image: steamImg, imageAlt: "Steamed momos", categoryIds: rest.map((c) => c.id), categories: rest });
  }
  return groups;
}

/** Optional photo shown on a category card. */
export const categoryImages: Record<string, { src: string; alt: string }> = {
  "steam-momo": { src: steamImg, alt: "Steamed momos in a bamboo basket" },
  "kurkure-momo": { src: kurkureImg, alt: "Crispy kurkure momos" },
  "tandoori-momos": { src: tandooriImg, alt: "Tandoori momos on a sizzler plate" },
  "jhol-momo": { src: jholImg, alt: "Jhol momo in spicy broth" },
  noodles: { src: noodlesImg, alt: "Chilli garlic noodles" },
  pizza: { src: burgerImg, alt: "Burger, fries and pizza" },
  "chicken-biryani": { src: indianImg, alt: "Chicken biryani in a copper handi" },
  mocktail: { src: drinksImg, alt: "Colourful mocktails" },
};

export function startingPrice(item: MenuItem): number | undefined {
  if (item.variants?.length) return Math.min(...item.variants.map((v) => v.price));
  return item.price;
}

export function categoryStartingPrice(cat: MenuCategory): number | undefined {
  const prices = cat.items.map(startingPrice).filter((p): p is number => typeof p === "number" && p > 0);
  return prices.length ? Math.min(...prices) : undefined;
}

export function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function searchMenu(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return menu
    .map((c) => ({
      ...c,
      items: c.name.toLowerCase().includes(q)
        ? c.items
        : c.items.filter(
            (i) => i.name.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q),
          ),
    }))
    .filter((c) => c.items.length > 0);
}

export const menuStats = {
  categories: menu.length,
  items: menu.reduce((n, c) => n + c.items.length, 0),
};

export function domId(categoryId: string) {
  return `cat-${categoryId.replace(/[^a-z0-9-]/gi, "")}`;
}
