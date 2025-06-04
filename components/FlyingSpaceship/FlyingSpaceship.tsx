'use client'

import { motion } from "framer-motion"

interface FlyingSpaceshipProps {
  right?: string;
  left?: string;
  top?: string;
  duration?: number;
  color?: "green" | "blue" | "purple";
  direction?: "leftToRight" | "rightToLeft";
}

export default function FlyingSpaceship({
  top = "top-[30%]",
  left = "left-[10%]",
  duration = 20,
  color = "green",
  direction = "leftToRight"
}: FlyingSpaceshipProps) {
  const colors = {
    green: {
      body: "from-green-400 via-green-500 to-green-600",
      inner: "from-green-300 to-green-400",
      wing: "bg-green-500",
      cockpit: "from-cyan-300 to-blue-400",
      trail: "from-green-400 via-green-300"
    },
    blue: {
      body: "from-blue-400 via-blue-500 to-blue-600",
      inner: "from-blue-300 to-blue-400",
      wing: "bg-blue-500",
      cockpit: "from-teal-300 to-blue-300",
      trail: "from-blue-400 via-blue-300"
    },
    purple: {
      body: "from-purple-400 via-purple-500 to-purple-600",
      inner: "from-purple-300 to-purple-400",
      wing: "bg-purple-500",
      cockpit: "from-pink-300 to-purple-400",
      trail: "from-purple-400 via-purple-300"
    }
  };

  const c = colors[color];
  const isLeftToRight = direction === "leftToRight";

  return (
    <motion.div
      className={`absolute ${top} ${left} w-32 h-20 pointer-events-none z-30`}
      initial={{ x: isLeftToRight ? -200 : 200 }}
      animate={{ x: isLeftToRight ? window.innerWidth + 200 : -(window.innerWidth + 200) }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="relative w-24 h-12"
        animate={{
          rotateX: [0, 10, -5, 0],
          scale: [1, 1.1, 0.95, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Main Body */}
        <div className={`absolute inset-0 bg-gradient-to-r ${c.body} rounded-full shadow-lg transform rotate-12`}>
          <div className={`absolute inset-2 bg-gradient-to-r ${c.inner} rounded-full opacity-60`} />
        </div>

        {/* Wings */}
        <div className={`absolute -left-3 top-1/2 w-8 h-3 ${c.wing} transform -translate-y-1/2 rotate-45 rounded-full shadow-md`} />
        <div className={`absolute -right-3 top-1/2 w-8 h-3 ${c.wing} transform -translate-y-1/2 -rotate-45 rounded-full shadow-md`} />

        {/* Cockpit */}
        <div className={`absolute top-1 left-1/2 w-4 h-4 bg-gradient-to-br ${c.cockpit} rounded-full transform -translate-x-1/2 shadow-inner`}>
          <motion.div
            className="absolute inset-1 bg-white rounded-full opacity-80"
            animate={{ opacity: [0.8, 0.4, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Engine Glow */}
        <motion.div
          className="absolute -right-8 top-1/2 w-12 h-2 bg-gradient-to-r from-orange-400 via-yellow-300 to-transparent rounded-full transform -translate-y-1/2"
          animate={{
            scaleX: [1, 1.5, 0.8, 1.2, 1],
            opacity: [0.8, 1, 0.6, 0.9, 0.8]
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Particle Trail */}
        <motion.div
          className={`absolute -right-16 top-1/2 w-20 h-1 bg-gradient-to-r ${c.trail} to-transparent rounded-full transform -translate-y-1/2 opacity-60`}
          animate={{
            scaleX: [1, 1.3, 0.7, 1],
            opacity: [0.6, 0.8, 0.3, 0.6]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
}