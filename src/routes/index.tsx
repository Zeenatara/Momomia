import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/site/About";
import { BackToTop } from "@/components/site/BackToTop";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Menu } from "@/components/site/Menu";

const title = "Momomia Dhanbad — Momos, Chinese & Indian Food | Love In Every Bite";
const description =
  "Steamed, kurkure, tandoori and jhol momos, Chinese and regional Indian dishes at Momomia Dhanbad. See the full menu with prices, opening hours and directions, or order online.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-teal focus:px-4 focus:py-2 focus:text-navy-deep"
      >
        Skip to menu
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
