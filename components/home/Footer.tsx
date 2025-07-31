import React from 'react';
import { motion } from 'framer-motion';
import { BackgroundBeams } from '../ui/beams';

const Footer = () => {
  const lineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 1,
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <footer className="sticky bottom-0 bg-black text-white h-screen flex items-center justify-center ">
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="relative z-10 text-center">
        <motion.h1
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          
          className="
              font-black 
              text-[25vh]
              leading-[0.8]
              tracking-tighter animate-fade-in-up
              bg-gradient-to-r from-neutral-450 via-white to-neutral-450 bg-clip-text text-transparent
            "
        >
          <motion.span custom={0} variants={lineVariants} className="block ">IT'S</motion.span>
          <motion.span custom={1} variants={lineVariants} className="block ">PAYROLL</motion.span>
          <motion.span custom={2} variants={lineVariants} className="block ">TIME!</motion.span>
        </motion.h1>
      </div>
    </footer>
  );
};

export default Footer;