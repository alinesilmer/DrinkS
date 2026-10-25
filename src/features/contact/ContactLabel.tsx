import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ROCKS } from "@/features/home/glassShapes";
import { PhotoGlass } from "@/features/home/PhotoGlass";
import { CONTACT } from "@/data/contactContent";

// The drink in the little glass of the label: a level surface with a soft wave, in the pixels of its photo.
const DRINK = "M0 540Q145 505 290 540T580 540T870 540T1160 540V1100H0Z";

/**
 * Contacto, as a printed label: the title and the logo, a hairline, the ways to reach us in serif, a small glass with
 * its note written by hand, and two facts and the button at the foot. The button opens the letter (the form).
 */
export function ContactLabel({ onWrite }: { onWrite: () => void }) {
  return (
    <article className="contact-label">
      <header className="contact-label__top">
        <h1 className="contact-label__title">{CONTACT.title}</h1>
        <Logo tone="dark" />
      </header>
      <div className="contact-label__rule" />
      <div className="contact-label__cols">
        <ul className="contact-label__list">
          {CONTACT.channels.map((c) => (
            <li key={c.label}>
              <span className="contact-label__name">{c.label}</span>
              {"href" in c && c.href ? (
                <a className="contact-label__value" href={c.href} target="_blank" rel="noopener noreferrer">
                  {c.value}
                </a>
              ) : (
                <span className="contact-label__value">{c.value}</span>
              )}
            </li>
          ))}
        </ul>
        <PhotoGlass shape={ROCKS} className="contact-label__glass">
          <path className="contact-label__drink" d={DRINK} />
        </PhotoGlass>
        <p className="contact-label__note" aria-label={CONTACT.note.join(" ")}>
          {CONTACT.note.map((word) => (
            <span key={word} aria-hidden="true">
              {word}
            </span>
          ))}
        </p>
      </div>
      <footer className="contact-label__foot">
        <dl className="contact-label__facts">
          {CONTACT.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <Button variant="primary" onClick={onWrite} aria-haspopup="dialog">
          {CONTACT.cta}
        </Button>
      </footer>
    </article>
  );
}
