import { ArrowUpRight, Flame, Leaf, ShoppingBag } from "lucide-react";

import aboutImg from "@/assets/about-momos.jpg";
import tandooriImg from "@/assets/tandoori-momo.jpg";
import { categoryImages, categoryStartingPrice, domId, formatPrice, groupedMenu } from "@/data/menu";
import { restaurant } from "@/data/restaurant";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const specialtyIds = ["steam-momo", "kurkure-momo", "tandoori-momos", "jhol-momo"];

export function About() {
  const groups = groupedMenu();
  const momoGroup = groups.find((g) => g.id === "momos");
  const allCats = groups.flatMap((g) => g.categories);
  const specialties = specialtyIds
    .map((id) => allCats.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const highlights = [
    {
      icon: Flame,
      title: `${momoGroup?.categories.length ?? 0} ways to eat a momo`,
      text: "Steamed, fried, kurkure, pan fried, tandoori, Afghani malai, jhol and more.",
    },
    {
      icon: Leaf,
      title: "Veg & non-veg, every day",
      text: "Vegetarian and non-vegetarian Chinese and Punjabi dishes on the menu all the time.",
    },
    {
      icon: ShoppingBag,
      title: "Dine in or take away",
      text: "Order online for dine-in or parcel through our ordering page.",
    },
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <img
              src={aboutImg}
              alt="Lifting a steamed momo with chopsticks from a bamboo basket"
              width={1024}
              height={1280}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 w-[46%] overflow-hidden rounded-3xl border-[6px] border-background shadow-lift sm:-right-8">
            <img
              src={tandooriImg}
              alt="Tandoori momos on a sizzler plate"
              width={1024}
              height={768}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="absolute -left-3 top-8 rounded-2xl bg-navy px-5 py-4 text-on-dark shadow-lift sm:-left-6">
            <p className="font-display text-3xl italic text-gold">Momomia</p>
            <p className="eyebrow mt-1 text-[0.6rem] text-on-dark-muted">{restaurant.tagline}</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Our story"
            title={
              <>
                Chinese & regional Indian,{" "}
                <em className="font-normal italic text-royal">made with love.</em>
              </>
            }
          />
          <Reveal delay={100}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{restaurant.about}</p>
          </Reveal>

          <ul className="mt-10 grid gap-6">
            {highlights.map((h, i) => (
              <Reveal as="li" key={h.title} delay={150 + i * 80} className="flex gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-navy text-teal">
                  <h.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-sans text-base font-bold tracking-normal text-navy">{h.title}</h3>
                  <p className="mt-1 text-muted-foreground">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-28 max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-royal">House specialties</p>
            <h3 className="mt-3 text-3xl font-medium text-navy sm:text-4xl">Start with these</h3>
          </div>
          <a href="#menu" className="group inline-flex items-center gap-1.5 text-sm font-bold text-royal">
            See the full menu
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((c, i) => {
            const img = categoryImages[c.id];
            const from = categoryStartingPrice(c);
            return (
              <Reveal key={c.id} delay={i * 90}>
                <a
                  href={`#${domId(c.id)}`}
                  className="group relative block overflow-hidden rounded-3xl bg-navy shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
                >
                  {img && (
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="bg-image-fade absolute inset-0" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="eyebrow text-[0.62rem] text-gold">{c.items.length} options</p>
                    <h4 className="mt-1.5 text-2xl text-on-dark">{c.name}</h4>
                    {from && (
                      <p className="mt-1 text-sm text-on-dark-muted">From {formatPrice(from)}</p>
                    )}
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
