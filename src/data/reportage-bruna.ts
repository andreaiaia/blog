// Contenuti del reportage "Festa della Bruna": testi bilingui, percorsi
// immagine R2 e didascalie. Le foto vere sostituiranno i placeholder
// modificando SOLO questo file — i componenti non vanno toccati.

export interface Localized {
  it: string;
  en: string;
}

export interface Photo {
  src: string; // percorso R2, come negli album
  alt: string;
}

export interface RideScene extends Photo {
  caption: Localized;
}

export type RibbonItem =
  | (Photo & { type: 'photo'; caption: Localized })
  | { type: 'text'; title: Localized; body: Localized };

export const opening = {
  kicker: { it: 'Reportage', en: 'Reportage' },
  title: { it: 'Festa della Bruna', en: 'The Feast of the Bruna' },
  meta: { it: 'Matera, IT · 2 luglio', en: 'Matera, IT · July 2nd' },
  description: {
    it: 'Testo placeholder: un giorno solo, dall’alba dei pastori al carro fatto a pezzi. La festa che Matera aspetta un anno intero.',
    en: 'Placeholder text: a single day, from the shepherds’ dawn to the cart torn to pieces. The feast Matera waits a whole year for.',
  },
  hint: { it: 'scorri', en: 'scroll' },
};

// ── Capitolo 1 · L'attesa — la processione dei pastori (dark ride) ─────────
// La prima scena è la foto dell'apertura: la transizione bianco→buio si
// completa quando raggiunge il centro del viewport.
export const darkRide = {
  chapter: {
    kicker: { it: 'Capitolo 1', en: 'Chapter 1' },
    title: {
      it: 'Processione dei Pastori',
      en: 'The Shepherds’ Procession',
    },
  },
  scenes: [
    {
      src: 'matera/barisano-1.jpg',
      alt: 'Placeholder — la Cattedrale di Matera vista dal Belvedere.',
      caption: {
        it: 'Didascalia placeholder — la processione parte prima del sole.',
        en: 'Placeholder caption — the procession sets off before the sun.',
      },
    },
    {
      src: 'matera/sassi-con-nuvole.jpg',
      alt: 'Placeholder — i Sassi di Matera prima di un temporale.',
      caption: {
        it: 'Didascalia placeholder — i vicoli si riempiono piano.',
        en: 'Placeholder caption — the alleys slowly fill up.',
      },
    },
    {
      src: 'matera/finestra.jpg',
      alt: 'Placeholder — una casa senza tetto nei Sassi.',
      caption: {
        it: 'Didascalia placeholder — ogni finestra guarda la strada.',
        en: 'Placeholder caption — every window watches the street.',
      },
    },
  ] as RideScene[],
};

// ── Capitolo 2 · La cavalcata e la processione della statua (nastro) ───────
export const ribbon = {
  chapter: {
    kicker: { it: 'Capitolo 2', en: 'Chapter 2' },
    title: {
      it: 'La cavalcata e la processione della statua',
      en: 'The cavalcade and the procession of the statue',
    },
  },
  interlude: {
    it: 'Interludio placeholder: a metà mattina la cavalcata attraversa la città, la statua della Madonna sfila tra due ali di folla.',
    en: 'Placeholder interlude: mid-morning the cavalcade crosses the town, the statue of the Madonna parades between two walls of crowd.',
  },
  items: [
    {
      type: 'text',
      title: {
        it: 'La città non dorme dal giorno prima.',
        en: 'The town has been awake since the day before.',
      },
      body: {
        it: 'Blocco di testo placeholder che sfila insieme alle foto.',
        en: 'Placeholder text block parading along with the photos.',
      },
    },
    {
      type: 'photo',
      src: 'matera/cattedrale-tramonto.jpg',
      alt: 'Placeholder — il sole dietro la Cattedrale di Matera.',
      caption: { it: '01 · La cavalcata — placeholder', en: '01 · The cavalcade — placeholder' },
    },
    {
      type: 'photo',
      src: 'matera/superluna.jpg',
      alt: 'Placeholder — la luna dietro il campanile della Cattedrale.',
      caption: { it: '02 · La statua — placeholder', en: '02 · The statue — placeholder' },
    },
    {
      type: 'text',
      title: {
        it: 'Poi il corteo svolta l’angolo.',
        en: 'Then the procession turns the corner.',
      },
      body: {
        it: 'Altro interludio placeholder: il ritmo foto-testo dà respiro.',
        en: 'Another placeholder interlude: the photo-text rhythm gives air.',
      },
    },
    {
      type: 'photo',
      src: 'matera/cinema-guerrieri.jpg',
      alt: 'Placeholder — scena notturna in Piazza Vittorio Veneto.',
      caption: { it: '03 · Tra la folla — placeholder', en: '03 · In the crowd — placeholder' },
    },
    {
      type: 'photo',
      src: 'matera/barisano-4.jpg',
      alt: 'Placeholder — i colori dei Sassi dopo la pioggia.',
      caption: { it: '04 · Verso la piazza — placeholder', en: '04 · Towards the square — placeholder' },
    },
  ] as RibbonItem[],
};

