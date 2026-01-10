import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const icons = [
    // Camera Icon - Moves fast, rotates deeply
    {
        id: 1,
        svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        className: "w-32 h-32 md:w-64 md:h-64 absolute opacity-[0.08] text-studio-accent",
        initial: { top: "10%", left: "5%" },
        parallax: { y: [0, 500], x: [0, 200], rotate: [0, 45] }
    },
    // Aperture Icon - Rotates heavily, moves slow (Opposite direction)
    {
        id: 2,
        svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12L4.93 4.93" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l7.07-7.07" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
        className: "w-48 h-48 md:w-96 md:h-96 absolute opacity-[0.09] text-studio-white",
        initial: { top: "40%", right: "-10%" },
        parallax: { y: [0, -300], x: [0, -150], rotate: [0, -180] }
    },
    // Film Strip - Diagonal movement
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
        className: "w-24 h-24 md:w-40 md:h-40 absolute opacity-[0.08] text-studio-accent",
        initial: { bottom: "10%", left: "20%" },
        parallax: { y: [0, -600], x: [0, 100], rotate: [15, 30] } // Moves UP and RIGHT
    },
    // Extra Small Floating Elements for Detail (Bokeh-like)
    {
        id: 4,
        svg: <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" fill="none" />,
        className: "w-12 h-12 md:w-20 md:h-20 absolute opacity-[0.10] text-white blur-[2px]",
        initial: { top: "20%", left: "40%" },
        parallax: { y: [0, 200], x: [0, -80], scale: [1, 1.5] }
    },
    {
        id: 5,
        svg: <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" fill="none" />,
        className: "w-8 h-8 md:w-16 md:h-16 absolute opacity-[0.08] text-studio-accent blur-[1px]",
        initial: { top: "70%", right: "30%" },
        parallax: { y: [0, -400], x: [0, 120], scale: [1.2, 0.8] }
    }
];

function FloatingIcon({ icon, scrollYProgress }) {
    const y = useTransform(scrollYProgress, [0, 1], icon.parallax.y);
    const rotate = useTransform(scrollYProgress, [0, 1], icon.parallax.rotate || [0, 0]);
    const x = useTransform(scrollYProgress, [0, 1], icon.parallax.x || [0, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], icon.parallax.scale || [1, 1]);

    // Spring physics for smoother catch-up
    const springY = useSpring(y, { stiffness: 50, damping: 20 });
    const springRotate = useSpring(rotate, { stiffness: 40, damping: 15 });

    return (
        <motion.div
            className={icon.className}
            style={{
                ...icon.initial,
                y: springY,
                rotate: springRotate,
                x,
                scale
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
            {/* Dark Overlay for Cinematic Feel - Lighter in Light Mode */}
            <div className="absolute inset-0 bg-black/40 [.light-mode_&]:bg-black/10 z-[-1] transition-colors duration-500" />

            {icons.map((icon) => (
                <FloatingIcon key={icon.id} icon={icon} scrollYProgress={scrollYProgress} />
            ))}

            {/* Subtle Grain Overlay for cinematic texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
}
