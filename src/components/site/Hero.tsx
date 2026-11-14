import { ArrowRight, Clock, MapPin } from "lucide-react";

import heroImg from "@/assets/hero-momos.jpg";
import { Button } from "@/components/ui/button";
import { menuStats } from "@/data/menu";
import { restaurant } from "@/data/restaurant";

export function Hero() {
  const h = restaurant.hours[0];
  return (
    <section id="home" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy-deep lg:items-center">
      <img
        src={heroImg}
        alt="Steamed momos in bamboo baskets with red chilli chutney"
        width={1920}
        height={1088}
        fetchPriority="high"
        className="animate-hero-zoom absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
      />
      <div className="bg-hero-overlay absolute inset-0 -z-10" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-8 lg:pb-16">
        <div className="max-w-2xl">
          <p className="eyebrow reveal is-visible flex items-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold" /> Momomia · {restaurant.location}
          </p>
          <h1 className="mt-6 text-5xl font-medium leading-[1.02] text-on-dark sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Love in
            <br />
            <em className="font-normal italic text-teal">every</em> bite.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-on-dark-muted">
            Momos in every style, Chinese favourites and regional Indian cuisine — vegetarian and
            non-vegetarian, all on one menu.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="teal" size="xl">
              <a href="#menu">
                Explore Menu <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="ghostLight" size="xl">
              <a href={restaurant.orderUrl} target="_blank" rel="noopener noreferrer">
                Order Now
              </a>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-on-dark/15 pt-6 text-on-dark">
            <div>
              <dt className="eyebrow text-[0.62rem] text-on-dark-muted">Dishes</dt>
              <dd className="mt-1 font-display text-2xl">{menuStats.items}+</dd>
            </div>
            <div>
              <dt className="eyebrow text-[0.62rem] text-on-dark-muted">Categories</dt>
              <dd className="mt-1 font-display text-2xl">{menuStats.categories}</dd>
            </div>
            <div>
              <dt className="eyebrow flex items-center gap-1 text-[0.62rem] text-on-dark-muted">
                <Clock className="size-3" /> Open daily
              </dt>
              <dd className="mt-1 font-display text-lg leading-tight sm:text-xl">
                {h.open.replace(":00", "")} – {h.close.replace(":00", "")}
              </dd>
            </div>
          </dl>
          <p className="mt-5 flex items-center gap-2 text-sm text-on-dark-muted">
            <MapPin className="size-4 text-gold" /> {restaurant.addressLines[0]}
          </p>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-on-dark-muted transition-colors hover:text-on-dark sm:flex"
      >
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <span className="flex h-10 w-6 justify-center rounded-full border border-on-dark/40 pt-2">
          <span className="animate-scroll-cue h-2 w-1 rounded-full bg-teal" />
        </span>
      </a>
    </section>
  );
}
