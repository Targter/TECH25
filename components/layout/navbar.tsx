"use client";

import { useState, useEffect } from "react";
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
  { title: "Sponsors", href: "sponsors", isRoute: true },
  { title: "Previous Events", href: "/previous-events", isRoute: true },
  { title: "Team", href: "/team", isRoute: true },
  { title: "Registration", href: "/register", special: true, isRoute: true },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
          spy={true}
          smooth={true}
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
              className={cn(
                "block",
                isScrolled ? "h-10 w-10" : "h-14 w-14"
              )}
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

        {/* Desktop Nav - Hidden on mobile and tablet */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 xl:px-4 py-2.5 text-sm xl:text-base font-medium rounded-md transition-all duration-300 cursor-pointer select-none whitespace-nowrap group",
                  link.special
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-blue-600/40 hover:scale-105"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.title}
                {!link.special && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                )}
              </Link>
            ) : (
              <ScrollLink
                key={link.href}
                to={link.href}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                onSetActive={() => setActiveSection(link.href)}
                className={cn(
                  "relative px-3 xl:px-4 py-2.5 text-sm xl:text-base font-medium rounded-md transition-all duration-300 cursor-pointer select-none whitespace-nowrap group",
                  activeSection === link.href
                    ? "text-purple-400 bg-purple-950/30"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.title}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </ScrollLink>
            )
          )}
        </nav>

        {/* Desktop Contact Button */}
        <Button
          asChild
          className="hidden lg:flex bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 xl:px-6 py-3 text-sm xl:text-base flex-shrink-0 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-purple-600/40"
        >
          <a href="mailto:contact@example.com" className="cursor-pointer">
            Contact Us
          </a>
        </Button>

        {/* Mobile/Tablet Contact Button - Visible on medium screens and below */}
        <Button
          asChild
          className="lg:hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2.5 text-sm flex-shrink-0 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-purple-600/40"
        >
          <a href="mailto:contact@example.com" className="cursor-pointer">
            Contact
          </a>
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
                <Image
                  src="/logo/logo_technisia.svg"
                  alt="Technisia Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                Menu
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-3 mt-6">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-3.5 rounded-md text-base font-medium cursor-pointer select-none transition-all duration-300 group",
                      link.special
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:from-purple-700 hover:to-blue-700 hover:scale-105"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {link.title}
                    {!link.special && (
                      <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    )}
                  </Link>
                ) : (
                  <ScrollLink
                    key={link.href}
                    to={link.href}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="relative px-4 py-3.5 rounded-md text-base font-medium cursor-pointer select-none transition-all duration-300 text-white/80 hover:text-white hover:bg-white/10 group"
                  >
                    {link.title}
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </ScrollLink>
                )
              )}
              
              {/* Additional Contact Button in Mobile Menu */}
              <div className="border-t border-white/20 pt-4 mt-4">
                <a
                  href="mailto:contact@example.com"
                  className="block px-4 py-3.5 rounded-md text-base font-medium cursor-pointer select-none transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg text-center hover:from-purple-700 hover:to-blue-700 hover:scale-105"
                >
                  Contact Us
                </a>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}