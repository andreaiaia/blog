<script>
  import { onMount } from 'svelte';
  import css from './Gallery.module.scss';
  import CFImage from '../CFImage/CFImage.svelte';

  export let images = [];

  const BOX_SPACING = 16;
  const MOBILE_BREAKPOINT = 640;
  const RESIZE_DEBOUNCE = 100;
  // .gallery has no CSS padding — position: absolute children ignore an
  // ancestor's padding entirely (their containing block is the padding box,
  // whose origin is the *outer* edge of the padding, i.e. the border box),
  // so the horizontal inset is applied by hand here instead.
  const GALLERY_PADDING = 16;
  // Matches the .gallery max-width (1200px), so SSR output is already
  // correctly laid out for the common desktop case before any client-side
  // measurement can run.
  const DEFAULT_WIDTH = 1200;
  // width/height >= this: always its own full-width row.
  const PANORAMA_ASPECT_RATIO = 2;
  // width/height >= this (and below panorama): "horizontal", otherwise "vertical".
  const HORIZONTAL_ASPECT_RATIO = 1;

  // Splits a count of verticals into groups of 3 or 4 with no remainder
  // smaller than 3 — e.g. 9 -> [4, 5], 10 -> [4, 6], 11 -> [4, 4, 3].
  // Counts below 3 are returned as-is; the caller merges them elsewhere.
  function partitionIntoGroupsOf3Or4(count) {
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

  function classify(image) {
    const aspectRatio = image.width / image.height;
    if (aspectRatio >= PANORAMA_ASPECT_RATIO) return 'panorama';
    return aspectRatio >= HORIZONTAL_ASPECT_RATIO ? 'horizontal' : 'vertical';
  }

  // Decides which photos share a row, following a small set of allowed
  // shapes: a panorama alone, a pair (2 horizontal, or 1 horizontal + 1
  // vertical), or a group of verticals (preferring 4, then 3). Reordering is
  // allowed — rows are assembled by shape first, then placed back roughly at
  // the average original position of their members, so a lone photo that
  // can't find a same-slice partner still pairs up with one from elsewhere
  // in the album instead of ending up alone (which is what forced the
  // earlier "row of 1" to blow up to an absurd height).
  function packRows(images) {
    const entries = images.map((image, index) => ({
      image,
      index,
      aspectRatio: image.width / image.height,
      type: classify(image),
    }));

    const panoramaRows = entries
      .filter((entry) => entry.type === 'panorama')
      .map((entry) => [entry]);

    const horizontals = entries.filter((entry) => entry.type === 'horizontal');
    const verticals = entries.filter((entry) => entry.type === 'vertical');

    const pairedRows = [];

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
      pairedRows.push([widest, verticals.shift()]);
    }
    while (horizontals.length >= 2) {
      pairedRows.push([horizontals.shift(), horizontals.shift()]);
    }
    if (horizontals.length === 1) {
      pairedRows.push([horizontals.shift()]);
    }
    // Group verticals in 3s or 4s only (per the allowed shapes — pairs of 2
    // verticals aren't one of them: two narrow portraits stretched to fill
    // a full-width row on their own get absurdly tall). Whenever the count
    // doesn't split cleanly, fold the remainder into the last group (5 or 6
    // wide) rather than leave a stray 1 or 2 behind.
    partitionIntoGroupsOf3Or4(verticals.length).forEach((size) => {
      pairedRows.push(verticals.splice(0, size));
    });

    // A row is only invalid here if it has just 1 item (no partner was
    // available anywhere in the album), or if it's an all-vertical pair of
    // 2 (not an allowed shape, and the reason for the jarring-tall-row bug
    // above). HH/HV pairs of 2 are fine as-is. Merge any invalid row into
    // another valid one rather than render it alone or stretch it absurdly.
    const isAllVertical = (row) =>
      row.every((entry) => entry.type === 'vertical');
    const isInvalid = (row) =>
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
      const avgIndex = (row) =>
        row.reduce((sum, entry) => sum + entry.index, 0) / row.length;
      return avgIndex(a) - avgIndex(b);
    });

    return rows.map((row) => row.map((entry) => entry.image));
  }

  // Solves a single uniform height for the row so it fills the full width
  // exactly, while every photo keeps its own aspect ratio untouched.
  function layoutRow(rowImages, top, width) {
    const totalAspectRatio = rowImages.reduce(
      (sum, image) => sum + image.width / image.height,
      0
    );
    const height =
      (width - BOX_SPACING * (rowImages.length - 1)) / totalAspectRatio;

    let left = 0;
    const boxes = rowImages.map((image) => {
      const aspectRatio = image.width / image.height;
      const boxWidth = aspectRatio * height;
      const box = { aspectRatio, top, left, width: boxWidth, height };
      left += boxWidth + BOX_SPACING;
      return box;
    });

    return { boxes, height };
  }

  function computeLayout(width) {
    if (!width || images.length === 0) {
      return { boxes: [], containerHeight: 0 };
    }

    const contentWidth = width - GALLERY_PADDING * 2;

    if (contentWidth < MOBILE_BREAKPOINT) {
      // Single column: natural aspect ratio, nothing cropped or paired.
      let top = 0;
      const boxes = images.map((image) => {
        const aspectRatio = image.width / image.height;
        const height = contentWidth / aspectRatio;
        const box = {
          aspectRatio,
          top,
          left: GALLERY_PADDING,
          width: contentWidth,
          height,
        };
        top += height + BOX_SPACING;
        return box;
      });
      return { boxes, containerHeight: Math.max(0, top - BOX_SPACING) };
    }

    const rows = packRows(images);
    const boxesByImage = new Map();
    let top = 0;

    rows.forEach((rowImages) => {
      const { boxes: rowBoxes, height } = layoutRow(rowImages, top, contentWidth);
      rowImages.forEach((image, i) => boxesByImage.set(image, rowBoxes[i]));
      top += height + BOX_SPACING;
    });

    const boxes = images.map((image) => {
      const box = boxesByImage.get(image);
      return { ...box, left: box.left + GALLERY_PADDING };
    });
    return { boxes, containerHeight: Math.max(0, top - BOX_SPACING) };
  }

  let currentImage = null;
  let showLightbox = false;
  let containerEl;
  let { boxes, containerHeight } = computeLayout(DEFAULT_WIDTH);

  onMount(() => {
    let resizeTimeout;
    let isFirstMeasurement = true;

    const applyLayout = (width) => {
      ({ boxes, containerHeight } = computeLayout(width));
    };

    // Always measure via contentRect (padding already excluded) rather than
    // mixing in clientWidth (which includes padding) for the first call —
    // that mismatch under-reported the available width on narrow (mobile)
    // viewports, where the ~32px padding is a much larger share of the total.
    const resizeObserver = new ResizeObserver(([entry]) => {
      if (isFirstMeasurement) {
        isFirstMeasurement = false;
        applyLayout(entry.contentRect.width);
        return;
      }
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(
        () => applyLayout(entry.contentRect.width),
        RESIZE_DEBOUNCE
      );
    });

    resizeObserver.observe(containerEl);

    return () => {
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
    };
  });

  const openLightbox = (image) => {
    currentImage = image;
    showLightbox = true;
    document.body.classList.add('no-scroll');
  };

  const closeLightbox = () => {
    showLightbox = false;
    currentImage = null;
    document.body.classList.remove('no-scroll');
  };

  const nextImage = () => {
    const currentIndex = images.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % images.length;
    currentImage = images[nextIndex];
  };

  const prevImage = () => {
    const currentIndex = images.indexOf(currentImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    currentImage = images[prevIndex];
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') nextImage(event);
    if (event.key === 'ArrowLeft') prevImage(event);
  };
</script>

<div
  class={css.gallery}
  bind:this={containerEl}
  style={`height:${containerHeight}px`}
>
  {#each images as image, i}
    {#if boxes[i]}
      <button
        on:click={() => openLightbox(image)}
        class={css.imageButton}
        style={`top:${boxes[i].top}px;left:${boxes[i].left}px;width:${boxes[i].width}px;height:${boxes[i].height}px`}
        aria-label="Open image in lightbox"
      >
        <CFImage
          src={image.file}
          alt={image.alt}
          className={css.image}
          sizes={`${Math.ceil(boxes[i].width)}px`}
        />
      </button>
    {/if}
  {/each}
  {#if showLightbox}
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div
      class={css.lightbox}
      on:click={closeLightbox}
      role="dialog"
      aria-modal="true"
      tabindex="0"
      on:keydown={handleKeyDown}
    >
      {#key currentImage.file}
        <CFImage
          className={css.lightboxContent}
          src={currentImage.file}
          alt={currentImage.alt}
          widths={[1200]}
          sizes="90vw"
        />
      {/key}

      <button
        class={`${css.button} ${css.closeButton}`}
        on:click|stopPropagation={closeLightbox}
        aria-label="Close lightbox"
      >
        ✕
      </button>
      <button
        class={`${css.button} ${css.prevButton}`}
        on:click|stopPropagation={prevImage}
        aria-label="Previous image"
      >
        ←
      </button>
      <button
        class={`${css.button} ${css.nextButton}`}
        on:click|stopPropagation={nextImage}
        aria-label="Next image"
      >
        →
      </button>
    </div>
  {/if}
</div>
