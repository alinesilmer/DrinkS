// Contenido y comportamiento compartidos: tienda, recetario y cifras de "lo más frío".
// Catálogo de muestra: sustituir PRODUCTS / GROUPS / RECIPES por los reales.
(() => {
  const { $, $$, clamp, ease, onScroll, reduced } = Pour;

  // nombre, categoría, tamaño, precio, foto (img/<foto>.jpg, créditos en img/CREDITOS.txt)
  const PRODUCTS = [
    ['Ron blanco', 'Destilados', '750 ml', 24, 'ron'],
    ['Tequila blanco', 'Destilados', '750 ml', 32, 'tequila'],
    ['Ginebra', 'Destilados', '700 ml', 28, 'ginebra'],
    ['Vodka', 'Destilados', '750 ml', 22, 'vodka'],
    ['Aperitivo amargo', 'Licores y vinos', '700 ml', 19, 'aperitivo'],
    ['Triple sec', 'Licores y vinos', '700 ml', 16, 'triple'],
    ['Blue curaçao', 'Licores y vinos', '500 ml', 15, 'curacao'],
    ['Prosecco', 'Licores y vinos', '750 ml', 14, 'prosecco'],
    ['Agua tónica', 'Refrescos', '4 × 200 ml', 6, 'tonica'],
    ['Ginger beer', 'Refrescos', '750 ml', 7, 'ginger'],
    ['Agua mineral con gas', 'Refrescos', '1 l', 4, 'soda'],
    ['Refresco de toronja', 'Refrescos', '355 ml', 3, 'toronja'],
    ['Granadina', 'Jarabes y frutas', '250 ml', 8, 'granadina'],
    ['Crema de coco', 'Jarabes y frutas', '400 ml', 5, 'coco'],
    ['Jugo de piña', 'Jarabes y frutas', '1 l', 5, 'pina'],
    ['Limas frescas', 'Jarabes y frutas', '1 kg', 4, 'lima'],
    ['Maracuyá', 'Jarabes y frutas', '500 g', 6, 'maracuya'],
    ['Menta fresca', 'Jarabes y frutas', 'manojo', 2, 'menta'],
    ['Hielo cristalino', 'Hielo y adornos', 'bolsa de 2 kg', 6, 'hielo'],
    ['Cítricos deshidratados', 'Hielo y adornos', '60 g', 8, 'citricos'],
  ];

  const GROUPS = [
    ['Destilados', { rum: 'Ron blanco', tequila: 'Tequila blanco', gin: 'Ginebra', vodka: 'Vodka' }],
    ['Licores y vinos', { bitter: 'Aperitivo amargo', prosecco: 'Prosecco', triple: 'Triple sec', curacao: 'Blue curaçao' }],
    ['Frutas y hierbas', { lime: 'Lima', orange: 'Naranja', strawberry: 'Fresas', mint: 'Menta', pineapple: 'Jugo de piña', passion: 'Maracuyá', coconut: 'Crema de coco' }],
    ['Refrescos', { grapefruit: 'Refresco de toronja', tonic: 'Agua tónica', ginger: 'Ginger beer', soda: 'Agua con gas', lemon: 'Refresco de limón' }],
    ['Básicos', { grenadine: 'Granadina', syrup: 'Jarabe simple', hibiscus: 'Jarabe de jamaica', salt: 'Sal', ice: 'Hielo' }],
  ];
  const NAME = Object.assign({}, ...GROUPS.map(g => g[1]));

  // g: vaso del sello (coupe | high | wine | hurricane | rocks), p: pareja de PAL, a + b: capas del líquido, f: cítrico
  const RECIPES = [
    { n: 'Daiquiri clásico', tag: 'Copa coupe', min: 3, g: 'coupe', p: 2, a: '#F5E9D0', b: '#F2D08A', f: '#F78F3F', need: ['rum', 'lime', 'syrup', 'ice'],
      steps: ['Agita con fuerza 60 ml de ron, 25 ml de jugo de lima y 15 ml de jarabe con hielo.', 'Cuela en una copa bien fría.', 'Deja flotar una rodaja fina de lima.'] },
    { n: 'Daiquiri de fresa frozen', tag: 'Copa coupe · licuadora', min: 5, g: 'coupe', p: 5, a: '#D2491C', b: '#B83A14', f: '#F2D08A', need: ['rum', 'lime', 'syrup', 'strawberry', 'ice'],
      steps: ['Licúa 60 ml de ron, 30 ml de jugo de lima, 20 ml de jarabe y 6 fresas con dos tazas de hielo.', 'Sigue hasta que una cuchara se sostenga de pie.', 'Sirve en una copa helada y corona con una fresa.'] },
    { n: 'Mojito', tag: 'Vaso alto', min: 4, g: 'high', p: 2, a: '#EAF3F8', b: '#CFE2EE', f: '#F2D08A', need: ['rum', 'lime', 'mint', 'syrup', 'soda', 'ice'],
      steps: ['Presiona suavemente 8 hojas de menta con 20 ml de jarabe y 25 ml de jugo de lima en el vaso.', 'Añade 50 ml de ron, llena de hielo picado y remueve.', 'Completa con agua con gas y una ramita de menta.'] },
    { n: 'Piña colada', tag: 'Copa huracán · licuadora', min: 5, g: 'hurricane', p: 4, a: '#F5E9D0', b: '#F2D08A', f: '#F78F3F', need: ['rum', 'coconut', 'pineapple', 'ice'],
      steps: ['Licúa 60 ml de ron, 60 ml de crema de coco y 120 ml de jugo de piña con una taza de hielo.', 'Sirve en una copa alta y fría.', 'Adorna con la fruta que tengas a mano.'] },
    { n: 'Paloma', tag: 'Vaso alto', min: 2, g: 'high', p: 3, a: '#F78F3F', b: '#D2491C', f: '#D2491C', need: ['tequila', 'grapefruit', 'lime', 'salt', 'ice'],
      steps: ['Escarcha con sal el borde de un vaso alto y llénalo de hielo.', 'Añade 50 ml de tequila y 15 ml de jugo de lima.', 'Completa con refresco de toronja y remueve una vez.'] },
    { n: 'Margarita', tag: 'Vaso corto', min: 3, g: 'rocks', p: 0, a: '#F5E9D0', b: '#CFE2EE', f: '#D2491C', need: ['tequila', 'triple', 'lime', 'salt', 'ice'],
      steps: ['Agita 50 ml de tequila, 25 ml de triple sec y 25 ml de jugo de lima con hielo.', 'Cuela sobre hielo nuevo en un vaso escarchado con sal.', 'Adorna con un gajo de lima.'] },
    { n: 'Tequila sunrise', tag: 'Copa huracán', min: 2, g: 'hurricane', p: 1, a: '#F2D08A', b: '#D2491C', f: '#F78F3F', need: ['tequila', 'orange', 'grenadine', 'ice'],
      steps: ['Llena un vaso alto de hielo, añade 50 ml de tequila y 120 ml de jugo de naranja.', 'Vierte 15 ml de granadina despacio por el borde para que se hunda.', 'No remuevas. Sirve con una rodaja de naranja.'] },
    { n: 'Spritz de la Riviera', tag: 'Copa de vino', min: 2, g: 'wine', p: 4, a: '#F78F3F', b: '#D2491C', f: '#F2D08A', need: ['bitter', 'prosecco', 'soda', 'orange', 'ice'],
      steps: ['Llena de hielo una copa grande de vino.', 'Añade 90 ml de prosecco, 60 ml de aperitivo amargo y un chorrito de agua con gas.', 'Remueve con suavidad y añade una rodaja gruesa de naranja.'] },
    { n: 'Gin tonic', tag: 'Copa balón', min: 1, g: 'wine', p: 5, a: '#EAF3F8', b: '#CFE2EE', f: '#F2D08A', need: ['gin', 'tonic', 'lime', 'ice'],
      steps: ['Llena la copa de hielo hasta arriba.', 'Añade 50 ml de ginebra y luego 150 ml de tónica por el borde.', 'Exprime un gajo de lima y déjalo caer dentro.'] },
    { n: 'Moscow mule', tag: 'Taza de cobre', min: 2, g: 'rocks', p: 3, a: '#F5E9D0', b: '#F78F3F', f: '#35566F', need: ['vodka', 'ginger', 'lime', 'ice'],
      steps: ['Llena una taza de hielo y añade 50 ml de vodka y 15 ml de jugo de lima.', 'Completa con ginger beer.', 'Remueve una vez y adorna con lima.'] },
    { n: 'Blue lagoon', tag: 'Vaso alto', min: 2, g: 'high', p: 0, a: '#8FB8D6', b: '#5F8FB5', f: '#D2491C', need: ['vodka', 'curacao', 'lemon', 'ice'],
      steps: ['Llena un vaso alto de hielo.', 'Añade 40 ml de vodka y 20 ml de blue curaçao.', 'Completa con refresco de limón y remueve hasta que quede azul piscina.'] },
    { n: 'Agua fresca de jamaica', tag: 'Sin alcohol', min: 2, g: 'high', p: 1, a: '#D2491C', b: '#B83A14', f: '#F2D08A', need: ['hibiscus', 'lime', 'soda', 'mint', 'ice'],
      steps: ['Pon 30 ml de jarabe de jamaica y 20 ml de jugo de lima en un vaso con hielo.', 'Completa con agua con gas.', 'Da una palmada a una ramita de menta y añádela.'] },
    { n: 'Fizz de maracuyá', tag: 'Sin alcohol', min: 2, g: 'rocks', p: 4, a: '#F2D08A', b: '#F78F3F', f: '#D2491C', need: ['passion', 'ginger', 'lime', 'ice'],
      steps: ['Mezcla la pulpa de un maracuyá con 15 ml de jugo de lima sobre hielo.', 'Completa con ginger beer.', 'Adorna con una rodaja de lima.'] },
  ];

  // vasos para los sellos (trazo = currentColor, --a líquido, --f adorno)
  const line = 'fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
  const garnish = (x, y) => `<circle cx="${x}" cy="${y}" r="10.500" fill="var(--f)" stroke="currentColor" stroke-width="2.500"/>`;
  document.body.insertAdjacentHTML('beforeend', `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <symbol id="g-coupe" viewBox="0 0 100 130"><line x1="58" y1="68" x2="86" y2="22" stroke="#fff" stroke-width="4.500" stroke-linecap="round"/><line x1="58" y1="68" x2="86" y2="22" stroke="var(--f)" stroke-width="4.500" stroke-dasharray="4.500 4.500"/><path d="M14 36H86L50 80Z" fill="#fff" opacity=".35"/><path d="M24 48H76L50 80Z" fill="var(--a)"/><path d="M33 59Q41.500 54 50 59T67 59L50 80Z" fill="var(--b)"/><path d="M14 36H86L50 80Z" stroke="#fff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M24 40L42 62" stroke="#fff" stroke-width="2.500" stroke-linecap="round" opacity=".6"/><path d="M48 80h4v28c0 5 16 6 16 10H32c0-4 16-5 16-10Z" fill="#FFF4DC"/><g transform="translate(16 36)"><circle r="13" fill="#FFF4DC" stroke="var(--f)" stroke-width="2.500"/><circle r="9.1" fill="var(--f)"/><path d="M0-9.1V9.1M-9.1 0H9.1M-6.4-6.4L6.4 6.4M6.4-6.4L-6.4 6.4" stroke="#FFF4DC" stroke-width="1.400"/></g></symbol>
    <symbol id="g-high" viewBox="0 0 100 130"><line x1="57" y1="104" x2="76" y2="10" stroke="#fff" stroke-width="4.500" stroke-linecap="round"/><line x1="57" y1="104" x2="76" y2="10" stroke="var(--f)" stroke-width="4.500" stroke-dasharray="4.500 4.500"/><path d="M29 28H71L67 120H33Z" fill="#fff" opacity=".35"/><path d="M30 46H70L67 120H33Z" fill="var(--a)"/><path d="M31.500 82Q41 76 50 82T68.500 82L67 120H33Z" fill="var(--b)"/><rect x="38" y="54" width="13" height="13" rx="3" fill="#fff" opacity=".6" transform="rotate(-12 44.5 60.5)"/><rect x="51" y="66" width="12" height="12" rx="3" fill="#fff" opacity=".6" transform="rotate(16 57 72)"/><rect x="40" y="92" width="12" height="12" rx="3" fill="#fff" opacity=".6" transform="rotate(10 46 98)"/><path d="M29 28H71L67 120H33Z" stroke="#fff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M36 38L39 104" stroke="#fff" stroke-width="2.500" stroke-linecap="round" opacity=".6"/><g transform="translate(29 28)"><circle r="13" fill="#FFF4DC" stroke="var(--f)" stroke-width="2.500"/><circle r="9.1" fill="var(--f)"/><path d="M0-9.1V9.1M-9.1 0H9.1M-6.4-6.4L6.4 6.4M6.4-6.4L-6.4 6.4" stroke="#FFF4DC" stroke-width="1.400"/></g></symbol>
    <symbol id="g-wine" viewBox="0 0 100 130"><line x1="54" y1="72" x2="74" y2="12" stroke="#fff" stroke-width="4.500" stroke-linecap="round"/><line x1="54" y1="72" x2="74" y2="12" stroke="var(--f)" stroke-width="4.500" stroke-dasharray="4.500 4.500"/><path d="M24 34C13 60 30 88 50 88C70 88 87 60 76 34Z" fill="#fff" opacity=".35"/><path d="M20 50C19 70 34 88 50 88C66 88 81 70 80 50Z" fill="var(--a)"/><path d="M23 68Q36.500 62 50 68T77 68C71 80 61 88 50 88C39 88 29 80 23 68Z" fill="var(--b)"/><rect x="36" y="54" width="13" height="13" rx="3" fill="#fff" opacity=".6" transform="rotate(-14 42.5 60.5)"/><rect x="52" y="60" width="12" height="12" rx="3" fill="#fff" opacity=".6" transform="rotate(18 58 66)"/><path d="M24 34C13 60 30 88 50 88C70 88 87 60 76 34Z" stroke="#fff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M25 48C24 62 30 74 40 80" stroke="#fff" stroke-width="2.500" stroke-linecap="round" fill="none" opacity=".6"/><path d="M48 88h4v20c0 5 16 6 16 10H32c0-4 16-5 16-10Z" fill="#FFF4DC"/><g transform="translate(24 34)"><circle r="13" fill="#FFF4DC" stroke="var(--f)" stroke-width="2.500"/><circle r="9.1" fill="var(--f)"/><path d="M0-9.1V9.1M-9.1 0H9.1M-6.4-6.4L6.4 6.4M6.4-6.4L-6.4 6.4" stroke="#FFF4DC" stroke-width="1.400"/></g></symbol>
    <symbol id="g-hurricane" viewBox="0 0 100 130"><line x1="44" y1="86" x2="62" y2="8" stroke="#fff" stroke-width="4.500" stroke-linecap="round"/><line x1="44" y1="86" x2="62" y2="8" stroke="var(--f)" stroke-width="4.500" stroke-dasharray="4.500 4.500"/><path d="M35 22C39 50 25 62 29 82C32 96 42 100 50 100C58 100 68 96 71 82C75 62 61 50 65 22Z" fill="#fff" opacity=".35"/><path d="M34 50C29 60 27 72 29 82C32 96 42 100 50 100C58 100 68 96 71 82C73 72 71 60 66 50Z" fill="var(--a)"/><path d="M28.500 74Q39 68 50 74T71.500 74C72 77 72 80 71 82C68 96 58 100 50 100C42 100 32 96 29 82C28 80 28 77 28.500 74Z" fill="var(--b)"/><path d="M35 22C39 50 25 62 29 82C32 96 42 100 50 100C58 100 68 96 71 82C75 62 61 50 65 22Z" stroke="#fff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M34 60C32 70 33 80 38 90" stroke="#fff" stroke-width="2.500" stroke-linecap="round" fill="none" opacity=".6"/><path d="M48 100h4v8c0 5 16 6 16 10H32c0-4 16-5 16-10Z" fill="#FFF4DC"/><g transform="translate(69 26)"><circle r="14" fill="#FFF4DC" stroke="var(--f)" stroke-width="2.500"/><circle r="9.8" fill="var(--f)"/><path d="M0-9.8V9.8M-9.8 0H9.8M-6.9-6.9L6.9 6.9M6.9-6.9L-6.9 6.9" stroke="#FFF4DC" stroke-width="1.400"/></g><path d="M69 26C70 14 76 8 82 5" stroke="#8E1B12" stroke-width="1.800" fill="none" stroke-linecap="round"/><circle cx="69" cy="27" r="5.500" fill="#D2491C"/><circle cx="67.500" cy="25.500" r="1.400" fill="#fff" opacity=".8"/></symbol>
    <symbol id="g-thermo" viewBox="0 0 100 130"><path d="M43 22a7 7 0 0 1 14 0v50a16 16 0 1 1-14 0Z" fill="#fff" opacity=".55"/><circle cx="50" cy="86" r="9" fill="var(--a)"/><path d="M50 86V56" stroke="var(--a)" stroke-width="7" stroke-linecap="round"/><path d="M43 22a7 7 0 0 1 14 0v50a16 16 0 1 1-14 0ZM66 26h9M66 40h9M66 54h9" ${line}/></symbol>
    <symbol id="g-clock" viewBox="0 0 100 130"><circle cx="54" cy="68" r="32" fill="#fff" opacity=".55"/><path d="M54 68V48" stroke="var(--a)" stroke-width="6" stroke-linecap="round"/><circle cx="54" cy="68" r="32" ${line}/><path d="M54 68L68 76M46 28H62M54 28V36M6 56H16M2 70H14M6 84H16" ${line}/></symbol>
    <symbol id="g-ice" viewBox="0 0 100 130"><rect x="20" y="42" width="46" height="46" rx="9" fill="#fff" opacity=".6" transform="rotate(-10 43 65)"/><rect x="20" y="42" width="46" height="46" rx="9" transform="rotate(-10 43 65)" ${line}/><rect x="54" y="78" width="30" height="30" rx="7" fill="var(--a)" stroke="currentColor" stroke-width="3" transform="rotate(14 69 93)"/><path d="M32 56L42 54M76 28V40M70 34H82" ${line}/></symbol>
    <symbol id="g-rocks" viewBox="0 0 100 130"><path d="M22 56H78L72 120H28Z" fill="#fff" opacity=".35"/><path d="M23.500 70H76.500L72 120H28Z" fill="var(--a)"/><path d="M25.500 94Q38 88 50 94T74.500 94L72 120H28Z" fill="var(--b)"/><rect x="36" y="76" width="16" height="16" rx="3" fill="#fff" opacity=".6" transform="rotate(-10 44 84)"/><rect x="54" y="84" width="13" height="13" rx="3" fill="#fff" opacity=".6" transform="rotate(14 60.5 90.5)"/><path d="M22 56H78L72 120H28Z" stroke="#fff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" fill="none"/><path d="M30 66L33 108" stroke="#fff" stroke-width="2.500" stroke-linecap="round" opacity=".6"/><g transform="translate(76 56)"><circle r="14" fill="#FFF4DC" stroke="var(--f)" stroke-width="2.500"/><circle r="9.8" fill="var(--f)"/><path d="M0-9.8V9.8M-9.8 0H9.8M-6.9-6.9L6.9 6.9M6.9-6.9L-6.9 6.9" stroke="#FFF4DC" stroke-width="1.400"/></g></symbol>
  </svg>`);

  // ---------- tienda ----------
  const shelf = $('[data-shelf]'), filters = $('[data-filters]');
  if (shelf) {
    const cats = ['Todo', ...new Set(PRODUCTS.map(p => p[1]))];
    const drawShelf = cat => {
      shelf.innerHTML = PRODUCTS.filter(p => cat === 'Todo' || p[1] === cat).map((p, i) => `
        <article class="item" style="--i:${i}" data-name="${p[0]}" data-price="${p[3]}">
          <div class="ph"><img src="img/${p[4]}.jpg" alt="${p[0]}" loading="lazy"></div>
          <h3>${p[0]}</h3><p>${p[2]}</p>
          <button class="pill" data-add data-done="✓ Listo">$${p[3]} · Añadir</button>
        </article>`).join('');
    };
    const screen = $('[data-screen]'), tray = $('[data-tray]');
    const show = (top, main) => { if (screen) screen.innerHTML = `${top}<b>${main}</b>`; };
    const peek = e => { const it = e.target.closest('.item'); if (it) show(`$${it.dataset.price}`, it.dataset.name); };
    shelf.addEventListener('pointerover', peek);
    shelf.addEventListener('focusin', peek);
    shelf.addEventListener('click', e => {
      const btn = e.target.closest('[data-add]');
      if (!btn || !tray) return;
      const it = btn.closest('.item'), img = $('img', it), from = img.getBoundingClientRect(), to = tray.getBoundingClientRect();
      show('¡Sale!', it.dataset.name);
      const land = () => {
        tray.append(img.cloneNode());
        const all = $$('img', tray);
        if (all.length > 4) all[0].remove();
      };
      if (reduced || !img.animate) return land();
      const fly = img.cloneNode();
      fly.className = 'drop';
      fly.style.cssText = `left:${from.left}px;top:${from.top}px;width:${from.width}px;height:${from.height}px`;
      document.body.append(fly);
      fly.animate([{ transform: 'none' }, { transform: `translate(${to.left + 20 - from.left}px,${to.top - from.top}px) rotate(200deg) scale(.4)` }],
        { duration: 750, easing: 'cubic-bezier(.5,0,.9,.5)' }).onfinish = () => { fly.remove(); land(); };
    });
    filters.innerHTML = cats.map((c, i) => `<button aria-pressed="${!i}">${c}</button>`).join('');
    filters.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      $$('button', filters).forEach(x => x.setAttribute('aria-pressed', x === b));
      drawShelf(b.textContent);
    });
    drawShelf('Todo');
  }

  // ---------- recetario ----------
  const book = $('[data-book]');
  if (book) {
    const search = $('[data-search]', book), pantry = $('[data-chips]', book), right = $('[data-results]', book);
    const have = new Set(['rum', 'lime', 'syrup', 'ice', 'mint', 'soda']);
    let open = null, page = 0;
    const PER = 6;
    const unfolded = new Set(['Destilados', 'Frutas y hierbas']);
    const missing = r => r.need.filter(id => !have.has(id));
    const plain = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const matches = () => GROUPS.map(([title, items]) => [title, Object.entries(items).filter(([, label]) => plain(label).includes(plain(search.value.trim())))]).filter(g => g[1].length);

    // fondo, arco, texto: parejas tomadas de la paleta
    const PAL = [['#F2D08A', '#F78F3F', '#D2491C'], ['#CFE2EE', '#8FB8D6', '#35566F'], ['#F5E9D0', '#D2491C', '#D2491C'],
      ['#F78F3F', '#F2D08A', '#FFFFFF'], ['#35566F', '#8FB8D6', '#F5E9D0'], ['#D2491C', '#F78F3F', '#F5E9D0']];
    const spark = (x, y, r) => `M${x} ${y - r}Q${x + r * .15} ${y - r * .15} ${x + r} ${y}Q${x + r * .15} ${y + r * .15} ${x} ${y + r}Q${x - r * .15} ${y + r * .15} ${x - r} ${y}Q${x - r * .15} ${y - r * .15} ${x} ${y - r}Z`;
    const SPARKS = spark(9, 16, 6) + spark(92, 12, 4.5) + spark(84, 104, 4) + spark(17, 96, 3.5);
    const stamp = (r, i, miss, tag) => {
      const [bg, arch, ink] = PAL[r.p];
      return `<${tag} class="stamp${miss.length ? '' : ' ready'}"${tag === 'button' ? ` data-rec="${i}"` : ''} style="--s:${bg};--t:${ink}">
      <span class="perf"><span class="st-in"><span class="st-name">${r.n}</span>
        <svg viewBox="0 0 100 130" aria-hidden="true"><path d="M10 130V54a40 40 0 0 1 80 0V130Z" fill="${arch}"/><path class="spk" d="${SPARKS}" fill="#fff"/><use href="#g-${r.g}" style="--a:${r.a};--b:${r.b};--f:${r.f}"/></svg></span></span>
      ${miss.length ? `<span class="st-sub">${miss.length === 1 ? 'falta 1' : 'faltan ' + miss.length}</span>` : '<span class="st-sub ok">lista</span><span class="mark">Listo</span>'}</${tag}>`;
    };

    const drawPantry = () => {
      const searching = search.value.trim();
      pantry.innerHTML = matches().map(([title, items]) => {
        const all = Object.keys(GROUPS.find(g => g[0] === title)[1]), n = all.filter(id => have.has(id)).length;
        return `<details class="group" data-group="${title}"${searching || unfolded.has(title) ? ' open' : ''}><summary>${title}${n ? `<b>${n}</b>` : ''}</summary><ul>${items.map(([id, label]) =>
          `<li><button aria-pressed="${have.has(id)}" data-ing="${id}"><span class="box"></span>${label}</button></li>`).join('')}</ul></details>`;
      }).join('') || '<p class="none">No hay nada con ese nombre.</p>';
    };
    pantry.addEventListener('toggle', e => {
      if (search.value.trim() || !e.target.dataset.group) return;
      e.target.open ? unfolded.add(e.target.dataset.group) : unfolded.delete(e.target.dataset.group);
    }, true);
    const drawRight = flip => {
      if (open === null) {
        const ranked = RECIPES.map((r, i) => ({ r, i, miss: missing(r) })).sort((a, b) => a.miss.length - b.miss.length);
        const ready = ranked.filter(x => !x.miss.length).length, close = ranked.filter(x => x.miss.length === 1).length;
        const pages = Math.ceil(ranked.length / PER);
        page = Math.min(page, pages - 1);
        right.innerHTML = `<p class="count"><b>${ready}</b> ${ready === 1 ? 'lista' : 'listas'} · <b>${close}</b> a un paso</p>
          <div class="stamps">${ranked.slice(page * PER, page * PER + PER).map(({ r, i, miss }) => stamp(r, i, miss, 'button')).join('')}</div>
          <nav class="pager" aria-label="Páginas de recetas"><button data-turn="-1" aria-label="Anterior"${page ? '' : ' disabled'}>‹</button>
            <span>${Array.from({ length: pages }, (_, n) => `<i${n === page ? ' class="on"' : ''}></i>`).join('')}</span>
            <button data-turn="1" aria-label="Siguiente"${page < pages - 1 ? '' : ' disabled'}>›</button></nav>`;
      } else {
        const r = RECIPES[open], miss = missing(r);
        right.innerHTML = `<button class="back" data-back>← Todas las recetas</button>
          <div class="rhead">${stamp(r, open, miss, 'div')}<div><h3 class="rname">${r.n}</h3><p class="tag">${r.tag} · ${r.min} min</p></div></div>
          <h4 class="sub">Ingredientes</h4>
          <ul class="needs">${r.need.map(id => `<li class="${have.has(id) ? 'ok' : 'no'}"><span class="box"></span>${NAME[id]}${have.has(id) ? '' : '<em>te falta</em>'}</li>`).join('')}</ul>
          <h4 class="sub">Preparación</h4>
          <ol class="steps">${r.steps.map(s => `<li>${s}</li>`).join('')}</ol>
          ${miss.length ? `<button class="btn" data-add data-qty="${miss.length}">Añadir ${miss.length === 1 ? 'lo que falta' : 'los ' + miss.length + ' que faltan'}</button>` : '<p class="ready-note">Lo tienes todo. A servir.</p>'}`;
      }
      if (flip) { right.classList.remove('flip'); void right.offsetWidth; right.classList.add('flip'); }
    };

    search.addEventListener('input', drawPantry);
    search.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      const first = matches()[0];
      if (search.value.trim() && first) { have.add(first[1][0][0]); search.value = ''; drawPantry(); drawRight(); }
    });
    pantry.addEventListener('click', e => {
      const b = e.target.closest('[data-ing]');
      if (!b) return;
      have.has(b.dataset.ing) ? have.delete(b.dataset.ing) : have.add(b.dataset.ing);
      page = 0;
      drawPantry(); drawRight();
    });
    $('[data-clear]', book).addEventListener('click', () => { have.clear(); search.value = ''; drawPantry(); drawRight(); });
    right.addEventListener('click', e => {
      const rec = e.target.closest('[data-rec]');
      const turn = e.target.closest('[data-turn]');
      if (turn) { page += +turn.dataset.turn; drawRight(true); }
      else if (rec) { open = +rec.dataset.rec; drawRight(true); }
      else if (e.target.closest('[data-back]')) { open = null; drawRight(true); }
    });
    drawPantry(); drawRight();
  }

  // ---------- cifras que suben al entrar en pantalla ----------
  {
    let counts = reduced ? [] : $$('[data-count]');
    onScroll(() => {
      counts = counts.filter(el => {
        if (el.getBoundingClientRect().top > innerHeight * .85) return true;
        const to = +el.dataset.count, t0 = performance.now();
        const step = now => {
          const k = ease(clamp((now - t0) / 1400));
          el.textContent = String(Math.round(to * k)).replace('-', '−') + el.dataset.unit;
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        return false;
      });
    });
  }
})();
