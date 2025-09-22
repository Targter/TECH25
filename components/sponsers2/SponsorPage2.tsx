"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

// Sample sponsor logos (replace with your actual URLs)
const sponsorsData = {
  title: [
    { id: 1, name: "TechCorp", logo: "/sponsors/techcorp.png" },
    { id: 2, name: "InnovateX", logo: "/sponsors/innovatex.png" },
  ],
  startup: [
    { id: 3, name: "StartupHive", logo: "/sponsors/startuphive.png" },
    { id: 4, name: "CodeNest", logo: "/sponsors/codenest.png" },
    { id: 5, name: "LaunchPad", logo: "/sponsors/launchpad.png" },
  ],
  organization: [
    { id: 6, name: "STPI", logo: "/sponsors/stpi.png" },
    { id: 7, name: "CUNetwork", logo: "/sponsors/cunetwork.png" },
    { id: 8, name: "Punjab Engine", logo: "/sponsors/punjabengine.png" },
  ],
}

// Floating particle component
const FloatingParticle = ({ size, color, delay, x, y }: { size: number; color: string; delay: number; x: number; y: number }) => (
  <motion.div
    className={`absolute rounded-full ${color}`}
    style={{ width: size, height: size, top: y, left: x }}
    animate={{ y: [0, -20, 0], x: [0, 10, -10, 0] }}
    transition={{ repeat: Infinity, duration: 6 + delay, delay: delay, ease: "easeInOut" }}
  />
)

const SponsorPage = () => {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    // Generate random floating particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 4,
      color: ["bg-cyan-400/50", "bg-pink-400/50", "bg-yellow-400/50"][i % 3],
      delay: Math.random() * 3,
      x: `${Math.random() * 90}%`,
      y: `${Math.random() * 90}%`,
    }))
    setParticles(newParticles)
  }, [])

  const renderSponsorSection = (title: string, data: any[]) => (
    <div className="my-16 text-center relative z-10">
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 mb-8 animate-pulse"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 justify-items-center items-center px-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {data.map((sponsor) => (
          <motion.div
            key={sponsor.id}
            className="relative w-32 h-32 md:w-36 md:h-36 rounded-xl overflow-hidden border-2 border-cyan-400/30 hover:border-pink-400/50 cursor-pointer shadow-lg shadow-cyan-500/20 hover:shadow-pink-500/30 transition-all"
            whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
          >
            <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain p-4" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 px-4 py-12 overflow-hidden flex flex-col items-center">
      {/* Background particles */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} {...p} />
      ))}

      <div className="max-w-7xl w-full relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 text-center mb-12"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Our Sponsors & Partners
        </motion.h1>

        {renderSponsorSection("Title Sponsors", sponsorsData.title)}
        {renderSponsorSection("Startup Sponsors & Collaborations", sponsorsData.startup)}
        {renderSponsorSection("Organization Partners", sponsorsData.organization)}

        <motion.a
          href="mailto:iste@cumail.in"
          className="mt-12 inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 border border-cyan-400/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
        >
          Contact Us to Partner
        </motion.a>
      </div>
    </div>
  )
}

export default SponsorPage
