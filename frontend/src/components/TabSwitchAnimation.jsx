import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TabSwitchAnimation = () => {
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setPhase('idle');
      } else {
        setPhase('flash');
        setTimeout(() => setPhase('shred'), 150);
        setTimeout(() => setPhase('explode'), 400);
        setTimeout(() => setPhase('welcome'), 900);
        setTimeout(() => setPhase('idle'), 3500);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  if (phase === 'idle') return null;

  return (
    <AnimatePresence>
      {phase === 'flash' && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0, 1, 0, 1, 0, 1, 0],
            background: ['#000', '#fff', '#000', '#d4af37', '#000', '#fff', '#000', '#d4af37', '#000']
          }}
          transition={{ duration: 0.3, times: [0, 0.11, 0.22, 0.33, 0.44, 0.55, 0.66, 0.77, 1] }}
        />
      )}

      {phase === 'shred' && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-gradient-to-b from-barber-gold via-white to-barber-gold"
              initial={{ y: i % 2 === 0 ? '-100%' : '100%', opacity: 1 }}
              animate={{ y: i % 2 === 0 ? '100%' : '-100%', opacity: [1, 1, 0] }}
              transition={{ duration: 0.3, delay: i * 0.02, ease: 'easeInOut' }}
            />
          ))}
        </div>
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
