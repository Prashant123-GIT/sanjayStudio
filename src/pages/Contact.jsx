// pages/Contact.jsx
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, delay, ease: "easeOut" },
});

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Contact() {
  const [formStatus, setFormStatus] = useState("idle"); // idle, sending, success
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormStatus("sending");

    setTimeout(() => {
      setFormStatus("success");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10b981", "#6c1d86", "#f43f5e"],
      });
      setTimeout(() => setFormStatus("idle"), 4000);
    }, 1200);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <div className="bg-gradient-to-br from-[#fffaf7] via-[#f8efee] to-[#fffaf7] min-h-screen">
      {/* Parallax Hero */}
      <motion.div
        className="relative h-[45vh] min-h-[300px] w-full overflow-hidden cursor-pointer"
        onMouseMove={handleMouseMove}
        style={{ perspective: 1000 }}
      >
        <motion.img
          src="/contact/hero.jpg"
          alt="Get in touch"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ rotateX, rotateY }}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="brand-serif text-white text-5xl md:text-7xl font-bold drop-shadow-2xl"
          >
            Let's Create Magic
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-4 text-lg md:text-xl text-white/90 font-medium drop-shadow-lg"
          >
            Your story deserves to be told beautifully
          </motion.p>
        </div>
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp()} className="text-3xl md:text-4xl font-bold text-gray-900">
            Tell Us About Your Big Day
          </motion.h2>
          <motion.p
            variants={fadeUp(0.2)}
            className="mt-4 max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed"
          >
            Whether it's a dreamy wedding in the hills, a vibrant reception under the stars, 
            or an intimate pre-wedding shoot — we’re here to capture every laugh, tear, and dance move.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Enhanced Form */}
          <motion.form
            variants={fadeUp(0.1)}
            onSubmit={onSubmit}
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 md:p-10 overflow-hidden"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-purple-50/30 pointer-events-none" />
            
            <div className="relative grid gap-6">
              {/* Honeypot */}
              <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid sm:grid-cols-2 gap-5">
                {["name", "phone"].map((field, i) => (
                  <motion.label
                    key={field}
                    variants={fadeUp(0.2 + i * 0.1)}
                    className="group relative"
                  >
                    <span className="text-sm font-semibold text-gray-800 mb-2 block">
                      {field === "name" ? "Full Name" : "Phone Number"}
                    </span>
                    <input
                      required
                      name={field}
                      type={field === "phone" ? "tel" : "text"}
                      placeholder={field === "name" ? "Priya Sharma" : "+91 98765 43210"}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-gray-200 
                                 text-gray-900 placeholder-gray-400
                                 focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-600 
                                 focus:bg-white transition-all duration-300 outline-none
                                 group-hover:border-emerald-400"
                    />
                  </motion.label>
                ))}
              </div>

              <motion.label variants={fadeUp(0.4)} className="group relative">
                <span className="text-sm font-semibold text-gray-800 mb-2 block">Email Address</span>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="priya@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-gray-200 
                             text-gray-900 placeholder-gray-400
                             focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-600 
                             focus:bg-white transition-all duration-300 outline-none"
                />
              </motion.label>

              <div className="grid sm:grid-cols-2 gap-5">
                <motion.label variants={fadeUp(0.5)} className="group relative">
                  <span className="text-sm font-semibold text-gray-800 mb-2 block">Event Type</span>
                  <select
                    name="eventType"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-gray-200 
                               text-gray-900 focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-600 
                               focus:bg-white transition-all duration-300 outline-none appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: "right 0.5rem center", backgroundSize: "12px", backgroundRepeat: "no-repeat" }}
                  >
                    <option>Wedding</option>
                    <option>Pre-Wedding</option>
                    <option>Reception</option>
                    <option>Birthday Bash</option>
                    <option>Anniversary</option>
                    <option>Corporate Event</option>
                  </select>
                </motion.label>

                <motion.label variants={fadeUp(0.6)} className="group relative">
                  <span className="text-sm font-semibold text-gray-800 mb-2 block">Event Date</span>
                  <input
                    type="date"
                    name="date"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-gray-200 
                               text-gray-900 focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-600 
                               focus:bg-white transition-all duration-300 outline-none"
                  />
                </motion.label>
              </div>

              <motion.label variants={fadeUp(0.7)} className="group relative">
                <span className="text-sm font-semibold text-gray-800 mb-2 block">City / Venue</span>
                <input
                  name="city"
                  placeholder="e.g. Ranchi, Goa, or The Leela Palace Udaipur"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-gray-200 
                             text-gray-900 placeholder-gray-400
                             focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-600 
                             focus:bg-white transition-all duration-300 outline-none"
                />
              </motion.label>

              <motion.label variants={fadeUp(0.8)} className="group relative">
                <span className="text-sm font-semibold text-gray-800 mb-2 block">Your Message</span>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Share your vision — theme colors, special moments, or any crazy ideas!"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-gray-200 
                             text-gray-900 placeholder-gray-400 resize-none
                             focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-600 
                             focus:bg-white transition-all duration-300 outline-none"
                />
              </motion.label>

              <motion.div
                variants={fadeUp(0.9)}
                className="mt-6 flex flex-wrap gap-4"
              >
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="relative inline-flex items-center justify-center rounded-full px-8 py-4 text-white font-bold text-lg
                             bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900
                             shadow-xl hover:shadow-2xl active:scale-95 transform transition-all duration-300
                             disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
                >
                  <span className="relative z-10">
                    {formStatus === "sending" ? "Sending..." : formStatus === "success" ? "Sent! 🎉" : "Send Enquiry"}
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>

                <a
                  href="https://wa.me/919999999999?text=Hi%20Snjay%20Studio%2C%20I%20saw%20your%20amazing%20work%20and%20would%20love%20to%20chat%20about%20my%20wedding!"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-white font-bold text-lg
                             bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-90 active:scale-95
                             shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.044h-.004c-.673-.012-1.334-.064-1.969-.192c-3.077-1.213-5.088-4.15-5.088-7.48 0-4.251 3.465-7.715 7.715-7.715 2.054 0 4.033 1.653 5.478 3.109 1.444 1.456 2.318 3.434 2.318 5.488 0 3.33-2.711 6.793-7.45 7.79z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </motion.div>

              {formStatus === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-emerald-600 font-semibold text-center"
                >
                  Thank you! We’ll reply within 2 hours (usually faster!) 💌
                </motion.p>
              )}
            </div>
          </motion.form>

          {/* Info Cards */}
          <div className="grid gap-8">
            <motion.div
              variants={fadeUp(0.2)}
              className="group rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 text-white shadow-2xl transform hover:scale-[1.02] transition-all duration-500"
            >
              <h3 className="text-2xl font-bold mb-4">Bookings & Enquiries</h3>
              <p className="text-emerald-100 mb-6 leading-relaxed">
                We're based in Ranchi but travel across India for love stories worth capturing.
              </p>
              <div className="space-y-4 text-lg">
                <a href="mailto:snjaystudio@example.com" className="block hover:text-emerald-200 transition">
                  ✉️ snjaystudio@example.com
                </a>
                <a href="tel:+919999999999" className="block hover:text-emerald-200 transition">
                  📞 +91 99999 99999
                </a>
                <p className="flex items-center gap-2">
                  📍 Ranchi, Jharkhand • India
                  <span className="text-sm text-emerald-200">+ Destination Weddings</span>
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp(0.3)}
              className="rounded-3xl bg-white p-8 shadow-2xl border border-purple-100"
            >
              <h3 className="text-2xl font-bold text-purple-900 mb-4">Working Hours</h3>
              <div className="space-y-3 text-gray-700">
                <p>🗓️ Mon–Sat: <strong>10:00 AM – 7:00 PM</strong></p>
                <p>🌙 Sun: <strong>By Appointment Only</strong></p>
                <p className="text-emerald-600 font-semibold pt-3">
                  ⚡ We reply to enquiries within 2 hours (even on Sundays!)
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-600 mb-6">Trusted by over 300+ couples across India</p>
          <div className="flex flex-wrap justify-center gap-8 text-3xl">
            <span className="opacity-70 hover:opacity-100 transition">💍</span>
            <span className="opacity-70 hover:opacity-100 transition">📸</span>
            <span className="opacity-70 hover:opacity-100 transition">🎥</span>
            <span className="opacity-70 hover:opacity-100 transition">✨</span>
            <span className="opacity-70 hover:opacity-100 transition">🥂</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}