import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();

  const shredVariants = {
    initial: {
      clipPath: 'inset(0 0 0 0)',
      opacity: 1,
    },
    exit: {
      clipPath: [
        'inset(0 0 0 0)',
        'inset(10% 0 10% 0)',
        'inset(20% 0 20% 0)',
        'inset(30% 0 30% 0)',
        'inset(40% 0 40% 0)',
        'inset(50% 0 50% 0)',
        'inset(60% 0 60% 0)',
        'inset(70% 0 70% 0)',
        'inset(80% 0 80% 0)',
        'inset(90% 0 90% 0)',
        'inset(100% 0 100% 0)',
      ],
      opacity: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0],
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
    enter: {
      clipPath: [
        'inset(100% 0 100% 0)',
        'inset(90% 0 90% 0)',
        'inset(80% 0 80% 0)',
        'inset(70% 0 70% 0)',
        'inset(60% 0 60% 0)',
        'inset(50% 0 50% 0)',
        'inset(40% 0 40% 0)',
        'inset(30% 0 30% 0)',
        'inset(20% 0 20% 0)',
        'inset(10% 0 10% 0)',
        'inset(0 0 0 0)',
      ],
      opacity: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={shredVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ willChange: 'clipPath, opacity' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
