import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "Studio" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Theme Toggle Logic
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light-mode");
    } else {
      root.classList.add("light-mode");
    }
  }, [isDark]);

  // Dynamic Text Color Logic
  // When scrolled: Use theme color (studio-white, which becomes black in light mode)
  // When top: 
  //   - If Home: Force white (text-white) because it's on a dark image
  //   - If Other Routes: Use theme color (studio-white) because background adapts to light
  const isHome = location.pathname === "/";
  const textColorClass = scrolled || !isHome ? "text-studio-white" : "text-white";
  const borderColorClass = scrolled ? "border-[var(--border-color)]" : "border-transparent";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-4 bg-studio-black/80 backdrop-blur-md" : "py-6 bg-transparent"
          } ${borderColorClass} border-b`}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-50 group flex items-center gap-3">
            <Logo className={`w-8 h-8 transition-colors duration-300 ${textColorClass}`} />
            <span className={`font-serif text-2xl md:text-3xl tracking-tight transition-colors duration-300 ${textColorClass}`}>
              Sanjay Studio
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 ${isActive ? "text-studio-accent" : `${textColorClass} opacity-70 hover:opacity-100`
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`ml-4 p-2 rounded-full border border-current transition-colors hover:bg-white/10 ${textColorClass}`}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                // Sun Icon
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                // Moon Icon
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button - Also needs toggle inside overlay or here */}
          <div className="md:hidden flex items-center gap-4 relative z-50">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full border border-current hover:bg-white/10 transition-colors ${textColorClass}`}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="h-10 w-10 flex flex-col justify-center gap-1.5 items-end group"
            >
              <span className={`block h-[2px] bg-current transition-all duration-300 ${textColorClass} ${open ? "w-6 -rotate-45 translate-y-2" : "w-8 group-hover:w-6"}`} />
              <span className={`block h-[2px] bg-current transition-all duration-300 ${textColorClass} ${open ? "opacity-0" : "w-6 group-hover:w-8"}`} />
              <span className={`block h-[2px] bg-current transition-all duration-300 ${textColorClass} ${open ? "w-6 rotate-45 -translate-y-2" : "w-4 group-hover:w-6"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-studio-black flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col gap-8 text-center">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <NavLink
                    to={item.to}
                    className="font-serif text-4xl text-studio-white hover:text-studio-accent transition-colors italic"
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
