import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href="#home"
      aria-label="Back to top"
      className={cn(
        "fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full bg-teal text-navy-deep shadow-teal transition-all duration-300 hover:-translate-y-1 hover:bg-teal-soft",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp className="size-5" />
    </a>
  );
}
