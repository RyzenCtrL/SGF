import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/lib/site-config";
import { SectionKicker } from "@/components/ui/section-kicker";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь со Street Gym Factory: телефон, почта, адрес завода и форма заявки на расчёт проекта уличной спортивной площадки.",
};

const contactItems = [
  { icon: Phone, label: "Телефон", value: siteConfig.phone, href: siteConfig.phoneHref },
  { icon: Mail, label: "Почта", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MapPin, label: "Завод и офис", value: siteConfig.address },
  { icon: Clock, label: "Режим работы", value: "Пн–Пт, 9:00–18:00 (МСК)" },
];

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-container px-5 py-section-mobile md:px-8 lg:px-10 lg:py-section-inner">
      <div className="flex flex-col gap-4">
        <SectionKicker>Контакты</SectionKicker>
        <h1 className="max-w-prose text-h1 font-heading text-text-primary">
          Свяжитесь с нами
        </h1>
      </div>

      <div id="form" className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          {contactItems.map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control border border-stroke-subtle text-text-secondary">
                <item.icon size={18} />
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-caption uppercase tracking-wide text-text-tertiary">
                  {item.label}
                </span>
                {item.href ? (
                  <a href={item.href} className="text-body text-text-primary hover:text-accent-lime">
                    {item.value}
                  </a>
                ) : (
                  <span className="text-body text-text-primary">{item.value}</span>
                )}
              </div>
            </div>
          ))}

          {/* TODO: подключить карту (Яндекс.Карты/Google Maps) с адресом завода */}
          <div className="flex aspect-[4/3] items-center justify-center rounded-card border border-stroke-subtle bg-bg-secondary text-sm text-text-tertiary sm:aspect-video">
            Карта проезда
          </div>
        </div>

        <div className="rounded-card border border-stroke-subtle bg-bg-card p-6 md:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
