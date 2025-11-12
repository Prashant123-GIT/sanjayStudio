import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Swap this for your real logo */
const LOGO_SRC = "/logo-hitched-style.png"; // or keep Link text as fallback below

const navItems = [
  { to: "/", label: "HOME" },
  { to: "/portfolio", label: "PORTFOLIO" },
  { to: "/about", label: "ABOUT US" },
  { to: "/services", label: "SERVICES" },
  { to: "/contact", label: "GET IN TOUCH" },
  // { to: "/blog", label: "BLOG" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b",
        scrolled ? "border-black/5 shadow-[0_8px_18px_-14px_rgba(0,0,0,0.25)]" : "border-transparent",
      ].join(" ")}
      style={{ backgroundColor: "#f8efee" /* soft blush like screenshot */ }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-20 md:h-24 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center gap-3">
            {LOGO_SRC ? (
              <img
                src={LOGO_SRC}
                alt="Brand logo"
                className="h-10 md:h-12 w-auto object-contain"
              />
            ) : (
              <span className="text-xl font-extrabold tracking-tight text-gray-900">Sanjay Studio</span>
            )}
          </Link>

          {/* Desktop nav: centered, spaced, uppercase, bold */}
          <nav className="hidden md:flex flex-1 items-end justify-end">
            <ul className="flex items-center gap-9">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        "relative block py-2 transition will-change-transform",
                        "text-[0.88rem] tracking-[0.12em] uppercase",
                        isActive ? "text-emerald-800" : "text-black/90 hover:text-emerald-800",
                      ].join(" ")
                    }
                  >
                    {/* subtle lift on hover */}
                    {({ isActive }) => (
                      <motion.span
                        initial={false}
                        animate={{ y: isActive ? -1 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile trigger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden h-11 w-11 rounded-lg border border-black/10 bg-white/70 backdrop-blur grid place-items-center active:scale-[0.98]"
          >
            <Burger open={open} />
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 bg-black/30"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="panel"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed inset-x-0 bottom-0 h-[88dvh] rounded-t-3xl overflow-y-auto border-t border-black/10 shadow-2xl"
              style={{ backgroundColor: "#f8efee" }}
              role="dialog"
              aria-modal="true"
            >
              {/* handle */}
              <div className="pt-3 grid place-items-center">
                <span className="h-1.5 w-12 rounded-full bg-black/20" />
              </div>

              <div className="pt-2 pb-[calc(env(safe-area-inset-bottom)+16px)]">
                <div className="mx-auto max-w-7xl px-4">
                  <ul className="rounded-2xl overflow-hidden border border-black/10 bg-white/80 divide-y divide-black/10">
                    {navItems.map((item, idx) => (
                      <motion.li
                        key={item.to}
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.05 * idx, type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <NavLink
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            [
                              "flex items-center justify-between px-4 py-4",
                              "uppercase tracking-[0.12em]",
                              isActive ? "text-emerald-800 bg-white" : "text-black/90 hover:bg-white",
                            ].join(" ")
                          }
                        >
                          <span>{item.label}</span>
                          <motion.span
                            initial={{ x: -6, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="text-lg"
                          >
                            →
                          </motion.span>
                        </NavLink>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/* Simple burger ↔ X */
function Burger({ open }) {
  return (
    <div className="relative h-5 w-6">
      <motion.span
        className="absolute left-0 top-0 h-0.5 w-6 rounded-full bg-black"
        animate={{ y: open ? 9 : 0, rotate: open ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 32 }}
      />
      <motion.span
        className="absolute left-0 top-[9px] h-0.5 w-6 rounded-full bg-black"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.12 }}
      />
      <motion.span
        className="absolute left-0 bottom-0 h-0.5 w-6 rounded-full bg-black"
        animate={{ y: open ? -9 : 0, rotate: open ? -45 : 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 32 }}
      />
    </div>
  );
}
