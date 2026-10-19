import { Icon } from "@/components/ui/Icon";
import { CONTACT } from "@/data/contactContent";

/** The ways to reach us, as cards: an icon disc, what it is, and the detail (a link when it has one). */
export function Channels() {
  return (
    <ul className="channels">
      {CONTACT.channels.map((c) => {
        const body = (
          <>
            <span className="channels__icon">
              <Icon name={c.icon} />
            </span>
            <span className="channels__text">
              <span className="channels__label">{c.label}</span>
              <span className="channels__value">{c.value}</span>
            </span>
          </>
        );
        return (
          <li key={c.label}>
            {"href" in c && c.href ? (
              <a className="channels__card" href={c.href} target="_blank" rel="noopener noreferrer">
                {body}
              </a>
            ) : (
              <div className="channels__card">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
