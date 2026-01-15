import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sanjayLogo from '../assets/sanjay_logo.png';

export default function CinematicLoader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const duration = 3000; // 3 seconds for better effect
        const interval = 30;
        const increment = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    // Delay before hiding to show 100%
                    setTimeout(() => setLoading(false), 800);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
                >
                    {/* Cinematic Background Effects */}
                    <div className="absolute inset-0 z-0">
                        {/* Dynamic Spotlight */}
                        <motion.div
                            animate={{
                                opacity: [0.1, 0.3, 0.1],
                                scale: [1, 1.2, 1],
                                rotate: [0, 15, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-studio-accent/5 rounded-full blur-[100px]"
                        />

                        {/* Film Grain */}
                        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    </div>

                    {/* Cinematic Bars closing in */}
                    <motion.div
                        initial={{ height: "0vh" }}
                        animate={{ height: "10vh" }}
                        exit={{ height: "0vh" }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="absolute top-0 left-0 right-0 bg-black z-20 border-b border-studio-accent/20"
                    />
                    <motion.div
                        initial={{ height: "0vh" }}
                        animate={{ height: "10vh" }}
                        exit={{ height: "0vh" }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="absolute bottom-0 left-0 right-0 bg-black z-20 border-t border-studio-accent/20"
                    />

                    {/* Main content */}
                    <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg mx-auto">

                        {/* Logo Container with Aperture Effect */}
                        <div className="relative mb-12">
                            {/* Rotating Rings */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-[-20px] border border-dashed border-studio-accent/30 rounded-full w-48 h-48 md:w-64 md:h-64 opacity-40 mx-auto left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-[-10px] border border-studio-white/10 rounded-full w-40 h-40 md:w-56 md:h-56 opacity-30 mx-auto left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                            />

                            {/* Shutter Blades Animation (Simulated with clip-path or simple rotation of sectors could be complex, using scale/rotate for now) */}
                            <motion.div
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                                className="relative bg-black/50 backdrop-blur-sm p-8 rounded-full border border-studio-accent/20 shadow-[0_0_50px_rgba(201,165,116,0.15)]"
                            >
                                <motion.img
                                    src={sanjayLogo}
                                    alt="Sanjay Studio Logo"
                                    className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
                                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                                    animate={{
                                        opacity: 1,
                                        scale: [1, 1.05, 1],
                                        filter: "blur(0px)"
                                    }}
                                    transition={{
                                        opacity: { duration: 0.5, delay: 0.2 },
                                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                                        filter: { duration: 0.5, delay: 0.2 }
                                    }}
                                />

                                {/* Glitch Effect Overlay (Optional subtle flash) */}
                                <motion.div
                                    animate={{ opacity: [0, 0.2, 0, 0, 0.1, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.2, 0.9, 0.95, 1] }}
                                    className="absolute inset-0 bg-studio-accent mix-blend-overlay rounded-full"
                                />
                            </motion.div>
                        </div>

                        {/* Typography */}
                        <div className="text-center overflow-hidden">
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                            >
                                <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-studio-accent via-[#eecda3] to-studio-accent tracking-widest drop-shadow-sm">
                                    SANJAY STUDIO
                                </h1>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, letterSpacing: "1em" }}
                                animate={{ opacity: 1, letterSpacing: "0.3em" }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="mt-2 text-studio-white/60 text-xs md:text-sm uppercase font-sans"
                            >
                                Capturing Life in Motion
                            </motion.div>
                        </div>

                        {/* Cinematic Progress Bar */}
                        <div className="w-64 mt-10 relative">
                            <div className="h-[2px] w-full bg-studio-white/10 overflow-hidden relative">
                                <motion.div
                                    className="h-full bg-studio-accent shadow-[0_0_15px_rgba(201,165,116,0.8)]"
                                    style={{ width: `${progress}%` }}
                                />
                                {/* Shine effect on bar */}
                                <motion.div
                                    animate={{ left: ["-100%", "200%"] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                                />
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-[10px] text-studio-white/40 font-mono">LOADING ASSETS</span>
                                <span className="text-[10px] text-studio-accent font-mono">{Math.round(progress)}%</span>
                            </div>
                        </div>

                    </div>

                    {/* Corner Decors */}
                    <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-studio-accent/30 rounded-tl-3xl"></div>
                    <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-studio-accent/30 rounded-tr-3xl"></div>
                    <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-studio-accent/30 rounded-bl-3xl"></div>
                    <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-studio-accent/30 rounded-br-3xl"></div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
