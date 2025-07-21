"use client";
import * as React from "react";
import { Users, Calendar, Trophy, Building, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";

interface VideoProps {
  className?: string;
  order?: "left" | "right";
  src?: string;
}

const scrollToPreviousEvent = () => {
  const element = document.getElementById('previous-events');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Counter animation hook with dynamic jumps
const useCounter = (end: number, duration: number = 2000, delay: number = 0) => {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const countRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        // Create dynamic jumps based on target value
        let currentValue;
        if (end >= 1000000) {
          // For large numbers like 1000000, create bigger jumps
          const jumps = [0, 50000, 150000, 350000, 600000, 850000, end];
          const jumpIndex = Math.floor(progress * (jumps.length - 1));
          const nextIndex = Math.min(jumpIndex + 1, jumps.length - 1);
          const jumpProgress = (progress * (jumps.length - 1)) - jumpIndex;
          currentValue = Math.floor(jumps[jumpIndex] + (jumps[nextIndex] - jumps[jumpIndex]) * jumpProgress);
        } else if (end >= 5000) {
          // For numbers like 5000, create medium jumps
          const jumps = [0, 500, 1200, 2500, 3800, end];
          const jumpIndex = Math.floor(progress * (jumps.length - 1));
          const nextIndex = Math.min(jumpIndex + 1, jumps.length - 1);
          const jumpProgress = (progress * (jumps.length - 1)) - jumpIndex;
          currentValue = Math.floor(jumps[jumpIndex] + (jumps[nextIndex] - jumps[jumpIndex]) * jumpProgress);
        } else {
          // For smaller numbers, create smaller jumps
          const jumps = [0, Math.floor(end * 0.2), Math.floor(end * 0.5), Math.floor(end * 0.8), end];
          const jumpIndex = Math.floor(progress * (jumps.length - 1));
          const nextIndex = Math.min(jumpIndex + 1, jumps.length - 1);
          const jumpProgress = (progress * (jumps.length - 1)) - jumpIndex;
          currentValue = Math.floor(jumps[jumpIndex] + (jumps[nextIndex] - jumps[jumpIndex]) * jumpProgress);
        }

        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, end, duration, delay]);

  return { count, countRef };
};

// Format number with commas for readability
const formatNumber = (num: number) => {
  return num.toLocaleString();
};

// Custom hook for video auto-play
const useVideoAutoPlay = (threshold: number = 0.3) => {
  const [isInView, setIsInView] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  React.useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        // Start playing when in view
        videoRef.current.play().catch(console.error);
      } else {
        // Pause when out of view
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return { videoRef, containerRef, isInView };
};

export const Video = ({ className = "", src }: VideoProps) => {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const { videoRef, containerRef } = useVideoAutoPlay(0.3);

  const participants = useCounter(5000, 2000, 200);
  const events = useCounter(20, 1500, 400);
  const prizePool = useCounter(1000000, 2200, 600);
  const sponsors = useCounter(50, 1800, 800);

  const stats = [
    {
      icon: Users,
      count: participants.count,
      target: 5000,
      label: 'Participants',
      ref: participants.countRef,
      color: 'text-blue-400'
    },
    {
      icon: Calendar,
      count: events.count,
      target: 20,
      label: 'Events',
      ref: events.countRef,
      color: 'text-purple-400'
    },
    {
      icon: Trophy,
      count: prizePool.count,
      target: 1000000,
      label: 'Prize Pool',
      ref: prizePool.countRef,
      color: 'text-yellow-400'
    },
    {
      icon: Building,
      count: sponsors.count,
      target: 50,
      label: 'Sponsors',
      ref: sponsors.countRef,
      color: 'text-green-400'
    }
  ];

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className={`w-full py-16 text-white relative overflow-hidden ${className}`}>
      {/* Background gradient overlay */}
      <div className=" pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* About Section - Full Width */}
        <div className="space-y-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <h3 className="text-green-500 text-lg font-medium tracking-wider">ABOUT THE EVENT</h3>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Welcome to the Amazing<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                TECHNICIA&apos;25
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-4xl">
              TECHNICIA is not just an event, it&apos;s an interstellar journey through the cosmos of technology.
              With over 5000 participants from across the galaxy, our annual tech extravaganza brings together
              the brightest minds to innovate, compete, and celebrate the future of tech.
            </p>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-4xl">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  ref={stat.ref}
                  className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:border-green-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
                    <p className={`text-2xl font-bold ${stat.color} tabular-nums`}>
                      {formatNumber(stat.count)}
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Enhanced CTA Button */}
          <div className="flex items-center gap-4">
            <Link href="/timeline">
              <button
                onClick={scrollToPreviousEvent}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/25"
              >
                <span className="relative z-10">Register For Technicia&apos;25 Events</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
            </Link>
          </div>
        </div>

        {/* Full Width Video Section */}
        <div className="relative group w-full" ref={containerRef}>
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-green-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />

          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-lg overflow-hidden shadow-2xl border border-green-600/50">
            {/* Auto-playing video - stretched full width */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
              poster="/api/placeholder/800/600" // Add your poster image here
              onClick={() => setIsVideoOpen(true)}
            >
              <source src={src || "/path/to/your/video.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay with controls only */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Mute/Unmute button */}
              <button
                onClick={toggleMute}
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-all duration-300 border border-white/20 pointer-events-auto"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

            {/* Fallback background pattern (shows if no video) */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-800 -z-10" />
            <div className="absolute inset-0 opacity-10 -z-10">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,#10b981_1px,transparent_1px)] bg-[length:50px_50px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-6xl w-full mx-4">
            {/* Close button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl font-bold bg-black/50 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              ×
            </button>

            {/* Video container */}
            <div className="w-full border border-purple-500/20 rounded-lg overflow-hidden bg-black">
              <iframe
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]"
                src={src || "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"}
                title="Techniia 2024 Recap"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};