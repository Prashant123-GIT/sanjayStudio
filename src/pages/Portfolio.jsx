import { useState, useCallback, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import hand_ring_1 from "../assets/portfolio/hand_ring_1.jpg";
import hand_ring_2 from "../assets/portfolio/hand_ring_2.jpg";
import ritual_1 from "../assets/portfolio/ritual_1.jpeg";
import ritual_2 from "../assets/portfolio/ritual_2.jpeg";
import ritual_3 from "../assets/portfolio/ritual_3.jpg";
import edited_1 from "../assets/portfolio/edited_1.jpeg";
import edited_2 from "../assets/portfolio/edited_2.jpeg";
import photography_1 from "../assets/portfolio/photography_1.jpg";
import best_1 from "../assets/portfolio/best_1.jpg";

const portfolioItems = [
  { id: 1, src: hand_ring_1, title: "Rutuja & Dhruv", category: "Wedding" },
  { id: 2, src: hand_ring_2, title: "Mugdha & Kshitij", category: "Wedding" },
  { id: 3, src: ritual_3, title: "Shrushti & Kunal", category: "Engagement" },
  { id: 4, src: ritual_1, title: "Avantika & Rohan", category: "Wedding" },
  { id: 5, src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=2070", title: "Neesha & Pratik", category: "Portraits" },
  { id: 6, src: edited_1, title: "Cindy & Ayush", category: "Details" },
  { id: 7, src: ritual_2, title: "Amrita & Vihang", category: "Reception" },
  { id: 8, src: edited_2, title: "Sana & Rahil", category: "Candid" },
  { id: 9, src: photography_1, title: "", category: "Candid" },
  { id: 10, src: best_1, title: "", category: "Pre-Wedding" },
];

export default function Portfolio() {
  const [selectedId, setSelectedId] = useState(null);

  const selectedItem = portfolioItems.find((item) => item.id === selectedId);

  const handleNext = useCallback((e) => {
    e.stopPropagation();
    const currentIndex = portfolioItems.findIndex(item => item.id === selectedId);
    const nextIndex = (currentIndex + 1) % portfolioItems.length;
    setSelectedId(portfolioItems[nextIndex].id);
  }, [selectedId]);

  const handlePrev = useCallback((e) => {
    e.stopPropagation();
    const currentIndex = portfolioItems.findIndex(item => item.id === selectedId);
    const prevIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
    setSelectedId(portfolioItems[prevIndex].id);
  }, [selectedId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedId) return;
      if (e.key === "ArrowRight") handleNext(e);
      if (e.key === "ArrowLeft") handlePrev(e);
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, handleNext, handlePrev]);

  return (
    <div className="bg-studio-black text-studio-white min-h-screen pt-32 pb-20 px-4 md:px-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-sans tracking-[0.3em] uppercase text-studio-accent mb-4 block">Our Work</span>
        <h1 className="font-serif text-6xl md:text-8xl text-studio-white">Selected Stories</h1>
      </motion.div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-[1600px] mx-auto">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="break-inside-avoid"
            onClick={() => setSelectedId(item.id)}
          >
            <div className="group relative overflow-hidden bg-studio-gray cursor-pointer">
              <motion.img
                layoutId={`image-${item.id}`}
                src={item.src}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-studio-accent text-xs tracking-widest uppercase mb-2 block transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.category}</span>
                <h3 className="text-white font-serif text-3xl italic transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedId(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={() => setSelectedId(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-studio-accent transition-colors z-[110] p-4 group"
              onClick={handlePrev}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 border border-white/10 rounded-full flex items-center justify-center group-hover:border-studio-accent/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </div>
            </button>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-studio-accent transition-colors z-[110] p-4 group"
              onClick={handleNext}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 border border-white/10 rounded-full flex items-center justify-center group-hover:border-studio-accent/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </button>

            {/* Image Container */}
            <div
              className="relative max-w-7xl max-h-screen w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                layoutId={`image-${selectedItem.id}`}
                src={selectedItem.src}
                alt={selectedItem.title}
                className="max-h-[85vh] max-w-full object-contain shadow-2xl"
              />

              <div className="mt-6 text-center">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-studio-accent text-sm tracking-widest uppercase block mb-2"
                >
                  {selectedItem.category}
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-serif text-white italic"
                >
                  {selectedItem.title}
                </motion.h2>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
