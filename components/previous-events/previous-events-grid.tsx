"use client";

// import { useRef } from "react";
import { previousEvents } from "@/lib/constants";
import Image from "next/image";

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
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">{event.title}</h3>
          <p className="text-white/80 text-xs">{event.year}{event.location ? ` • ${event.location}` : ""}</p>
        </div>
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