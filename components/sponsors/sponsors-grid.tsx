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
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
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
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_70%,transparent_110%)]"
          aria-hidden="true"
        />
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 mb-6 bg-green-500/10 border border-green-500/30 rounded-full backdrop-blur-sm"
          >
            <Award className="h-4 w-4 mr-2 text-green-400" />
            <span className="text-sm font-medium text-green-400">Trusted Partners</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-lime-400 to-green-500">
              Sponsors & Partners
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            We&apos;re proud to collaborate with industry leaders who fuel innovation and provide unmatched support to our hackathons.
          </p>
        </motion.div>

        {/* Sponsors Grid */}
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
              className="group relative flex flex-col items-center bg-gray-900/40 rounded-2xl border border-green-600/30 p-6 shadow-lg hover:shadow-2xl hover:border-green-500/50 cursor-pointer focus:outline-none focus:ring-4 focus:ring-green-500 transition-all duration-300"
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
            >
              <div className="relative w-32 h-20 mb-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 128px, 128px"
                  unoptimized
                />
              </div>
              <h3 className="font-semibold text-lg text-green-400 mb-2 text-center group-hover:text-green-300 transition-colors">
                {sponsor.name}
              </h3>
              <p className="text-sm text-gray-300 text-center line-clamp-3 mb-4 flex-grow">
                {sponsor.description}
              </p>
              <div className="px-3 py-1.5 rounded-full text-xs font-semibold bg-green-700/40 text-green-100 border border-green-600/30">
                {sponsor.partnership}
              </div>

              {/* Hover ring effect */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-green-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* Sponsor Details Modal */}
      <AnimatePresence>
        {selectedSponsor && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          >
            <motion.div
              className="relative bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl border border-green-600/50"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                aria-label="Close sponsor details"
                className="absolute top-6 right-6 text-gray-400 hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full p-2 hover:bg-gray-800/50 transition-colors"
                onClick={closeDetails}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
                {/* Logo */}
                <div className="relative w-48 h-28 flex-shrink-0 rounded-xl overflow-hidden border border-green-500/40 shadow-lg bg-gray-800/50 p-4">
                  <Image
                    src={selectedSponsor.logo}
                    alt={`${selectedSponsor.name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 192px, 192px"
                    unoptimized
                  />
                </div>

                {/* Basic Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-green-400 mb-4">
                    {selectedSponsor.name}
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {selectedSponsor.description}
                  </p>

                  <a
                    href={selectedSponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold px-4 py-2 rounded-lg border border-green-500/30 hover:border-green-400/50 transition-all duration-300"
                  >
                    <Globe className="w-5 h-5" />
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Detailed Information Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Partnership Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <div>
                      <span className="text-green-400 font-semibold">Partner Since:</span>
                      <p className="text-xl font-bold">{selectedSponsor.since}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-300">
                    <Users className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <div>
                      <span className="text-green-400 font-semibold">Company Size:</span>
                      <p className="text-xl font-bold">{selectedSponsor.employees}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-green-400 font-semibold text-lg mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Partnership Type
                    </h3>
                    <div className="px-4 py-2 bg-green-700/20 border border-green-600/30 rounded-lg">
                      <p className="text-green-300 font-medium">{selectedSponsor.partnership}</p>
                    </div>
                  </div>
                </div>

                {/* Focus Areas & Contributions */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-green-400 font-semibold text-lg mb-3">Focus Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSponsor.focus.map((area) => (
                        <span
                          key={area}
                          className="px-3 py-1.5 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-green-400 font-semibold text-lg mb-3">Contributions</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedSponsor.contribution}</p>
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h3 className="text-green-400 font-semibold text-xl mb-4">Benefits to Participants</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedSponsor.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-green-600/50 transition-colors"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-sm leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}