import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useTime
} from "framer-motion";
import { useMemo } from "react";

const icons = [
  // Camera Icon
  {
    id: 1,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    className:
      "w-32 h-32 md:w-64 md:h-64 absolute opacity-[0.25] text-studio-accent",
    initial: { top: "10%", left: "5%" },
    parallax: { y: [0, 500], x: [0, 200], rotate: [0, 45] },
    drift: { ampX: 22, ampY: 28, ampR: 6, ampS: 0.03, speed: 0.9 }
  },

  // Aperture Icon
  {
    id: 2,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2a10 10 0 100 20 10 10 0 000-20z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12L4.93 4.93" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l7.07-7.07" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    className:
      "w-48 h-48 md:w-96 md:h-96 absolute opacity-[0.15] text-studio-white",
    initial: { top: "40%", right: "-10%" },
    parallax: { y: [0, -300], x: [0, -150], rotate: [0, -180] },
    drift: { ampX: 18, ampY: 24, ampR: 10, ampS: 0.02, speed: 0.65 }
  },

  // Film Icon
  {
    id: 3,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
    ),
    className:
      "w-24 h-24 md:w-40 md:h-40 absolute opacity-[0.25] text-studio-accent",
    initial: { bottom: "10%", left: "20%" },
    parallax: { y: [0, -600], x: [0, 100], rotate: [15, 30] },
    drift: { ampX: 26, ampY: 18, ampR: 12, ampS: 0.02, speed: 1.1 }
  },

  // 🎯 Icon 4: Focus Frame (Auto-focus brackets)
  {
    id: 4,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
        {/* corner brackets */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 9V7a2 2 0 012-2h2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9V7a2 2 0 00-2-2h-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15v2a2 2 0 002 2h2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 15v2a2 2 0 01-2 2h-2" />
        {/* center cross */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6" />
      </svg>
    ),
    className:
      "w-14 h-14 md:w-24 md:h-24 absolute opacity-[0.25] text-studio-accent blur-[1px] mix-blend-screen",
    initial: { top: "22%", left: "42%" },
    parallax: { y: [0, 220], x: [0, -90], rotate: [0, 25], scale: [1, 1.25] },
    drift: { ampX: 26, ampY: 30, ampR: 8, ampS: 0.05, speed: 0.75 }
  },

  // 🎛️ Icon 5: Exposure Dial / Settings (shutter/ISO vibe)
  {
    id: 5,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
        {/* dial body */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12h3" />

        {/* ticks */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.2 5.2l2.1 2.1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.7 16.7l2.1 2.1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.8 5.2l-2.1 2.1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.3 16.7l-2.1 2.1" />

        {/* pointer + center */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l4-2" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    className:
      "w-10 h-10 md:w-18 md:h-18 absolute opacity-[0.20] text-studio-accent blur-[1px] mix-blend-screen",
    initial: { top: "68%", right: "28%" },
    parallax: { y: [0, -380], x: [0, 140], rotate: [0, -90], scale: [1.15, 0.9] },
    drift: { ampX: 34, ampY: 22, ampR: 10, ampS: 0.06, speed: 0.9 }
  }
];

function FloatingIcon({ icon, scrollYProgress }) {
  const py = useTransform(scrollYProgress, [0, 1], icon.parallax.y || [0, 0]);
  const px = useTransform(scrollYProgress, [0, 1], icon.parallax.x || [0, 0]);
  const pr = useTransform(scrollYProgress, [0, 1], icon.parallax.rotate || [0, 0]);
  const ps = useTransform(scrollYProgress, [0, 1], icon.parallax.scale || [1, 1]);

  const springY = useSpring(py, { stiffness: 50, damping: 20 });
  const springX = useSpring(px, { stiffness: 50, damping: 20 });
  const springR = useSpring(pr, { stiffness: 40, damping: 15 });
  const springS = useSpring(ps, { stiffness: 45, damping: 18 });

  const time = useTime();
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const phase2 = useMemo(() => Math.random() * Math.PI * 2, []);
  const t = useTransform(time, (ms) => (ms / 1000) * icon.drift.speed);

  const driftX = useTransform(t, (v) => Math.sin(v + phase) * icon.drift.ampX);
  const driftY = useTransform(t, (v) => Math.cos(v * 0.9 + phase2) * icon.drift.ampY);
  const driftR = useTransform(t, (v) => Math.sin(v * 0.7 + phase2) * icon.drift.ampR);
  const driftS = useTransform(t, (v) => 1 + Math.sin(v * 0.8 + phase) * icon.drift.ampS);

  return (
    <motion.div
      className={icon.className}
      style={{
        ...icon.initial,
        x: springX,
        y: springY,
        translateX: driftX,
        translateY: driftY,
        rotate: springR,
        rotateZ: driftR,
        scale: springS,
        scaleX: driftS,
        scaleY: driftS
      }}
    >
      {icon.svg}
    </motion.div>
  );
}

export default function CinematicBackground() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-black/40 [.light-mode_&]:bg-black/10 z-[-1] transition-colors duration-500" />

      {icons.map((icon) => (
        <FloatingIcon key={icon.id} icon={icon} scrollYProgress={scrollYProgress} />
      ))}

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
