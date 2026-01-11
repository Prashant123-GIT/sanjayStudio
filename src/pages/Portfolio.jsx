/* eslint-disable no-unused-vars */
// pages/Portfolio.jsx
import { motion } from "framer-motion";
import hand_ring_1 from "../assets/portfolio/hand_ring_1.jpg";
import hand_ring_2 from "../assets/portfolio/hand_ring_2.jpg";

const portfolioItems = [
  { id: 1, src: hand_ring_1, title: "Rutuja & Dhruv", category: "Wedding" },
  { id: 2, src: hand_ring_2, title: "Mugdha & Kshitij", category: "Wedding" },
  { id: 3, src: "https://images.unsplash.com/photo-1544979590-37e9b47cd7bc?auto=format&fit=crop&q=80&w=1954", title: "Shrushti & Kunal", category: "Engagement" },
  { id: 4, src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2070", title: "Avantika & Rohan", category: "Wedding" },
  { id: 5, src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=2070", title: "Neesha & Pratik", category: "Portraits" },
  { id: 6, src: "https://images.unsplash.com/photo-1520854221256-17451cc330e7?auto=format&fit=crop&q=80&w=1974", title: "Cindy & Ayush", category: "Details" },
  { id: 7, src: "https://images.unsplash.com/photo-1511285560982-1356c11d4606?auto=format&fit=crop&q=80&w=2076", title: "Amrita & Vihang", category: "Reception" },
  { id: 8, src: "https://images.unsplash.com/photo-1522673607200-1645062cd958?auto=format&fit=crop&q=80&w=2070", title: "Sana & Rahil", category: "Candid" },
];

export default function Portfolio() {
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
          >
            <div className="group relative overflow-hidden bg-studio-gray cursor-pointer">
              <img
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
    </div>
  );
}
