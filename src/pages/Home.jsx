// pages/Home.jsx
import { motion } from "framer-motion";
import HeroSlider from "../components/HeroSlider.jsx";

export default function Home() {
  const slides = [
    // Replace these with your real files in /public
    { type: "video", src: "/wedding-hero-1.mp4", alt: "Wedding highlight" },
    { type: "image", src: "/wedding-hero-2.jpg", alt: "Ceremony" },
    { type: "image", src: "/wedding-hero-3.jpg", alt: "Reception" },
  ];

  // simple fade-up helper
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.55, delay },
  });

  function StarIcon({ className, half = false }) {
    return half ? (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
        fill="currentColor"
      >
        <defs>
          <linearGradient id="halfGrad">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M12 17.3 6.9 20l1-5.8L4 9.8l5.9-.9L12 3.5l2.1 5.4 5.9.9-3.9 4.4 1 5.8z"
          fill="url(#halfGrad)"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    ) : (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M12 17.3 6.9 20l1-5.8L4 9.8l5.9-.9L12 3.5l2.1 5.4 5.9.9-3.9 4.4 1 5.8z" />
      </svg>
    );
  }

  function QuotationIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <path
          d="M9 7c-2.2 0-4 1.8-4 4 0 1.9 1.3 3.5 3 3.9V19h3v-7c0-2.2-1.8-5-2-5Zm9 0c-2.2 0-4 1.8-4 4 0 1.9 1.3 3.5 3 3.9V19h3v-7c0-2.2-1.8-5-2-5Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    );
  }

  return (
    <>
      {/* Full-bleed hero with overlaid serif heading */}
      <div className="relative">
        <HeroSlider slides={slides} heightClass="h-[56vh] md:h-[78vh]" />

        {/* Overlaid headline */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="brand-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-semibold text-center leading-tight drop-shadow-[0_6px_32px_rgba(0,0,0,0.45)]"
          >
            Top Wedding Planners in Ranchi
          </motion.h1>
        </div>
      </div>

      {/* Blush content band with big heading + buttons */}
      <section
        className="px-4 py-12 md:py-16"
        style={{ backgroundColor: "#f8efee" }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <motion.h2
            {...fadeUp()}
            className="brand-serif text-3xl md:text-[44px] font-semibold tracking-tight text-emerald-800"
          >
            Crafting Your Dream Wedding with Snjay Studio
          </motion.h2>

          <motion.p
            {...fadeUp(0.05)}
            className="mt-5 text-[17px] leading-7 text-gray-800/90 max-w-3xl mx-auto"
          >
            Wedding planning can be exciting and overwhelming. From venue
            selection to décor, hospitality, entertainment, and cinematic
            films—we curate timeless celebrations with a modern touch.
          </motion.p>

          {/* Dual CTAs (purple + emerald, like the reference) */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-white font-semibold shadow-sm bg-[#6c1d86] hover:opacity-95 active:scale-[0.99]"
            >
              Get Free Quote
            </a>
            <a
              href="https://wa.me/your-number"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-white font-semibold shadow-sm bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99]"
            >
              Chat with us
            </a>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section
        className="border-y border-black/10 py-4"
        style={{ backgroundColor: "#f8efee" }}
      >
        <div className="overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap text-sm text-gray-900/80 uppercase tracking-[0.18em]"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i}>
                Wedding • Pre-Wedding • Haldi • Sangeet • Reception • Birthday •
                Maternity • Couple Shoots • Cinematic Films • Venue • Decor •
                Hospitality •
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-14" style={{ backgroundColor: "#f8efee" }}>
        <div className="mx-auto max-w-6xl">
          <h3 className="brand-serif text-center text-3xl md:text-[40px] font-semibold">
            <span className="text-emerald-800">Our </span>
            <span className="text-[#5e2b97]">Services</span>
          </h3>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Destination & Venue Selection",
                img: "/service-venue.jpg",
              },
              {
                title: "Logistics & Hospitality",
                img: "/service-hospitality.jpg",
              },
              { title: "Decor Design & Production", img: "/service-decor.jpg" },
              {
                title: "Entertainment & Artists",
                img: "/service-entertainment.jpg",
              },
            ].map((item, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-xl overflow-hidden bg-white shadow-sm border border-black/10"
              >
                <div className="aspect-[4/3] bg-gray-100">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5 text-center">
                  <h4 className="brand-serif text-[20px] font-semibold text-emerald-900">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-[15px] text-gray-700/90">
                    Curated with care—tailored to your vision.
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* NEW: How it works (5 simple steps)        */}
      {/* ========================================= */}
      <section className="px-4 py-16" style={{ backgroundColor: "#f8efee" }}>
        <div className="mx-auto max-w-6xl">
          <motion.h3
            {...fadeUp()}
            className="brand-serif text-center text-[30px] md:text-[36px] font-semibold text-emerald-900"
          >
            How it works
          </motion.h3>
          <p className="text-center text-sm text-gray-600 mt-1">
            5 simple steps for a stress-free wedding
          </p>

          <div className="mt-10 rounded-2xl border border-black/10 bg-white p-4 sm:p-6 md:p-8">
            <ol className="grid gap-8 md:grid-cols-5">
              {[
                {
                  title: "Speak to Us",
                  desc: "Tell us your dream wedding vision.",
                  Icon: ChatBubbleIcon,
                },
                {
                  title: "See the Options",
                  desc: "Explore tailored venue & service choices.",
                  Icon: CompassIcon,
                },
                {
                  title: "Get Custom Packages",
                  desc: "Personalized plans, just for you.",
                  Icon: PackageIcon,
                },
                {
                  title: "Book Us",
                  desc: "Lock in your perfect wedding team.",
                  Icon: HandshakeIcon,
                },
                {
                  title: "Relax",
                  desc: "We handle the details while you enjoy your big day!",
                  Icon: PalmIcon,
                },
              ].map(({ title, desc, Icon }, i) => (
                <motion.li
                  key={title}
                  {...fadeUp(i * 0.05)}
                  className="flex flex-col items-center text-center"
                >
                  <div className="grid place-items-center h-16 w-16 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <Icon className="h-8 w-8 text-emerald-700" />
                  </div>
                  <h4 className="mt-3 font-semibold text-emerald-900">
                    {title}
                  </h4>
                  <p className="mt-1 text-[14px] text-gray-700/90 max-w-[18ch]">
                    {desc}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* NEW: Our Love Filled Locations             */}
      {/* ========================================= */}
      <section className="px-4 py-16" style={{ backgroundColor: "#f8efee" }}>
        <div className="mx-auto max-w-6xl">
          <motion.h3
            {...fadeUp()}
            className="brand-serif text-center text-3xl md:text-[36px] font-semibold text-emerald-900"
          >
            Our Love Filled Locations
          </motion.h3>

          <div className="mt-8 rounded-2xl bg-white border border-black/10 p-5 md:p-8 grid md:grid-cols-2 gap-6">
            {/* Map/illustration */}
            <motion.div
              {...fadeUp(0.05)}
              className="rounded-xl border border-black/10 bg-rose-50 p-4"
            >
              {/* swap this for your detailed SVG/map image */}
              <img
                src="/map-india.svg"
                alt="Map of India highlighting our wedding locations"
                className="w-full h-auto"
              />
              <p className="sr-only">
                Key cities we cover across India with destination wedding
                planning.
              </p>
            </motion.div>

            {/* Copy */}
            <motion.div
              {...fadeUp(0.1)}
              className="text-[15px] leading-7 text-gray-800/90"
            >
              <p>
                From the serene backwaters of Kerala to the majestic palaces of
                Rajasthan, Snjay Studio has had the privilege of planning
                weddings in some of India’s most breathtaking locations. Each
                venue holds its own unique charm and heritage—providing the
                perfect backdrop for couples to exchange vows and begin their
                journey together.
              </p>

              <p className="mt-4">
                Whether it’s the vibrant colors of a traditional South Indian
                wedding or the regal opulence of a Northern extravaganza, we
                bring our expertise and passion to every celebration—embracing
                the rich tapestry of cultures, traditions, and landscapes that
                make India a land of love stories waiting to be told.
              </p>

              {/* quick pill list of popular cities */}
              <ul className="mt-5 flex flex-wrap gap-2">
                {[
                  "Jaipur",
                  "Udaipur",
                  "Jodhpur",
                  "Kerala",
                  "Goa",
                  "Mumbai",
                  "Ranchi",
                  "Kolkata",
                  "Delhi NCR",
                  "Hyderabad",
                ].map((city) => (
                  <li
                    key={city}
                    className="text-sm bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* NEW: Our Approach                          */}
      {/* ========================================= */}
      <section className="px-4 py-16" style={{ backgroundColor: "#f8efee" }}>
        <div className="mx-auto max-w-6xl">
          <motion.h3
            {...fadeUp()}
            className="brand-serif text-center text-3xl md:text-[36px] font-semibold"
          >
            <span className="text-emerald-800">Our </span>
            <span className="text-[#5e2b97]">Approach</span>
          </motion.h3>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            {/* Left: bullets */}
            <motion.div
              {...fadeUp(0.05)}
              className="rounded-2xl bg-white border border-black/10 p-6 md:p-8"
            >
              <p className="text-gray-800/90">
                At Snjay Studio, we don’t just plan events—we craft experiences
                that are immersive, personal, and unforgettable.
              </p>

              <ul className="mt-5 space-y-4 text-[15px] leading-7 text-gray-800/90">
                <li>
                  <strong className="text-emerald-900">Personalisation</strong>{" "}
                  — Every couple is unique, and so is every wedding we create.
                  We design experiences that reflect your love story,
                  traditions, and style.
                </li>
                <li>
                  <strong className="text-emerald-900">
                    Attention to Detail
                  </strong>{" "}
                  — From the grandest stage setup to the tiniest floral
                  arrangement, we leave no stone unturned.
                </li>
                <li>
                  <strong className="text-emerald-900">
                    Seamless Execution
                  </strong>{" "}
                  — Blending creativity with flawless coordination so every
                  moment flows effortlessly.
                </li>
                <li>
                  <strong className="text-emerald-900">
                    Innovative Experiences
                  </strong>{" "}
                  — Themed cocktails, celebrity performances, surprise entries,
                  and more—fresh ideas your guests will talk about for years.
                </li>
              </ul>

              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-white font-semibold shadow-sm bg-emerald-700 hover:bg-emerald-800"
                >
                  Get In Touch
                </a>
              </div>
            </motion.div>

            {/* Right: stacked images like the reference */}
            <motion.div {...fadeUp(0.1)} className="grid gap-5">
              <div className="rounded-xl overflow-hidden border border-black/10 bg-white">
                <img
                  src="/approach-couple-1.jpg"
                  alt="Couple at their wedding ceremony"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="rounded-xl overflow-hidden border border-black/10 bg-white">
                  <img
                    src="/approach-couple-2.jpg"
                    alt="Traditional ritual moment"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden border border-black/10 bg-white">
                  <img
                    src="/approach-couple-3.jpg"
                    alt="Joyful candid of bride and groom"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* NEW: Recent Events                        */}
      {/* ========================================= */}
      <section className="px-4 py-16" style={{ backgroundColor: "#f8efee" }}>
        <div className="mx-auto max-w-6xl">
          <motion.h3
            {...fadeUp()}
            className="brand-serif text-center text-3xl md:text-[36px] font-semibold text-emerald-900"
          >
            Recent Events
          </motion.h3>

          {/* grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* simple cards */}
            {[
              { title: "Rutuja and Dhruv", img: "/events/event-1.jpg" },
              { title: "Mugdha and Kshitij", img: "/events/event-2.jpg" },
              { title: "Shrushti and Kunal", img: "/events/event-3.jpg" },
              { title: "Avantika and Rohan", img: "/events/event-4.jpg" },
              { title: "Neesha and Pratik", img: "/events/event-5.jpg" },
              { title: "Cindy and Ayush", img: "/events/event-6.jpg" },
              { title: "Amrita and Vihang", img: "/events/event-7.jpg" },
            ].map(() => (
              <motion.article {...fadeUp(0.25)} className="lg:row-span-2 group">
                {/* WHITE PANEL to visually separate the image area */}
                <div>
                  {/* image with its own rounding */}
                  <div className="aspect-[4/5] lg:h-full rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src="/events/event-featured.jpg"
                      alt="Sayli and Aniket"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* IN FO CARD — centered & in normal flow, pulled UP to overlap the image */}
                  <div
                    className="
        relative mx-auto w-[83%] max-w-[360px]
        -translate-y-[60%] 
        transition-transform duration-500 ease-out
      "
                  >
                    {/* the card that 'grows DOWN' */}
                    <div
                      className="
          relative rounded-lg bg-white border border-black/10 overflow-hidden
          transition-[max-height] duration-500 ease-out
          max-h-[54px] group-hover:max-h-[260px]
        "
                    >
                      {/* header (always visible) */}
                      <div className="p-4 text-center">
                        <p className="font-semibold text-emerald-900 text-sm">
                          Sayli and Aniket
                        </p>
                      </div>

                      {/* extra details (revealed on hover; grows downward) */}
                      <div className="px-4 pb-4 pt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="mt-1 text-[13px] text-gray-700/90 space-y-1">
                          <p className="mt-1 text-[13px] text-gray-700/90">
                            Magical destination celebration
                          </p>
                          <p>
                            <span className="font-semibold">Wedding Date:</span>{" "}
                            13th March 2022
                          </p>
                          <p>
                            <span className="font-semibold">Venue:</span> Malhar
                            Machi
                          </p>
                          <p>
                            <span className="font-semibold">Services:</span>{" "}
                            Decor, Logistics, Cinematic Film
                          </p>
                        </div>
                        <a
                          href="/gallery/sayli-aniket"
                          className="mt-3 inline-flex text-[13px] font-semibold text-[#6c1d86] hover:underline"
                        >
                          View full story →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* NEW: See What Our Customers Say About Us  */}
      {/* ========================================= */}
      <section className="px-4 py-16" style={{ backgroundColor: "#f8efee" }}>
        <div className="mx-auto max-w-6xl">
          <motion.h3
            {...fadeUp()}
            className="brand-serif text-center text-3xl md:text-[36px] font-semibold text-emerald-900"
          >
            See What Our Customers Say About Us
          </motion.h3>

          <div className="mt-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center">
            {/* quote card */}
            <motion.div {...fadeUp(0.05)} className="relative">
              {/* subtle right rail like screenshot */}
              <div className="absolute top-3 right-0 h-[92%] w-2 rounded bg-rose-100" />
              <div className="relative rounded-2xl bg-white border border-black/10 p-6 md:p-7 shadow-sm">
                {/* stars */}
                <div className="flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-[#6c1d86]" />
                  ))}
                  <StarIcon className="h-4 w-4 text-[#6c1d86]" half />
                </div>

                <p className="mt-4 text-[13.5px] font-semibold text-gray-700/90">
                  Highly Professional &amp; Supportive
                </p>
                <p className="mt-2 text-[14px] leading-7 text-gray-700/90">
                  The team was always available, super professional, and handled
                  last-minute changes smoothly. We felt truly supported
                  throughout the process.
                </p>

                {/* avatar + name */}
                <div className="mt-5 flex items-center gap-3">
                  <img
                    src="/testimonials/avantika-rohan.jpg"
                    alt="Avantika and Rohan"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="text-[13px]">
                    <p className="font-semibold text-emerald-900">
                      Avantika and Rohan
                    </p>
                  </div>
                </div>

                {/* quote mark bottom-right */}
                <QuotationIcon className="absolute bottom-4 right-5 h-7 w-7 text-emerald-700/50" />
              </div>
            </motion.div>

            {/* supporting portrait image */}
            <motion.div
              {...fadeUp(0.1)}
              className="rounded-xl overflow-hidden border border-black/10 bg-white"
            >
              <img
                src="/testimonials/supporting-portrait.jpg"
                alt="Happy bride testimonial"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

/* --------------------------
   Minimal inline icons (no deps)
--------------------------- */

function ChatBubbleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 14.5A7.5 7.5 0 0 1 11.5 7h1A7.5 7.5 0 0 1 20 14.5c0 3.59-2.91 6.5-6.5 6.5H9l-5 2 1.2-3.8A6.5 6.5 0 0 1 4 14.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="12" r="1" fill="currentColor" />
      <circle cx="14" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}
function CompassIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m15 9-3.2 1.2L10.6 13 9 15l2-1.6 2.8-1.2L15 9Z"
        fill="currentColor"
      />
    </svg>
  );
}
function PackageIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 21V12M4 7.5l8 4.5 8-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
function HandshakeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8 13 6 11l5-4 3 2 4-3 2 3-5 4-2-1-2 2-1-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12 3 9m16 1 2 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function PalmIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 20c2-6 3-9 6-9s4 3 6 9M9 9V4m3 4V3m3 6V5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 20h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
