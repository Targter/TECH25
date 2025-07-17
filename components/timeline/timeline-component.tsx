"use client";
import { useRef, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Trophy, Clock, Star, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCartStore } from "@/store/data";

type Event = {
  id: string;
  title: string;
  description: string;
  time: string;
  participants: string;
  prize: string;
  difficulty: string;
  location: string;
  highlights: string[];
  image: string;
};
const FlyingSpaceship = dynamic(
  () => import("@/components/FlyingSpaceship/FlyingSpaceship"),
  {
    loading: () => null,
    ssr: false,
  }
);

// Updated event data
const eventsByDay = {
  day1 : {
  title: "Day 1 - Tech Focus",
  date: "March 15, 2025",
  description:
    "Kick off Technicia'25 with intense tech competitions and insightful discussions.",
  events: [
    {
      id: "hackathon",
      title: "HackChrono: The Technicia’ 48-hour Challenge",
      description:
        "HackChrono is a 48-hour open-source hackathon to build tech-driven solutions for real-world social challenges, especially in NGO and CSR domains.",
      time: "9:00 AM - 9:00 AM (Next Day)",
      participants: "Teams of 2-4 UG/PG Students",
      prize: "₹50,000",
      difficulty: "Advanced",
      location: "D-Block Open Area",
      highlights: [
        "48-hour open-source hackathon",
        "Mentorship rounds & tech talks",
        "Real-world problem statements",
        "Pitch prep and final demos"
      ],
      image: "/competition/hackchrono.png",
    },
    {
      id: "striver-dsa",
      title: "Striver DSA Session",
      description:
        "A live DSA masterclass and career session by Striver (Ex-Google, TakeUForward) focusing on coding interviews, problem-solving, and tech careers.",
      time: "2:00 PM - 4:00 PM",
      participants: "800–1000+ Students",
      prize: "Certificates & Merchandise",
      difficulty: "Intermediate",
      location: "A1 Auditorium",
      highlights: [
        "Live DSA roadmap",
        "Interview cracking tips",
        "Fireside chat",
        "Open Q&A session"
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "tech-treasure-hunt",
      title: "VOID Protocol: The Final Code",
      description:
        "An interstellar-themed treasure hunt combining logic puzzles, cryptography, and tech decoding across multiple floors in a race to the final code.",
      time: "10:00 AM - 12:00 PM",
      participants: "Teams of 3–4",
      prize: "₹5,000",
      difficulty: "Intermediate",
      location: "D7 (Seminar Hall)",
      highlights: [
        "Binary & DNA puzzles",
        "QR scavenger hunt",
        "Timed decoding levels",
        "Alien-themed storyline"
      ],
      image: "/competition/treasure_hunt.png",
    },
    {
      id: "tech-expo-student",
      title: "Tech Expo: Student & Industry Innovations",
      description:
        "Tech Expo is a platform for showcasing student innovations alongside company CSR demos, facilitating networking between academia and industry.",
      time: "9:00 AM – 4:30 PM",
      participants: "Individual/Team & Corporate",
      prize: "Best Project Award & Industry Mentorship",
      difficulty: "All Levels",
      location: "Exhibition Hall",
      highlights: [
        "Company stalls and demos",
        "Student prototype exhibition",
        "CSR partnerships and evaluation",
        "Panel talks and pitch sessions"
      ],
      image: "/competition/tech_expo.png",
    },
    {
      id: "panel-discussion",
      title: "Panel Discussion: Viksit Bharat 2047",
      description:
        "An elite panel discussion series covering AI, Quantum Tech, Leadership, and Cybersecurity under the Viksit Bharat 2047 vision.",
      time: "10:00 AM - 5:00 PM",
      participants: "Open to All",
      prize: "Knowledge & Certification",
      difficulty: "All Levels",
      location: "C2 Auditorium",
      highlights: [
        "AI & Deep Tech Ecosystem",
        "Innovation & Leadership in India",
        "Cybersecurity & Data Privacy",
        "National development vision 2047"
      ],
      image: "/competition/ai_panel.png",
    },
    {
      id: "adopt-a-planet",
      title: "Adopt a Planet",
      description:
        "A themed CSR competition where student teams act as intergalactic CSR leaders solving crises on fictional planets with sustainable solutions.",
      time: "10:00 AM - 4:00 PM",
      participants: "Teams of 3",
      prize: "₹18,000",
      difficulty: "Intermediate",
      location: "B3 Seminar Hall",
      highlights: [
        "Story-based problem solving",
        "Sustainable innovation",
        "Team presentations",
        "Judged pitch sessions"
      ],
      image: "/competition/adopt_planet.png",
    },
    {
      id: "flight-forge",
      title: "FlightForge – Aeromodelling Challenge",
      description:
        "Design and fly RC aircrafts in two rounds: one for payload capacity and the other for precision drop. A showcase of engineering and control.",
      time: "10:00 AM - 4:00 PM",
      participants: "Teams of 2–4 (UG/Engineering Students)",
      prize: "₹20,000",
      difficulty: "Advanced",
      location: "C1 Main Ground",
      highlights: [
        "Payload lift challenge",
        "Precision payload drop",
        "Aerodynamics application",
        "Engineering creativity"
      ],
      image: "/competition/flight_forge.png",
    },
    {
      id: "capture-flag",
      title: "Capture The Flag – Technicia: Cyber Crisis Protocol",
      description:
        "A 24-hour Jeopardy-style cybersecurity CTF with challenges across web, crypto, reverse engineering, and forensics. Defend Earth from alien hackers!",
      time: "10:00 AM - 10:00 AM (Next Day)",
      participants: "Teams of 2–4",
      prize: "₹25,000",
      difficulty: "Advanced",
      location: "D Block Closed Area",
      highlights: [
        "CTFd platform with scoreboard",
        "Challenges in 6 cyber domains",
        "Mentorship support",
        "Alien hacking theme"
      ],
      image: "/competition/cft.png",
    }
  ],
},
  day2 : {
  title: "Day 2 - Innovation & Robotics",
  date: "March 16, 2025",
  description:
    "Corporate Social Responsibility meets technology for sustainable innovation, alongside robotics and aerial challenges.",
  events: [
    {
      id: "cumun",
      title: "CUMUN – Chandigarh University Model United Nations",
      description:
        "An intellectually stimulating forum where delegates represent countries and debate global issues through diplomacy, negotiation, and collaboration.",
      time: "9:00 AM - 6:00 PM",
      participants: "100+ Delegates (Open to All Streams)",
      prize: "₹40,000 Total Cash Pool + Best Delegate Awards",
      difficulty: "Intermediate",
      location: "Conference Hall, Block A",
      highlights: [
        "UN-style committee simulations",
        "Global policy debate",
        "Leadership and diplomacy",
        "Awards for Best Delegates & Verbal Mentions",
      ],
      image: "/competition/cumun.png",
    },
    {
      id: "company-expo",
      title: "Internship & Company Expo",
      description:
        "A career-focused expo where leading companies, startups, and CSR partners showcase innovation, offer internships, and engage directly with students.",
      time: "10:00 AM - 4:30 PM",
      participants: "Open to All (Approx. 150–200 Footfall Expected)",
      prize: "Networking, Internship Offers, CSR Collaboration",
      difficulty: "All Levels",
      location: "University Exhibition Center",
      highlights: [
        "Live product demos",
        "Company stalls & networking",
        "CSR project mentoring",
        "Panel talks & awards",
      ],
      image: "/competition/internship_expo.png",
    },
    {
      id: "non-tech-treasure-hunt",
      title: "The Order of the Obsidian Quill",
      description:
        "A fantasy-themed non-tech scavenger hunt where players become 'Seekers' navigating through ancient lore, solving puzzles, and reassembling a magical crown.",
      time: "10:00 AM - 5:00 PM",
      participants: "Teams of 3–4 | Max 35 Teams",
      prize: "Gold/Silver/Bronze Medals, Goodies, Printed Certificates",
      difficulty: "Easy",
      location: "B1–B3 Blocks, Library, Fountain Park, Amphitheatre",
      highlights: [
        "6 lore-based stations",
        "Logic & map puzzles",
        "Live skit duels",
        "Fantasy-themed props & storyline",
      ],
      image: "/competition/obsidian_quill.png",
    },
    {
      id: "among-us",
      title: "Among Us Live!",
      description:
        "An interactive live-action version of the famous social deduction game 'Among Us'—full of fun, mystery, and real-time betrayal.",
      time: "2:00 PM - 5:00 PM",
      participants: "10–15 players per round",
      prize: "Bragging Rights & Fun Hampers",
      difficulty: "Easy",
      location: "Student Activity Zone",
      highlights: [
        "Live-action roleplay",
        "Sabotage and strategy",
        "Group deception and deduction",
        "Rounds with elimination",
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "tech-csr-bootcamp",
      title: "Tech + CSR Bootcamps",
      description:
        "Day-long guided bootcamps focusing on how emerging technologies can drive social change through innovation and corporate responsibility.",
      time: "9:00 AM - 5:00 PM",
      participants: "50 Shortlisted Students",
      prize: "Certificates + Internship Shortlisting",
      difficulty: "Intermediate",
      location: "CSR Innovation Center, CU",
      highlights: [
        "Hands-on CSR prototyping",
        "Mentorship from CSR experts",
        "Social impact brainstorming",
        "Implementation frameworks",
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
  ],
},
  day3: {
    title: "Day 3 - Cultural & Non-Tech",
    date: "March 17, 2025",
    description:
      "Celebrate creativity, culture, and achievements in a grand finale, with diverse non-tech activities.",
    events: [
      {
        id: "short-film-making",
        title: "Short Film Making Competition",
        description:
          "Unleash your creativity and tell a compelling story through the art of filmmaking.",
        time: "9:00 AM - 5:00 PM (Submission)",
        participants: "Individual/Teams",
        prize: "₹20,000",
        difficulty: "Intermediate",
        location: "Film Studio / Online Submission",
        highlights: [
          "Scriptwriting",
          "Videography",
          "Editing techniques",
          "Storytelling",
        ],
        image: "/competition/film.png",
      },
      {
        id: "cultural-night",
        title: "One Stage One Vibe",
        description:
          "Grand cultural showcase featuring music, dance, and artistic performances.",
        time: "6:00 PM - 10:00 PM",
        participants: "Open to All",
        prize: "₹50,000",
        difficulty: "All Levels",
        location: "Main Stage",
        highlights: [
          "Live performances",
          "Cultural diversity",
          "Talent showcase",
          "Grand finale",
        ],
        image: "/competition/cultural.png",

      },

      {
        id: "rc-car-race",
        title: "RC Car Race",
        description:
          "Showcase your remote-controlled car driving skills on a challenging obstacle course.",
        time: "1:00 PM - 5:00 PM",
        participants: "Individual",
        prize: "₹15,000",
        difficulty: "Intermediate",
        location: "Racing Track",
        highlights: [
          "Precision driving",
          "Speed trials",
          "Custom car builds",
          "Agility challenges",
        ],
        image: "/competition/rc.png",
      },
      {
        id: "drone-race",
        title: "Drone Race",
        description:
          "High-speed drone racing competition testing piloting skills and drone technology.",
        time: "3:00 PM - 7:00 PM",
        participants: "Individual",
        prize: "₹25,000",
        difficulty: "Advanced",
        location: "In Front LC girsl Hostel",
        highlights: [
          "FPV racing",
          "Obstacle courses",
          "Speed challenges",
          "Precision flying",
        ],
        image: "/competition/drone.png",
      },
    ],
  },
};

export default function TimelineComponent() {
  const [selectedDay, setSelectedDay] = useState<"day1" | "day2" | "day3">(
    "day1"
  );
  const ref = useRef(null);
  // const isInView = useInView(ref, { once: true, amount: 0.1 })

  //
  const { addEvent, isEventInCart, removeEvent } = useCartStore();
  const handleAddToCart = (event: Event) => {
    addEvent(event);
  };

  //
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
      },
    }),
    []
  );

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
    []
  );

  const textGlowAnimation = useMemo(
    () => ({
      textShadow: [
        "0 0 10px rgba(34,197,94,0.6)",
        "0 0 20px rgba(34,197,94,0.8)",
        "0 0 10px rgba(34,197,94,0.6)",
      ],
    }),
    []
  );

  return (
    <section className="py-12 md:py-20 text-white w-full relative overflow-hidden">
      <div className="hidden lg:block">
        <FlyingSpaceship
          top="top-[15%]"
          left="left-[5%]"
          duration={20}
          color="green"
          direction="leftToRight"
        />
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
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            TECHNICIA&apos;25 Schedule
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-12 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Three days of innovation, technology, and cultural celebration. Join
            us for an unforgettable journey through the future of tech and
            creativity.
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
                onClick={() =>
                  setSelectedDay(dayKey as "day1" | "day2" | "day3")
                }
                className={`relative px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 border-2 min-w-[200px] ${selectedDay === dayKey
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white border-green-400 shadow-lg shadow-green-500/25"
                    : "bg-transparent text-green-400 border-green-500/50 hover:border-green-400 hover:bg-green-900/20"
                  }`}
              >
                {/* REMOVED whileHover and transition from this motion.div */}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-xl" />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="font-bold text-lg">
                    {dayData.title.split(" - ")[0]}
                  </span>
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
                <span className="font-bold text-lg md:text-xl">
                  {eventsByDay[selectedDay].date}
                </span>
              </div>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400 mb-4">
              {eventsByDay[selectedDay].title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              {eventsByDay[selectedDay].description}
            </p>
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
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <div className="absolute inset-1 bg-white rounded-full animate-pulse opacity-60" />
                  </motion.div>
                </motion.div>

                <motion.div
                  className={`${eventIndex % 2 === 1 ? "lg:order-2" : "lg:order-1"
                    } pl-12 sm:pl-16 lg:px-4 relative`}
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
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                      <div className="relative flex items-center space-x-2">
                        <Clock className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="font-semibold text-sm md:text-base">
                          {event.time}
                        </span>
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
                        <div className="text-xs text-gray-400">
                          Participants
                        </div>
                        <div className="font-semibold text-sm md:text-base truncate">
                          {event.participants}
                        </div>
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
                        <div className="font-semibold text-sm md:text-base truncate">
                          {event.prize}
                        </div>
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
                        <div className="font-semibold text-sm md:text-base truncate">
                          {event.difficulty}
                        </div>
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
                        <div className="font-semibold text-sm md:text-base truncate">
                          {event.location}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h4 className="text-green-400 font-semibold mb-3 text-sm md:text-base">
                      Key Highlights:
                    </h4>
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

                  {/*
                   */}

                  {/* <motion.button
                    onClick={() => handleAddToCart(event)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 ml-3 text-white py-2.5 md:py-3 px-6 md:px-8 rounded-lg transition-colors duration-300 font-semibold relative overflow-hidden text-sm md:text-base w-full sm:w-auto"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 8px 20px rgba(37, 99, 235, 0.3)",
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
                    <span className="relative z-10">
                      Add Event For Registration
                    </span>
                  </motion.button> */}

                  <motion.button
                    onClick={() => {
                      if (isEventInCart(event.id)) {
                        removeEvent(event.id);
                      } else {
                        handleAddToCart(event);
                      }
                    }}
                    className={`group ml-3 text-white py-2.5 md:py-3 px-6 md:px-8 rounded-lg transition-colors duration-300 font-semibold relative overflow-hidden text-sm md:text-base w-full sm:w-auto ${isEventInCart(event.id)
                        ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      }`}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: isEventInCart(event.id)
                        ? "0 8px 20px rgba(34, 197, 94, 0.3)"
                        : "0 8px 20px rgba(37, 99, 235, 0.3)",
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

                    {/* Delete button that appears on hover */}
                    {isEventInCart(event.id) && (
                      <motion.div
                        className="absolute inset-0 bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        initial={{ scale: 0.9 }}
                        whileHover={{ scale: 1 }}
                      >
                        <X className="h-5 w-5" />
                      </motion.div>
                    )}

                    <span
                      className={`relative z-10 flex items-center justify-center gap-2 transition-all duration-200 ${isEventInCart(event.id) ? "group-hover:opacity-0" : ""
                        }`}
                    >
                      {isEventInCart(event.id) ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          Added for Registration
                        </>
                      ) : (
                        "Add Event For Registration"
                      )}
                    </span>
                  </motion.button>
                </motion.div>

                <motion.div
                  className={`relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[750px] rounded-2xl overflow-hidden shadow-2xl border border-green-500/30 ${eventIndex % 2 === 1 ? "lg:order-1" : "lg:order-2"
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
  );
}
