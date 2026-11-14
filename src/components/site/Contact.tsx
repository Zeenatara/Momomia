import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { directionsUrl, mapEmbedUrl, restaurant, typicalHours } from "@/data/restaurant";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  const allSame = restaurant.hours.every(
    (h) => h.open === typicalHours.open && h.close === typicalHours.close,
  );
  return (
    <section id="contact" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Visit us"
          title={
            <>
              Come hungry, <em className="font-normal italic text-royal">leave happy.</em>
            </>
          }
          intro="Find us, call us or message us on WhatsApp — we're open every day."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          <Reveal className="flex flex-col gap-6">
            <div className="rounded-3xl bg-navy p-7 text-on-dark shadow-lift sm:p-9">
              <div className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-teal" />
                <div>
                  <p className="eyebrow text-[0.62rem] text-gold">Address</p>
                  <address className="mt-2 not-italic leading-relaxed">
                    {restaurant.addressLines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                </div>
              </div>
              <div className="mt-7 grid gap-5 border-t border-on-dark/10 pt-7">
                <a href={restaurant.phoneHref} className="group flex gap-4">
                  <Phone className="mt-1 size-5 shrink-0 text-teal" />
                  <span>
                    <span className="eyebrow block text-[0.62rem] text-gold">Phone</span>
                    <span className="mt-1 block font-semibold group-hover:text-teal">{restaurant.phoneDisplay}</span>
                  </span>
                </a>
                <a href={`mailto:${restaurant.email}`} className="group flex min-w-0 gap-4">
                  <Mail className="mt-1 size-5 shrink-0 text-teal" />
                  <span className="min-w-0">
                    <span className="eyebrow block text-[0.62rem] text-gold">Email</span>
                    <span className="mt-1 block break-all font-semibold group-hover:text-teal">{restaurant.email}</span>
                  </span>
                </a>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="teal" size="xl" className="flex-1">
                  <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation /> Get Directions
                  </a>
                </Button>
                <Button asChild variant="ghostLight" size="xl" className="flex-1">
                  <a href={restaurant.whatsappHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-3xl bg-card p-7 shadow-card sm:p-9">
              <div className="flex items-center gap-3">
                <Clock className="size-5 text-royal" />
                <h3 className="font-sans text-base font-bold tracking-normal text-navy">Opening hours</h3>
              </div>
              {allSame && (
                <p className="mt-3 font-display text-2xl text-navy">
                  Open daily · {typicalHours.open} – {typicalHours.close}
                </p>
              )}
              <ul className="mt-5 grid grid-cols-1 text-sm">
                {restaurant.hours.map((h) => (
                  <li key={h.day} className="flex justify-between border-b border-border py-2.5">
                    <span className="font-semibold text-navy">{h.day}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {h.open} – {h.close}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120} className="min-h-[420px] overflow-hidden rounded-3xl bg-muted shadow-card">
            <iframe
              title="Map showing Momomia Dhanbad"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full min-h-[420px] w-full border-0"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