// ── Capitolo 3 · La processione del carro fino in piazza (diorama 2.5D) ────
export const diorama = {
  chapter: {
    kicker: { it: 'Capitolo 3', en: 'Chapter 3' },
    title: {
      it: 'Il carro verso la piazza',
      en: 'The cart towards the square',
    },
  },
  interlude: {
    it: 'Interludio placeholder: la sera il carro trionfale esce dal rione Piccianello e comincia la sua unica, ultima corsa verso la piazza.',
    en: 'Placeholder interlude: in the evening the triumphal cart leaves the Piccianello district and begins its one and only run to the square.',
  },
  back: {
    src: 'matera/sassi-con-nuvole.jpg',
    alt: 'Placeholder — i Sassi come fondale.',
  },
  mid: {
    src: 'matera/fossile.jpg',
    alt: 'Placeholder — un dettaglio in primo piano.',
  },
  plate: {
    title: { it: 'Il carro entra in piazza', en: 'The cart enters the square' },
    body: {
      it: 'Targa placeholder: sfondo, foto e testo scorrono a velocità diverse — la profondità della folla.',
      en: 'Placeholder plate: background, photo and text move at different speeds — the depth of the crowd.',
    },
  },
};

// ── Capitolo 4 · Lo strazzo (strappo) ───────────────────────────────────────
export const strazzo = {
  chapter: {
    kicker: { it: 'Capitolo 4', en: 'Chapter 4' },
    title: { it: 'Lo strazzo', en: 'The tearing' },
  },
  interlude: {
    it: 'Interludio placeholder: tre giri della piazza, poi il carro si ferma. La folla sa cosa viene adesso.',
    en: 'Placeholder interlude: three laps of the square, then the cart stops. The crowd knows what comes next.',
  },
  cart: {
    src: 'matera/costellazione-sassi.jpg',
    alt: 'Placeholder — il carro intero (foto provvisoria).',
  },
  phases: [
    {
      title: { it: 'Il carro', en: 'The cart' },
      sub: {
        it: 'Un anno di lavoro in cartapesta — placeholder',
        en: 'A year of papier-mâché work — placeholder',
      },
    },
    {
      title: { it: 'Lo strazzo', en: 'The tearing' },
      sub: { it: 'La folla lo reclama — placeholder', en: 'The crowd claims it — placeholder' },
    },
    {
      title: { it: 'I frammenti', en: 'The fragments' },
      sub: {
        it: 'Ognuno porta a casa un pezzo — placeholder',
        en: 'Everyone takes home a piece — placeholder',
      },
    },
  ],
  pieces: [
    {
      src: 'matera/cinema-guerrieri.jpg',
      alt: 'Placeholder — momento dello strazzo 01.',
      caption: { it: 'Momento 01 — placeholder', en: 'Moment 01 — placeholder' },
    },
    {
      src: 'matera/fossile.jpg',
      alt: 'Placeholder — momento dello strazzo 02.',
      caption: { it: 'Momento 02 — placeholder', en: 'Moment 02 — placeholder' },
    },
    {
      src: 'matera/finestra.jpg',
      alt: 'Placeholder — momento dello strazzo 03.',
      caption: { it: 'Momento 03 — placeholder', en: 'Moment 03 — placeholder' },
    },
    {
      src: 'matera/barisano-2.jpg',
      alt: 'Placeholder — momento dello strazzo 04.',
      caption: { it: 'Momento 04 — placeholder', en: 'Moment 04 — placeholder' },
    },
  ],
};

// ── Epilogo · I frammenti ───────────────────────────────────────────────────
export const epilogue = {
  kicker: { it: 'Epilogo', en: 'Epilogue' },
  title: { it: 'La notte dopo', en: 'The night after' },
  body: {
    it: 'Testo di chiusura placeholder: la piazza si svuota, i pezzi del carro girano di mano in mano. Fra un anno, un carro nuovo.',
    en: 'Placeholder closing text: the square empties, pieces of the cart pass from hand to hand. In a year, a new cart.',
  },
  photos: [
    {
      src: 'matera/barisano-2.jpg',
      alt: 'Placeholder — una scena nei Sassi.',
      caption: { it: 'Epilogo 01 — placeholder', en: 'Epilogue 01 — placeholder' },
    },
    {
      src: 'matera/fossile.jpg',
      alt: 'Placeholder — un fossile in un muro dei Sassi.',
      caption: { it: 'Epilogo 02 — placeholder', en: 'Epilogue 02 — placeholder' },
    },
  ],
};
