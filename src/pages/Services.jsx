// pages/Services.jsx
import { motion } from "framer-motion";
import AnimatedBox from "../components/AnimatedBox.jsx";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.55, delay },
});
const hoverLift = { whileHover: { y: -4, scale: 1.01, transition: { duration: 0.2 } } };

export default function Services() {
  const services = [
    { title: "Wedding Photography", desc: "Full-day coverage, candid & traditional." },
    { title: "Cinematic Wedding Films", desc: "Highlight films, teasers, full edits." },
    { title: "Pre-Wedding Shoots", desc: "Story-driven concepts at beautiful locations." },
    { title: "Birthday / Events", desc: "Candid, documentary-style coverage." },
    { title: "Drone Add-on", desc: "Aerial views where permitted." },
    { title: "Photo Albums", desc: "Premium layouts & archival prints." },
  ];

  return (
    <div className="bg-[#f8efee]">
      {/* Hero */}
      <div className="relative h-[38vh] min-h-[260px] w-full overflow-hidden">
        <img
          src="/services/hero.jpg"
          alt="Services hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="brand-serif text-white text-4xl md:text-5xl font-semibold drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            Services
          </motion.h1>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <motion.p
          {...fadeUp(0)}
          className="mx-auto max-w-3xl text-[17px] leading-7 text-gray-800/90 text-center"
        >
          From intimate ceremonies to grand celebrations, we craft photo &amp; film experiences
          that feel personal, elegant, and timeless.
        </motion.p>

        {/* Cards */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-10 grid md:grid-cols-2 gap-8"
        >
          {services.map((s, i) => (
            <motion.li
              key={s.title}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.05 } },
              }}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
              {...hoverLift}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="brand-serif text-xl font-semibold text-emerald-900">{s.title}</h3>
                <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-800">
                  Popular
                </span>
              </div>
              <p className="mt-2 text-[15px] leading-7 text-gray-700/90">{s.desc}</p>

              <div className="mt-4 rounded-xl overflow-hidden border border-black/10 bg-gray-50">
                {/* Replace AnimatedBox with a real image if you have one */}
                {/* <img src="/services/wedding-photo.jpg" alt={s.title} className="h-40 w-full object-cover" /> */}
                <AnimatedBox h="h-40" />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 text-xs">
                  Consultation
                </span>
                <span className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 text-xs">
                  On-ground Team
                </span>
                <span className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 text-xs">
                  Edited Deliverables
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA strip */}
        <motion.div
          {...fadeUp(0.15)}
          className="mt-12 rounded-2xl border border-black/10 bg-white p-6 md:p-8 text-center shadow-sm"
        >
          <h4 className="brand-serif text-2xl font-semibold text-emerald-900">
            Ready to plan your photo &amp; film?
          </h4>
          <p className="mt-2 text-[15px] text-gray-700/90">
            Share your dates and vision—we’ll create a custom package for you.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-white font-semibold shadow-sm bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-700"
            >
              Get Free Quote
            </a>
            <a
              href="https://wa.me/0000000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-white font-semibold shadow-sm bg-[#6c1d86] hover:opacity-95 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6c1d86]"
            >
              Chat with us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
