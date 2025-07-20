"use client"
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { previousposter } from "@/lib/constants"
import { CalendarDays, Rocket, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    className="text-center space-y-6 px-2" 
>
    <Link
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
    </Link>
</motion.div>

<motion.div
    ref={linkRef}
    variants={linkVariants}
    initial="hidden"
    animate={isLinkInView ? "visible" : "hidden"}
    className="text-center space-y-6 py-5"
>
    <Link
        href="/timeline"
        className="group inline-block relative border border-white/30 rounded-xl p-6 
         hover:border-purple-300 hover:shadow-md hover:shadow-purple-400/15
         transition-all duration-300 bg-gradient-to-br from-white/3 to-transparent
         overflow-hidden max-w-lg mx-auto w-full"
    >
        {/* Morphing geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-2 right-2 w-3 h-3 border border-purple-400 
                            rotate-45 group-hover:rotate-180 group-hover:scale-150 
                            transition-all duration-700 ease-out" />
            <div className="absolute bottom-3 left-3 w-2 h-6 bg-gradient-to-t from-blue-400 to-purple-400 
                            group-hover:h-2 group-hover:w-6 group-hover:bg-gradient-to-r
                            transition-all duration-500 ease-in-out" />
            <div className="absolute top-1/2 left-2 w-1 h-1 bg-purple-300 rounded-full
                            group-hover:w-8 group-hover:h-1 group-hover:rounded-full
                            transition-all duration-600 ease-out delay-100" />
        </div>

        {/* Sliding color wave */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 
                        -translate-x-full group-hover:translate-x-full 
                        transition-transform duration-1000 ease-in-out" />

        {/* Inner content */}
        <div className="relative z-10">
            {/* Text with letter stagger effect */}
            <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3 leading-tight">
                {"Click Here to Enter Technisia'25".split('').map((char, index) => (
                    <span 
                        key={index}
                        className="inline-block group-hover:text-transparent group-hover:bg-clip-text 
                                   group-hover:bg-gradient-to-r group-hover:from-purple-300 
                                   group-hover:to-blue-300 transition-all duration-300"
                        style={{ transitionDelay: `${index * 30}ms` }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </h3>

            {/* CTA with expanding background */}
            <div className="relative text-white/70 text-base group-hover:text-white/85 
                           transition-colors duration-300 inline-block">
                <span className="relative z-10">Be part of the biggest 2025 tech event</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 
                               scale-x-0 group-hover:scale-x-100 rounded-full
                               transition-transform duration-400 ease-out origin-left" />
            </div>

            {/* Dynamic underline that draws itself */}
            <svg className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-3/4 
                           transition-all duration-500 ease-out" 
                 height="2" 
                 viewBox="0 0 100 2">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
                <path d="M 0,1 Q 50,0 100,1" 
                      stroke="url(#lineGradient)" 
                      strokeWidth="2" 
                      fill="none"
                      className="animate-pulse group-hover:animate-none" />
            </svg>
        </div>

        {/* Corner morphing triangle */}
        <div className="absolute top-0 left-0">
            <div className="w-0 h-0 border-l-8 border-l-transparent 
                           border-t-8 border-t-purple-300/30
                           group-hover:border-l-4 group-hover:border-t-12 
                           group-hover:border-t-purple-300/50
                           transition-all duration-500 ease-out" />
        </div>
    </Link>
</motion.div>
            </div>
        </div>
    )
}

export default PreviousPosterMain;