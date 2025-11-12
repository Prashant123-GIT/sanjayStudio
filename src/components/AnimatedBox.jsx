import { motion } from 'framer-motion';

export default function AnimatedBox({ w = 'w-full', h = 'h-64', rounded = 'rounded-xl', className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${w} ${h} ${rounded} bg-gray-200 dark:bg-gray-700 box-shadow-soft ${className}`}
    />
  );
}
