import React from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  const letters = ['1', 'p', 'r', 'o', 'f', 'i', 'l', 'e'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-2xl font-bold relative"
      style={{ 
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '1px'
      }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
          className="inline-block hover:text-gray-600 transition-colors"
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default Logo;