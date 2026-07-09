export type Layout = 'full' | 'half' | 'twoThirds' | 'oneThird';
export type SectionKey = 'landscape-wildlife' | 'travel' | 'misc';

// Layout deterministici per sezione (sostituiscono i vecchi pattern ciclici
// della pagina indice): ogni sezione ha poche serie e un ritmo fisso.
export function sectionLayouts(section: SectionKey, count: number): Layout[] {
  const layouts: Layout[] = [];

  if (section === 'landscape-wildlife') {
    // Righe [2/3, 1/3] e [1/3, 2/3] alternate; l'eventuale spaiato è full.
    let flip = false;
    while (layouts.length < count) {
      if (count - layouts.length === 1) {
        layouts.push('full');
        break;
      }
      const row: Layout[] = flip
        ? ['oneThird', 'twoThirds']
        : ['twoThirds', 'oneThird'];
      layouts.push(...row);
      flip = !flip;
    }
    return layouts;
  }

  // travel e misc: coppie [half, half]; il singolo o lo spaiato è full.
  while (layouts.length < count) {
    if (count - layouts.length === 1) {
      layouts.push('full');
      break;
    }
    layouts.push('half', 'half');
  }
  return layouts;
}
