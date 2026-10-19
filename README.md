# DrinkS · bar en casa

Frontend of the DrinkS shop (the capital S is for Shop). Three pages with one design (flat colour,
cream lettering, a splash of petals, in the colours of the logo) in three palettes: **Inicio** (blue:
a pinned cover where a big glass tips and pours into the next section, tilted colour bands with drawn
cocktails, the glass that fills as you scroll, the recipe notepad and stamp album, a closing night
screen), **Productos** (orange: category tabs, a shop grid, the cart) and **Contacto** (green: the
ways to reach us and a form). React 19 + TypeScript + Vite + SCSS. All data is mock data for now.
All copy is Argentine Spanish.

```bash
npm install
npm run dev       # http://localhost:5173
npm run verify    # lint + 250-line check + typecheck + build
npm run preview   # serves the build with the security headers
```

## Where things live

| Folder | What goes there |
| --- | --- |
| `src/components/ui` | The only place raw `<button>` / `<input>` exist: `Button`, `ButtonLink`, `CheckItem`, `SearchInput`, `TextField`, `Tabs`, `Pager`, `Icon`, `Sprite`, `PetalBurst`, `Logo`, `Section`, `AsyncContent`. ESLint blocks raw tags everywhere else. |
| `src/components/layout` | Navbar, side rail, footer, scroll reset. |
| `src/app/routes.ts` | Every page path, the navbar links and the palette of each page (`THEMES`). |
| `src/pages` | One thin file per page, composing features. |
| `src/features/<section>` | One folder per feature (home, recipes, shop, bag, contact). |
| `src/hooks` | Shared hooks: one scroll loop for the whole app, hide-on-scroll, route palette, scroll variables, async loading. |
| `src/lib` | Plain functions: math, scroll progress, text helpers, safe storage, CSS variables. |
| `src/data` | Mock catalogue, recipes, drawn scenes and **all the copy** (`content.ts`). |
| `src/services/catalogService.ts` | The only door to data. Replace its bodies with `fetch` calls when the API exists. |
| `src/styles` | **All styles, global.** `main.scss` imports tokens, base, components and sections. Components only use class names; per-item values (index, colour) are passed as CSS variables through `cssVars()`. |
| `public/sprites.svg` | Glass, bottle and ice/mint/lemon illustrations, loaded once and reused with `<use>`. |
| `public/brand` | The logo (`logo.webp`), made from `logo.png`. |
| `design/prototype` | The original static prototype (the spilling glass comes from here). |

## Palettes

Every page wears the same design in its own colours. The tokens are in `src/styles/base/_tokens.scss`
(`--burnt`, `--burnt-deep`, `--petal-*`, `--pop`): orange is the default, and
`:root[data-theme="blue"]` / `"green"` override them. `useRouteTheme` sets `data-theme` from `THEMES`
in `src/app/routes.ts`.

## Type

Four fonts, one job each (tokens in `src/styles/base/_tokens.scss`, files in `src/styles/fonts.ts`):
Caprasimo for titles, Bebas Neue for names and labels (`m.print`), Pacifico for small handwritten
accents (`m.script`), DM Sans for running text.

## Size

The whole interface scales from one token, `--ui-scale` in `src/styles/base/_tokens.scss`
(now `0.9`). Every length is in `rem`, and viewport units go through `m.vw()` / `m.vmin()`.

## Rules the tooling enforces

- No file over 250 lines (`npm run check:size`).
- No raw `<button>`/`<input>` outside `components/ui`, no `dangerouslySetInnerHTML`, no `../` imports (use `@/`).
- Strict CSP in `vite.config.ts` (no inline scripts, no third-party origins; fonts are self-hosted).
  Copy those headers to the real host when deploying.
- The site uses real URLs (`/productos`, `/contacto`): the host must serve `index.html` for unknown paths.

## Still mock / still open

- Product photos are free stock, self-hosted in `public/media/photos` (paths in `src/data/media.ts`,
  credits in `CREDITOS.txt`, CC0 / public domain via Openverse). They show the drink each product
  makes, not the bottle: replace them with real product shots. Prices are placeholders.
- The cart (quantities, totals, free-delivery bar) works and is kept in `sessionStorage`; checkout
  itself is not built yet, and the delivery rule in `src/data/delivery.ts` is a placeholder.
- The contact form validates and "sends" through a mock (`src/services/contactService.ts`); the
  WhatsApp, email and hours on the contact page are placeholders.
