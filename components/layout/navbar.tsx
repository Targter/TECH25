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
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { title: "Home", href: "/", special: true, isRoute: true },
  { title: "Events", href: "/timeline", isRoute: true },
  { title: "Sponsors", href: "/sponsers2", isRoute: true },
  { title: "Previous Events", href: "/previous-events", isRoute: true },
  { title: "Faculty", href: "/faculty", isRoute: true },
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
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();
  const audioElementRef = useRef<HTMLAudioElement | null>(null);


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

  // Close sheet when route changes or scroll link is clicked
  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-2 sm:py-2"
            : "bg-transparent py-3 sm:py-4"
        )}
      >
        <div className="container mx-auto flex items-center justify-between gap-2 px-3 sm:px-4 md:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-1.5 sm:space-x-2 cursor-pointer select-none flex-shrink-0"
            prefetch={false}
          >
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{
                repeat: Infinity,
                duration: 2,
                repeatType: "reverse",
                ease: "easeInOut" // Smoother animation for better performance
              }}
              style={{
                // Force GPU acceleration and contain layout shifts
                transform: 'translateZ(0)',
                willChange: 'transform'
              }}
            >
              <Image
                src="/logo/technisia.jpg"
                alt="Technisia Logo"
                width={70}
                height={70}
                sizes="(max-width: 768px) 32px, 40px"
                priority // LCP optimization - loads logo immediately
                className="block transition-all duration-200 ease-in-out"
                style={{
                  // Prevent CLS by reserving space and using transform instead of width/height changes
                  width: '40px',
                  height: '40px',
                  transform: isScrolled ? 'scale(0.8)' : 'scale(1)',
                  transformOrigin: 'center'
                }}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </motion.div>
            <span
              className={cn(
                "font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 select-none whitespace-nowrap transition-all duration-200 ease-in-out",
                isScrolled ? "text-base sm:text-lg" : "text-lg sm:text-xl"
              )}
              style={{
                // Prevent text layout shifts
                lineHeight: '1.2',
                minWidth: 'max-content'
              }}
            >
              TECHNICIA&apos; 25
            </span>
          </Link>

          {/* Desktop Nav - Hidden on mobile and tablet */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navLinks.map((link) => {
              const isActive = link.isRoute
                ? pathname === link.href
                : activeSection === link.href;

              const baseClasses =
                "relative px-3 2xl:px-4 py-2.5 text-sm 2xl:text-base font-medium rounded-md transition-all duration-300 cursor-pointer select-none whitespace-nowrap group";

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

          {/* Right side controls container
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Audio Button - Responsive sizing */}


          {/* Contact Button - Desktop only */}
          <Button
            asChild
            className="hidden xl:flex bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 text-white px-4 2xl:px-6 py-3 text-sm 2xl:text-base flex-shrink-0 transition-transform duration-300 shadow-lg hover:shadow-purple-600/40"
          >
            <a href="mailto:iste@cumail.in">Contact Us</a>
          </Button>

          {/* Contact Mobile Button - Tablet and below */}
          <Button
            asChild
            className="hidden sm:flex xl:hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 text-white px-3 py-2.5 text-sm flex-shrink-0 transition-transform duration-300 shadow-lg hover:shadow-purple-600/40"
          >
            <a href="mailto:contact@example.com">Contact</a>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="xl:hidden flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 transition-colors duration-300 p-2 sm:p-2.5 w-8 h-8 sm:w-10 sm:h-10"
              >
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-black/95 border-white/10 w-full max-w-sm sm:max-w-md"
            >
              <SheetHeader className="border-b border-white/20 pb-4">
                <SheetTitle className="text-purple-400 text-lg sm:text-xl font-bold flex items-center gap-2">
                  <Image
                    src="/logo/technisia.jpg"
                    alt="Technisia Logo"
                    width={28}
                    height={28}
                    className="sm:w-8 sm:h-8"
                  />
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 sm:gap-3 mt-4 sm:mt-6">
                {navLinks.map((link) => {
                  const isActive = link.isRoute
                    ? pathname === link.href
                    : activeSection === link.href;

                  return link.isRoute ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleSheetClose}
                      className={cn(
                        "relative px-3 sm:px-4 py-3 sm:py-3.5 rounded-md text-sm sm:text-base font-medium cursor-pointer select-none transition-all duration-300 group",
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
                      onClick={handleSheetClose}
                      onSetActive={() => setActiveSection(link.href)}
                      className={cn(
                        "relative px-3 sm:px-4 py-3 sm:py-3.5 rounded-md text-sm sm:text-base font-medium cursor-pointer select-none transition-all duration-300 group",
                        isActive
                          ? "text-purple-400 bg-purple-950/30"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {link.title}
                    </ScrollLink>
                  );
                })}
                <div className="border-t border-white/20 pt-3 sm:pt-4 mt-3 sm:mt-4">
                  <a
                    href="mailto:contact@example.com"
                    onClick={handleSheetClose}
                    className="block px-3 sm:px-4 py-3 sm:py-3.5 rounded-md text-sm sm:text-base font-medium cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center hover:scale-105 transition-transform duration-300"
                  >
                    Contact Us
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          {/* </div> */}
        </div>
      </header>
    </>
  );
}
