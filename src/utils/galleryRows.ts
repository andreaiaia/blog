export interface GalleryImage {
  file: string;
  alt: string;
  width: number;
  height: number;
}

// width/height >= this: always its own full-width row.
const PANORAMA_ASPECT_RATIO = 2;
// width/height >= this (and below panorama): "horizontal", otherwise "vertical".
const HORIZONTAL_ASPECT_RATIO = 1;

type PhotoType = 'panorama' | 'horizontal' | 'vertical';

function aspectRatioOf(image: GalleryImage) {
  return image.width / image.height;
}

function classify(image: GalleryImage): PhotoType {
  const aspectRatio = aspectRatioOf(image);
  if (aspectRatio >= PANORAMA_ASPECT_RATIO) return 'panorama';
  return aspectRatio >= HORIZONTAL_ASPECT_RATIO ? 'horizontal' : 'vertical';
}

// Splits a count of verticals into groups of 3 or 4 with no remainder
// smaller than 3 — e.g. 9 -> [4, 5], 10 -> [4, 6], 11 -> [4, 4, 3].
// Counts below 3 are returned as-is; the caller merges them elsewhere.
function partitionIntoGroupsOf3Or4(count: number): number[] {
  if (count < 3) return count > 0 ? [count] : [];
  if (count === 5 || count === 6) return [count];
  if (count % 4 === 0) return Array(count / 4).fill(4);
  if (count % 3 === 0) return Array(count / 3).fill(3);

  const remainder = count % 4;
  if (remainder === 3) {
    return [...Array(Math.floor(count / 4)).fill(4), 3];
  }
  const groups = Array(Math.floor(count / 4) - 1).fill(4);
  groups.push(4 + remainder);
  return groups;
}

interface Entry {
  image: GalleryImage;
  index: number;
  aspectRatio: number;
  type: PhotoType;
}

// Decides which photos share a row, following a small set of allowed
// shapes: a panorama alone, a pair (2 horizontal, or 1 horizontal + 1
// vertical), or a group of verticals (preferring 4, then 3). Reordering is
// allowed — rows are assembled by shape first, then placed back roughly at
// the average original position of their members, so a lone photo that
// can't find a same-slice partner still pairs up with one from elsewhere
// in the album instead of ending up alone.
export function packRows(images: GalleryImage[]): GalleryImage[][] {
  const entries: Entry[] = images.map((image, index) => ({
    image,
    index,
    aspectRatio: aspectRatioOf(image),
    type: classify(image),
  }));

  const panoramaRows = entries
    .filter((entry) => entry.type === 'panorama')
    .map((entry) => [entry]);

  const horizontals = entries.filter((entry) => entry.type === 'horizontal');
  const verticals = entries.filter((entry) => entry.type === 'vertical');

  const pairedRows: Entry[][] = [];

  if (horizontals.length % 2 === 1 && verticals.length > 0) {
    // Pick the widest horizontal as the odd one's vertical partner —
    // pairing a near-square photo with a narrow portrait instead would
    // need a much taller shared row height to fill the width.
    let widestIndex = 0;
    horizontals.forEach((entry, i) => {
      if (entry.aspectRatio > horizontals[widestIndex].aspectRatio) {
        widestIndex = i;
      }
    });
    const [widest] = horizontals.splice(widestIndex, 1);
    pairedRows.push([widest, verticals.shift()!]);
  }
  while (horizontals.length >= 2) {
    pairedRows.push([horizontals.shift()!, horizontals.shift()!]);
  }
  if (horizontals.length === 1) {
    pairedRows.push([horizontals.shift()!]);
  }

  // Group verticals in 3s or 4s only (per the allowed shapes — pairs of 2
  // verticals aren't one of them: two narrow portraits sharing a row on
  // their own get absurdly tall). Whenever the count doesn't split cleanly,
  // fold the remainder into the last group (5 or 6 wide) rather than leave
  // a stray 1 or 2 behind.
  partitionIntoGroupsOf3Or4(verticals.length).forEach((size) => {
    pairedRows.push(verticals.splice(0, size));
  });

  // A row is only invalid here if it has just 1 item (no partner was
  // available anywhere in the album), or if it's an all-vertical pair of 2
  // (not an allowed shape). HH/HV pairs of 2 are fine as-is. Merge any
  // invalid row into another valid one rather than render it alone.
  const isAllVertical = (row: Entry[]) =>
    row.every((entry) => entry.type === 'vertical');
  const isInvalid = (row: Entry[]) =>
    row.length === 1 || (row.length === 2 && isAllVertical(row));

  const host = pairedRows.find((row) => !isInvalid(row));
  if (host) {
    pairedRows
      .filter((row) => isInvalid(row) && row !== host)
      .forEach((orphan) => host.push(...orphan));
  }
  const resolvedRows = pairedRows.filter(
    (row) => row === host || !isInvalid(row)
  );

  const rows = [...resolvedRows, ...panoramaRows];
  rows.sort((a, b) => {
    const avgIndex = (row: Entry[]) =>
      row.reduce((sum, entry) => sum + entry.index, 0) / row.length;
    return avgIndex(a) - avgIndex(b);
  });

  return rows.map((row) => row.map((entry) => entry.image));
}
