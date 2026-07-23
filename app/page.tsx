import { Hero } from "@/components/sections/hero";
import { TrustMarquee } from "@/components/sections/trust-marquee";
import { CatalogShowcase } from "@/components/sections/catalog-showcase";
import { WhyUs } from "@/components/sections/why-us";
import { HowWeWork } from "@/components/sections/how-we-work";
import { ProjectsShowcase } from "@/components/sections/projects-showcase";
import { ProductionHighlight } from "@/components/sections/production-highlight";
import { Testimonials } from "@/components/sections/testimonials";
import { Documents } from "@/components/sections/documents";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <CatalogShowcase />
      <WhyUs />
      <HowWeWork />
      <ProjectsShowcase />
      <ProductionHighlight />
      <Testimonials />
      <Documents />
      <Faq />
      <FinalCta />
    </>
  );
}
