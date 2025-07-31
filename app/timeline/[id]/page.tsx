// app/timeline/[id]/page.tsx
"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Trophy, Clock, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCartStore } from "@/store/data";
import { useRouter } from "next/navigation";

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
// Updated event data (same as in timeline-component.tsx for consistency)
const eventsByDay = {
  day1: {
    title: "Day 1 - Tech Focus",
    date: "March 15, 2025",
    description:
      "Kick off Technicia'25 with intense tech competitions and insightful discussions.",
    events: [
      {
        id: "hackathon",
        title: "Hackathon",
        description:
          "A 48-hour coding marathon where innovation meets creativity. Build solutions that can change the world.",
        time: "September 10, 10:00 AM - September 12, 10:00 AM",
        participants: "Teams of 4",
        prize: "₹1,50,000",
        difficulty: "Advanced",
        location: "Tech Hub, Main Campus",
        highlights: [
          "48-hour coding",
          "Mentorship sessions",
          "Industry judges",
          "Real-world problems",
        ],
        image: "/competition/hackathon.png",
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
        highlights: [
          "Live coding",
          "Problem solving",
          "Career guidance",
          "Q&A session",
        ],
        image: "/competition/striver.png",
      },
      {
        id: "tech-treasure-hunt",
        title: "Tech Treasure Hunt",
        description:
          "A thrilling scavenger hunt testing your tech knowledge and problem-solving skills across the campus.",
        time: "11:00 AM - 1:00 PM",
        participants: "Teams of 2-3",
        prize: "₹5,000",
        difficulty: "Intermediate",
        location: "Campus-wide",
        highlights: [
          "Clues based on tech concepts",
          "Physical and digital challenges",
          "Teamwork focus",
        ],
        image: "/competition/techtr.png",
      },
      {
        id: "tech-expo-student",
        title: "Tech Expo: Student Innovations",
        description:
          "Showcase your innovative projects and prototypes to a panel of experts and peers.",
        time: "1:00 PM - 5:00 PM",
        participants: "Individual/Teams",
        prize: "Best Project Award",
        difficulty: "All Levels",
        location: "Exhibition Hall",
        highlights: [
          "Live demonstrations",
          "Networking opportunities",
          "Feedback from industry professionals",
        ],
        image: "/competition/expost.png",
      },
      {
        id: "panel-discussion",
        title: "Panel Discussion: Future of AI",
        description:
          "Engage with leading experts on the latest trends and ethical considerations in Artificial Intelligence.",
        time: "4:00 PM - 5:30 PM",
        participants: "Open to All",
        prize: "Knowledge & Insights",
        difficulty: "All Levels",
        location: "Auditorium B",
        highlights: [
          "Expert speakers",
          "Interactive Q&A",
          "Emerging AI technologies",
          "Career insights",
        ],
        image: "/competition/panel.png",
      },
      {
        id: "adopt-a-planet",
        title: "Adopt a Planet",
        description:
          "A creative challenge to develop sustainable solutions for an assigned planetary scenario, focusing on environmental technology.",
        time: "10:00 AM - 6:00 PM",
        participants: "Teams of 3",
        prize: "₹18,000",
        difficulty: "Intermediate",
        location: "Sustainability Lab",
        highlights: [
          "Environmental tech solutions",
          "Resource management",
          "Innovative design",
          "Presentation skills",
        ],
        image: "/competition/adopt.png",
      },
      {
        id: "flight-forge",
        title: "Flight Forge",
        description:
          "Design, build, and fly your own custom aircraft in this exciting aviation challenge.",
        time: "10:00 AM - 4:00 PM",
        participants: "Individual/Teams",
        prize: "₹20,000",
        difficulty: "Advanced",
        location: "Open Grounds, Aeromodelling Zone",
        highlights: [
          "Aircraft design",
          "Aerodynamics principles",
          "Flight testing",
          "Innovation in aviation",
        ],
        image: "/competition/flight.png",
      },
      {
        id: "capture-flag",
        title: "Capture The Flag",
        description:
          "Cybersecurity challenge testing your hacking and security skills in a controlled environment.",
        time: "10:00 AM - 6:00 PM",
        participants: "Individual/Teams",
        prize: "₹25,000",
        difficulty: "Advanced",
        location: "Cyber Lab",
        highlights: [
          "Web exploitation",
          "Cryptography",
          "Reverse engineering",
          "Network security",
        ],
        image: "/competition/capture.png",
      },
    ],
  },
  day2: {
    title: "Day 2 - Innovation & Robotics",
    date: "March 16, 2025",
    description:
      "Corporate Social Responsibility meets technology for sustainable innovation, alongside robotics and aerial challenges.",
    events: [
      {
        id: "cumun",
        title: "CUMUN",
        description:
          "Chandigarh University Model United Nations - Debate, diplomacy, and global awareness.",
        time: "9:00 AM - 6:00 PM",
        participants: "100+ Delegates",
        prize: "₹40,000",
        difficulty: "Intermediate",
        location: "Conference Hall",
        highlights: [
          "Diplomatic debates",
          "Global issues",
          "Leadership skills",
          "International exposure",
        ],
        image: "/competition/mun.png",
      },
      {
        id: "company-expo",
        title: "Company Expo",
        description:
          "Connect with leading companies showcasing career opportunities, internships, and industry insights.",
        time: "10:00 AM - 4:00 PM",
        participants: "Open to All",
        prize: "Networking Opportunities",
        difficulty: "All Levels",
        location: "Exhibition Center",
        highlights: [
          "Recruitment drives",
          "Company presentations",
          "Career guidance",
          "Industry insights",
        ],
        image: "/competition/expoco.png",
      },
      {
        id: "non-tech-treasure-hunt",
        title: "Non-Tech Treasure Hunt",
        description:
          "A fun and challenging scavenger hunt focusing on general knowledge, puzzles, and teamwork.",
        time: "11:00 AM - 1:00 PM",
        participants: "Teams of 3",
        prize: "₹8,000",
        difficulty: "Easy",
        location: "Campus Gardens",
        highlights: [
          "Riddles and clues",
          "Physical challenges",
          "Observation skills",
          "Fun for all",
        ],
        image: "/competition/nontechtr.png",
      },
      {
        id: "among-us",
        title: "Among Us Live!",
        description:
          "Experience the popular social deduction game in a real-life, immersive setting.",
        time: "2:00 PM - 5:00 PM",
        participants: "10-15 players per round",
        prize: "Bragging Rights & Small Prizes",
        difficulty: "Easy",
        location: "Activity Zone",
        highlights: [
          "Strategy and deception",
          "Team dynamics",
          "Interactive gameplay",
          "Fun and laughter",
        ],
        image: "/competition/among.png",
      },
      {
        id: "tech-csr-bootcamp",
        title: "Tech + CSR Bootcamps",
        description:
          "Learn how technology can solve social problems and create sustainable solutions.",
        time: "9:00 AM - 5:00 PM",
        participants: "50 Students",
        prize: "Certificates & Internships",
        difficulty: "Intermediate",
        location: "Innovation Center",
        highlights: [
          "Social impact projects",
          "Sustainability focus",
          "Mentorship",
          "Real implementations",
        ],
        image: "/competition/boot.png",
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
        image: "/competition/films.png",
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
        location: "Drone Arena",
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

export default function EventDetailsPage() {
  const params = useParams();
  const eventId = params.id as string;
  // Find the event details
  const event = useMemo(() => {
    for (const dayKey in eventsByDay) {
      const day = eventsByDay[dayKey as keyof typeof eventsByDay];
      const foundEvent = day.events.find((e) => e.id === eventId);
      if (foundEvent) {
        return foundEvent;
      }
    }
    return null;
  }, [eventId]);

  const { addEvent } = useCartStore();

  const router = useRouter();

  const handleSubmitButton = async (event: Event) => {
    try {
      console.log("adding event:", event);
      await addEvent(event);
      // Redirect to register page
      router.push("/register"); // or your desired route
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  if (!event) {
    return (
      <section className="py-20 text-white w-full min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            Event Not Found
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            The event you are looking for does not exist or has been removed.
          </p>
          <Link href="/timeline">
            <motion.button
              className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-lg transition-colors duration-300 font-semibold flex items-center mx-auto"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(239, 68, 68, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Timeline
            </motion.button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 text-white w-full relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-16 md:top-20 left-6 md:left-10 w-8 h-8 md:w-12 md:h-12 border border-green-400/20"
          animate={{
            rotateZ: [0, 360],
            translateY: [-5, 5, -5],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
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
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-[75rem] mx-auto px-4 sm:px-6 relative z-10">
        <Link href="/timeline">
          <motion.button
            className="mb-8 md:mb-12 bg-green-700 hover:bg-green-800 text-white py-2 px-5 rounded-lg transition-colors duration-300 font-semibold flex items-center"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(34, 197, 94, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Timeline
          </motion.button>
        </Link>

        <motion.div
          className="bg-gray-800 rounded-3xl p-6 md:p-10 shadow-lg border border-green-700/50 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <motion.div
              className="relative w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-xl border border-green-500/40"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 15px 30px rgba(34, 197, 94, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAREBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                  {event.title}
                </h1>
              </div>
            </motion.div>

            <div>
              <motion.p
                className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {event.description}
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 md:mb-8">
                <motion.div
                  className="flex items-center text-green-300 bg-green-900/20 p-3 rounded-lg border border-green-500/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Clock className="h-5 w-5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">Time</div>
                    <div className="font-semibold text-base md:text-lg">
                      {event.time}
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center text-green-300 bg-green-900/20 p-3 rounded-lg border border-green-500/30"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <MapPin className="h-5 w-5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">Location</div>
                    <div className="font-semibold text-base md:text-lg">
                      {event.location}
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center text-green-300 bg-green-900/20 p-3 rounded-lg border border-green-500/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Users className="h-5 w-5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">Participants</div>
                    <div className="font-semibold text-base md:text-lg">
                      {event.participants}
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center text-green-300 bg-green-900/20 p-3 rounded-lg border border-green-500/30"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Trophy className="h-5 w-5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">Prize Pool</div>
                    <div className="font-semibold text-base md:text-lg">
                      {event.prize}
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center text-green-300 bg-green-900/20 p-3 rounded-lg border border-green-500/30 col-span-1 sm:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <Star className="h-5 w-5 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">Difficulty</div>
                    <div className="font-semibold text-base md:text-lg">
                      {event.difficulty}
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mb-6 md:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <h2 className="text-green-400 font-bold mb-4 text-xl md:text-2xl">
                  Key Highlights:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {event.highlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start text-sm md:text-base text-gray-300 bg-green-900/10 px-3 py-2 rounded-lg border border-green-500/20"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + idx * 0.1, duration: 0.4 }}
                    >
                      <span className="mr-2 text-green-400">•</span> {highlight}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Dummy registration/interest button */}
              <motion.button
                type="button" // Important for button behavior
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 md:py-4 px-8 rounded-lg transition-colors duration-300 font-bold text-lg relative overflow-hidden"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 25px rgba(34, 197, 94, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSubmitButton(event)} // Changed from onSubmit to onClick
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">
                  Register for {event.title}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
