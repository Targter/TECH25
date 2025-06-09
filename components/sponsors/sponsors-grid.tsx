"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Globe, Users, Award, Calendar } from "lucide-react";

const sponsors = [
  {
    name: "Google",
    logo: "/api/placeholder/200/100",
    website: "https://google.com",
    description:
      "Leading the future of technology with innovative solutions in cloud computing, AI, and developer tools.",
    partnership: "Principal Technology Partner",
    since: 2020,
    employees: "156,000+",
    focus: ["Cloud Computing", "Artificial Intelligence", "Developer Tools", "Mobile Technology"],
    contribution: "Providing cloud infrastructure and AI services for all hackathon participants",
    benefits: ["$10,000 in Google Cloud credits", "Mentorship sessions", "Priority hiring opportunities"],
  },
  {
    name: "Microsoft",
    logo: "/api/placeholder/200/100",
    website: "https://microsoft.com",
    description: "Empowering every person and organization on the planet to achieve more through cutting-edge technology.",
    partnership: "Cloud Infrastructure Partner",
    since: 2019,
    employees: "220,000+",
    focus: ["Azure Cloud", "Office 365", "AI & Machine Learning", "Enterprise Solutions"],
    contribution: "Azure cloud services and development tools for innovative project development",
    benefits: ["$15,000 in Azure credits", "Technical workshops", "Direct access to Microsoft engineers"],
  },
  {
    name: "Apple",
    logo: "/api/placeholder/200/100",
    website: "https://apple.com",
    description: "Creating innovative products that enrich people's lives and push the boundaries of technology.",
    partnership: "Innovation Partner",
    since: 2021,
    employees: "164,000+",
    focus: ["iOS Development", "Hardware Innovation", "User Experience", "Privacy Technology"],
    contribution: "Supporting mobile app development and user experience innovation",
    benefits: ["iOS development resources", "Design thinking workshops", "App Store promotion opportunities"],
  },
  {
    name: "Amazon",
    logo: "/api/placeholder/200/100",
    website: "https://amazon.com",
    description: "Building the future of e-commerce, cloud computing, and artificial intelligence solutions.",
    partnership: "E-commerce & AWS Partner",
    since: 2018,
    employees: "1,500,000+",
    focus: ["AWS Cloud", "E-commerce", "Logistics", "Machine Learning"],
    contribution: "AWS infrastructure and e-commerce platform integration support",
    benefits: ["$20,000 in AWS credits", "E-commerce APIs", "Logistics optimization tools"],
  },
  {
    name: "Meta",
    logo: "/api/placeholder/200/100",
    website: "https://meta.com",
    description: "Connecting the world through social technology and building the next generation of social experiences.",
    partnership: "Social Innovation Partner",
    since: 2022,
    employees: "86,000+",
    focus: ["Social Media", "VR/AR Technology", "Metaverse", "Community Building"],
    contribution: "VR/AR development kits and social platform integration tools",
    benefits: ["Meta Quest development kits", "AR/VR workshops", "Social media API access"],
  },
  {
    name: "Netflix",
    logo: "/api/placeholder/200/100",
    website: "https://netflix.com",
    description: "Revolutionizing entertainment through streaming technology and original content creation.",
    partnership: "Media Technology Partner",
    since: 2023,
    employees: "12,800+",
    focus: ["Streaming Technology", "Content Delivery", "Data Analytics", "User Experience"],
    contribution: "Streaming technology expertise and content delivery network solutions",
    benefits: ["Streaming APIs", "Content recommendation algorithms", "Media processing tools"],
  },
  {
    name: "Tesla",
    logo: "/api/placeholder/200/100",
    website: "https://tesla.com",
    description:
      "Accelerating the world's transition to sustainable energy through innovative electric vehicles and clean energy solutions.",
    partnership: "Sustainable Technology Partner",
    since: 2023,
    employees: "140,000+",
    focus: ["Electric Vehicles", "Battery Technology", "Autonomous Driving", "Clean Energy"],
    contribution: "Sustainable technology solutions and autonomous driving datasets",
    benefits: ["EV charging network access", "Battery technology insights", "Sustainability workshops"],
  },
  {
    name: "Spotify",
    logo: "/api/placeholder/200/100",
    website: "https://spotify.com",
    description: "Transforming the way people discover and enjoy music through innovative audio streaming technology.",
    partnership: "Audio Technology Partner",
    since: 2024,
    employees: "9,800+",
    focus: ["Audio Streaming", "Music Discovery", "Podcast Technology", "Personalization"],
    contribution: "Audio streaming APIs and music recommendation technology",
    benefits: ["Spotify Web API access", "Audio analysis tools", "Music recommendation engines"],
  },
];

