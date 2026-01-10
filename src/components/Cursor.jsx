import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState("default");

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener("mousemove", mouseMove);

        // Hover listeners
        const handleMouseOver = (e) => {
            if (
                e.target.tagName === "A" ||
                e.target.tagName === "BUTTON" ||
                e.target.closest("a") ||
                e.target.closest("button") ||
                e.target.dataset.cursor === "pointer"
            ) {
                setCursorVariant("pointer");
            } else {
                setCursorVariant("default");
            }
        };

        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "transparent",
            border: "1px solid var(--accent)",
            transition: {
                type: "spring",
                mass: 0.6
            }
        },
        pointer: {
            x: mousePosition.x - 30, // Centering when larger
            y: mousePosition.y - 30,
            height: 60,
            width: 60,
            backgroundColor: "rgba(201, 165, 116, 0.1)", // studio-accent with opacity
            border: "1px solid var(--accent)",
            transition: {
                type: "spring",
                mass: 0.6
            }
        }
    };

    const dotVariants = {
        default: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            transition: {
                type: "tween",
                ease: "linear",
                duration: 0
            }
        },
        pointer: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            transition: {
                type: "tween",
                ease: "linear",
                duration: 0
            }
        }
    };

    return (
        <>
            {/* Main Ring */}
            <motion.div
                className="fixed top-0 left-0 rounded-full z-[9999] pointer-events-none hidden md:block" // Hidden on mobile
                variants={variants}
                animate={cursorVariant}
            />
            {/* Center Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-studio-accent rounded-full z-[9999] pointer-events-none hidden md:block"
                variants={dotVariants}
                animate={cursorVariant}
            />
        </>
    );
}
