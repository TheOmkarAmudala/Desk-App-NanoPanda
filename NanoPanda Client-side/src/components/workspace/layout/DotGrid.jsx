import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Dot = ({ dot, mouseX, mouseY }) => {
  const distanceX = useTransform(mouseX, (v) => v - dot.x);
  const distanceY = useTransform(mouseY, (v) => v - dot.y);
  const distance = useTransform([distanceX, distanceY], ([dx, dy]) => Math.sqrt(dx * dx + dy * dy));

  const zScale = useTransform(distance, [0, 150], [2.5, 1]);
  const opacity = useTransform(distance, [0, 150], [0.5, 0.12]);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const animatedZ = useSpring(zScale, springConfig);
  const animatedOpacity = useSpring(opacity, springConfig);

  return (
    <motion.div
      style={{ left: dot.x, top: dot.y, scale: animatedZ, opacity: animatedOpacity }}
      className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full"
    />
  );
};

export const DotGrid = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const dots = useMemo(() => {
    const d = [];
    const spacing = 45; 
    const rows = Math.ceil(window.innerHeight / spacing) + 1;
    const cols = Math.ceil(window.innerWidth / spacing) + 1;
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        d.push({ id: `${i}-${j}`, x: j * spacing, y: i * spacing });
      }
    }
    return d;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050506]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0c] via-black to-[#080305]" />
      {dots.map((dot) => (
        <Dot key={dot.id} dot={dot} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
};
