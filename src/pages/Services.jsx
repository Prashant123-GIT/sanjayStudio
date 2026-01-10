// pages/Services.jsx
import { motion } from "framer-motion";

export default function Services() {
  return (
    <div className="bg-studio-black text-studio-white min-h-screen pt-32 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-studio-accent mb-4 block">Our Expertise</span>
          <h1 className="font-serif text-6xl md:text-8xl text-studio-white mb-6">Curated Services</h1>
          <div className="h-[1px] w-24 bg-studio-white/10 mx-auto" />
        </motion.div>

        <div className="space-y-32">
          <ServiceBlock
            title="Wedding Photography"
            desc="Documenting your love story with an editorial eye. We capture the raw emotions, the candid laughter, and the silent tears that make your day unique."
            features={["Full Day Coverage", "Second Shooter", "High-Res Edited Images", "Online Gallery"]}
            img="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2070"
            align="left"
            price="Starting at ₹50,000"
          />

          <ServiceBlock
            title="Cinematography"
            desc="Cinema-grade 4K films that tell your story. We don't just record events; we weave a narrative that looks and feels like a feature film."
            features={["4K Highlights Film", "Full Ceremony Film", "Drone Coverage", "Teaser Trailer"]}
            img="https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=1888"
            align="right"
            price="Starting at ₹75,000"
          />

          <ServiceBlock
            title="Destination Management"
            desc="From scouting the perfect venue to handling logistics for hundreds of guests, we ensure your destination wedding is flawless."
            features={["Venue Scouting", "Guest Hospitality", "Vendor Coordination", "Transport Logistics"]}
            img="https://images.unsplash.com/photo-1544979590-37e9b47cd7bc?auto=format&fit=crop&q=80&w=1954"
            align="left"
            price="Custom Quote"
          />
        </div>
      </div>
    </div>
  );
}

function ServiceBlock({ title, desc, features, img, align, price }) {
  const isRight = align === "right";

  return (
    <div className={`flex flex-col md:flex-row gap-12 md:gap-20 items-center ${isRight ? "md:flex-row-reverse" : ""}`}>
      {/* Image Side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full md:w-1/2"
      >
        <div className="aspect-[4/5] overflow-hidden bg-studio-gray relative group">
          <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
          <div className="absolute inset-0 border border-white/5 pointer-events-none" />
        </div>
      </motion.div>

      {/* Content Side */}
      <motion.div
        initial={{ opacity: 0, x: isRight ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full md:w-1/2"
      >
        <h2 className="font-serif text-5xl md:text-6xl text-studio-white mb-6">{title}</h2>
        <p className="text-studio-white/70 leading-relaxed mb-8 text-lg">{desc}</p>

        <ul className="mb-8 space-y-3">
          {features.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm font-medium tracking-wide uppercase text-studio-white/80">
              <span className="w-1.5 h-1.5 bg-studio-accent rounded-full" />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6 pt-6 border-t border-[var(--border-color)]">
          <span className="font-serif text-2xl text-studio-accent italic">{price}</span>
          <a href="/contact" className="text-xs font-bold uppercase tracking-widest text-studio-white hover:text-studio-accent transition-colors">Book Now →</a>
        </div>
      </motion.div>
    </div>
  );
}
