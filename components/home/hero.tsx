"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin, Users, Trophy, Code, Zap } from "lucide-react"
import { siteConfig } from "@/lib/constants"
import { useState, useEffect, useMemo, memo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import Image from 'next/image'


// Type definitions
interface StatData {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  label: string
  value: string
}

interface StatCardProps {
  stat: StatData
  index: number
}

// Lazy load heavy components with proper error boundaries
const PlanetScene = dynamic(() => import('@/components/planet-3d/planet-3d').catch(() => ({
  default: () => null
})), {
  loading: () => <div className="w-full h-full" />, // Maintain layout
  ssr: false
})

const FlyingSpaceship = dynamic(() =>
  import('@/components/FlyingSpaceship/FlyingSpaceship').catch(() => ({
    default: () => null
  })),
  {
    loading: () => null,
    ssr: false
  }
)

// Optimized stats component - no framer motion to reduce JS overhead
const StatCard = memo<StatCardProps>(({ stat }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Debounced hover handlers for better INP
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  return (
    <div
      className={`
        bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-md 
        border border-green-500/20 rounded-xl p-4 
        hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20 
        transition-all duration-200 cursor-pointer group
        transform-gpu will-change-transform
        ${isHovered ? 'scale-105' : 'scale-100'}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        // Fixed dimensions to prevent CLS
        minHeight: '120px',
        width: '100px'
      }}
    >
      <stat.icon className="h-6 w-6 text-green-400 mx-auto mb-3 group-hover:text-green-300 transition-colors duration-200" />
      <div className="text-xl font-bold text-white mb-2 group-hover:text-green-100 transition-colors duration-200">
        {stat.value}
      </div>
      <div className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors duration-200">
        {stat.label}
      </div>
    </div>
  )
})

StatCard.displayName = 'StatCard'

// Lightweight floating elements using CSS animations instead of JS
// const FloatingElements = memo(() => (
//   <div className="absolute inset-0 pointer-events-none overflow-hidden">
//     {/* Static positioned elements to prevent CLS */}
//     <div
//       className="absolute w-4 h-4 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full backdrop-blur-sm border border-green-500/30 animate-float-1"
//       style={{ left: '15%', top: '20%' }}
//     />
//     <div
//       className="absolute w-3 h-3 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full backdrop-blur-sm border border-green-500/30 animate-float-2"
//       style={{ left: '85%', top: '15%' }}
//     />
//     <div
//       className="absolute w-5 h-5 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full backdrop-blur-sm border border-green-500/30 animate-float-3"
//       style={{ left: '70%', top: '60%' }}
//     />
//     <div
//       className="absolute w-3 h-3 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full backdrop-blur-sm border border-green-500/30 animate-float-4"
//       style={{ left: '25%', top: '70%' }}
//     />
//   </div>
// ))

// FloatingElements.displayName = 'FloatingElements'

export function HeroSection() {
  // const [isClient, setIsClient] = useState(false)
  const [enhancementsReady, setEnhancementsReady] = useState(false)

  useEffect(() => {
    // setIsClient(true);

    // Use requestIdleCallback for non-critical enhancements
    const scheduleEnhancements = () => {
      if ('requestIdleCallback' in window) {
        (window as Window & typeof globalThis).requestIdleCallback(() => {
          setEnhancementsReady(true)
        }, { timeout: 2000 })
      } else {
        setTimeout(() => setEnhancementsReady(true), 1000)
      }
    }

    scheduleEnhancements()
  }, [])

  // Memoized stats array
  const stats = useMemo(() => [
    { icon: Users, label: "Footfall", value: "50000+" },
    { icon: Trophy, label: "Competitions", value: "16+" },
    { icon: Code, label: "Projects", value: "500+" },
    { icon: Zap, label: "Workshops", value: "15+" }
  ], [])

  // Optimized button click handlers
  const handleRegisterClick = useCallback(() => {
    // Add any analytics or tracking here
    // The Link component handles navigation
  }, [])

  const handleExploreClick = useCallback((e: React.MouseEvent) => {
    // Add any analytics or tracking here
    // Smooth scroll to timeline section
    const timelineElement = document.getElementById('timeline')
    if (timelineElement) {
      timelineElement.scrollIntoView({ behavior: 'smooth' })
      e.preventDefault()
    }
  }, [])

  return (
    <>
      {/* CSS animations for floating elements */}
      <style jsx>{`
      @keyframes float-1 {
        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
        33% { transform: translateY(-20px) rotate(120deg) scale(1.1); }
        66% { transform: translateY(10px) rotate(240deg) scale(0.9); }
      }
      @keyframes float-2 {
        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
        50% { transform: translateY(-15px) rotate(180deg) scale(1.05); }
      }
      @keyframes float-3 {
        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
        25% { transform: translateY(-10px) rotate(90deg) scale(1.1); }
        75% { transform: translateY(5px) rotate(270deg) scale(0.95); }
      }
      @keyframes float-4 {
        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
        40% { transform: translateY(-25px) rotate(144deg) scale(1.05); }
        80% { transform: translateY(15px) rotate(288deg) scale(0.9); }
      }
      .animate-float-1 { animation: float-1 20s ease-in-out infinite; }
      .animate-float-2 { animation: float-2 15s ease-in-out infinite 2s; }
      .animate-float-3 { animation: float-3 18s ease-in-out infinite 1s; }
      .animate-float-4 { animation: float-4 22s ease-in-out infinite 3s; }
    `}</style>

      <div
        className="relative min-h-screen flex items-center justify-start overflow-hidden bg-gradient-to-br scroll-smooth px-8 md:px-16"
        style={{
          // Reserve space to prevent CLS
          minHeight: '100vh',
          contain: 'layout style paint'
        }}
      >
        {/* Grid background - static to prevent repaints */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_70%,transparent_110%)]" />
        </div>

        {/* Lightweight floating elements */}


        {/* Heavy components - load after initial render */}
        {enhancementsReady && (
          <>
            <FlyingSpaceship
              top="top-[35%]"
              left="left-[90%]"
              duration={22}
              color="blue"
              direction="rightToLeft"
            />
            <div className="hidden lg:flex absolute inset-0 pointer-events-none z-10 justify-center items-center">
              <div
                className="w-full h-full max-w-[1400px] max-h-[900px]"
                style={{
                  // Reserve space for 3D scene to prevent CLS
                  minHeight: '400px',
                  contain: 'layout'
                }}
              >
                <PlanetScene />
              </div>
            </div>
          </>
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60 z-[2]" />

        {/* Main content - Render immediately without animations */}
        <div
          className="relative z-20 max-w-3xl text-center mx-auto"
          style={{
            // Fixed positioning to prevent CLS
            width: '100%',
            maxWidth: '48rem'
          }}
        >




          {/* <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-500 to-emerald-400">
              PRESENTED BY
            </span> */}

          <div className="flex flex-col items-center mb-1">
            <div className="flex items-center justify-center gap-3">
              <Image
                src="/logo/iste01logo.png"
                alt="ISTE Logo"
                width={160}
                height={100}
                className="h-auto"
                priority 
              />
              <span className="text-3xl font-bold text-gray-400">×</span>
              <Image
                src="/logo/culogo.png"
                alt="CU Logo"
                width={180}
                height={170}
                className="h-auto"
                priority 
              />
            </div>

            <div className="pt-1">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight text-green-600">
                TECHNICIA&apos; 25
              </h1>
            </div>
          </div>



          {/* Stats grid - Fixed dimensions to prevent CLS */}
          <div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10 w-full max-w-sm sm:max-w-md md:max-w-xl mx-auto opacity-0 animate-fadeIn place-items-center"
            style={{
              minHeight: '120px',
              animationDelay: '0.2s',
              animationFillMode: 'forwards'
            }}
          >
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>

          {/* Event details - Fixed size */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 opacity-0 animate-fadeIn"
            style={{
              minHeight: '60px',
              animationDelay: '0.3s',
              animationFillMode: 'forwards'
            }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-sm border border-green-500/20 rounded-full">
              <Calendar className="h-4 w-4 text-green-400" />
              <span className="text-white text-sm font-medium">10th - 12th September 2025</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-sm border border-green-500/20 rounded-full">
              <MapPin className="h-4 w-4 text-green-400" />
              <span className="text-white text-sm font-medium">{siteConfig.venue}</span>
            </div>
          </div>

          {/* CTA buttons - Optimized for INP */}
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fadeIn"
            style={{
              minHeight: '60px',
              animationDelay: '0.4s',
              animationFillMode: 'forwards'
            }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-6 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-200 transform-gpu hover:scale-105 will-change-transform"
              onClick={handleRegisterClick}
              asChild
            >
              <Link href="/register">
                Register Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-green-400 text-green-400 hover:bg-green-200/10 font-semibold px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-200 transform-gpu hover:scale-105 will-change-transform"
              onClick={handleExploreClick}
              asChild
            >
              <Link href="/timeline">Explore Competitions</Link>
            </Button>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[2]" />
      </div>

      {/* CSS animations */}
      <style jsx>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.4s ease-out;
      }
    `}</style>
    </>
  )
}
