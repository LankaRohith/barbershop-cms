import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TabSwitchAnimation = () => {
  const [phase, setPhase] = useState('hidden'); // 'hidden', 'flash', 'burst', 'welcome', 'done'

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setPhase('hidden');
      } else {
        // Sequence: flash → burst → welcome
        setPhase('flash');
        setTimeout(() => setPhase('burst'), 300);
        setTimeout(() => setPhase('welcome'), 800);
        setTimeout(() => setPhase('done'), 3000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {phase === 'flash' && (
        <motion.div
          key="flash"
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0, 1, 0, 1, 0],
            background: [
              '#000',
              '#d4af37',
              '#000',
              '#d4af37',
              '#000',
              '#d4af37',
              '#000',
            ]
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1] }}
        />
      )}

      {phase === 'burst' && (
        <motion.div
          key="burst"
          className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
          style={{ background: 'radial-gradient(circle, #d4af37 0%, #000 100%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Exploding scissors */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-5xl"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ scale: 0, x: 0, y: 0, rotate: 0 }}
              animate={{ 
                scale: [0, 2, 0],
                x: Math.cos(i * 18 * Math.PI / 180) * 400,
                y: Math.sin(i * 18 * Math.PI / 180) * 400,
                rotate: i * 36,
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              ✂️
            </motion.div>
          ))}
          
          {/* Center shockwave */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              className="w-0 h-0 rounded-full border-8 border-white"
              animate={{
                width: [0, 800, 1000],
                height: [0, 800, 1000],
                opacity: [1, 0.5, 0],
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </motion.div>
        </motion.div>
      )}

      {phase === 'welcome' && (
        <motion.div
          key="welcome"
          className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
          style={{ background: '#000' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Shaking background */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(45deg, #d4af37, #000, #d4af37)' }}
            animate={{
              x: [0, -10, 10, -10, 10, 0],
              rotate: [0, 1, -1, 1, -1, 0],
            }}
            transition={{ duration: 0.5, repeat: 4 }}
          />
          
          {/* Giant scissor */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              className="text-[200px]"
              animate={{
                scale: [0, 1.5, 1],
                rotate: [0, -20, 20, -10, 10, 0],
                y: [0, -50, 0],
              }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              ✂️
            </motion.div>
          </motion.div>

          {/* WELCOME BACK text */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <motion.h2
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                textShadow: [
                  '0 0 0px #d4af37',
                  '0 0 20px #d4af37, 0 0 40px #d4af37',
                  '0 0 0px #d4af37',
                  '0 0 20px #d4af37, 0 0 40px #d4af37',
                  '0 0 0px #d4af37',
                ]
              }}
              transition={{ 
                scale: { duration: 0.5, type: 'spring', stiffness: 300 },
                rotate: { duration: 0.5 },
                textShadow: { duration: 2, repeat: 1 }
              }}
              className="font-display text-6xl md:text-9xl font-bold text-white"
            >
              WELCOME
            </motion.h2>
            <motion.h2
              initial={{ scale: 0, x: -500 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
              className="font-display text-5xl md:text-8xl font-bold text-barber-gold mt-4"
              style={{ textShadow: '0 0 30px #d4af37' }}
            >
              BACK!
            </motion.h2>
            <motion.p
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="text-white text-2xl md:text-3xl mt-8 font-bold"
            >
              Let's get that FRESH CUT! 💈
            </motion.p>
          </motion.div>

          {/* Corner scissors spinning */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute text-6xl"
              style={{
                left: i % 2 === 0 ? '5%' : 'auto',
                right: i % 2 === 1 ? '5%' : 'auto',
                top: i < 2 ? '5%' : 'auto',
                bottom: i >= 2 ? '5%' : 'auto',
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              ✂️
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TabSwitchAnimation;
