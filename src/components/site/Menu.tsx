import { useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  categoryImages,
  domId,
  formatPrice,
  groupedMenu,
  menuStats,
  searchMenu,
  type MenuCategory,
  type MenuItem,
} from "@/data/menu";
import { restaurant } from "@/data/restaurant";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function DietMark({ diet }: { diet: MenuItem["diet"] }) {
  if (!diet) return null;
  const veg = diet === "veg";
  return (
    <span
      role="img"
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
      className={cn(
        "mt-[0.35rem] grid size-3.5 shrink-0 place-items-center rounded-[3px] border-[1.5px]",
        veg ? "border-veg" : "border-nonveg",
      )}
    >
      <span className={cn("size-1.5 rounded-full", veg ? "bg-veg" : "bg-nonveg")} />
    </span>
  );
}

function ItemRow({ item }: { item: MenuItem }) {
  return (
    <li className="group/item -mx-3 rounded-xl px-3 py-3 transition-colors hover:bg-ivory">
      <div className="flex items-start gap-2.5">
        <DietMark diet={item.diet} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <h4 className="font-sans text-[0.95rem] font-semibold tracking-normal text-navy">{item.name}</h4>
            {typeof item.price === "number" && (
              <>
                <span className="price-leader h-3 min-w-6 flex-1" aria-hidden="true" />
                <span className="shrink-0 font-bold tabular-nums text-royal">{formatPrice(item.price)}</span>
              </>
            )}
          </div>
          {item.description && (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          )}
          {item.variants && item.variants.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.variants.map((v) => (
                <span
                  key={v.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs"
                >
                  <span className="text-muted-foreground">{v.label}</span>
                  <span className="font-bold tabular-nums text-royal">{formatPrice(v.price)}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function CategoryCard({ cat }: { cat: MenuCategory }) {
  const img = categoryImages[cat.id];
  return (
    <article
      id={domId(cat.id)}
      className="mb-6 scroll-mt-44 break-inside-avoid overflow-hidden rounded-3xl bg-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
    >
      {img && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={img.src}
            alt={img.alt}
            width={1024}
            height={768}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      )}
      <div className="p-6 sm:p-7">
        <header className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
          <h3 className="text-2xl font-medium capitalize text-navy">{cat.name.toLowerCase()}</h3>
          <span className="eyebrow shrink-0 text-[0.62rem] text-muted-foreground">
            {cat.items.length} {cat.items.length === 1 ? "item" : "items"}
          </span>
        </header>
        <ul className="mt-2">
          {cat.items.map((item, i) => (
            <ItemRow key={`${item.name}-${i}`} item={item} />
          ))}
        </ul>
      </div>
    </article>
  );
}

export function Menu() {
  const groups = useMemo(() => groupedMenu(), []);
  const [groupId, setGroupId] = useState(groups[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  const group = groups.find((g) => g.id === groupId) ?? groups[0]!;
  const results = useMemo(() => searchMenu(query), [query]);
  const searching = query.trim().length > 0;
  const dishCount = group.categories.reduce((n, c) => n + c.items.length, 0);

  const selectGroup = (id: string) => {
    setGroupId(id);
    setQuery("");
    const el = resultsRef.current;
    if (el && el.getBoundingClientRect().top < 0) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 150 });
    }
  };

  return (
    <section id="menu" className="bg-muted py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="The menu"
          title={
            <>
              Something for <em className="font-normal italic text-royal">every</em> craving
            </>
          }
          intro={`${menuStats.items} dishes across ${menuStats.categories} categories — from steamed momos to biryani, shakes and dessert.`}
        />
      </div>

      {/* Sticky toolbar */}
      <div className="sticky top-[4.5rem] z-30 mt-12 border-y border-border bg-muted/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div role="tablist" aria-label="Menu sections" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            {groups.map((g) => {
              const selected = !searching && g.id === group.id;
              return (
                <button
                  key={g.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => selectGroup(g.id)}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300",
                    selected
                      ? "bg-navy text-on-dark shadow-card"
                      : "bg-card text-navy hover:bg-navy/5 hover:text-royal",
                  )}
                >
                  {g.label}
                </button>
              );
            })}
          </div>
          <label className="relative block lg:w-72">
            <span className="sr-only">Search the menu</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes, e.g. paneer"
              className="h-11 w-full rounded-full border border-input bg-card pl-11 pr-10 text-sm text-navy placeholder:text-muted-foreground focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
            {searching && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-navy"
              >
                <X className="size-4" />
              </button>
            )}
          </label>
        </div>
      </div>

      <div ref={resultsRef} className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        {searching ? (
          <div aria-live="polite">
            <p className="mb-6 text-sm text-muted-foreground">
              {results.length
                ? `${results.reduce((n, c) => n + c.items.length, 0)} dishes match “${query.trim()}”`
                : `No dishes match “${query.trim()}”. Try another word.`}
            </p>
            <div className="columns-1 gap-6 lg:columns-2">
              {results.map((c) => (
                <CategoryCard key={c.id} cat={c} />
              ))}
            </div>
          </div>
        ) : (
          <div key={group.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Group banner */}
            <div className="mb-8 grid overflow-hidden rounded-[2rem] bg-navy shadow-lift md:grid-cols-[1.1fr_1fr]">
              <div className="relative h-52 md:h-auto">
                <img
                  src={group.image}
                  alt={group.imageAlt}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="p-7 sm:p-10">
                <p className="eyebrow text-gold">
                  {group.categories.length} categories · {dishCount} dishes
                </p>
                <h3 className="mt-3 text-4xl font-medium text-on-dark">{group.label}</h3>
                <p className="mt-6 text-sm font-semibold text-on-dark-muted">Jump to</p>
                <div className="no-scrollbar -mx-7 mt-3 flex gap-2 overflow-x-auto px-7 sm:mx-0 sm:flex-wrap sm:px-0">
                  {group.categories.map((c) => (
                    <a
                      key={c.id}
                      href={`#${domId(c.id)}`}
                      className="shrink-0 rounded-full border border-on-dark/20 px-3.5 py-1.5 text-sm capitalize text-on-dark transition-colors hover:border-teal hover:bg-teal hover:text-navy-deep"
                    >
                      {c.name.toLowerCase()}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="columns-1 gap-6 lg:columns-2">
              {group.categories.map((c) => (
                <CategoryCard key={c.id} cat={c} />
              ))}
            </div>
          </div>
        )}

        <Reveal className="mt-10 flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-royal px-7 py-10 text-center sm:px-12 md:flex-row md:text-left">
          <div>
            <h3 className="text-3xl font-medium text-on-dark">Hungry already?</h3>
            <p className="mt-2 text-on-dark-muted">
              Order online for parcel or dine-in. Prices shown are as listed on our ordering page.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="teal" size="xl">
              <a href={restaurant.orderUrl} target="_blank" rel="noopener noreferrer">
                Order Parcel <ArrowUpRight />
              </a>
            </Button>
            <Button asChild variant="ghostLight" size="xl">
              <a href={restaurant.dineInOrderUrl} target="_blank" rel="noopener noreferrer">
                Dine-in Order
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
