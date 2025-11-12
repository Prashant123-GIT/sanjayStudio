// components/HeroSlider.jsx
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * slides: Array<{ type: 'image'|'video', src: string, alt?: string }>
 * heightClass: Tailwind height like "h-[52vh] md:h-[70vh]"
 */
export default function HeroSlider({
  slides = [],
  interval = 6000,
  heightClass = "h-[52vh] md:h-[70vh]",
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = useRef(null);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    t.current = setTimeout(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearTimeout(t.current);
  }, [index, paused, interval, slides.length]);

  const goto = (i) => setIndex(((i % slides.length) + slides.length) % slides.length);
  const prev = () => goto(index - 1);
  const next = () => goto(index + 1);

  return (
    <section
      className={`relative w-full ${heightClass} overflow-hidden`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.4, scale: 1.01 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          aria-hidden="true"
        >
          {slides[index]?.type === "video" ? (
            <video
              className="h-full w-full object-cover"
              src={slides[index].src}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              className="h-full w-full object-cover"
              src={slides[index]?.src}
              alt={slides[index]?.alt || ""}
            />
          )}
          {/* darken for text legibility */}
          <div className="absolute inset-0 bg-black/35" />
        </motion.div>
      </AnimatePresence>

      {/* Arrows (hidden on small screens to keep clean) */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="hidden sm:grid absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 place-items-center rounded-full bg-white/85 border border-black/10 backdrop-blur active:scale-[0.98]"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="hidden sm:grid absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 place-items-center rounded-full bg-white/85 border border-black/10 backdrop-blur active:scale-[0.98]"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goto(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={[
                "h-2.5 rounded-full transition-all",
                i === index ? "w-6 bg-emerald-700" : "w-2.5 bg-white/70 hover:bg-white",
              ].join(" ")}
            />
          ))}
        </div>
      )}
    </section>
  );
}
