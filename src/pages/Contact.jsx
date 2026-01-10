// pages/Contact.jsx
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="bg-studio-black text-studio-white min-h-screen pt-32 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-xs font-sans tracking-[0.3em] uppercase text-studio-accent mb-4 block">Get in Touch</span>
        <h1 className="font-serif text-6xl md:text-8xl text-studio-white mb-6">Let's Create Magic</h1>
        <p className="text-studio-white/60 text-lg max-w-2xl mx-auto">
          We take on a limited number of weddings each year to ensure we can give every couple our full creative energy. Tell us about your day.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <form className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <InputGroup label="Name" type="text" placeholder="Your Name" />
            <InputGroup label="Email" type="email" placeholder="your@email.com" />
          </div>
          <InputGroup label="Event Date" type="date" placeholder="" />
          <InputGroup label="Venue / Location" type="text" placeholder="e.g. Udaipur, Goa, Ranchi" />

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-studio-white/50">Your Story</label>
            <textarea
              rows="5"
              className="w-full bg-transparent border-b border-[var(--border-color)] text-studio-white placeholder-studio-white/20 py-3 focus:outline-none focus:border-studio-accent transition-colors resize-none"
              placeholder="Tell us a bit about yourselves and your vision..."
            />
          </div>

          <div className="pt-8 text-center">
            <button type="submit" className="px-10 py-4 bg-studio-white text-studio-black font-sans uppercase tracking-[0.2em] text-xs font-bold hover:bg-studio-accent hover:text-white transition-colors duration-300">
              Send Message
            </button>
          </div>
        </form>

        <div className="mt-20 pt-12 border-t border-[var(--border-color)] text-center space-y-2">
          <p className="text-studio-white/60 text-sm">Or email us directly at</p>
          <a href="mailto:hello@sanjaystudio.com" className="font-serif text-2xl text-studio-white hover:text-studio-accent transition-colors italic">hello@sanjaystudio.com</a>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, type, placeholder }) {
  return (
    <div className="space-y-2 text-left">
      <label className="text-xs uppercase tracking-widest text-studio-white/50">{label}</label>
      <input
        type={type}
        className="w-full bg-transparent border-b border-[var(--border-color)] text-studio-white placeholder-studio-white/20 py-3 focus:outline-none focus:border-studio-accent transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
}