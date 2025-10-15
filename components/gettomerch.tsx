"use client"

import { motion } from "framer-motion"
import { ShoppingBag, ArrowRight, Shirt, Code, Cpu } from "lucide-react"
import Link from "next/link"

export default function TechniciaMemorabiliaSection() {
  return (
    <section className="relative py-10 px-4">
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-green-400 font-semibold text-sm">TECHNICIA &apos;25 EXCLUSIVE</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Grab Your
            <span className="block mt-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Technicia &apos;25
            </span>
            <span className="block mt-2 text-3xl md:text-4xl">Memorabilia</span>
          </h2>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-12">
            Take home a piece of India&apos;s biggest tech fest! Limited edition merchandise exclusively designed 
            for Technicia &apos;25. From tech-inspired apparel to premium accessories.
          </p>

          {/* Category Icons */}
          <div className="flex justify-center gap-8 mb-12 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-gray-800 p-4 rounded-xl border border-green-500/20">
                <Shirt className="h-8 w-8 text-green-400" />
              </div>
              <span className="text-sm text-gray-400 font-medium">Apparel</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-gray-800 p-4 rounded-xl border border-green-500/20">
                <ShoppingBag className="h-8 w-8 text-green-400" />
              </div>
              <span className="text-sm text-gray-400 font-medium">Bags</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-gray-800 p-4 rounded-xl border border-green-500/20">
                <Code className="h-8 w-8 text-green-400" />
              </div>
              <span className="text-sm text-gray-400 font-medium">Tech Gear</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-gray-800 p-4 rounded-xl border border-green-500/20">
                <Cpu className="h-8 w-8 text-green-400" />
              </div>
              <span className="text-sm text-gray-400 font-medium">Accessories</span>
            </div>
          </div>
           <h2 className="text-xl font-semibold text-green-400 mb-8 animate-pulse">
    🎁 Use Code <span className="text-white">TECHNICIA25</span> for <span className="text-white">10% OFF</span> your order!
  </h2>

          {/* CTA Button */}
          <Link href="/merch">
            <button className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-transform hover:scale-105">
              <ShoppingBag className="h-6 w-6" />
              <span>Explore Merch Store</span>
              <ArrowRight className="h-6 w-6" />
            </button>
          </Link>

        
        </motion.div>
      </div>
    </section>
  )
}