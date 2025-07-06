"use client"
import { useRef, useMemo, useState } from "react"
import { motion} from "framer-motion"
import { MapPin, Calendar, Users, Trophy, Clock, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"

const FlyingSpaceship = dynamic(() => import("@/components/FlyingSpaceship/FlyingSpaceship"), {
  loading: () => null,
  ssr: false,
})

// Updated event data
const eventsByDay = {
  day1: {
    title: "Day 1 - Tech Focus",
    date: "March 15, 2025",
    description: "Kick off Technicia'25 with intense tech competitions and insightful discussions.",
    events: [
      {
        id: "hackathon",
        title: "Hackathon",
        description:
          "A 48-hour coding marathon where innovation meets creativity. Build solutions that can change the world.",
        time: "9:00 AM - 9:00 AM (Next Day)",
        participants: "Teams of 4",
        prize: "₹50,000",
        difficulty: "Advanced",
        location: "Tech Hub, Main Campus",
        highlights: ["48-hour coding", "Mentorship sessions", "Industry judges", "Real-world problems"],
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "striver-dsa",
        title: "Striver DSA Session",
        description:
          "Master Data Structures and Algorithms with industry expert Striver. Interactive problem-solving session.",
        time: "2:00 PM - 4:00 PM",
        participants: "200+ Students",
        prize: "Certificates",
        difficulty: "Intermediate",
        location: "Auditorium A",
        highlights: ["Live coding", "Problem solving", "Career guidance", "Q&A session"],
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "tech-treasure-hunt",
        title: "Tech Treasure Hunt",
        description:
          "A thrilling scavenger hunt testing your tech knowledge and problem-solving skills across the campus.",
        time: "11:00 AM - 1:00 PM",
        participants: "Teams of 2-3",
        prize: "₹10,000",
        difficulty: "Intermediate",
        location: "Campus-wide",
        highlights: ["Clues based on tech concepts", "Physical and digital challenges", "Teamwork focus"],
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "tech-expo-student",
        title: "Tech Expo: Student Innovations",
        description: "Showcase your innovative projects and prototypes to a panel of experts and peers.",
        time: "1:00 PM - 5:00 PM",
        participants: "Individual/Teams",
        prize: "Best Project Award",
        difficulty: "All Levels",
        location: "Exhibition Hall",
        highlights: ["Live demonstrations", "Networking opportunities", "Feedback from industry professionals"],
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "panel-discussion",
        title: "Panel Discussion: Future of AI",
        description: "Engage with leading experts on the latest trends and ethical considerations in Artificial Intelligence.",
        time: "4:00 PM - 5:30 PM",
        participants: "Open to All",
        prize: "Knowledge & Insights",
        difficulty: "All Levels",
        location: "Auditorium B",
        highlights: ["Expert speakers", "Interactive Q&A", "Emerging AI technologies", "Career insights"],
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "adopt-a-planet",
        title: "Adopt a Planet",
        description: "A creative challenge to develop sustainable solutions for an assigned planetary scenario, focusing on environmental technology.",
        time: "10:00 AM - 6:00 PM",
        participants: "Teams of 3",
        prize: "₹18,000",
        difficulty: "Intermediate",
        location: "Sustainability Lab",
        highlights: ["Environmental tech solutions", "Resource management", "Innovative design", "Presentation skills"],
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "flight-forge",
        title: "Flight Forge",
        description: "Design, build, and fly your own custom aircraft in this exciting aviation challenge.",
        time: "10:00 AM - 4:00 PM",
        participants: "Individual/Teams",
        prize: "₹20,000",
        difficulty: "Advanced",
        location: "Open Grounds, Aeromodelling Zone",
        highlights: ["Aircraft design", "Aerodynamics principles", "Flight testing", "Innovation in aviation"],
        image: "/placeholder.svg?height=600&width=800",
      },
       {
        id: "capture-flag",
        title: "Capture The Flag",
        description: "Cybersecurity challenge testing your hacking and security skills in a controlled environment.",
        time: "10:00 AM - 6:00 PM",
        participants: "Individual/Teams",
        prize: "₹25,000",
        difficulty: "Advanced",
        location: "Cyber Lab",
        highlights: ["Web exploitation", "Cryptography", "Reverse engineering", "Network security"],
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
  },
  day2: {
    title: "Day 2 - Innovation & Robotics",
    date: "March 16, 2025",
    description: "Corporate Social Responsibility meets technology for sustainable innovation, alongside robotics and aerial challenges.",
    events: [
      {
        id: "cumun",
        title: "CUMUN",
        description: "Chandigarh University Model United Nations - Debate, diplomacy, and global awareness.",
        time: "9:00 AM - 6:00 PM",
        participants: "100+ Delegates",
        prize: "₹40,000",
        difficulty: "Intermediate",
        location: "Conference Hall",
        highlights: ["Diplomatic debates", "Global issues", "Leadership skills", "International exposure"],
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "company-expo",
        title: "Company Expo",
        description: "Connect with leading companies showcasing career opportunities, internships, and industry insights.",
        time: "10:00 AM - 4:00 PM",
        participants: "Open to All",
        prize: "Networking Opportunities",
        difficulty: "All Levels",
        location: "Exhibition Center",
        highlights: ["Recruitment drives", "Company presentations", "Career guidance", "Industry insights"],
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "non-tech-treasure-hunt",
        title: "Non-Tech Treasure Hunt",
        description: "A fun and challenging scavenger hunt focusing on general knowledge, puzzles, and teamwork.",
        time: "11:00 AM - 1:00 PM",
        participants: "Teams of 3",
        prize: "₹8,000",
        difficulty: "Easy",
        location: "Campus Gardens",
        highlights: ["Riddles and clues", "Physical challenges", "Observation skills", "Fun for all"],
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "among-us",
        title: "Among Us Live!",
        description: "Experience the popular social deduction game in a real-life, immersive setting.",
        time: "2:00 PM - 5:00 PM",
        participants: "10-15 players per round",
        prize: "Bragging Rights & Small Prizes",
        difficulty: "Easy",
        location: "Activity Zone",
        highlights: ["Strategy and deception", "Team dynamics", "Interactive gameplay", "Fun and laughter"],
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "tech-csr-bootcamp",
        title: "Tech + CSR Bootcamps",
        description: "Learn how technology can solve social problems and create sustainable solutions.",
        time: "9:00 AM - 5:00 PM",
        participants: "50 Students",
        prize: "Certificates & Internships",
        difficulty: "Intermediate",
        location: "Innovation Center",
        highlights: ["Social impact projects", "Sustainability focus", "Mentorship", "Real implementations"],
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
  },
  day3: {
    title: "Day 3 - Cultural & Non-Tech",
    date: "March 17, 2025",
    description: "Celebrate creativity, culture, and achievements in a grand finale, with diverse non-tech activities.",
    events: [
      
      {
        id: "short-film-making",
        title: "Short Film Making Competition",
        description: "Unleash your creativity and tell a compelling story through the art of filmmaking.",
        time: "9:00 AM - 5:00 PM (Submission)",
        participants: "Individual/Teams",
        prize: "₹20,000",
        difficulty: "Intermediate",
        location: "Film Studio / Online Submission",
        highlights: ["Scriptwriting", "Videography", "Editing techniques", "Storytelling"],
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "cultural-night",
        title: "One Stage One Vibe",
        description: "Grand cultural showcase featuring music, dance, and artistic performances.",
        time: "6:00 PM - 10:00 PM",
        participants: "Open to All",
        prize: "₹50,000",
        difficulty: "All Levels",
        location: "Main Stage",
        highlights: ["Live performances", "Cultural diversity", "Talent showcase", "Grand finale"],
        image: "/placeholder.svg?height=600&width=800",
      },
            
      {
        id: "rc-car-race",
        title: "RC Car Race",
        description: "Showcase your remote-controlled car driving skills on a challenging obstacle course.",
        time: "1:00 PM - 5:00 PM",
        participants: "Individual",
        prize: "₹15,000",
        difficulty: "Intermediate",
        location: "Racing Track",
        highlights: ["Precision driving", "Speed trials", "Custom car builds", "Agility challenges"],
        image: "/placeholder.svg?height=600&width=800",
      },
      {
        id: "drone-race",
        title: "Drone Race",
        description: "High-speed drone racing competition testing piloting skills and drone technology.",
        time: "3:00 PM - 7:00 PM",
        participants: "Individual",
        prize: "₹25,000",
        difficulty: "Advanced",
        location: "Drone Arena",
        highlights: ["FPV racing", "Obstacle courses", "Speed challenges", "Precision flying"],
        image: "/placeholder.svg?height=600&width=800",
      },
    ],
  },
}

export default function TimelineComponent() {
  const [selectedDay, setSelectedDay] = useState<"day1" | "day2" | "day3">("day1")
  const ref = useRef(null)
  // const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
      },
    }),
    [],
  )

  const itemVariants = useMemo(
    () => ({
      hidden: {
        y: 60,
        opacity: 0,
        scale: 0.9,
      },
      visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    }),
    [],
  )

  const textGlowAnimation = useMemo(
    () => ({
      textShadow: ["0 0 10px rgba(34,197,94,0.6)", "0 0 20px rgba(34,197,94,0.8)", "0 0 10px rgba(34,197,94,0.6)"],
    }),
    [],
  )

  return (
    <section className="py-12 md:py-20 text-white w-full relative overflow-hidden">
      <div className="hidden lg:block">
        <FlyingSpaceship top="top-[15%]" left="left-[5%]" duration={20} color="green" direction="leftToRight" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-16 md:top-20 left-6 md:left-10 w-8 h-8 md:w-12 md:h-12 border border-green-400/20"
          animate={{
            rotateZ: [0, 360],
            translateY: [-5, 5, -5],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-24 md:bottom-32 right-1/4 w-12 h-12 md:w-16 md:h-16 border border-green-300/30 rotate-45"
          animate={{
            rotateZ: [45, 405],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-[75rem] mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-green-400 px-2"
            animate={textGlowAnimation}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            TECHNICIA&apos;25 Schedule
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-12 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Three days of innovation, technology, and cultural celebration. Join us for an unforgettable journey through
            the future of tech and creativity.
          </motion.p>

          {/* Day Selector */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {Object.entries(eventsByDay).map(([dayKey, dayData]) => (
              <motion.button
                key={dayKey}
                onClick={() => setSelectedDay(dayKey as "day1" | "day2" | "day3")}
                className={`relative px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 border-2 min-w-[200px] ${
                  selectedDay === dayKey
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white border-green-400 shadow-lg shadow-green-500/25"
                    : "bg-transparent text-green-400 border-green-500/50 hover:border-green-400 hover:bg-green-900/20"
                }`}
              >
                {/* REMOVED whileHover and transition from this motion.div */}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-xl" />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="font-bold text-lg">{dayData.title.split(" - ")[0]}</span>
                  <span className="text-xs opacity-80">{dayData.date}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Selected Day Content */}
        <motion.div
          key={selectedDay} // This ensures re-animation when day changes
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Day Header */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full border border-green-400/50 mb-4"
              whileHover={{
                boxShadow: "0 10px 30px rgba(34,197,94,0.4)",
                scale: 1.05,
              }}
            >
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 md:h-6 md:w-6" />
                <span className="font-bold text-lg md:text-xl">{eventsByDay[selectedDay].date}</span>
              </div>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400 mb-4">
              {eventsByDay[selectedDay].title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">{eventsByDay[selectedDay].description}</p>
          </motion.div>

          {/* Events for selected day */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative space-y-16 md:space-y-24"
          >
            <motion.div
              className="absolute left-4 sm:left-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-green-500 to-green-600 rounded-full"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {eventsByDay[selectedDay].events.map((event, eventIndex) => (
              // Keep all the existing event rendering code exactly the same
              <motion.div
                key={event.id}
                variants={itemVariants}
                className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start lg:items-center"
              >
                {/* All the existing event content remains the same */}
                <motion.div
                  className="absolute left-4 sm:left-8 lg:left-1/2 top-8 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 transform -translate-x-1/2"
                  whileHover={{
                    scale: 1.3,
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white shadow-lg relative"
                    animate={{
                      boxShadow: [
                        "0 0 15px rgba(34,197,94,0.6)",
                        "0 0 25px rgba(34,197,94,0.8)",
                        "0 0 15px rgba(34,197,94,0.6)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="absolute inset-1 bg-white rounded-full animate-pulse opacity-60" />
                  </motion.div>
                </motion.div>

                <motion.div
                  className={`${eventIndex % 2 === 1 ? "lg:order-2" : "lg:order-1"} pl-12 sm:pl-16 lg:px-4 relative`}
                  whileHover={{
                    x: eventIndex % 2 === 1 ? -5 : 5,
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    className="mb-4 md:mb-6 inline-block"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-green-600/80 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-green-400/50 relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{ x: [-100, 200] }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                      <div className="relative flex items-center space-x-2">
                        <Clock className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="font-semibold text-sm md:text-base">{event.time}</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.h3
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-green-400"
                    whileHover={{
                      scale: 1.02,
                      textShadow: "0 0 15px rgba(34,197,94,0.8)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    {event.title}
                  </motion.h3>

                  <motion.p
                    className="text-base md:text-lg text-gray-300 mb-4 md:mb-6 leading-relaxed"
                    whileHover={{ color: "#d1d5db" }}
                    transition={{ duration: 0.2 }}
                  >
                    {event.description}
                  </motion.p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
                    <motion.div
                      className="flex items-center text-green-300 bg-green-900/20 p-2 md:p-3 rounded-lg border border-green-500/30"
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(34, 197, 94, 0.1)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Users className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-gray-400">Participants</div>
                        <div className="font-semibold text-sm md:text-base truncate">{event.participants}</div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center text-green-300 bg-green-900/20 p-2 md:p-3 rounded-lg border border-green-500/30"
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(34, 197, 94, 0.1)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Trophy className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-gray-400">Prize Pool</div>
                        <div className="font-semibold text-sm md:text-base truncate">{event.prize}</div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center text-green-300 bg-green-900/20 p-2 md:p-3 rounded-lg border border-green-500/30"
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(34, 197, 94, 0.1)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Star className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-gray-400">Difficulty</div>
                        <div className="font-semibold text-sm md:text-base truncate">{event.difficulty}</div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center text-green-300 bg-green-900/20 p-2 md:p-3 rounded-lg border border-green-500/30"
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(34, 197, 94, 0.1)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-gray-400">Location</div>
                        <div className="font-semibold text-sm md:text-base truncate">{event.location}</div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h4 className="text-green-400 font-semibold mb-3 text-sm md:text-base">Key Highlights:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {event.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          className="text-xs md:text-sm text-gray-300 bg-green-900/10 px-2 md:px-3 py-1.5 md:py-2 rounded-full border border-green-500/20"
                          whileHover={{
                            scale: 1.02,
                            backgroundColor: "rgba(34, 197, 94, 0.12)",
                            color: "#bbf7d0",
                            transition: { duration: 0.2 },
                          }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          • {highlight}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <Link href={`/timeline/${event.id}`}>
                    <motion.button
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 md:py-3 px-6 md:px-8 rounded-lg transition-colors duration-300 font-semibold relative overflow-hidden text-sm md:text-base w-full sm:w-auto"
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 8px 20px rgba(34, 197, 94, 0.3)",
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">View More Details</span>
                    </motion.button>
                  </Link>
                </motion.div>

                <motion.div
                  className={`relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[750px] rounded-2xl overflow-hidden shadow-2xl border border-green-500/30 ${
                    eventIndex % 2 === 1 ? "lg:order-1" : "lg:order-2"
                  }`}
                  whileHover={{
                    scale: 1.03,
                    rotateY: eventIndex % 2 === 1 ? -3 : 3,
                    boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)",
                    transition: { duration: 0.4 },
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-green-900/20 to-black/40 flex items-center justify-center relative">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                      priority={eventIndex < 2}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 650px"
                    />

                    {/* Floating decorative elements */}
                    <motion.div
                      className="absolute top-4 md:top-8 left-4 md:left-8 w-6 h-6 md:w-10 md:h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-lg"
                      animate={{
                        rotateZ: [0, 360],
                        translateY: [-5, 5, -5],
                      }}
                      transition={{
                        duration: 12,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.2 },
                      }}
                    />
                    <motion.div
                      className="absolute bottom-4 md:bottom-8 right-4 md:right-8 w-8 h-8 md:w-12 md:h-12 border-2 border-green-400/50 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotateZ: [0, 180, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      whileHover={{
                        borderColor: "rgba(34, 197, 94, 0.8)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <div className="absolute inset-2 bg-green-400/30 rounded-full" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}