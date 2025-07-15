"use client"
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { previousposter } from "@/lib/constants"
import { CalendarDays, Rocket, Sparkles } from "lucide-react";
import Image from "next/image";

// Mock data - replace with your actual previousposter import


const icons = [<Sparkles key="sparkles" />, <Rocket key="rocket" />, <CalendarDays key="calendar" />];

function PreviousPosterMain() {
    const ref = useRef(null);
    const linkRef = useRef(null);

    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const isLinkInView = useInView(linkRef, { once: true, amount: 0.3 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: {
            y: 40,
            opacity: 0,
            scale: 0.95,
            rotateX: -15
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            transition: {
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94]
            },
        },
    };

    const linkVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            },
        },
    };

    return (
        <div className="w-full max-w-none text-5xl">
            <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 mb-12">
                Highlights of Our Past Events
            </h2>

            {/* Main container with 80% width constraint */}
            <div className="w-4/5 mx-auto px-4 py-12">
                {/* Events Grid */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                >
                    {previousposter.slice(0, 3).map((event, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative p-6 rounded-2xl border border-green-400/40 bg-gradient-to-br from-black/40 via-black/30 to-black/20
                backdrop-blur-sm
                hover:border-purple-400/60 hover:bg-gradient-to-br hover:from-purple-900/20 hover:via-blue-900/15 hover:to-pink-900/10
                transition-all duration-500 ease-out
                hover:scale-[1.03] hover:-translate-y-3
                hover:shadow-2xl hover:shadow-purple-500/25
                min-h-[480px] flex flex-col
                overflow-hidden
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent
                before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-1000"
                        >
                            {/* Animated border glow */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 
                blur-xl transition-opacity duration-500 -z-10" />

                            {/* Image container with enhanced effects */}
                            <div className="relative w-full h-85 rounded-lg overflow-hidden mb-4">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content container */}
                            <div className="relative z-10 flex flex-col flex-grow">
                                {/* Header with enhanced icon animation */}
                                <div className="flex items-center space-x-4 mb-5 group-hover:scale-105 
                  transition-transform duration-500 ease-out">
                                    <div className="text-green-400 text-5xl group-hover:text-purple-300 
                    group-hover:drop-shadow-2xl group-hover:filter group-hover:brightness-125
                    transition-all duration-500 group-hover:rotate-12 group-hover:scale-125
                    transform-gpu">
                                        {icons[index % icons.length]}
                                    </div>
                                    <h2 className="text-2xl font-bold text-white group-hover:text-purple-100 
                    transition-colors duration-500 group-hover:drop-shadow-lg
                    leading-tight">
                                        {event.title}
                                    </h2>
                                </div>

                                {/* Year badge */}
                                <div className="inline-flex items-center px-3 py-1 rounded-full 
                  bg-green-500/20 border border-green-400/40 mb-4 w-fit
                  group-hover:bg-purple-500/20 group-hover:border-purple-400/40
                  transition-all duration-500">
                                    <p className="text-sm text-green-400 group-hover:text-purple-300 
                    transition-colors duration-500 font-semibold">
                                        Year: {event.year}
                                    </p>
                                </div>

                                {/* Description with enhanced styling */}
                              <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-500 
  leading-relaxed group-hover:drop-shadow-sm flex-grow text-base group-hover:translate-y-[-2px]">
  {event.description}
</p>


                                {/* Enhanced CTA button */}
                                {/* <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100
                  transform translate-y-4 group-hover:translate-y-0">
                                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg
                    bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500
                    text-white font-medium text-sm transition-all duration-300
                    hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105">
                                        <span>Learn More</span>
                                        <ExternalLink size={14} />
                                    </button>
                                </div> */}

                                {/* Multiple floating elements */}
                                <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-pink-400/50 rounded-full
                  opacity-0 group-hover:opacity-100 transition-all duration-600 delay-300
                  group-hover:animate-bounce" />
                                <div className="absolute top-1/2 right-4 w-1 h-1 bg-cyan-400/60 rounded-full
                  opacity-0 group-hover:opacity-100 transition-all duration-800 delay-200
                  group-hover:animate-pulse" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Enhanced CTA Section */}
                <motion.div
                    ref={linkRef}
                    variants={linkVariants}
                    initial="hidden"
                    animate={isLinkInView ? "visible" : "hidden"}
                    className="text-center space-y-6"
                >
                
<a
  href="/previous-events"
  className="group inline-block relative border-2 border-white/40 rounded-2xl p-6 
             hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20
             transition-all duration-300 bg-gradient-to-br from-white/5 to-transparent"
>
  {/* Inner content */}
  <div className="relative z-10">
    <h3
      className="text-2xl lg:text-3xl font-bold text-white 
                 group-hover:text-transparent group-hover:bg-clip-text 
                 group-hover:bg-gradient-to-r group-hover:from-purple-400 
                 group-hover:to-blue-400 transition-all duration-300 leading-tight"
    >
      A visual walkthrough of all our previous events
    </h3>

    {/* Animated underline */}
    <div
      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 
                 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full
                 group-hover:w-full transition-all duration-500 ease-out"
    />
  </div>
</a>

          

                    {/* Enhanced progress bars with staggered animation */}
                    <div className="flex items-center justify-center space-x-3 mt-8">
                        {[0, 1, 2].map((index) => (
                            <motion.div
                                key={index}
                                initial={{ width: 0, opacity: 0 }}
                                animate={isLinkInView ? { width: 64, opacity: 1 } : { width: 0, opacity: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.15,
                                    ease: "easeOut"
                                }}
                                className="h-1 bg-gradient-to-r from-white via-purple-300 to-blue-300 rounded-full
                  shadow-lg shadow-white/20"
                            />
                        ))}
                    </div>

                    {/* Call to action button */}
                    
                </motion.div>
            </div>
        </div>
    )
}

export default PreviousPosterMain;