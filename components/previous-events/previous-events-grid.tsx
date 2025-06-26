"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { previousEvents } from "@/lib/constants";
import { previousposter } from "@/lib/constants";
import { CalendarDays, Sparkles, Rocket } from "lucide-react";
import Image from "next/image";

// Define the Event type based on the structure used in the component
interface Event {
  title: string;
  year: string | number;
  image: string;
  location?: string;
}

const icons = [<Sparkles key="sparkles" />, <Rocket key="rocket" />, <CalendarDays key="calendar" />];

function GalleryImage({ event, className }: { event: Event; className: string }) {
  return (
    <div className={`${className} group relative cursor-pointer overflow-hidden rounded-sm`}>
      <Image
        src={event.image}
        alt={`${event.title} - ${event.year}`}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">{event.title}</h3>
          <p className="text-white/80 text-xs">{event.year}{event.location ? ` • ${event.location}` : ""}</p>
        </div>
      </div>
    </div>
  );
}

export default function PreviousEventsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Previous Events</h1>
          <p className="text-gray-300 text-3xl">Highlights from some of our major past events.</p>
        </div>

        {/* Event Info Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {previousposter.slice(0, 3).map((event, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-8 rounded-xl border border-green-500/50 bg-black/30 
        hover:border-purple-400 hover:bg-black/40
        transition-all duration-300 ease-out
        hover:scale-[1.02] hover:-translate-y-2
        hover:shadow-xl hover:shadow-purple-500/20
        min-h-[450px] flex flex-col"
            >
              {/* ✅ Image container with fixed height */}
              <div className="relative w-full h-85 rounded-lg overflow-hidden mb-4">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Main content container */}
              <div className="relative z-10 flex flex-col flex-grow">
                <div className="flex items-center space-x-3 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <div className="text-green-400 text-4xl group-hover:text-purple-300 
            group-hover:drop-shadow-lg group-hover:filter group-hover:brightness-125
            transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                    {icons[index % icons.length]}
                  </div>
                  <h2 className="text-xl font-semibold text-white group-hover:text-purple-100 
            transition-colors duration-300 group-hover:drop-shadow-md">
                    {event.title}
                  </h2>
                </div>

                <p className="text-sm text-gray-300 mb-2 group-hover:text-gray-200 
          transition-colors duration-300 font-medium">
                  Year: {event.year}
                </p>

                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 
          leading-relaxed group-hover:drop-shadow-sm flex-grow">
                  The <strong className="text-green-400 group-hover:text-blue-300 transition-colors duration-300">
                    {event.title}
                  </strong> was a remarkable event focusing on{" "}
                  <span className="group-hover:text-purple-200 transition-colors duration-300">
                    {event.title.toLowerCase().split(" ")[0]}
                  </span>.
                </p>

                {/* Hover-revealed gradient overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/3 via-blue-500/3 to-pink-500/3 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Subtle animated particles effect */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400/50 rounded-full
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
          group-hover:animate-ping" />
                <div className="absolute top-6 right-8 w-1 h-1 bg-blue-400/60 rounded-full
          opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100
          group-hover:animate-pulse" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-pink-400/40 rounded-full
          opacity-0 group-hover:opacity-100 transition-opacity duration-600 delay-200
          group-hover:animate-bounce" />
              </div>
            </motion.div>
          ))}
        </motion.div>


        {/* Event Gallery */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Event Gallery</h2>
          <p className="text-gray-300 text-lg">A visual walkthrough of all our previous events.</p>
        </div>

        {/* Simple Collage Layout - Using All 13 Images */}
        <div className="space-y-6 max-w-6xl mx-auto">
          {/* First Collage Section */}
          <div className="grid grid-cols-4 grid-rows-3 gap-4 h-[700px]">
            <GalleryImage
              event={previousEvents[3]}
              className="col-span-2 row-span-2 border-2 border-green-400"
            />

            <GalleryImage
              event={previousEvents[1]}
              className="col-span-2 row-span-1 border-2 border-green-400"
            />
            <GalleryImage
              event={previousEvents[2]}
              className="col-span-2 row-span-1 border-2 border-green-400"
            />

            <GalleryImage
              event={previousEvents[0]}
              className="col-span-1 row-span-1 border-2 border-green-400"
            />
            <GalleryImage
              event={previousEvents[4]}
              className="col-span-1 row-span-1 border-2 border-green-400"
            />
            <GalleryImage
              event={previousEvents[5]}
              className="col-span-1 row-span-1 border-2 border-green-400"
            />
            <GalleryImage
              event={previousEvents[6]}
              className="col-span-1 row-span-1 border-2 border-green-400"
            />
          </div>

          {/* Second Collage Section */}
          <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[500px]">
            <GalleryImage
              event={previousEvents[7]}
              className="col-span-1 row-span-1 border-2 border-green-400"
            />
            <GalleryImage
              event={previousEvents[10]}
              className="col-span-1 row-span-1 border-2 border-green-600"
            />
            <GalleryImage
              event={previousEvents[9]}
              className="col-span-1 row-span-1 border-2 border-green-400"
            />
          </div>
        </div>

      </div>
    </section>
  );
}