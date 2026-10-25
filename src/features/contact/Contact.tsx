import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { ContactLabel } from "@/features/contact/ContactLabel";
import { LetterForm } from "@/features/contact/LetterForm";
import { useContactForm } from "@/features/contact/useContactForm";
import { Garnish, type GarnishItem } from "@/features/home/Garnish";
import { useScrollVars } from "@/hooks/useScrollVars";
import { CONTACT } from "@/data/contactContent";
import { DECOS } from "@/data/media";

// Your ice cubes, around the label.
const GARNISH: readonly GarnishItem[] = [
  { deco: DECOS.ice1, x: 6, y: 20, size: 8, turn: 40, rise: 10 },
  { deco: DECOS.ice2, x: 94, y: 80, size: 7, turn: -50, rise: -10 },
];

// Contacto: one printed label on awning stripes. Its button opens the letter (the form) in a panel from the right.
export function Contact() {
  const section = useRef<HTMLElement>(null);
  useScrollVars(section);
  const form = useContactForm();
  const [writing, setWriting] = useState(false);
  const close = () => setWriting(false);

  return (
    <Section ref={section} id="contacto" className="contact" padded={false}>
      <Garnish items={GARNISH} />
      <ContactLabel onWrite={() => setWriting(true)} />
      <Drawer open={writing} onClose={close} label={CONTACT.formTitle}>
        <header className="drawer__head">
          <h2 className="drawer__title">{CONTACT.formTitle}</h2>
          <Button variant="icon" aria-label={CONTACT.close} onClick={close}>
            <Icon name="close" />
          </Button>
        </header>
        <div className="contact-drawer__body">
          <LetterForm form={form} />
        </div>
      </Drawer>
    </Section>
  );
}
