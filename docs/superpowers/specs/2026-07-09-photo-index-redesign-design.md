# Redesign pagina photo/index — design approvato

**Data:** 2026-07-09
**Pagine coinvolte:** `src/pages/photo/index.astro`, `src/pages/en/photo/index.astro`
**Mockup di riferimento:** `.superpowers/brainstorm/58245-1783601934/content/full-mockup-v5.html`

## Obiettivo

Trasformare la pagina photo (oggi un'unica griglia editoriale di album) in una
pagina a capitoli in stile rivista, con quattro sezioni: reportage,
naturalistica, viaggi, varie. I reportage veri arriveranno in una fase
successiva con pagine ad hoc: per ora la sezione usa placeholder.

## Struttura della pagina

Dall'alto verso il basso, su fondo chiaro (`--white`) per tutta la pagina:

1. **Capitolo 1 · Reportage** — banda di capitolo (prima cosa dopo l'header:
   il masthead "Portfolio + tagline" è stato rimosso), poi hero full-bleed, poi
   fila di card secondarie.
3. **Capitolo 2 · Naturalistica** — banda di capitolo, poi griglia editoriale.
4. **Capitolo 3 · Viaggi** — banda di capitolo, poi griglia editoriale.
5. **Capitolo 4 · Varie** — banda di capitolo, poi griglia editoriale (oggi
   una sola card full-width con l'astrofotografia).
6. **Ticker** — conteggi aggiornati: "5 serie · N fotografie"
   (numeri calcolati dai dati, non hardcoded).

La griglia è continua: gap di 3px fra tutte le celle e fra le sezioni; le
bande di capitolo vivono dentro questo ritmo (margine 3px sopra e sotto).
Nessuna sezione scura: tutto su fondo chiaro.

## Banda di capitolo

Divisore full-width, tipografia orizzontale densa, senza numerali:

- bordo superiore `2px solid var(--black)`, bordo inferiore
  `1px solid rgba(26,26,26,0.18)`
- padding verticale generoso (`1.8rem`), orizzontale `2rem`
- a sinistra: titolo in DM Serif Display corsivo,
  `clamp(1.5rem, 2.6vw, 2.3rem)`
- al centro: filetto orizzontale che riempie lo spazio
- a destra, allineati a destra: folio in Plus Jakarta Sans maiuscoletto
  (conteggi della sezione) e intro in IBM Plex Serif corsivo

Su mobile (breakpoint smartphone esistente): il filetto scompare, folio e
intro vanno a capo allineati a sinistra.

### Titoli e testi delle bande

| Capitolo | IT            | EN                   | Intro IT                                             | Intro EN                                           |
| -------- | ------------- | -------------------- | ---------------------------------------------------- | -------------------------------------------------- |
| 1        | Reportage     | Reportage            | Storie fotografiche a lungo termine                  | Long-term photographic stories                     |
| 2        | Naturalistica | Landscape & Wildlife | Forme, luce e animali selvatici                      | Shapes, light and wild animals                     |
| 3        | Viaggi        | Travel               | Racconti fotografici dai miei viaggi                 | Photographic tales from my travels                 |
| 4        | Varie         | Miscellaneous        | Esperimenti e ossessioni: per ora, il cielo notturno | Experiments and obsessions: for now, the night sky |

Folio: capitolo 1 "N serie"; capitoli 2-4 "N serie · M fotografie".
Tutte le stringhe (titoli, intro, etichette folio) vanno in `src/i18n/ui.ts`
con chiavi `photo.section.*`.

## Capitolo Reportage

- **Hero**: il reportage con `featured: true`, full-bleed, altezza `70vh`
  (min 420px; ~58vh su mobile). Overlay a gradiente scuro in basso con:
  kicker dorato "In evidenza" (EN "Featured"), titolo DM Serif Display
  `clamp(2.6rem, 5vw, 4.6rem)`, sottotitolo corsivo, meta (Luogo / Anno /
  etichetta capitoli o foto).
- **Card secondarie**: i reportage non-featured in una fila a 2 colonne
  (1 colonna su mobile), altezza `38vh` (min 250px), overlay con kicker
  "Reportage" + titolo + sottotitolo.
- Hover come le entry attuali: zoom leggero dell'immagine.

### Dati dei reportage

Nuovo file `src/data/reportages.ts` — i reportage futuri saranno pagine ad
hoc scritte in codice, quindi niente content collection. Forma:

```ts
export interface Reportage {
  id: string;
  title: { it: string; en: string };
  subtitle: { it: string; en: string };
  cover: string; // percorso immagine R2, come negli album
  location: string;
  year: number;
  href: string; // oggi /photo/matera, domani /reportage/<id>
  featured?: boolean; // esattamente uno: è l'hero
  placeholder?: boolean; // true per i placeholder fittizi
}
```

Contenuto iniziale (3 voci):

1. **I Materani** — `featured: true`, cover `matera/costellazione-sassi.jpg`,
   href `/photo/matera` (galleria esistente). Placeholder "vero": punta a
   contenuto reale.
2. **Craco, la città fantasma** — placeholder fittizio, cover
   `paesaggi/finestra-craco.jpg`, href `/photo/paesaggi`.
3. **Notturno urbano** — placeholder fittizio, cover
   `matera/cinema-guerrieri.jpg`, href `/photo/matera`.

I placeholder fittizi servono a validare il design e verranno sostituiti dai
reportage veri. L'hero si cambia spostando il flag `featured`. Regola di
fallback: hero = il primo reportage con `featured: true`; se nessuno ce l'ha,
il primo dell'array. Gli altri finiscono nelle card secondarie in ordine di
array.

## Capitoli ad album (2, 3, 4)

Le card mantengono lo stile attuale (overlay, categoria dorata, titolo,
meta): cambia solo la disposizione, che diventa deterministica per sezione
invece dei pattern ciclici attuali (la logica `layoutPatterns`/`albumLayouts`
viene rimossa):

- **Naturalistica**: pattern `[twoThirds, oneThird]` poi `[oneThird, twoThirds]`
  alternati per righe successive. Oggi: paesaggi (2/3) + grillaio (1/3).
- **Viaggi**: righe `[half, half]`; se resta un album spaiato, `full`.
  Oggi: giappone + napapiiri.
- **Varie**: un solo album → `full`. Con più album, righe `[half, half]`.

### Assegnazione album → sezione

Nuovo campo opzionale nello schema `albums` in `src/content.config.ts`:

```ts
section: z.enum(['landscape-wildlife', 'travel', 'misc']).optional();
```

- `paesaggi.md`, `falco-grillaio.md` → `landscape-wildlife`
- `giappone.md`, `napapiiri.md` → `travel`
- `astrophotography.md` → `misc`
- `matera.md` → nessuna sezione: resta `published: true` (la galleria
  `/photo/matera` continua a esistere, linkata dall'hero reportage) ma non
  compare nelle griglie.

Gli album senza `section` non compaiono nella pagina indice. Dentro ogni
sezione l'ordine resta per data decrescente.

## Architettura dei file

- `src/pages/photo/index.astro` e `src/pages/en/photo/index.astro`:
  stessa struttura; differiscono solo per lingua (via `getLangFromUrl` /
  `useTranslations`) e per i testi presi da `ui.ts` e da `reportages.ts`.
  Per evitare duplicazione, la parte comune va estratta in componenti in
  `src/components/PhotoIndex/`: `SectionBand.astro`, `ReportageHero.astro`,
  `ReportageCard.astro`, `AlbumEntry.astro`. Le due pagine diventano thin
  wrapper che compongono questi componenti.
- `src/styles/Photo.module.scss`: aggiornato con gli stili nuovi (banda,
  hero, rep-card); gli stili della griglia/entry attuali si riusano.
- Lo script IntersectionObserver per le animazioni `data-aos` resta.
- `CFImage` resta il componente immagine, con `widths`/`sizes` adeguati
  ai nuovi layout (hero: fino a 1600px).

## Fuori scope (fasi successive)

- Le pagine dei reportage veri (design ad hoc, una per reportage).
- L'aggiornamento delle fotografie mostrate sul sito.
- Qualsiasi modifica alle pagine `/photo/[id]` esistenti.

## Verifica

Non esiste una test suite. Verifica con:

- `pnpm build` (include `astro check` per i tipi)
- `pnpm dev` + controllo visivo di `/photo` e `/en/photo` contro il mockup
  v5 (desktop e mobile)
- Controllo che `/photo/matera` resti raggiungibile e che gli album senza
  `section` non compaiano nell'indice
