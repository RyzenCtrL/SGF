import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { SectionKicker } from "@/components/ui/section-kicker";
import { faqItems } from "@/lib/faq-data";

export function Faq() {
  return (
    <section className="py-section-mobile md:py-section-inner lg:py-section-desktop">
      <div className="mx-auto max-w-container px-5 md:px-8 lg:px-10">
        <Reveal className="flex flex-col gap-4">
          <SectionKicker>FAQ</SectionKicker>
          <h2 className="max-w-prose text-h2 font-heading text-text-primary">
            Отвечаем на частые вопросы
          </h2>
        </Reveal>

        <div className="mt-10 max-w-[800px]">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
