"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, MapPin, Users, Trophy, Code, Zap } from "lucide-react"
import { siteConfig } from "@/lib/constants"
import { useState, useEffect, useMemo,  } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports with Next.js dynamic() - Recommended approach
const PlanetScene = dynamic(() => import('@/components/planet-3d/planet-3d'), {
  loading: () => (
    <div className="flex items-center justify-center w-full min-h-[400px]">
      <div className="text-green-400 animate-pulse">Loading..</div>
    </div>
  ),
  ssr: false
});


// ✅ Simplest approach - make sure FlyingSpaceship is a default export
const FlyingSpaceship = dynamic(() => 
  import('@/components/FlyingSpaceship/FlyingSpaceship'), 
  {
    loading: () => null,
    ssr: false
  }
);

// Then use it as: <FlyingSpaceship.FlyingSpaceship />



export function HeroSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const stats = [
    { icon: Users, label: "Participants", value: "5000+" },
    { icon: Trophy, label: "Competitions", value: "12+" },
    { icon: Code, label: "Projects", value: "500+" },
    { icon: Zap, label: "Workshops", value: "25+" }
  ]

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
    <div className="relative min-h-screen flex items-center justify-start overflow-hidden bg-gradient-to-br scroll-smooth px-8 md:px-16">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_70%,transparent_110%)]" />
      </div>
      
      <FlyingSpaceship top="top-[35%]" left="left-[90%]" duration={22} color="blue" direction="rightToLeft" />

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

      {/* Planet scene with dynamic import - Now properly lazy loaded */}
      <div className="hidden md:flex absolute inset-0 pointer-events-none z-10 justify-center items-center">
        <div className="w-full h-full max-w-[1400px] max-h-[900px]">
          {/* Option 1: Using Next.js dynamic() with built-in loading */}
          <PlanetScene />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60" style={{ zIndex: 2 }} />

      <div className="relative z-20 max-w-3xl text-center mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 mb-8 bg-green-500/10 border border-green-500/30 rounded-full backdrop-blur-sm"
          >
            <Zap className="h-4 w-4 mr-2 text-green-400" />
            <span className="text-sm font-medium text-green-400">North India&apos;s Premier Tech Festival</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <div className="block">
              {['TECH', 'NICIA-25'].map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.3,
                    ease: "easeOut"
                  }}
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-500 to-emerald-400 mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="block text-2xl md:text-4xl lg:text-5xl font-bold text-white/90 mt-2"
            >
              
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-lg md:text-2xl font-semibold mb-4 text-white drop-shadow-lg"
          >
            Where Innovation Meets{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
              Opportunity
            </span>
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.3 }} className="text-green-400 text-lg font-semibold mb-10 max-w-xl leading-tight">
            Experience North India&apos;s ultimate tech festival — innovate, compete, connect!
          </motion.p>

          <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 1.4 }}
  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-xl"
>
  {stats.map((stat, index) => (
    <motion.div
      key={stat.label}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
      whileHover={{ 
        scale: 1.08, 
        y: -8,
        rotateY: 5,
        transition: { 
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
      whileTap={{ scale: 0.95 }}
      className="bg-gradient-to-br from-black/40 via-black/30 to-black/20 backdrop-blur-md border border-green-500/20 rounded-xl p-4 hover:border-green-400/80 hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-500 cursor-pointer group relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,50,0,0.1) 50%, rgba(0,0,0,0.3) 100%)'
      }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          x: ['-100%', '100%'],
          transition: {
            repeat: Infinity,
            duration: 2,
            ease: "linear"
          }
        }}
      />
      
      {/* Floating particles effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                       radial-gradient(circle at 80% 70%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                       radial-gradient(circle at 40% 80%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)`
        }}
      />

      {/* Icon with complex animation */}
      <motion.div
        className="relative z-10"
        whileHover={{ 
          scale: 1.2,
          rotate: [0, -10, 10, -5, 0],
          y: [-2, -5, -2],
          transition: { 
            duration: 0.6,
            type: "spring",
            stiffness: 200
          }
        }}
      >
        <motion.div
          
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(34, 197, 94, 0)",
              "0 0 0 4px rgba(34, 197, 94, 0.1)",
              "0 0 0 8px rgba(34, 197, 94, 0)",
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
          className=" relative rounded-full p-2 group-hover:bg-green-500/10 transition-colors duration-300"
        >
          <stat.icon className="h-6 w-6 text-green-400 mx-auto mb-3 group-hover:text-green-300 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-all duration-300" />
        </motion.div>
      </motion.div>

      {/* Value with typewriter effect on hover */}
      <motion.div 
        className="text-xl font-bold text-white mb-2 group-hover:text-green-100 transition-colors duration-300 relative z-10"
        whileHover={{
          scale: 1.05,
          textShadow: "0 0 8px rgba(34, 197, 94, 0.5)",
          transition: { duration: 0.2 }
        }}
      >
        {stat.value}
      </motion.div>

      {/* Label with slide-up effect */}
      <motion.div 
        className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors duration-300 relative z-10"
        whileHover={{
          y: -1,
          transition: { duration: 0.2 }
        }}
      >
        {stat.label}
      </motion.div>

      {/* Corner accent lines */}
      <motion.div
        className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-transparent group-hover:w-full transition-all duration-500"
      />
      <motion.div
        className="absolute bottom-0 right-0 w-0 h-0.5 bg-gradient-to-l from-green-400 to-transparent group-hover:w-full transition-all duration-500 delay-100"
      />
      <motion.div
        className="absolute top-0 left-0 h-0 w-0.5 bg-gradient-to-b from-green-400 to-transparent group-hover:h-full transition-all duration-500 delay-200"
      />
      <motion.div
        className="absolute bottom-0 right-0 h-0 w-0.5 bg-gradient-to-t from-green-400 to-transparent group-hover:h-full transition-all duration-500 delay-300"
      />

      {/* Data stream effect */}
      <motion.div
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        animate={{
          rotate: 360,
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <div className="w-3 h-3 border border-green-400/50 rounded-full">
          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </motion.div>
    </motion.div>
  ))}
</motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-sm border border-green-500/20 rounded-full">
              <Calendar className="h-4 w-4 text-green-400" />
              <span className="text-white text-sm font-medium">{siteConfig.date}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-sm border border-green-500/20 rounded-full">
              <MapPin className="h-4 w-4 text-green-400" />
              <span className="text-white text-sm font-medium">{siteConfig.venue}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.9 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-6  rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/register">
                Register Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-green-400 text-green-400 hover:bg-green-200/10  font-semibold px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="#timeline">Explore Competitions</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" style={{ zIndex: 2 }} />
    </div>
  )
}