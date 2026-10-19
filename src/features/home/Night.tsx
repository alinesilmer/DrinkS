import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { PetalBurst } from "@/components/ui/PetalBurst";
import { Section } from "@/components/ui/Section";
import { ROUTES } from "@/app/routes";
import { NIGHT } from "@/data/homeContent";
import { useScrollFrame } from "@/hooks/useScrollFrame";
import { span } from "@/lib/math";
import { passProgress } from "@/lib/scroll";

/** The last call: the flat design once more, a moon rising between two splashes of petals. */
export function Night() {
  const section = useRef<HTMLElement>(null);
  const moon = useRef<HTMLDivElement>(null);

  useScrollFrame(() => {
    if (!section.current || !moon.current) return;
    moon.current.style.transform = `translateY(${(1 - span(passProgress(section.current), 0.35, 0.8)) * 30}vh)`;
  });

  return (
    <Section ref={section} id="noche" className="night" padded={false}>
      <PetalBurst className="night__burst night__burst--left" />
      <PetalBurst className="night__burst night__burst--right" />
      <div ref={moon} className="night__moon" aria-hidden="true" />
      <div className="night__content">
        <h2 className="night__line">{NIGHT.line}</h2>
        <ButtonLink variant="primary" href={ROUTES.products}>
          {NIGHT.cta}
        </ButtonLink>
      </div>
    </Section>
  );
}
