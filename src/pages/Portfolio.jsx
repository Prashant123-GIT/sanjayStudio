// pages/Portfolio.jsx
import { useEffect, useMemo, useState, useCallback } from "react";

const TABS = ["All", "Pre-Wedding", "Wedding", "Reception", "Birthday", "Event"];

const images = [
  // Pre-Wedding
  { src: "/portfolio/prewedding-1.jpg", w: 900, h: 1200, cat: "Pre-Wedding" },
  { src: "/portfolio/prewedding-2.jpg", w: 1600, h: 1000, cat: "Pre-Wedding" },
  { src: "/portfolio/prewedding-3.jpg", w: 1200, h: 800, cat: "Pre-Wedding" },
  // Wedding
  { src: "/portfolio/wedding-1.jpg", w: 1400, h: 934, cat: "Wedding" },
  { src: "/portfolio/wedding-2.jpg", w: 1000, h: 1400, cat: "Wedding" },
  { src: "/portfolio/wedding-3.jpg", w: 2000, h: 1333, cat: "Wedding" },
  // Reception
  { src: "/portfolio/reception-1.jpg", w: 1600, h: 900, cat: "Reception" },
  { src: "/portfolio/reception-2.jpg", w: 1000, h: 1500, cat: "Reception" },
  { src: "/portfolio/reception-3.jpg", w: 1200, h: 900, cat: "Reception" },
  // Birthday
  { src: "/portfolio/birthday-1.jpg", w: 1080, h: 1350, cat: "Birthday" },
  { src: "/portfolio/birthday-2.jpg", w: 1600, h: 1000, cat: "Birthday" },
  // Event
  { src: "/portfolio/event-1.jpg", w: 1500, h: 1000, cat: "Event" },
  { src: "/portfolio/event-2.jpg", w: 1200, h: 1600, cat: "Event" },
];

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [openIndex, setOpenIndex] = useState(null); // index within filtered list

  const filtered = useMemo(
    () => (active === "All" ? images : images.filter((i) => i.cat === active)),
    [active]
  );

  const openLightbox = (idx) => setOpenIndex(idx);
  const closeLightbox = () => setOpenIndex(null);

  const goPrev = useCallback(() => {
    if (openIndex === null) return;
    setOpenIndex((i) => (i === 0 ? filtered.length - 1 : i - 1));
  }, [openIndex, filtered.length]);

  const goNext = useCallback(() => {
    if (openIndex === null) return;
    setOpenIndex((i) => (i === filtered.length - 1 ? 0 : i + 1));
  }, [openIndex, filtered.length]);

  // keyboard controls in lightbox
  useEffect(() => {
    const onKey = (e) => {
      if (openIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, goPrev, goNext]);

  // prevent body scroll when lightbox open
  useEffect(() => {
    if (openIndex !== null) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  return (
    <div className="bg-[#f8efee]">
      {/* Hero header (like your screenshot) */}
      <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden">
        <img
          src="/portfolio/hero.jpg"
          alt="Portfolio hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <h1 className="brand-serif text-white text-4xl md:text-6xl font-semibold tracking-wide drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]">
            PORTFOLIO
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        {/* Filter tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {TABS.map((t) => {
            const activeTab = active === t;
            return (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={[
                  "rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-all",
                  activeTab
                    ? "bg-emerald-700 text-white"
                    : "bg-white text-gray-700 border border-black/10 hover:bg-gray-50",
                ].join(" ")}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Masonry collage */}
        <div
          className="
            mt-8
            columns-1 sm:columns-2 lg:columns-3
            gap-4 [column-fill:_balance]
          "
        >
          {filtered.map((img, idx) => {
            // compute aspect ratio to hint variable heights
            const ratio = img.h / img.w; // taller -> bigger minHeight
            const minH =
              ratio > 1.2 ? "min-h-[360px]" :
              ratio < 0.8 ? "min-h-[220px]" :
              "min-h-[280px]";

            return (
              <figure
                key={img.src + idx}
                className={`mb-4 break-inside-avoid relative overflow-hidden rounded-lg border border-black/10 bg-white ${minH} group`}
              >
                <button
                  onClick={() => openLightbox(idx)}
                  className="absolute inset-0 z-10"
                  aria-label="Open image preview"
                />
                <img
                  src={img.src}
                  alt={img.cat}
                  className="
                    h-full w-full object-cover
                    transition-transform duration-500 ease-out
                    group-hover:scale-[1.04]
                  "
                  loading="lazy"
                />

                {/* category pill (top-left) */}
                <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[11px] font-medium text-white">
                  {img.cat}
                </span>
              </figure>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX */}
      {openIndex !== null && (
        <Lightbox
          items={filtered}
          index={openIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}

/* ------------------ Lightbox ------------------ */
function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
        aria-label="Close preview"
      >
        ✕
      </button>

      {/* prev / next */}
      {items.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      {/* image */}
      <div
        className="relative max-h-[88vh] w-auto max-w-[92vw] overflow-hidden rounded-lg border border-white/10 bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.cat}
          className="block h-full max-h-[88vh] w-auto object-contain"
        />
        <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-sm text-white">
          {item.cat}
        </figcaption>
      </div>
    </div>
  );
}
