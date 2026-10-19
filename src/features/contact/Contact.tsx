import { Heading, Section } from "@/components/ui/Section";
import { PetalBurst } from "@/components/ui/PetalBurst";
import { Channels } from "@/features/contact/Channels";
import { LetterForm } from "@/features/contact/LetterForm";
import { useContactForm } from "@/features/contact/useContactForm";
import { CONTACT } from "@/data/contactContent";

// Contacto: the burnt orange header of the logo with its petals, then the ways to reach us
// and the form.
export function Contact() {
  const form = useContactForm();

  return (
    <Section id="contacto" className="contact" padded={false}>
      <header className="contact__hero">
        <PetalBurst className="contact__burst contact__burst--big" />
        <PetalBurst className="contact__burst contact__burst--small" />
        <div className="wrap contact__title">
          <Heading>{CONTACT.title}</Heading>
        </div>
      </header>
      <div className="contact__body">
        <div className="wrap contact__grid">
          <Channels />
          <LetterForm form={form} />
        </div>
      </div>
    </Section>
  );
}
