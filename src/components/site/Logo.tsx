import { cn } from "@/lib/utils";

/** Wordmark logo. The existing site has no logo file; replace this with the official logo when available. */
export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 40 40" aria-hidden="true" className="size-9 shrink-0">
        <circle cx="20" cy="20" r="19" className="fill-teal" />
        <path
          d="M9 25c0-6.2 5-11.5 11-11.5S31 18.8 31 25c0 .9-.7 1.5-1.5 1.5h-19C9.7 26.5 9 25.9 9 25Z"
          className="fill-navy-deep"
        />
        <path
          d="M14 21.5c1.5-1.6 2.6-3.4 3.2-5.6M20 21c0-2 0-4 0-6.3M26 21.5c-1.5-1.6-2.6-3.4-3.2-5.6"
          className="stroke-gold"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.45rem] font-semibold tracking-tight",
            tone === "light" ? "text-on-dark" : "text-navy",
          )}
        >
          Momomia
        </span>
        <span className="eyebrow mt-1 text-[0.58rem] text-gold">Dhanbad</span>
      </span>
    </span>
  );
}
