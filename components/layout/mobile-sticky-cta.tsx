import { Phone, MessageCircle, Calculator } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 px-4 pb-4 lg:hidden">
      <div className="flex items-center gap-2 rounded-full border border-stroke-subtle bg-bg-secondary/80 p-2 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.65)] backdrop-blur-xl">
        <a
          href={siteConfig.phoneHref}
          aria-label="Позвонить"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stroke-subtle text-text-secondary transition-colors duration-200 active:border-text-primary active:text-text-primary"
        >
          <Phone size={18} />
        </a>
        <a
          href={siteConfig.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stroke-subtle text-text-secondary transition-colors duration-200 active:border-text-primary active:text-text-primary"
        >
          <MessageCircle size={18} />
        </a>
        <a
          href="/contacts#form"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent-lime text-sm font-medium text-accent-on-lime transition-transform duration-200 active:scale-[0.97]"
        >
          <Calculator size={16} />
          Расчёт
        </a>
      </div>
    </div>
  );
}
