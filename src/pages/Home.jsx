/* eslint-disable no-unused-vars */
// pages/Home.jsx
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import HeroSlider from "../components/HeroSlider.jsx";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const slides = [
    { type: "image", src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2070", alt: "Ceremony" },
    { type: "image", src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1974", alt: "Reception" },
    { type: "image", src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=2070", alt: "Portrait" }
  ];

  return (
    <div ref={containerRef} className="bg-studio-black text-studio-white transition-colors duration-300">
      {/* 1. HERO SECTION: Full Screen Immersive */}
      <div className="relative h-screen w-full overflow-hidden">
        <HeroSlider slides={slides} heightClass="h-full" />

        {/* Overlay with massive typography */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/30 pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center text-white"
          >
            <span className="block font-serif text-6xl md:text-9xl italic tracking-tighter loading-tight mix-blend-overlay opacity-90">
              Capturing
            </span>
            <span className="block font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-white/80 mt-4 mb-4">
              Timeless &bull; Cinematic &bull; Real
            </span>
            <span className="block font-serif text-6xl md:text-9xl tracking-tighter leading-tight mix-blend-overlay opacity-90">
              Moments
            </span>
          </motion.h1>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </div>

      {/* 2. INTRODUCTION: Minimal Text */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl leading-tight text-studio-white/90"
          >
            "We don't just take photographs. We craft <span className="text-studio-accent italic">visual legacies</span> that you will cherish for generations."
          </motion.p>
          <div className="mt-12 flex justify-center gap-8">
            <Stats number="10+" label="Years Experience" />
            <Stats number="500+" label="Weddings Curated" />
            <Stats number="100%" label="Love Stories" />
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE: Asymmetric Grid (Masonry Vibe) */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Col 1 */}
          <div className="md:col-span-4 flex flex-col gap-6 mt-12">
            <PortfolioCard src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=2070" title="Destination" category="Venues" />
            <PortfolioCard src="https://images.unsplash.com/photo-1623156293998-3238ab3c9a62?auto=format&fit=crop&q=80&w=1974" title="Intimate" category="Moments" aspectRatio="aspect-[3/4]" />
          </div>

          {/* Col 2 - Staggered */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <PortfolioCard src="https://images.unsplash.com/photo-1520854221256-17451cc330e7?auto=format&fit=crop&q=80&w=1974" title="Details" category="Decor" aspectRatio="aspect-[3/4]" />
            <div className="py-12 text-center">
              <h3 className="font-serif text-4xl mb-4 italic text-studio-white">Our Philosophy</h3>
              <p className="text-sm text-studio-white/60 leading-relaxed max-w-xs mx-auto">
                We believe in the beauty of the unscripted. The stolen glances, the tearful smiles, the chaos and the calm.
              </p>
              <a href="/portfolio" className="inline-block mt-6 border-b border-studio-accent text-studio-accent text-xs uppercase tracking-widest pb-1 hover:text-studio-white transition-colors">View Portfolio</a>
            </div>
            <PortfolioCard src="https://images.unsplash.com/photo-1522673607200-1645062cd958?auto=format&fit=crop&q=80&w=2070" title="Portraits" category="Couples" />
          </div>

          {/* Col 3 */}
          <div className="md:col-span-4 flex flex-col gap-6 mt-24">
            <PortfolioCard src="https://images.unsplash.com/photo-1533261271171-ec6e0ca8675c?auto=format&fit=crop&q=80&w=1974" title="Celebration" category="Events" aspectRatio="aspect-[3/4]" />
            <PortfolioCard src="https://images.unsplash.com/photo-1546193430-c2d207739ed7?auto=format&fit=crop&q=80&w=1974" title="Rituals" category="Tradition" />
          </div>
        </div>
      </section>

      {/* 4. PROCESS: How We Work (New Section) */}
      <section className="py-32 px-6 bg-studio-gray">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="How We Work" title="The Process" icon="process" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-16">
            <ProcessStep number="01" title="Discovery" desc="We meet (virtually or coffee) to understand your vision and vibe." />
            <ProcessStep number="02" title="Planning" desc="Locations, timelines, and shot lists—we handle the details." />
            <ProcessStep number="03" title="Capture" desc="We shoot unobtrusively, letting the day unfold naturally." />
            <ProcessStep number="04" title="Delivery" desc="Hand-edited, high-res images delivered in a beautiful online gallery." />
          </div>
        </div>
      </section>

      {/* 5. SERVICES: Curated Experiences (3 Stages with Images) */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="What we do" title="Curated Experiences" icon="services" />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceItem
              number="01"
              title="Wedding Photography"
              desc="Complete coverage of your big day, from the haldi to the vidaai. We are everywhere, yet invisible."
              img="https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&q=80&w=1974"
            />
            <ServiceItem
              number="02"
              title="Cinematic Films"
              desc="4K cinematic storytelling that feels less like a wedding video and more like a feature film."
              img="https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?auto=format&fit=crop&q=80&w=1996"
            />
            <ServiceItem
              number="03"
              title="Destination Planning"
              desc="From Jaipur palaces to Goa beaches, we handle logistics while you handle the fun."
              img="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2070"
            />
          </div>
        </div>
      </section>

      {/* 6. LOVE NOTES (Testimonials) (Auto Slider) */}
      <TestimonialsSlider />

      {/* 7. CTA: Large Footer Link (Animated) */}
      <section className="py-40 text-center overflow-hidden relative border-t border-[var(--border-color)]">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <h2 className="font-serif text-6xl md:text-9xl text-studio-white/50 hover:text-studio-white transition-colors duration-500 cursor-pointer">
            <a href="/contact">Let's Create.</a>
          </h2>
        </motion.div>
      </section>
    </div>
  );
}

/* --- Components --- */

function TestimonialsSlider() {
  const testimonials = [
    {
      id: 1,
      text: "Sanjay and his team were absolute magic. They felt like friends with cameras. The photos are better than we could have ever imagined.",
      name: "Riya & Aryan",
      location: "Udaipur, 2024",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 2,
      text: "The most seamless experience of our wedding. They captured moments we didn't even know happened. Pure art.",
      name: "Neha & Vikram",
      location: "Goa, 2023",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 3,
      text: "Cinematic, emotional, and timeless. Looking at our album feels like reliving the day all over again.",
      name: "Sarah & Mike",
      location: "Mumbai, 2024",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 px-6 bg-studio-gray overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative min-h-[400px] flex flex-col items-center">
        <span className="text-xs uppercase tracking-[0.2em] text-studio-accent mb-12 block">Love Notes</span>

        {/* CSS Grid for Stacking - Fixes Absolute Positioning Issues */}
        <div className="relative w-full grid grid-cols-1 grid-rows-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="col-start-1 row-start-1"
            >
              <h2 className="font-serif text-2xl md:text-5xl text-studio-white italic leading-relaxed mb-12">
                "{testimonials[index].text}"
              </h2>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 bg-studio-accent rounded-full mb-4 overflow-hidden border-2 border-studio-accent">
                  <img src={testimonials[index].img} alt={testimonials[index].name} className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-studio-white">{testimonials[index].name}</span>
                <span className="text-xs text-studio-white/50 mt-1">{testimonials[index].location}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-studio-accent" : "w-1.5 bg-studio-white/20 hover:bg-studio-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats({ number, label }) {
  return (
    <div className="text-center">
      <span className="block font-serif text-3xl text-studio-accent">{number}</span>
      <span className="text-[10px] uppercase tracking-widest text-studio-white/40">{label}</span>
    </div>
  );
}

function PortfolioCard({ src, title, category, aspectRatio = "aspect-[4/5]" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden cursor-pointer"
    >
      <div className={`${aspectRatio} overflow-hidden bg-studio-gray`}>
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7 }}
          src={src}
          alt={title}
          className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>
      <div className="absolute bottom-4 left-4 z-20">
        <p className="text-[10px] uppercase tracking-widest text-studio-accent mb-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">{category}</p>
        <h3 className="font-serif text-2xl text-white italic drop-shadow-md">{title}</h3>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
    </motion.div>
  );
}

function ServiceItem({ number, title, desc, img }) {
  return (
    <div className="group border-t border-[var(--border-color)] pt-8 hover:border-studio-accent transition-colors duration-300">
      {/* Image Stage */}
      <div className="w-full h-64 mb-6 overflow-hidden bg-studio-gray relative">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
      </div>
      <span className="text-xs text-studio-white/30 font-mono mb-4 block group-hover:text-studio-accent">{number}</span>
      <h3 className="font-serif text-3xl text-studio-white mb-4 group-hover:translate-x-2 transition-transform duration-300">{title}</h3>
      <p className="text-sm text-studio-white/50 leading-relaxed">{desc}</p>
    </div>
  );
}

function SectionTitle({ subtitle, title, icon }) {
  // Icon mapping
  const icons = {
    process: (
      <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    services: (
      <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    lens: (
      <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    heart: (
      <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    )
  };

  return (
    <div className="mb-8">
      <span className="block text-xs uppercase tracking-[0.2em] text-studio-accent mb-2">{subtitle}</span>
      <div className="flex items-center gap-4">
        {icon && (
          <span className="text-studio-accent opacity-60">
            {icons[icon]}
          </span>
        )}
        <h2 className="font-serif text-5xl md:text-6xl text-studio-white">{title}</h2>
      </div>
    </div>
  );
}

function ProcessStep({ number, title, desc }) {
  return (
    <div className="relative pl-8 border-l border-[var(--border-color)]">
      <span className="absolute -left-[5px] top-0 h-2.5 w-2.5 bg-studio-accent rounded-full" />
      <span className="text-xs text-studio-white/50 font-mono mb-2 block">{number}</span>
      <h4 className="font-serif text-2xl text-studio-white mb-2">{title}</h4>
      <p className="text-sm text-studio-white/60">{desc}</p>
    </div>
  )
}
