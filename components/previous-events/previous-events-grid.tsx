"use client";

// import { useRef } from "react";
import { previousEvents } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

// Define the Event type based on the structure used in the component
interface Event {
  title: string;
  year: string | number;
  image: string;
  location?: string;
}

// const icons = [<Sparkles key="sparkles" />, <Rocket key="rocket" />, <CalendarDays key="calendar" />];

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
        {/* <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">{event.title}</h3>
          <p className="text-white/80 text-xs">{event.year}{event.location ? ` • ${event.location}` : ""}</p>
        </div> */}
      </div>
    </div>
  );
}

export default function PreviousEventsGrid() {
  

  return (
    <section className="py-16 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Previous Events</h1>
          <p className="text-gray-300 text-3xl">Highlights from some of our major past events.</p>
        </div>

        {/* Event Info Cards */}
       

        {/* Event Gallery */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Event Gallery</h2>
          <p className="text-gray-300 text-lg">A visual walkthrough of all our previous events.</p>
        </div>

        {/* CTA Link - Positioned before the grid */}
       

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
          <div className="grid grid-cols-3 grid-rows-1 gap-4 h-[500px]">
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
         <div className="flex justify-center items-center mb-8">
          <Link
              href="/timeline"
              className="group relative border border-white/30 rounded-xl p-6 
                       hover:border-purple-300 hover:shadow-md hover:shadow-purple-400/15
                       transition-all duration-300 bg-gradient-to-br from-white/3 to-transparent
                       overflow-hidden w-full max-w-lg block text-center"
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
                      <span className="relative z-10">Be A part of the biggest tech event Of 2025</span>
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
        </div>
        </div>

      </div>
    </section>
  );
}