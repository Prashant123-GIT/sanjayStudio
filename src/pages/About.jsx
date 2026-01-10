// pages/About.jsx
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-studio-black text-studio-white min-h-screen pt-32 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-end mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-studio-accent mb-4 block">The Studio</span>
            <h1 className="font-serif text-6xl md:text-8xl text-studio-white leading-none">Behind the <br /><span className="italic text-studio-white/80">Lens</span></h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="pb-2"
          >
            <p className="text-lg text-studio-white/70 leading-relaxed">
              Sanjay Studio is a boutique photography firm born from a passion for storytelling. We don't just click pictures; we freeze time, preserving the raw, unscripted emotions of your most precious moments.
            </p>
          </motion.div>
        </div>

        {/* Content Block */}
        <div className="relative mb-32">
          <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-studio-gray mb-12">
            <img src="https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&q=80&w=2535" alt="Studio Team" className="w-full h-full object-cover opacity-80" />
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="md:col-span-1">
              <h3 className="font-serif text-4xl text-studio-white mb-4">Our Vision</h3>
            </div>
            <div className="md:col-span-2">
              <p className="text-studio-white/60 leading-relaxed mb-6">
                We believe that every wedding is a unique story waiting to be told. Our approach is unobtrusive and documentary-style, allowing us to capture the genuine interactions and joy of your celebration without manufacturing moments.
              </p>
              <p className="text-studio-white/60 leading-relaxed">
                With over a decade of experience in the industry, we have honed our craft to deliver not just photographs, but heirlooms that you will treasure for a lifetime.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-y border-[var(--border-color)] py-16">
          <Stat number="10+" label="Years Active" />
          <Stat number="500+" label="Weddings" />
          <Stat number="50+" label="Destinations" />
          <Stat number="∞" label="Memories" />
        </div>
      </div>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div className="text-center">
      <span className="block font-serif text-5xl md:text-6xl text-studio-white mb-2">{number}</span>
      <span className="text-xs uppercase tracking-widest text-studio-accent">{label}</span>
    </div>
  );
}
