import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      <p
        className={cn(
          "eyebrow flex items-center gap-3",
          align === "center" && "justify-center",
          tone === "dark" ? "text-royal" : "text-gold",
        )}
      >
        <span className="h-px w-8 bg-gold" />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 text-4xl font-medium leading-[1.08] sm:text-5xl",
          tone === "dark" ? "text-navy" : "text-on-dark",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            tone === "dark" ? "text-muted-foreground" : "text-on-dark-muted",
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
