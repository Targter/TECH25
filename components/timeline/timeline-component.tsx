"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Calendar, Users, Trophy, Clock, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from 'next/dynamic';
import {competitions} from '@/lib/constants'

const FlyingSpaceship = dynamic(() => 
  import('@/components/FlyingSpaceship/FlyingSpaceship'), 
  {
    loading: () => null,
    ssr: false
  }
);

export default function TimelineComponent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Memoized animation variants to prevent recreation
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }, // Reduced stagger
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: {
      y: 60, // Reduced movement
      opacity: 0,
      scale: 0.9, // Less dramatic scale change
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6, // Faster animation
        ease: [0.25, 0.46, 0.45, 0.94]
      },
    },
  }), []);

  // Simplified text glow animation
  const textGlowAnimation = useMemo(() => ({
    textShadow: [
      "0 0 10px rgba(34,197,94,0.6)",
      "0 0 20px rgba(34,197,94,0.8)",
      "0 0 10px rgba(34,197,94,0.6)"
    ]
  }), []);

  return (
    <section className="py-12 md:py-20 text-white w-full relative overflow-hidden">
      {/* Reduced number of flying spaceships - hide on mobile for performance */}
      <div className="hidden lg:block">
        <FlyingSpaceship top="top-[15%]" left="left-[5%]" duration={20} color="green" direction="leftToRight" />
      </div>

      {/* Simplified background elements - responsive sizing */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-16 md:top-20 left-6 md:left-10 w-8 h-8 md:w-12 md:h-12 border border-green-400/20"
          animate={{
            rotateZ: [0, 360],
            translateY: [-5, 5, -5]
          }}
          transition={{
            duration: 20, // Slower animation
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-24 md:bottom-32 right-1/4 w-12 h-12 md:w-16 md:h-16 border border-green-300/30 rotate-45"
          animate={{
            rotateZ: [45, 405],
          }}
          transition={{
            duration: 25, // Slower animation
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-[75rem] mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-green-400 px-2"
            animate={textGlowAnimation}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Event Schedule
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Mark your calendar for these exciting competitions at TECHNASIA&apos;25.
            Join us for an unforgettable journey through innovation, technology, and excellence.
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative space-y-16 md:space-y-24" // Responsive spacing
        >
          {/* Simplified timeline line - responsive positioning */}
          <motion.div
            className="absolute left-4 sm:left-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-green-500 to-green-600 rounded-full"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {competitions.map((comp, index) => (
            <motion.div
              key={comp.id}
              variants={itemVariants}
              className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start lg:items-center" // Responsive gap and alignment
            >
              {/* Enhanced timeline dot with responsive positioning */}
              <motion.div
                className="absolute left-4 sm:left-8 lg:left-1/2 top-8 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 transform -translate-x-1/2"
                whileHover={{
                  scale: 1.3,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white shadow-lg relative"
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(34,197,94,0.6)",
                      "0 0 25px rgba(34,197,94,0.8)",
                      "0 0 15px rgba(34,197,94,0.6)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="absolute inset-1 bg-white rounded-full animate-pulse opacity-60" />
                </motion.div>
              </motion.div>

              {/* Text Section with responsive positioning and padding */}
              <motion.div 
                className={`${index % 2 === 1 ? "lg:order-2" : "lg:order-1"} pl-12 sm:pl-16 lg:px-4 relative`}
                whileHover={{
                  x: index % 2 === 1 ? -5 : 5,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Date badge with responsive sizing */}
                <motion.div 
                  className="mb-4 md:mb-6 inline-block"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-green-600/80 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-green-400/50 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: [-100, 200] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="relative flex items-center space-x-2">
                      <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="font-semibold text-sm md:text-base">{comp.date}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.h2 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-green-400"
                  whileHover={{
                    scale: 1.02,
                    textShadow: "0 0 15px rgba(34,197,94,0.8)",
                    transition: { duration: 0.2 }
                  }}
                >
                  {comp.title}
                </motion.h2>

                <motion.p 
                  className="text-base md:text-lg text-gray-300 mb-4 md:mb-6 leading-relaxed"
                  whileHover={{ color: "#d1d5db" }}
                  transition={{ duration: 0.2 }}
                >
                  {comp.description}
                </motion.p>

                {/* Responsive info grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
                  <motion.div 
                    className="flex items-center text-green-300 bg-green-900/20 p-2 md:p-3 rounded-lg border border-green-500/30"
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(34, 197, 94, 0.1)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Clock className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-gray-400">Time</div>
                      <div className="font-semibold text-sm md:text-base truncate">{comp.time}</div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center text-green-300 bg-green-900/20 p-2 md:p-3 rounded-lg border border-green-500/30"
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(34, 197, 94, 0.1)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Users className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-gray-400">Participants</div>
                      <div className="font-semibold text-sm md:text-base truncate">{comp.participants}</div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center text-green-300 bg-green-900/20 p-2 md:p-3 rounded-lg border border-green-500/30"
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(34, 197, 94, 0.1)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Trophy className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-gray-400">Prize Pool</div>
                      <div className="font-semibold text-sm md:text-base truncate">{comp.prize}</div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center text-green-300 bg-green-900/20 p-2 md:p-3 rounded-lg border border-green-500/30"
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(34, 197, 94, 0.1)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Star className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-gray-400">Difficulty</div>
                      <div className="font-semibold text-sm md:text-base truncate">{comp.difficulty}</div>
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  className="flex items-center text-green-300 mb-4 md:mb-6 bg-green-900/20 p-2 md:p-3 rounded-lg border border-green-500/30"
                  whileHover={{
                    scale: 1.01,
                    backgroundColor: "rgba(34, 197, 94, 0.1)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-gray-400">Location</div>
                    <div className="font-semibold text-sm md:text-base truncate">{comp.location}</div>
                  </div>
                </motion.div>

                {/* Responsive highlights */}
                <div className="mb-6 md:mb-8">
                  <h4 className="text-green-400 font-semibold mb-3 text-sm md:text-base">Key Highlights:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {comp.highlights.map((highlight, idx) => (
                      <motion.div
                        key={idx}
                        className="text-xs md:text-sm text-gray-300 bg-green-900/10 px-2 md:px-3 py-1.5 md:py-2 rounded-full border border-green-500/20"
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: "rgba(34, 197, 94, 0.12)",
                          color: "#bbf7d0",
                          transition: { duration: 0.2 }
                        }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        • {highlight}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Link href={`/timeline/${comp.id}`}>
                  <motion.button
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 md:py-3 px-6 md:px-8 rounded-lg transition-colors duration-300 font-semibold relative overflow-hidden text-sm md:text-base w-full sm:w-auto"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 8px 20px rgba(34, 197, 94, 0.3)",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">View Details & Register</span>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Enhanced image section with responsive sizing */}
              <motion.div
                className={`relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[750px] rounded-2xl overflow-hidden shadow-2xl border border-green-500/30 ${
                  index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
                whileHover={{
                  scale: 1.03,
                  rotateY: index % 2 === 1 ? -3 : 3,
                  boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)",
                  transition: { duration: 0.4 }
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="w-full h-full bg-gradient-to-br from-green-900/20 to-black/40 flex items-center justify-center relative">
                  {comp.image ? (
                    <Image
                      src={comp.image}
                      alt={comp.title}
                      fill
                      className="object-cover"
                      priority={index < 2} // Priority loading for first 2 images
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 650px"
                    />
                  ) : (
                    <motion.div 
                      className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-400/50"
                      whileHover={{
                        scale: 1.1,
                        color: "rgba(34, 197, 94, 0.8)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      {comp.title.charAt(0)}
                    </motion.div>
                  )}

                  {/* Enhanced floating objects with responsive sizing */}
                  <motion.div
                    className="absolute top-4 md:top-8 left-4 md:left-8 w-6 h-6 md:w-10 md:h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-lg"
                    animate={{
                      rotateZ: [0, 360],
                      translateY: [-5, 5, -5]
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.2 }
                    }}
                  />

                  <motion.div
                    className="absolute bottom-4 md:bottom-8 right-4 md:right-8 w-8 h-8 md:w-12 md:h-12 border-2 border-green-400/50 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotateZ: [0, 180, 360]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      borderColor: "rgba(34, 197, 94, 0.8)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="absolute inset-2 bg-green-400/30 rounded-full" />
                  </motion.div>

                  <motion.div
                    className="absolute top-1/3 right-6 md:right-12 w-4 h-8 md:w-6 md:h-16 bg-gradient-to-t from-green-500 to-green-300 rounded-full"
                    animate={{
                      translateX: [-3, 3, -3],
                      rotateY: [0, 180, 360]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                  />

                  <motion.div
                    className="absolute bottom-1/3 left-6 md:left-12 w-6 h-6 md:w-8 md:h-8 bg-green-400/40 transform rotate-45"
                    animate={{
                      rotateZ: [45, 405],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    whileHover={{
                      backgroundColor: "rgba(34, 197, 94, 0.6)",
                      transition: { duration: 0.2 }
                    }}
                  />

                  {/* Additional decorative elements with responsive sizing */}
                  <motion.div
                    className="absolute top-12 md:top-16 right-1/4 w-3 h-3 md:w-4 md:h-4 bg-yellow-400/60 rounded-full"
                    animate={{
                      translateY: [-8, 8, -8],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.div
                    className="absolute bottom-12 md:bottom-16 left-1/3 w-4 h-4 md:w-6 md:h-6 border border-purple-400/50"
                    style={{
                      clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)"
                    }}
                    animate={{
                      rotateZ: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}