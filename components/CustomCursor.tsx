import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const lastMoveTime = useRef(0);

  // Smooth spring physics for the cursor movement
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // throttle: 約60fps (16ms)
      const now = Date.now();
      if (now - lastMoveTime.current >= 16) {
        cursorX.set(e.clientX - 16); // Center the cursor (32px / 2)
        cursorY.set(e.clientY - 16);
        lastMoveTime.current = now;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.getAttribute('role') === 'button') {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-gray-800 rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 1)' : 'transparent',
        borderColor: isHovered ? 'transparent' : '#fff',
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
        {/* Center Dot */}
        <motion.div 
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{ opacity: isHovered ? 0 : 1 }}
        />
    </motion.div>
  );
};

export default CustomCursor;
