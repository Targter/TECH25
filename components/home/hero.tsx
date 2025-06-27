"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin, Users, Trophy, Code, Zap } from "lucide-react"
import { siteConfig } from "@/lib/constants"
import { useState, useEffect, useMemo, memo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

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
        width: '100%'
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

// Responsive star pattern with mobile optimization
// Fixed ResponsiveStarPattern component with better coverage
const ResponsiveStarPattern = memo(() => (
  <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-[1]">
    {/* Desktop stars - better distributed across full viewport */}
    <div className="hidden lg:block">
      {/* Large stars - more spread out */}
      <div 
        className="absolute w-6 h-6 bg-gradient-to-br from-green-400/30 to-green-600/30 rounded-full backdrop-blur-sm border border-green-500/40 animate-star-float-1"
        style={{ left: '5%', top: '10%' }}
      />
      <div 
        className="absolute w-5 h-5 bg-gradient-to-br from-green-400/25 to-green-600/25 rounded-full backdrop-blur-sm border border-green-500/35 animate-star-float-2"
        style={{ left: '95%', top: '8%' }}
      />
      <div 
        className="absolute w-7 h-7 bg-gradient-to-br from-green-400/35 to-green-600/35 rounded-full backdrop-blur-sm border border-green-500/45 animate-star-float-3"
        style={{ left: '85%', top: '25%' }}
      />
      <div 
        className="absolute w-4 h-4 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full backdrop-blur-sm border border-green-500/30 animate-star-float-4"
        style={{ left: '12%', top: '35%' }}
      />
      <div 
        className="absolute w-5 h-5 bg-gradient-to-br from-green-400/25 to-green-600/25 rounded-full backdrop-blur-sm border border-green-500/35 animate-star-float-5"
        style={{ left: '92%', top: '50%' }}
      />
      <div 
        className="absolute w-6 h-6 bg-gradient-to-br from-green-400/30 to-green-600/30 rounded-full backdrop-blur-sm border border-green-500/40 animate-star-float-6"
        style={{ left: '3%', top: '60%' }}
      />
      <div 
        className="absolute w-4 h-4 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full backdrop-blur-sm border border-green-500/30 animate-star-float-1"
        style={{ left: '78%', top: '75%' }}
      />
      <div 
        className="absolute w-5 h-5 bg-gradient-to-br from-green-400/25 to-green-600/25 rounded-full backdrop-blur-sm border border-green-500/35 animate-star-float-2"
        style={{ left: '25%', top: '85%' }}
      />
      <div 
        className="absolute w-3 h-3 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full backdrop-blur-sm border border-green-500/30 animate-star-float-3"
        style={{ left: '88%', top: '92%' }}
      />
      <div 
        className="absolute w-4 h-4 bg-gradient-to-br from-green-400/22 to-green-600/22 rounded-full backdrop-blur-sm border border-green-500/32 animate-star-float-4"
        style={{ left: '45%', top: '5%' }}
      />
      <div 
        className="absolute w-6 h-6 bg-gradient-to-br from-green-400/28 to-green-600/28 rounded-full backdrop-blur-sm border border-green-500/38 animate-star-float-5"
        style={{ left: '65%', top: '12%' }}
      />
      <div 
        className="absolute w-3 h-3 bg-gradient-to-br from-green-400/18 to-green-600/18 rounded-full backdrop-blur-sm border border-green-500/28 animate-star-float-6"
        style={{ left: '35%', top: '22%' }}
      />
    </div>

    {/* Tablet stars - medium sized, better coverage */}
    <div className="hidden md:block lg:hidden">
      <div 
        className="absolute w-4 h-4 bg-gradient-to-br from-green-400/25 to-green-600/25 rounded-full backdrop-blur-sm border border-green-500/35 animate-star-float-1"
        style={{ left: '8%', top: '15%' }}
      />
      <div 
        className="absolute w-3 h-3 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full backdrop-blur-sm border border-green-500/30 animate-star-float-2"
        style={{ left: '90%', top: '12%' }}
      />
      <div 
        className="absolute w-5 h-5 bg-gradient-to-br from-green-400/30 to-green-600/30 rounded-full backdrop-blur-sm border border-green-500/40 animate-star-float-3"
        style={{ left: '85%', top: '40%' }}
      />
      <div 
        className="absolute w-3 h-3 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full backdrop-blur-sm border border-green-500/30 animate-star-float-4"
        style={{ left: '15%', top: '55%' }}
      />
      <div 
        className="absolute w-4 h-4 bg-gradient-to-br from-green-400/25 to-green-600/25 rounded-full backdrop-blur-sm border border-green-500/35 animate-star-float-mobile-1"
        style={{ left: '92%', top: '70%' }}
      />
      <div 
        className="absolute w-3 h-3 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full backdrop-blur-sm border border-green-500/30 animate-star-float-mobile-2"
        style={{ left: '22%', top: '85%' }}
      />
      <div 
        className="absolute w-5 h-5 bg-gradient-to-br from-green-400/30 to-green-600/30 rounded-full backdrop-blur-sm border border-green-500/40 animate-star-float-mobile-3"
        style={{ left: '75%', top: '88%' }}
      />
      <div 
        className="absolute w-4 h-4 bg-gradient-to-br from-green-400/25 to-green-600/25 rounded-full backdrop-blur-sm border border-green-500/35 animate-star-float-mobile-4"
        style={{ left: '50%', top: '8%' }}
      />
    </div>

    {/* Mobile stars - smaller but better distributed */}
    <div className="block md:hidden">
      <div 
        className="absolute w-3 h-3 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full backdrop-blur-sm border border-green-500/30 animate-star-float-mobile-1"
        style={{ left: '5%', top: '12%' }}
      />
      <div 
        className="absolute w-2 h-2 bg-gradient-to-br from-green-400/15 to-green-600/15 rounded-full backdrop-blur-sm border border-green-500/25 animate-star-float-mobile-2"
        style={{ left: '92%', top: '18%' }}
      />
      <div 
        className="absolute w-4 h-4 bg-gradient-to-br from-green-400/25 to-green-600/25 rounded-full backdrop-blur-sm border border-green-500/35 animate-star-float-mobile-3"
        style={{ left: '88%', top: '45%' }}
      />
      <div 
        className="absolute w-2 h-2 bg-gradient-to-br from-green-400/15 to-green-600/15 rounded-full backdrop-blur-sm border border-green-500/25 animate-star-float-mobile-4"
        style={{ left: '8%', top: '65%' }}
      />
      <div 
        className="absolute w-3 h-3 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full backdrop-blur-sm border border-green-500/30 animate-star-float-mobile-1"
        style={{ left: '85%', top: '82%' }}
      />
      <div 
        className="absolute w-2 h-2 bg-gradient-to-br from-green-400/15 to-green-600/15 rounded-full backdrop-blur-sm border border-green-500/25 animate-star-float-mobile-2"
        style={{ left: '25%', top: '88%' }}
      />
      <div 
        className="absolute w-3 h-3 bg-gradient-to-br from-green-400/18 to-green-600/18 rounded-full backdrop-blur-sm border border-green-500/28 animate-star-float-mobile-3"
        style={{ left: '50%', top: '8%' }}
      />
      <div 
        className="absolute w-2 h-2 bg-gradient-to-br from-green-400/16 to-green-600/16 rounded-full backdrop-blur-sm border border-green-500/26 animate-star-float-mobile-4"
        style={{ left: '72%', top: '28%' }}
      />
    </div>

    {/* Enhanced twinkling stars for all screen sizes - much better coverage */}
    <div className="absolute inset-0">
      {/* Corner stars */}
      <div className="absolute w-1 h-1 bg-green-400/40 rounded-full animate-twinkle-1" style={{ left: '2%', top: '5%' }} />
      <div className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-twinkle-2" style={{ left: '97%', top: '3%' }} />
      <div className="absolute w-1 h-1 bg-green-400/35 rounded-full animate-twinkle-3" style={{ left: '1%', top: '95%' }} />
      <div className="absolute w-1 h-1 bg-green-400/25 rounded-full animate-twinkle-4" style={{ left: '98%', top: '97%' }} />
      
      {/* Edge stars */}
      <div className="absolute w-1 h-1 bg-green-400/40 rounded-full animate-twinkle-5" style={{ left: '0.5%', top: '30%' }} />
      <div className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-twinkle-6" style={{ left: '99%', top: '60%' }} />
      <div className="absolute w-1 h-1 bg-green-400/35 rounded-full animate-twinkle-1" style={{ left: '15%', top: '1%' }} />
      <div className="absolute w-1 h-1 bg-green-400/25 rounded-full animate-twinkle-2" style={{ left: '85%', top: '99%' }} />
      
      {/* Mid-section stars */}
      <div className="absolute w-1 h-1 bg-green-400/40 rounded-full animate-twinkle-3" style={{ left: '25%', top: '18%' }} />
      <div className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-twinkle-4" style={{ left: '75%', top: '22%' }} />
      <div className="absolute w-1 h-1 bg-green-400/35 rounded-full animate-twinkle-5" style={{ left: '35%', top: '45%' }} />
      <div className="absolute w-1 h-1 bg-green-400/25 rounded-full animate-twinkle-6" style={{ left: '65%', top: '55%' }} />
      <div className="absolute w-1 h-1 bg-green-400/40 rounded-full animate-twinkle-1" style={{ left: '20%', top: '75%' }} />
      <div className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-twinkle-2" style={{ left: '80%', top: '78%' }} />
      
      {/* Additional scattered stars for better coverage */}
      <div className="absolute w-1 h-1 bg-green-400/32 rounded-full animate-twinkle-3" style={{ left: '42%', top: '12%' }} />
      <div className="absolute w-1 h-1 bg-green-400/28 rounded-full animate-twinkle-4" style={{ left: '58%', top: '35%' }} />
      <div className="absolute w-1 h-1 bg-green-400/36 rounded-full animate-twinkle-5" style={{ left: '28%', top: '52%' }} />
      <div className="absolute w-1 h-1 bg-green-400/24 rounded-full animate-twinkle-6" style={{ left: '72%', top: '68%' }} />
      <div className="absolute w-1 h-1 bg-green-400/38 rounded-full animate-twinkle-1" style={{ left: '48%', top: '85%' }} />
      <div className="absolute w-1 h-1 bg-green-400/26 rounded-full animate-twinkle-2" style={{ left: '38%', top: '92%' }} />
    </div>
  </div>
))

ResponsiveStarPattern.displayName = 'ResponsiveStarPattern'

export function HeroSection() {
  const [enhancementsReady, setEnhancementsReady] = useState(false)

  useEffect(() => {
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
    { icon: Users, label: "Participants", value: "5000+" },
    { icon: Trophy, label: "Competitions", value: "12+" },
    { icon: Code, label: "Projects", value: "500+" },
    { icon: Zap, label: "Workshops", value: "25+" }
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
      {/* Enhanced CSS animations for responsive star pattern */}
       <style jsx>{`
        /* Desktop star animations */
        @keyframes star-float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
          33% { transform: translateY(-25px) rotate(120deg) scale(1.2); opacity: 0.8; }
          66% { transform: translateY(15px) rotate(240deg) scale(0.9); opacity: 0.6; }
        }
        @keyframes star-float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
          50% { transform: translateY(-20px) rotate(180deg) scale(1.1); opacity: 0.7; }
        }
        @keyframes star-float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
          25% { transform: translateY(-15px) rotate(90deg) scale(1.15); opacity: 0.8; }
          75% { transform: translateY(8px) rotate(270deg) scale(0.95); opacity: 0.6; }
        }
        @keyframes star-float-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
          40% { transform: translateY(-30px) rotate(144deg) scale(1.1); opacity: 0.7; }
          80% { transform: translateY(20px) rotate(288deg) scale(0.9); opacity: 0.5; }
        }
        @keyframes star-float-5 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
          30% { transform: translateY(-18px) rotate(108deg) scale(1.05); opacity: 0.8; }
          70% { transform: translateY(12px) rotate(252deg) scale(0.95); opacity: 0.6; }
        }
        @keyframes star-float-6 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
          60% { transform: translateY(-22px) rotate(216deg) scale(1.08); opacity: 0.7; }
        }

        /* Mobile optimized star animations - gentler movement */
        @keyframes star-float-mobile-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
          50% { transform: translateY(-12px) rotate(180deg) scale(1.05); opacity: 0.8; }
        }
        @keyframes star-float-mobile-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
          33% { transform: translateY(-8px) rotate(120deg) scale(1.1); opacity: 0.7; }
          66% { transform: translateY(5px) rotate(240deg) scale(0.95); opacity: 0.6; }
        }
        @keyframes star-float-mobile-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
          40% { transform: translateY(-15px) rotate(144deg) scale(1.08); opacity: 0.8; }
          80% { transform: translateY(8px) rotate(288deg) scale(0.92); opacity: 0.6; }
        }
        @keyframes star-float-mobile-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
          50% { transform: translateY(-10px) rotate(180deg) scale(1.03); opacity: 0.7; }
        }

        /* Twinkling animations */
        @keyframes twinkle-1 {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes twinkle-2 {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          30% { opacity: 1; transform: scale(1.3); }
          70% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes twinkle-3 {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          60% { opacity: 0.9; transform: scale(1.4); }
        }
        @keyframes twinkle-4 {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          40% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes twinkle-5 {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          25% { opacity: 0.8; transform: scale(1.6); }
          75% { opacity: 0.4; transform: scale(1.1); }
        }
        @keyframes twinkle-6 {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        /* Apply animations with different durations and delays */
        .animate-star-float-1 { animation: star-float-1 20s ease-in-out infinite; }
        .animate-star-float-2 { animation: star-float-2 15s ease-in-out infinite 2s; }
        .animate-star-float-3 { animation: star-float-3 18s ease-in-out infinite 1s; }
        .animate-star-float-4 { animation: star-float-4 22s ease-in-out infinite 3s; }
        .animate-star-float-5 { animation: star-float-5 16s ease-in-out infinite 4s; }
        .animate-star-float-6 { animation: star-float-6 19s ease-in-out infinite 1.5s; }

        .animate-star-float-mobile-1 { animation: star-float-mobile-1 12s ease-in-out infinite; }
        .animate-star-float-mobile-2 { animation: star-float-mobile-2 10s ease-in-out infinite 1s; }
        .animate-star-float-mobile-3 { animation: star-float-mobile-3 14s ease-in-out infinite 2s; }
        .animate-star-float-mobile-4 { animation: star-float-mobile-4 11s ease-in-out infinite 0.5s; }

        .animate-twinkle-1 { animation: twinkle-1 3s ease-in-out infinite; }
        .animate-twinkle-2 { animation: twinkle-2 2.5s ease-in-out infinite 0.5s; }
        .animate-twinkle-3 { animation: twinkle-3 4s ease-in-out infinite 1s; }
        .animate-twinkle-4 { animation: twinkle-4 3.5s ease-in-out infinite 1.5s; }
        .animate-twinkle-5 { animation: twinkle-5 2.8s ease-in-out infinite 0.8s; }
        .animate-twinkle-6 { animation: twinkle-6 3.2s ease-in-out infinite 2s; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .animate-star-float-mobile-1,
          .animate-star-float-mobile-2,
          .animate-star-float-mobile-3,
          .animate-star-float-mobile-4 {
            animation-duration: 8s;
          }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <ResponsiveStarPattern />
      </div>

      <div 
        className="relative min-h-screen flex items-center justify-start overflow-hidden bg-gradient-to-br scroll-smooth px-4 sm:px-8 md:px-16"
        style={{
          // Reserve space to prevent CLS
          minHeight: '100vh',
          contain: 'layout style paint'
        }}
      >
        {/* Grid background - responsive opacity */}
        <div className="absolute inset-0 opacity-10 sm:opacity-15 md:opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px] md:bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_70%,transparent_110%)]" />
        </div>
        
        {/* Responsive star pattern */}
        <ResponsiveStarPattern />
        
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60 z-[4]" />

        {/* Main content - Render immediately without animations */}
        <div 
          className="relative z-20 max-w-3xl text-center mx-auto w-full"
          style={{
            // Fixed positioning to prevent CLS
            maxWidth: '48rem'
          }}
        >
          
          {/* Badge - responsive sizing */}
          <div 
            className="inline-flex items-center px-3 py-2 sm:px-4 mb-6 sm:mb-8 bg-green-500/10 border border-green-500/30 rounded-full backdrop-blur-sm"
            style={{ minHeight: '36px' }}
          >
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-green-400" />
            <span className="text-xs sm:text-sm font-medium text-green-400">North India&apos;s Premier Tech Festival</span>
          </div>

          {/* Title - Responsive sizing */}
          <h1 
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight opacity-100 transition-none"
            style={{
              // Ensure consistent sizing to prevent CLS
              minHeight: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animationDelay: '0.1s',
              animationFillMode: 'forwards'
            }}
          >
            <div className="block">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-500 to-emerald-400 mr-2 sm:mr-4">
                TECH
              </span>
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-500 to-emerald-400">
                NICIA-25
              </span>
            </div>
          </h1>

          {/* Stats grid - Responsive grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-xl mx-auto opacity-0 animate-fadeIn"
            style={{
              minHeight: '100px',
              animationDelay: '0.2s',
              animationFillMode: 'forwards'  
            }}
          >
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>

          {/* Event details - Responsive layout */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 opacity-0 animate-fadeIn"
            style={{
              minHeight: '60px',
              animationDelay: '0.3s',
              animationFillMode: 'forwards'
            }}
          >
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-black/20 backdrop-blur-sm border border-green-500/20 rounded-full">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
              <span className="text-white text-xs sm:text-sm font-medium">{siteConfig.date}</span>
            </div>
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-black/20 backdrop-blur-sm border border-green-500/20 rounded-full">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
              <span className="text-white text-xs sm:text-sm font-medium">{siteConfig.venue}</span>
            </div>
          </div>

          {/* CTA buttons - Responsive sizing */}
          <div
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 opacity-0 animate-fadeIn px-4 sm:px-0"
            style={{
              minHeight: '60px',
              animationDelay: '0.4s',
              animationFillMode: 'forwards'
            }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-200 transform-gpu hover:scale-105 will-change-transform"
              onClick={handleRegisterClick}
              asChild
            >
              <Link href="/register">
                Register Now
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-green-400 text-green-400 hover:bg-green-200/10 font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full backdrop-blur-sm transition-all duration-200 transform-gpu hover:scale-105 will-change-transform"
              onClick={handleExploreClick}
              asChild
            >
              <Link href="#timeline">Explore Competitions</Link>
            </Button>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[2]" />
      </div>
    </>
  )
}