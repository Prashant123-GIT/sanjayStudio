// pages/About.jsx
import { motion } from "framer-motion";
import AnimatedBox from "../components/AnimatedBox.jsx";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.55, delay },
});

const cardHover = {
  whileHover: { y: -4, scale: 1.01, transition: { duration: 0.2 } },
};

export default function About() {
  return (
    <div className="bg-[#f8efee]">
      {/* Hero band (soft overlay like Portfolio) */}
      <div className="relative h-[38vh] min-h-[260px] w-full overflow-hidden">
        <img
          src="/about/hero.jpg"
          alt="Sanjay Studio – candid moments"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="brand-serif text-white text-4xl md:text-5xl font-semibold tracking-wide drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]"
          >
            About Snjay Studio
          </motion.h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Intro grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div {...fadeUp(0.02)} className="lg:col-span-2">
            <p className="text-[17px] leading-7 text-gray-800/90">
              We capture emotions, moments, and stories across weddings and events. Our style blends
              candid storytelling with cinematic frames—preserving the feel of the day while keeping your
              memories timeless.
            </p>
            <p className="text-[17px] leading-7 text-gray-800/90 mt-4">
              Based in Ranchi and available for travel across India. Share your vision—we’ll tailor a
              photography &amp; film package that fits your celebration perfectly.
            </p>

            {/* small CTA group */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-white font-semibold shadow-sm bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-700"
              >
                Get In Touch
              </a>
              <a
                href="https://wa.me/0000000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-white font-semibold shadow-sm bg-[#6c1d86] hover:opacity-95 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6c1d86]"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Visual card (use your AnimatedBox as placeholder) */}
          <motion.div
            {...fadeUp(0.08)}
            className="rounded-2xl overflow-hidden border border-black/10 bg-white shadow-sm"
            {...cardHover}
          >
            {/* Replace this with a real image for the about page if you have one */}
            {/* <img src="/about/team.jpg" alt="Our team at work" className="h-56 w-full object-cover" /> */}
            <AnimatedBox h="h-56" />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.12)}
          className="mt-10 grid sm:grid-cols-3 gap-6"
        >
          {[
            { label: "Years Experience", value: "7+" },
            { label: "Happy Couples", value: "250+" },
            { label: "Projects", value: "500+" },
          ].map((item) => (
            <motion.div
              key={item.label}
              className="rounded-2xl border border-black/10 bg-white p-6 text-center shadow-sm"
              {...cardHover}
            >
              <div className="brand-serif text-4xl font-semibold text-emerald-900">
                {item.value}
              </div>
              <div className="mt-1 text-[15px] text-gray-700/90">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Approach strip to keep theme parity */}
        <motion.section
          {...fadeUp(0.18)}
          className="mt-14 rounded-2xl border border-black/10 bg-white p-6 md:p-8"
        >
          <h2 className="brand-serif text-2xl md:text-[28px] font-semibold text-emerald-900 text-center">
            Our Promise
          </h2>
          <ul className="mt-5 grid sm:grid-cols-2 gap-4 text-[15px] leading-7 text-gray-800/90">
            <li className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <span className="font-semibold text-emerald-900">Personalised storytelling</span> — frames that reflect your
              personalities, cultures, and traditions.
            </li>
            <li className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <span className="font-semibold text-emerald-900">Seamless on-ground team</span> — light footprint, big results.
            </li>
            <li className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <span className="font-semibold text-emerald-900">Cinematic films &amp; crisp photos</span> — timeless color, clean edits.
            </li>
            <li className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <span className="font-semibold text-emerald-900">On-time deliveries</span> — clear timelines and easy sharing.
            </li>
          </ul>
        </motion.section>
      </div>
    </div>
  );
}
