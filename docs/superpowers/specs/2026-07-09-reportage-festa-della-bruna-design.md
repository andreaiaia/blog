# Reportage "Festa della Bruna" — design approvato

**Data:** 2026-07-09
**Pagina:** `/reportage/festa-della-bruna` (+ gemella `/en/reportage/festa-della-bruna`)
**Prototipi di riferimento:** `.superpowers/brainstorm/65025-1783609682/content/`
(`reportage-concepts.html` per le tre meccaniche, `strazzo-demo.html` per il climax)

## Obiettivo

Una pagina-esperienza che racconta la Festa della Bruna (Matera, 2 luglio):
scroll verticale come unico gesto, ma ogni capitolo cambia meccanica visiva
seguendo l'arco emotivo della giornata. Ogni pixel al servizio delle
fotografie e del racconto. Le foto vere sono in arrivo (selezione e upload su
R2 a carico di Andrea): si costruisce tutto con placeholder dagli album
esistenti, strutturato in modo che sostituire le immagini sia banale.

## Arco narrativo e meccaniche

Apertura + quattro capitoli + epilogo. Il gesto è sempre lo scroll verticale
(mobile e desktop identici); cambia come la pagina risponde. La pagina segue
la luce della giornata: si apre chiara come l'alba dei pastori e si spegne
nel buio dello strazzo.

### Apertura — dal bianco al buio

La pagina inizia **in tema chiaro**, come una pagina normale del sito:
header, titolo del reportage con dati (luogo, data) e breve descrizione,
poi la prima fotografia. Scrollando, tutto **si scurisce gradualmente**
(interpolazione del fondo da `--white` a `--black` guidata dal progresso);
i testi passano a chiaro per leggibilità, in sincrono col fondo. Quando la
prima foto raggiunge il centro del viewport la transizione è completa e
inizia il capitolo 1: da lì in poi la pagina è scura fino alla fine.

| # | Capitolo | Meccanica | Comportamento |
|---|----------|-----------|---------------|
| 1 | L'attesa — la processione dei pastori | Dark ride | Scene a tutto schermo che emergono dal buio, crescono verso lo spettatore e cedono il passo alla successiva (sticky stage, opacity + scale guidati dal progresso). La prima scena è la foto dell'apertura |
| 2 | La cavalcata e la processione della statua | Nastro orizzontale | Lo scroll verticale trasla un nastro orizzontale di foto e blocchi di testo alternati, come il corteo per le vie (sticky stage + translateX) |
| 3 | La processione del carro fino in piazza | Diorama 2.5D | Scene a piani sovrapposti (sfondo, foto, targa di testo) che scorrono a velocità diverse; su desktop lieve tilt col mouse |
| 4 | **Lo strazzo** | **Strappo** | La foto del carro intero trema, si spezza in ~8 brandelli dai bordi frastagliati che volano via ruotando; sotto emerge un mosaico dei momenti dello strazzo, sfalsati. Didascalia in tre fasi: il carro · lo strazzo · i frammenti |
| 5 | Epilogo — i frammenti | Scroll semplice | Dopo il caos, quiete: layout verticale statico, poche foto, testo breve di chiusura |

Il capitolo 4 è il momento-firma: lo strappo non è decorazione, è la
transizione narrativa tra "il carro come opera" e "il carro come preda".

## Tessuto connettivo

Per evitare l'effetto "demo reel" con tre meccaniche diverse:

- **Tema scuro** per tutta la pagina dopo l'apertura (`--black` come fondo):
  le foto sono la sola fonte di luce. È il registro dei prototipi approvati.
  L'apertura chiara esiste proprio per rendere percepibile la discesa nel
  buio.
- **Tipografia unica**: titoli DM Serif Display, testo IBM Plex Serif
  corsivo, etichette/didascalie Plus Jakarta Sans maiuscoletto con lo
  stesso stile ovunque (identiche al resto del sito).
- **Kicker dorato** (`--primary`) come etichetta ricorrente di capitolo.
- **Interludi di testo** tra un capitolo e l'altro: blocco centrato,
  max-width 720px, che introduce il capitolo successivo e dà respiro
  (come i `divider` del prototipo).

## Architettura tecnica

- **Niente librerie nuove**: il pattern dei prototipi (wrapper alto n·100vh +
  stage `position: sticky` + un solo `requestAnimationFrame` che legge il
  progresso e applica i transform) è sufficiente e già validato. Nessun GSAP.
- **Componenti condivisi** in `src/components/ReportageBruna/`: un componente
  per l'apertura e uno per capitolo/meccanica (`Opening.astro`,
  `ChapterDarkRide.astro`, `ChapterRibbon.astro`, `ChapterDiorama.astro`,
  `ChapterStrazzo.astro`, `Epilogue.astro`, `Interlude.astro`), ognuno con il
  proprio script. Le due pagine it/en sono thin wrapper che passano i testi.
- **Transizione luce→buio**: il fondo della pagina è governato da una CSS
  custom property aggiornata dallo scroll nell'apertura; testi con colori
  anch'essi interpolati per restare leggibili in ogni punto della
  transizione. Con `prefers-reduced-motion` la pagina parte direttamente
  scura (niente interpolazione).
- **Contenuti** (testi bilingui + percorsi immagini + didascalie) in un file
  dati `src/data/reportage-bruna.ts`, così la sostituzione dei placeholder
  con le foto vere non tocca i componenti.
- **Stili** in `src/styles/ReportageBruna.module.scss` (sostituisce lo
  scaffold attuale).
- **Immagini** via `CFImage` dove possibile; per gli 8 brandelli dello
  strazzo serve `background-image` con `clip-path` (stessa immagine
  ritagliata 8 volte), quindi lì si usa l'URL CDN diretto.

## Accessibilità e fallback

- **DOM in ordine di lettura**: anche con le coreografie, la sequenza dei
  nodi segue il racconto (screen reader e no-JS leggono la storia intera).
- **`prefers-reduced-motion: reduce`**: le coreografie si disattivano; la
  pagina degrada a scroll verticale semplice con tutte le foto visibili
  (gli stage sticky diventano sezioni normali).
- **No-JS**: come sopra — i contenuti sono nel markup, gli script aggiungono
  solo il movimento.
- **Alt text** su tutte le immagini (placeholder inclusi).

## Fuori scope / fasi successive

- Le fotografie vere: arrivano dopo la selezione e l'upload su R2. La
  struttura dati rende lo swap un'operazione sul solo
  `reportage-bruna.ts`.
- Eventuali reportage successivi: ognuno avrà design ad hoc; i componenti di
  questo non devono essere pensati per il riuso generico.

## Verifica

- `pnpm build` (0 errori, 0 warning)
- Controllo visivo it/en su desktop e viewport mobile: le cinque meccaniche,
  le tre fasi dello strazzo, gli interludi
- Controllo `prefers-reduced-motion` (emulazione nei DevTools): la pagina
  resta leggibile e completa
- Link di andata e ritorno con `/photo` (hero → reportage, header → back)
