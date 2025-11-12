// components/Footer.jsx
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#f8efee]">
      {/* top content */}
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-24">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand + Socials */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            {/* LOGO */}
            <img
              src="/logo-hitched.svg"
              alt="Snjay Studio"
              className="h-14 w-auto"
            />

            {/* Socials */}
            <div className="mt-6 flex items-center gap-4">
              <SocialIcon
                label="Facebook"
                href="https://facebook.com/yourpage"
                bg="bg-[#3b5998]"
                icon={<FacebookIcon className="h-4 w-4 text-white" />}
              />
              <SocialIcon
                label="Instagram"
                href="https://instagram.com/yourpage"
                bg="bg-[#6c1d86]"
                icon={<InstagramIcon className="h-4 w-4 text-white" />}
              />
              <SocialIcon
                label="WhatsApp"
                href="https://wa.me/0000000000"
                bg="bg-[#25D366]"
                icon={<WhatsappIcon className="h-4 w-4 text-white" />}
              />
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-3">
            <h4 className="text-[20px] font-semibold text-emerald-800">
              Address
            </h4>
            <p className="mt-3 text-[15px] leading-7 text-gray-800/90">
              Ratu Kathitand, 
              <br />
              Ranchi, Jharkhand – 835222
            </p>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h4 className="text-[20px] font-semibold text-emerald-800">
              Services
            </h4>
            <ul className="mt-3 space-y-1 text-[15px]">
              <li>
                <a
                  href="/services/pre-wedding"
                  className="text-emerald-900 hover:underline"
                >
                  Pre-Wedding
                </a>
              </li>
              <li>
                <a
                  href="/services/wedding"
                  className="text-emerald-900 hover:underline"
                >
                  Wedding
                </a>
              </li>
              <li>
                <a
                  href="/services/reception"
                  className="text-emerald-900 hover:underline"
                >
                  Reception
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-[20px] font-semibold text-emerald-800">
              Contact
            </h4>
            <ul className="mt-3 space-y-2 text-[15px] text-gray-900">
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-emerald-800" />
                <a href="tel:+9199999999999" className="hover:underline">
                  +91 99999999999
                </a>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-emerald-800" />
                <a href="tel:+9199999999999" className="hover:underline">
                  +91 99999999999
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="h-4 w-4 text-[#6c1d86]" />
                <a
                  href="mailto:connect@example.com"
                  className="hover:underline"
                >
                  {/* connect@hitchedindia.com */}
                  connect@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center text-[15px] text-gray-900">
          Copyright @ example.com
        </p>
      </div>

      {/* WAVES background (bottom) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        {/* WAVES – full-width, no gaps, layered */}
        <div className="relative overflow-hidden">
          <svg
            className="block w-full h-[120px] md:h-[160px]"
            viewBox="0 0 1440 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Bottom layer (deepest) */}
            <path
              d="M0 120
         C 240 80, 480 80, 720 120
         C 960 160, 1200 150, 1440 120
         V 200 H 0 Z"
              fill="#8d758d"
              opacity="1"
            />

            {/* Layer 2 */}
            <path
              d="M0 110
         C 240 70, 480 70, 720 110
         C 960 150, 1200 135, 1440 110
         V 200 H 0 Z"
              fill="#a08aa0"
              opacity="0.85"
            />

            {/* Layer 3 */}
            <path
              d="M0 100
         C 240 60, 480 60, 720 100
         C 960 140, 1200 125, 1440 100
         V 200 H 0 Z"
              fill="#b69fb1"
              opacity="0.65"
            />

            {/* Top layer (lightest) */}
            <path
              d="M0 90
         C 240 50, 480 50, 720 90
         C 960 130, 1200 115, 1440 90
         V 200 H 0 Z"
              fill="#d3c0cc"
              opacity="0.35"
            />
          </svg>
        </div>
      </div>

      {/* WhatsApp FAB (bottom-right) */}
      <a
        href="https://wa.me/0000000000"
        target="_blank"
        rel="noreferrer"
        className="group fixed right-5 bottom-6 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-[0_8px_28px_rgba(0,0,0,0.25)] hover:brightness-95"
        aria-label="Chat on WhatsApp"
      >
        <WhatsappIcon className="h-7 w-7 text-white transition-transform duration-200 group-hover:scale-110" />
      </a>
    </footer>
  );
}

/* ---------- tiny helpers ---------- */

function SocialIcon({ href, label, bg, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`grid h-10 w-10 place-items-center rounded-full ${bg} shadow-md hover:opacity-95 active:scale-[0.98]`}
    >
      {icon}
    </a>
  );
}

/* ---------- icons (inline, no deps) ---------- */

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 9H15V6h-1.5C11.6 6 11 7.6 11 9v2H9v3h2v7h3v-7h2.1l.4-3H14V9.5c0-.3.2-.5.5-.5Z" />
    </svg>
  );
}
function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 3.5A4.5 4.5 0 1 1 7.5 13 4.5 4.5 0 0 1 12 8.5Zm0 2A2.5 2.5 0 1 0 14.5 13 2.5 2.5 0 0 0 12 10.5ZM17.5 7a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
    </svg>
  );
}
function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.1 16.9c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-.9 1-.2.1-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-1-2.2-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 2.1 3.2 5 4.4.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.1.2-1.2-.1 0-.3-.1-.6-.2Z" />
      <path d="M27 15.5c0 6.2-5 11.2-11.2 11.2-2 0-3.9-.5-5.5-1.5l-3.8 1 1-3.7c-1.2-1.8-1.9-3.9-1.9-6 0-6.2 5-11.2 11.2-11.2S27 9.3 27 15.5Zm-2 0c0-5.1-4.1-9.2-9.2-9.2S6.6 10.4 6.6 15.5c0 2 .6 3.9 1.7 5.5l-.9 3.3 3.4-.9c1.5 1 3.2 1.5 5 1.5 5.1 0 9.2-4.1 9.2-9.2Z" />
    </svg>
  );
}
function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 5.5 8.5 4l2 4-2 2a13 13 0 0 0 5.5 5.5l2-2 4 2L18.5 20c-6 1-14.5-7.5-13-14.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
