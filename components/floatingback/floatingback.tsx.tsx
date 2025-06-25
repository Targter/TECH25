// components/FloatingBackground.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function FloatingBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const floatingElements = useMemo(() => {
    if (!isClient) return [];
    
    const elements = [];
    for (let i = 0; i < 6; i++) {
      const seed = i * 12345;
      elements.push({
        id: i,
        size: ((seed * 3) % 20) + 10,
        duration: ((seed * 5) % 10) + 15,
        delay: (seed % 5) + (i * 0.5),
        x: ((seed * 7) % 80) + 10,
        y: ((seed * 11) % 80) + 10
      });
    }
    return elements;
  }, [isClient]);

  return (
    <>
      {isClient && floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute pointer-events-none"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full backdrop-blur-sm border border-green-500/30" />
        </motion.div>
      ))}
    </>
  );
}
