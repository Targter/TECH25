"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Volume2, VolumeX, Play } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { title: "Home", href: "/", special: true, isRoute: true },
  { title: "Events", href: "/timeline", isRoute: true },
  { title: "Sponsors", href: "sponsors", isRoute: false },
  { title: "Previous Events", href: "/previous-events", isRoute: true },
  { title: "Team", href: "/team", isRoute: true },
  { title: "Registration", href: "/register", special: true, isRoute: true },
];

export function Navbar() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isClient, setIsClient] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const pathname = usePathname();
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudioIndicator = async () => {
    const audio = audioElementRef.current;
    if (!audio || !audioReady) return;

    try {
      if (isAudioPlaying) {
        audio.pause();
        setIsAudioPlaying(false);
      } else {
        await audio.play();
        setIsAudioPlaying(true);
        setAutoplayBlocked(false);
      }
    } catch (error) {
      console.log("Could not play audio:", error);
      setIsAudioPlaying(false);
      setAutoplayBlocked(true);
    }
  };

  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize audio and attempt autoplay
  useEffect(() => {
    if (!isClient) return;
    
    const audio = audioElementRef.current;
    if (!audio) return;

    const handleCanPlay = async () => {
      setAudioReady(true);
      
      // Attempt autoplay immediately when audio is ready
      try {
        // Set volume to a reasonable level
        audio.volume = 0.3;
        
        await audio.play();
        setIsAudioPlaying(true);
        setAutoplayBlocked(false);
        console.log("Autoplay successful!");
        
      } catch (error) {
        console.log("Autoplay blocked:", error);
        setIsAudioPlaying(false);
        setAutoplayBlocked(true);
      }
    };

    const handlePlay = () => {
      setIsAudioPlaying(true);
    };

    const handlePause = () => {
      setIsAudioPlaying(false);
    };

    const handleLoadError = (error: Event) => {
      console.log("Audio load error:", error);
      setAudioReady(false);
      setAutoplayBlocked(false);
    };

    // Add event listeners
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleLoadError);

    // Start loading the audio
    audio.load();

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleLoadError);
    };
  }, [isClient]);

  // Global click handler for autoplay fallback
  useEffect(() => {
    if (!isClient || !autoplayBlocked || isAudioPlaying) return;

    const handleFirstInteraction = async () => {
      const audio = audioElementRef.current;
      if (!audio || !audioReady) return;

      try {
        await audio.play();
        setIsAudioPlaying(true);
        setAutoplayBlocked(false);
        
        // Remove listeners after successful play
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      } catch (error) {
        console.log("Still cannot play audio:", error);
      }
    };

    document.addEventListener('click', handleFirstInteraction, { passive: true });
    document.addEventListener('keydown', handleFirstInteraction, { passive: true });
    document.addEventListener('touchstart', handleFirstInteraction, { passive: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isClient, autoplayBlocked, isAudioPlaying, audioReady]);

  // Handle scroll detection
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  // Handle section detection for scroll links
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const sections = ['home', 'sponsors'];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto flex items-center justify-between gap-2 px-4 md:px-6">
          {/* Logo */}
          <ScrollLink
            to="home"
            spy
            smooth
            offset={-100}
            duration={500}
            className="flex items-center space-x-2 cursor-pointer select-none flex-shrink-0"
          >
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
            >
              <Image
                src="/logo/technisia.jpg"
                alt="Technisia Logo"
                width={isScrolled ? 40 : 50}
                height={isScrolled ? 40 : 50}
                className="block"
              />
            </motion.div>
            <span
              className={cn(
                "font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 select-none",
                isScrolled ? "text-lg" : "text-xl"
              )}
            >
              TECHNICIA
            </span>
          </ScrollLink>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = link.isRoute
                ? pathname === link.href
                : activeSection === link.href;

              const baseClasses =
                "relative px-3 xl:px-4 py-2.5 text-sm xl:text-base font-medium rounded-md transition-all duration-300 cursor-pointer select-none whitespace-nowrap group";

              return link.isRoute ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    baseClasses,
                    link.special
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:scale-105 shadow-lg"
                      : isActive
                      ? "text-white bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.title}
                  {!link.special && (
                    <motion.div
                      className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 0 }}
                    />
                  )}
                </Link>
              ) : (
                <ScrollLink
                  key={link.href}
                  to={link.href}
                  spy
                  smooth
                  offset={-100}
                  duration={500}
                  onSetActive={() => setActiveSection(link.href)}
                  className={cn(
                    baseClasses,
                    isActive
                      ? "text-purple-400 bg-purple-950/30"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.title}
                  <motion.div
                    className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                </ScrollLink>
              );
            })}
          </nav>

          {/* Space-themed Compact Audio Button */}
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleAudioIndicator} 
              className={cn(
                "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-3 py-1.5 text-white font-medium text-xs transition-all duration-300 border",
                audioReady 
                  ? isAudioPlaying
                    ? "bg-gradient-to-r from-slate-800 to-slate-700 border-cyan-400/50 shadow-md shadow-cyan-400/20 hover:scale-105"
                    : "bg-slate-900/60 border-slate-600/50 hover:bg-slate-800/60 hover:border-cyan-400/30 hover:scale-105"
                  : "opacity-50 cursor-not-allowed bg-slate-900/30 border-slate-700/30"
              )}
              title={
                !audioReady 
                  ? "Audio loading..." 
                  : isAudioPlaying 
                  ? "Pause ambient" 
                  : "Play ambient"
              }
              disabled={!audioReady}
            >
              {/* Subtle Background Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full"
                animate={{
                  opacity: isAudioPlaying && audioReady ? [0.2, 0.4, 0.2] : 0,
                }}
                transition={{
                  duration: 3,
                  repeat: isAudioPlaying && audioReady ? Infinity : 0,
                  ease: "easeInOut"
                }}
              />

              {/* Left Icon with Gentle Animation */}
              <motion.div
                className="relative inline-flex mr-1.5"
                animate={{
                  scale: isAudioPlaying && audioReady ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 4,
                  repeat: isAudioPlaying && audioReady ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                {!audioReady ? (
                  <VolumeX className="w-3 h-3 text-slate-400" />
                ) : isAudioPlaying ? (
                  <Volume2 className="w-3 h-3 text-cyan-400" />
                ) : (
                  <Play className="w-3 h-3 text-slate-300" />
                )}
              </motion.div>

              {/* Text with Sliding Animation */}
              <span className="relative inline-flex overflow-hidden text-xs">
                <motion.div
                  className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12"
                >
                  {!audioReady 
                    ? "Loading" 
                    : isAudioPlaying 
                    ? "Ambient" 
                    : "Space"
                  }
                </motion.div>
                <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                  {!audioReady 
                    ? "..." 
                    : isAudioPlaying 
                    ? "Pause" 
                    : "🚀 Play"
                  }
                </div>
              </span>

              {/* Minimal Audio Visualization */}
              <div className="flex items-center space-x-0.5 ml-1.5">
                {[1, 2].map((bar) => (
                  <motion.div
                    key={bar}
                    className={cn(
                      "w-0.5 rounded-sm",
                      audioReady 
                        ? isAudioPlaying 
                          ? "bg-cyan-400" 
                          : "bg-slate-500"
                        : "bg-slate-600"
                    )}
                    initial={{ height: 3 }}
                    animate={{
                      height: isAudioPlaying && audioReady
                        ? [3, 8, 5, 10, 3]
                        : 3
                    }}
                    transition={{
                      duration: 2,
                      repeat: isAudioPlaying && audioReady ? Infinity : 0,
                      delay: bar * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* Subtle Glow Effect */}
              {!isAudioPlaying && audioReady && (
                <motion.div
                  className="absolute inset-0 rounded-full border border-cyan-400/30"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}

              {/* Hidden Audio Element */}
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
                preload="auto"
                onError={() => {
                  console.log("Audio file not found: /audio/loop.mp3");
                  setAudioReady(false);
                }}
              />
            </button>
          </div>

          {/* Contact Button Desktop */}
          <Button
            asChild
            className="hidden lg:flex bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 text-white px-4 xl:px-6 py-3 text-sm xl:text-base flex-shrink-0 transition-transform duration-300 shadow-lg hover:shadow-purple-600/40"
          >
            <a href="mailto:contact@example.com">Contact Us</a>
          </Button>

          {/* Contact Mobile Button */}
          <Button
            asChild
            className="lg:hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 text-white px-4 py-2.5 text-sm flex-shrink-0 transition-transform duration-300 shadow-lg hover:shadow-purple-600/40"
          >
            <a href="mailto:contact@example.com">Contact</a>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white flex-shrink-0 hover:bg-white/10 transition-colors duration-300 p-2.5"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black/95 border-white/10 w-80 sm:w-96">
              <SheetHeader className="border-b border-white/20 pb-4">
                <SheetTitle className="text-purple-400 text-xl font-bold flex items-center gap-2">
                  <Image src="/logo/logo_technisia.svg" alt="Technisia Logo" width={32} height={32} />
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-3 mt-6">
                {navLinks.map((link) => {
                  const isActive = link.isRoute
                    ? pathname === link.href
                    : activeSection === link.href;

                  return link.isRoute ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "relative px-4 py-3.5 rounded-md text-base font-medium cursor-pointer select-none transition-all duration-300 group",
                        link.special
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:scale-105"
                          : isActive
                          ? "text-purple-400 bg-purple-950/30"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {link.title}
                    </Link>
                  ) : (
                    <ScrollLink
                      key={link.href}
                      to={link.href}
                      spy
                      smooth
                      offset={-100}
                      duration={500}
                      onSetActive={() => setActiveSection(link.href)}
                      className={cn(
                        "relative px-4 py-3.5 rounded-md text-base font-medium cursor-pointer select-none transition-all duration-300 group",
                        isActive
                          ? "text-purple-400 bg-purple-950/30"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {link.title}
                    </ScrollLink>
                  );
                })}
                <div className="border-t border-white/20 pt-4 mt-4">
                  <a
                    href="mailto:contact@example.com"
                    className="block px-4 py-3.5 rounded-md text-base font-medium cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center hover:scale-105 transition-transform duration-300"
                  >
                    Contact Us
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}