type Sponsor = typeof sponsors[0];

export default function SponsorsGrid() {
  const sponsorsRef = useRef(null);
  const sponsorsInView = useInView(sponsorsRef, { once: true, amount: 0.2 });
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [hoveredSponsor, setHoveredSponsor] = useState<string | null>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedSponsor) {
        setSelectedSponsor(null);
      }
    };

    if (selectedSponsor) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedSponsor]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.7, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      },
    },
  };

 

  const logoHoverVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 2,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const openDetails = (sponsor: Sponsor) => setSelectedSponsor(sponsor);
  const closeDetails = () => setSelectedSponsor(null);

  // Handle backdrop click to close modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeDetails();
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b ">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.15)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_70%,transparent_110%)]"
          aria-hidden="true"
        />
        {/* Floating particles effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400/30 rounded-full animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-lime-400/40 rounded-full animate-ping" />
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-green-300/25 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent" />

      <div className="container relative z-10 max-w-7xl mx-auto px-6">
        {/* Enhanced Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 mb-8 bg-gradient-to-r from-green-500/10 to-lime-500/10 border border-green-500/30 rounded-full backdrop-blur-sm hover:border-green-400/50 transition-all duration-300 cursor-default"
          >
            <Award className="h-5 w-5 mr-3 text-green-400" />
            <span className="text-sm font-semibold text-green-400 tracking-wide">Trusted Partners</span>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-lime-400 to-green-500 animate-gradient-x">
              Sponsors & Partners
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We&apos;re proud to collaborate with industry leaders who fuel innovation and provide unmatched support to our hackathons.
          </motion.p>
        </motion.div>

        {/* Enhanced Sponsors Grid */}
        <motion.div
          ref={sponsorsRef}
          variants={containerVariants}
          initial="hidden"
          animate={sponsorsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          role="list"
        >
          {sponsors.map((sponsor) => (
            <motion.article
              key={sponsor.name}
              variants={itemVariants}
              initial="initial"
              whileHover="hover"
              onHoverStart={() => setHoveredSponsor(sponsor.name)}
              onHoverEnd={() => setHoveredSponsor(null)}
              className="group relative flex flex-col items-center bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-2xl border border-green-600/30 p-6 shadow-lg hover:shadow-2xl hover:shadow-green-500/20 cursor-pointer focus:outline-none focus:ring-4 focus:ring-green-500/50 transition-all duration-500 backdrop-blur-sm"
              tabIndex={0}
              role="button"
              aria-label={`${sponsor.name} sponsor card, press enter or click for details`}
              onClick={() => openDetails(sponsor)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openDetails(sponsor);
                  e.preventDefault();
                }
              }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* Animated border gradient */}
              <motion.div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(45deg, #10b981, #34d399, #6ee7b7, #10b981)',
                  backgroundSize: '400% 400%',
                  animation: hoveredSponsor === sponsor.name ? 'gradient-shift 3s ease infinite' : 'none',
                  padding: '2px',
                  zIndex: -1
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-2xl" />
              </motion.div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-lime-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

              <motion.div 
                variants={logoHoverVariants}
                className="relative w-32 h-20 mb-4 flex-shrink-0 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-lime-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  fill
                  className="object-contain relative z-10 filter group-hover:brightness-110 transition-all duration-300"
                  sizes="(max-width: 768px) 128px, 128px"
                  unoptimized
                />
              </motion.div>

              <motion.h3 
                className="font-bold text-lg text-green-400 mb-3 text-center group-hover:text-green-300 transition-all duration-300"
                initial={{ y: 0 }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {sponsor.name}
              </motion.h3>

              <motion.p 
                className="text-sm text-gray-300 text-center line-clamp-3 mb-4 flex-grow group-hover:text-gray-200 transition-colors duration-300"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {sponsor.description}
              </motion.p>

              <motion.div 
                className="px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-green-700/40 to-lime-700/40 text-green-100 border border-green-600/30 group-hover:border-green-400/50 group-hover:from-green-600/50 group-hover:to-lime-600/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {sponsor.partnership}
              </motion.div>

              {/* Enhanced hover effects */}
              <motion.div 
                className="absolute inset-0 rounded-2xl ring-2 ring-green-400/0 group-hover:ring-green-400/60 transition-all duration-300 pointer-events-none"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
              />

              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12" />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* Enhanced Sponsor Details Modal */}
      <AnimatePresence>
        {selectedSponsor && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          >
            <motion.div
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl border border-green-600/50 backdrop-blur-sm"
              initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50, rotateX: 15 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                duration: 0.5
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-lime-500/10 rounded-3xl blur-xl opacity-50" />
              
              {/* Enhanced Close Button */}
              <motion.button
                aria-label="Close sponsor details"
                className="absolute top-6 right-6 text-gray-400 hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full p-3 hover:bg-gray-800/50 transition-all duration-300 z-10"
                onClick={closeDetails}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              <motion.div 
                className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {/* Enhanced Logo */}
                <motion.div 
                  className="relative w-48 h-28 flex-shrink-0 rounded-xl overflow-hidden border border-green-500/40 shadow-lg bg-gradient-to-br from-gray-800/50 to-gray-700/50 p-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-lime-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src={selectedSponsor.logo}
                    alt={`${selectedSponsor.name} logo`}
                    fill
                    className="object-contain relative z-10"
                    sizes="(max-width: 768px) 192px, 192px"
                    unoptimized
                  />
                </motion.div>

                {/* Enhanced Basic Info */}
                <div className="flex-1 text-center md:text-left">
                  <motion.h2 
                    className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-400 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {selectedSponsor.name}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-gray-300 text-lg leading-relaxed mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {selectedSponsor.description}
                  </motion.p>

                  <motion.a
                    href={selectedSponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold px-6 py-3 rounded-lg border border-green-500/30 hover:border-green-400/50 hover:bg-green-500/10 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Globe className="w-5 h-5" />
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>

              {/* Rest of the modal content remains the same but with enhanced animations */}
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {/* Partnership Details */}
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-center gap-3 text-gray-300 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Calendar className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <div>
                      <span className="text-green-400 font-semibold">Partner Since:</span>
                      <p className="text-xl font-bold">{selectedSponsor.since}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-3 text-gray-300 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Users className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <div>
                      <span className="text-green-400 font-semibold">Company Size:</span>
                      <p className="text-xl font-bold">{selectedSponsor.employees}</p>
                    </div>
                  </motion.div>

                  <div>
                    <h3 className="text-green-400 font-semibold text-lg mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Partnership Type
                    </h3>
                    <motion.div 
                      className="px-4 py-3 bg-gradient-to-r from-green-700/20 to-lime-700/20 border border-green-600/30 rounded-lg hover:border-green-500/50 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-green-300 font-medium">{selectedSponsor.partnership}</p>
                    </motion.div>
                  </div>
                </div>

                {/* Focus Areas & Contributions */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-green-400 font-semibold text-lg mb-3">Focus Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSponsor.focus.map((area, index) => (
                        <motion.span
                          key={area}
                          className="px-3 py-1.5 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300 hover:border-green-600/50 hover:bg-gray-700/50 transition-colors duration-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {area}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-green-400 font-semibold text-lg mb-3">Contributions</h3>
                    <motion.p 
                      className="text-gray-300 leading-relaxed p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors duration-300"
                      whileHover={{ scale: 1.01 }}
                    >
                      {selectedSponsor.contribution}
                    </motion.p>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Benefits Section */}
              <motion.div 
                className="mt-8 pt-8 border-t border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="text-green-400 font-semibold text-xl mb-4">Benefits to Participants</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedSponsor.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-green-600/50 hover:bg-gray-800/50 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                      <p className="text-gray-300 text-sm leading-relaxed">{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
}