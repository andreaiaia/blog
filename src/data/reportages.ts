// Reportage mostrati nella sezione in cima a /photo.
// I reportage veri sono pagine ad hoc scritte in codice (niente content
// collection): questo file è la fonte dati per l'indice.
// L'hero si sceglie spostando il flag `featured`.

export interface Reportage {
  id: string;
  title: { it: string; en: string };
  subtitle: { it: string; en: string };
  cover: string; // percorso immagine R2, come negli album
  coverAlt: string;
  location: string;
  year: number;
  href: string;
  featured?: boolean;
  placeholder?: boolean; // true finché immagine e testi sono provvisori
}

export const reportages: Reportage[] = [
  {
    id: 'festa-della-bruna',
    title: { it: 'Festa della Bruna', en: 'The Feast of the Bruna' },
    subtitle: {
      it: 'Testo placeholder: il 2 luglio di Matera, dalla processione dei pastori allo strazzo del carro.',
      en: 'Placeholder text: July 2nd in Matera, from the shepherds’ procession to the tearing of the cart.',
    },
    cover: 'matera/cattedrale-tramonto.jpg', // placeholder in attesa delle foto vere
    coverAlt: 'The sun setting behind the Cathedral of Matera.',
    location: 'Matera, IT',
    year: 2025,
    href: '/reportage/festa-della-bruna',
    featured: true,
    placeholder: true,
  },
];

// Hero = primo reportage con `featured: true`; fallback: il primo dell'array.
export function getFeaturedReportage(): Reportage {
  return reportages.find((r) => r.featured) ?? reportages[0];
}

export function getSecondaryReportages(): Reportage[] {
  const featured = getFeaturedReportage();
  return reportages.filter((r) => r !== featured);
}
