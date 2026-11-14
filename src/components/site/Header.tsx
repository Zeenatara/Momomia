import { useEffect, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { restaurant } from "@/data/restaurant";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "menu", label: "Menu" },
  { id: "contact", label: "Contact" },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const ids = navItems.map((n) => n.id);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open ? "bg-navy/95 shadow-lift backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" aria-label="Momomia Dhanbad — back to top" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navItems.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? "true" : undefined}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                active === n.id ? "text-on-dark" : "text-on-dark-muted hover:text-on-dark",
              )}
            >
              {n.label}
              <span
                className={cn(
                  "absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-teal transition-transform duration-300",
                  active === n.id ? "scale-x-100" : "scale-x-0",
                )}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="teal" className="hidden h-10 px-5 sm:inline-flex">
            <a href={restaurant.orderUrl} target="_blank" rel="noopener noreferrer">
              Order Now
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full text-on-dark transition-colors hover:bg-on-dark/10 md:hidden"
          >
            {open ? <X className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        className={cn(
          "grid overflow-hidden transition-all duration-500 ease-out md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="min-h-0">
          <ul className="flex h-[calc(100dvh-4.5rem)] flex-col gap-1 px-5 pb-8 pt-4">
            {navItems.map((n, i) => (
              <li
                key={n.id}
                className={cn(
                  "transition-all duration-500",
                  open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0",
                )}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
              >
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between border-b border-on-dark/10 py-5 font-display text-3xl",
                    active === n.id ? "text-teal" : "text-on-dark",
                  )}
                >
                  {n.label}
                  <span className="eyebrow text-on-dark-muted">0{i + 1}</span>
                </a>
              </li>
            ))}
            <li className="mt-auto">
              <Button asChild variant="teal" size="xl" className="w-full">
                <a href={restaurant.orderUrl} target="_blank" rel="noopener noreferrer">
                  Order Now
                </a>
              </Button>
              <a
                href={restaurant.phoneHref}
                className="mt-4 block text-center text-sm font-semibold text-on-dark-muted"
              >
                Call {restaurant.phoneDisplay}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
