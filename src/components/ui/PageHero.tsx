interface PageHeroProps {
  /** Small spaced capitals above the title. */
  kicker: string;
  title: string;
  /** The cursive line under the title. */
  script: string;
}

/** The header of a quiet page, in the lettering of the cover: the title in wide capitals and a cursive line under it, on yellow stripes. */
export function PageHero({ kicker, title, script }: PageHeroProps) {
  return (
    <header className="page-hero">
      <div className="wrap page-hero__content">
        <p className="page-hero__kicker">{kicker}</p>
        <h1 className="page-hero__title">
          {title}
          <span className="page-hero__script">{script}</span>
        </h1>
      </div>
    </header>
  );
}
