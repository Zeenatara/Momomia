import { describe, expect, it } from "vitest";

import { groupedMenu, menu, searchMenu } from "@/data/menu";

describe("menu data from the existing ordering site", () => {
  it("keeps every published category and item", () => {
    expect(menu).toHaveLength(63);
    expect(menu.reduce((n, c) => n + c.items.length, 0)).toBe(465);
  });

  it("shows each category in exactly one menu tab", () => {
    const ids = groupedMenu().flatMap((g) => g.categories.map((c) => c.id));
    expect(ids).toHaveLength(menu.length);
    expect(new Set(ids).size).toBe(menu.length);
    expect(groupedMenu().some((g) => g.id === "more")).toBe(false);
  });

  it("keeps half/full prices for Mix Chilli Garlic Noodles", () => {
    const item = menu.find((c) => c.id === "noodles")?.items.find((i) => i.name === "Mix Chilli Garlic Noodles");
    expect(item?.variants).toEqual([
      { label: "Half", price: 139 },
      { label: "Full", price: 259 },
    ]);
  });

  it("finds dishes by name in search", () => {
    const res = searchMenu("jhol");
    expect(res.some((c) => c.id === "jhol-momo")).toBe(true);
  });
});
