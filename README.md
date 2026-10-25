# DrinkS · bar en casa

Frontend of the DrinkS shop (the capital S is for Shop). React 19 + TypeScript + Vite + SCSS. All data is mock
data for now, and all copy is Argentine Spanish.

One design, the awning ("toldo"): cobalt, lime and cream stripes, wide Unbounded capitals, Pinyon cursive and
Cormorant serif, and printed labels and prints. Four pages:

- **Inicio** `/`: a pinned cover where a big glass tips and pours, the *Elegí · Mezclá · Brindá* scroll with its
  glasses, and *El verano, servido* (a hurricane glass that fills as you scroll, beside a cream card).
- **Productos** `/productos`: a yellow striped header, a light grey plaster wall with the products hung as taped
  prints (five to a row), category tabs, search and the cart.
- **Recetas** `/recetas`: the *Tengo en casa* label (what you have at home), the stamp album and each recipe.
- **Contacto** `/contacto`: one printed label on pink and red stripes; its button opens the letter (the form).

```bash
npm install
npm run dev       # http://localhost:5173
npm run verify    # lint + 250-line check + typecheck + build
npm run preview   # serves the build with the security headers
```

## Where things live

| Folder | What goes there |
| --- | --- |
| `src/components/ui` | The only place raw `<button>` / `<input>` exist: `Button`, `ButtonLink`, `CheckItem`, `SearchInput`, `TextField`, `Tabs`, `Pager`, `Icon`, `Sprite`, `Logo`, `PageHero`, `Section`, `Drawer`, `AsyncContent`. ESLint blocks raw tags everywhere else. |
| `src/components/layout` | Navbar, the menu panel for small screens, footer, scroll reset. |
| `src/app/routes.ts` | Every page path, the navbar links and the palette of each page (`THEMES`). |
| `src/pages` | One thin file per page, composing features. |
| `src/features/<section>` | One folder per feature (home, recipes, shop, bag, contact). |
| `src/hooks` | Shared hooks: one scroll loop for the whole app, route palette, scroll variables, async loading. |
| `src/lib` | Plain functions: math, scroll progress, text helpers, safe storage, CSS variables. |
| `src/data` | Mock catalogue, recipes and **all the copy** (`content.ts`, `shopContent.ts`, ...). |
| `src/services` | The only door to data. Replace the bodies with `fetch` calls when the API exists. |
| `src/styles` | **All styles, global.** `main.scss` imports tokens, base, components and sections. Components only use class names; per-item values are passed as CSS variables through `cssVars()`. |
| `public/media` | The photos of the glasses and decorations (`*.webp`, transparent) and the product photos (`photos/`, credits in `CREDITOS.txt`). Paths live in `src/data/media.ts`. |
| `public/brand` | The wordmark, white (`logo-light.webp`, for dark bars) and black (`logo-dark.webp`, for paper), made from the logo. `public/favicon.png` and `apple-touch-icon.png` are the logo too. |
| `public/sprites.svg` | Small illustrations, loaded once and reused with `<use>`. |
| `design/source-art` | The original PNGs the `public/media` WebPs were made from, and the logo. Not shipped. |
| `design/references` | Reference images used while designing. Not shipped. |

## Palettes

Every page wears the same design in its own colours. The tokens are in `src/styles/base/_tokens.scss`
(`--burnt`, `--burnt-deep`, `--petal-*`, `--pop`): orange is the default, and
`:root[data-theme="blue"]` / `"green"` override them. `useRouteTheme` sets `data-theme` from `THEMES`
in `src/app/routes.ts`. The footer wave takes the colour of the page above it (`--footer-from`).

## One button, one panel

`.btn--primary` (`components/_button.scss`) is the only call to action: dark glass with a white edge and white
capitals. Sections only set its size. The side panels (cart, menu, letter) share `.drawer__head` and the cream
`--ticket` paper (`components/_drawer.scss`).

## Type

Unbounded (wide capitals) · Pinyon Script (cursive) · Cormorant Garamond (serif) · DM Sans (running text). The
recipe sheet still uses Caprasimo, Bebas Neue and Pacifico. Tokens in `src/styles/base/_tokens.scss`, files in
`src/styles/fonts.ts`; fonts are self-hosted.

## Size and phones

The whole interface scales from one number, `$ui-scale` in `src/styles/abstracts/_mixins.scss` (`0.72`). It feeds
the `--ui-scale` token; every length is in `rem`, viewport units go through `m.vw()` / `m.vmin()`, and the
breakpoints (`m.tablet`, `m.phone`, `m.laptop`) are converted with `m.bp()`. On tablets and phones the scale goes
back to `0.9`, the navbar links move into the menu panel and the product grid has two columns.

## Rules the tooling enforces

- No file over 250 lines (`npm run check:size`).
- No raw `<button>`/`<input>` outside `components/ui`, no `dangerouslySetInnerHTML`, no `../` imports (use `@/`).
- Strict CSP in `vite.config.ts` (no inline scripts, no third-party origins; fonts are self-hosted).
  Copy those headers to the real host when deploying.
- The site uses real URLs (`/productos`, `/contacto`): the host must serve `index.html` for unknown paths.

## Still mock / still open

- Product photos are free stock (CC0 / public domain, and `p-fernet.webp` under CC BY-SA 4.0, credited in
  `CREDITOS.txt`). Replace them with real product shots. Prices are placeholders.
- The cart (quantities, totals, free-delivery bar) works and is kept in `sessionStorage`; checkout itself is not
  built yet, and the delivery rule in `src/data/delivery.ts` is a placeholder.
- The contact form validates and "sends" through a mock (`src/services/contactService.ts`); the WhatsApp, email
  and hours on the contact page are placeholders.
