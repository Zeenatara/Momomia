import { restaurant, typicalHours } from "@/data/restaurant";
import { navItems } from "./Header";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-deep text-on-dark">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-dark-muted">
            {restaurant.legalName}. Momos, Chinese and regional Indian cuisine in {restaurant.location}.
          </p>
        </div>

        <div>
          <h2 className="eyebrow font-sans text-[0.65rem] tracking-[0.22em] text-gold">Explore</h2>
          <ul className="mt-5 grid gap-3 text-sm">
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="text-on-dark-muted transition-colors hover:text-teal">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={restaurant.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-dark-muted transition-colors hover:text-teal"
              >
                Order online
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow font-sans text-[0.65rem] tracking-[0.22em] text-gold">Contact</h2>
          <ul className="mt-5 grid gap-3 text-sm text-on-dark-muted">
            <li>
              <a href={restaurant.phoneHref} className="hover:text-teal">{restaurant.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${restaurant.email}`} className="break-all hover:text-teal">{restaurant.email}</a>
            </li>
            <li>
              <address className="not-italic leading-relaxed">{restaurant.addressLines.join(", ")}</address>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow font-sans text-[0.65rem] tracking-[0.22em] text-gold">Connect</h2>
          <ul className="mt-5 grid gap-3 text-sm">
            <li>
              <a
                href={restaurant.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-dark-muted hover:text-teal"
              >
                WhatsApp
              </a>
            </li>
            {restaurant.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-on-dark-muted hover:text-teal">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-on-dark/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-on-dark-muted sm:flex-row sm:justify-between sm:px-8 sm:pr-24">
          <p>© {year} Momomia Dhanbad. All rights reserved.</p>
          <p>Open daily {typicalHours.open} – {typicalHours.close}</p>
        </div>
      </div>
    </footer>
  );
}
