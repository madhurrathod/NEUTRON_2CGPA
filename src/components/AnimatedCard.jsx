import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

const AnimatedCard = ({ children, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95,
      rotate: index % 2 === 0 ? -5 : 5
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.6,
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        transformOrigin: index % 2 === 0 ? "left" : "right",
        willChange: "transform, opacity"
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard; 