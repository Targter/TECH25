import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Users, Trophy, Star, Zap, Award, ArrowLeft, ExternalLink, Rocket, Satellite } from 'lucide-react';

// Competition data type
interface Competition {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  participants: string;
  prize: string;
  difficulty: string;
  category: string;
  highlights: string[];
  image: string;
}

const getCompetitionData = (id: string): Competition | null => {
  const competitions: { [key: string]: Competition } = {
    "1": {
      id: 1,
      title: "CU MUN",
      description: "Showcase your artificial intelligence prowess in this cutting-edge competition where innovation meets technology in the vast expanse of digital space.",
      date: "March 15, 2025",
      time: "09:00 AM - 06:00 PM",
      location: "Main Auditorium, Tech Block",
      participants: "150+ Teams",
      prize: "₹50,000",
      difficulty: "Advanced",
      category: "Technology",
      highlights: ["Machine Learning Models", "Neural Networks", "Real-world Problem Solving", "Industry Mentorship"],
      image: "/competition/1.png"
    },
    "2": {
      id: 2,
      title: "CodeFest Marathon",
      description: "The ultimate coding showdown where algorithms dance and logic reigns supreme in the cosmic realm of programming excellence.",
      date: "March 16, 2025",
      time: "10:00 AM - 08:00 PM",
      location: "Computer Lab Complex",
      participants: "200+ Coders",
      prize: "₹30,000",
      difficulty: "Intermediate",
      category: "Programming",
      highlights: ["Data Structures", "Algorithm Optimization", "Competitive Programming", "Live Coding Sessions"],
      image: "/competition/2.png"
    },
    "3": {
      id: 3,
      title: "RoboWars Championship",
      description: "Enter the arena where metal meets mayhem! Design, build, and battle your way to robotic supremacy in this thrilling intergalactic competition.",
      date: "March 17, 2025",
      time: "11:00 AM - 07:00 PM",
      location: "Engineering Workshop Arena",
      participants: "80+ Robots",
      prize: "₹75,000",
      difficulty: "Expert",
      category: "Robotics",
      highlights: ["Combat Robotics", "Mechanical Design", "Strategic Warfare", "Live Battle Arena"],
      image: "/competition/3.png"
    },
    "4": {
      id: 4,
      title: "Web Dev Wizardry",
      description: "Craft digital masterpieces and weave web magic in this comprehensive full-stack development competition across the digital cosmos.",
      date: "March 18, 2025",
      time: "09:30 AM - 05:30 PM",
      location: "Digital Innovation Center",
      participants: "120+ Developers",
      prize: "₹40,000",
      difficulty: "Intermediate",
      category: "Web Development",
      highlights: ["Frontend Frameworks", "Backend Architecture", "Database Design", "UI/UX Excellence"],
      image: "/competition/4.png"
    },
    "5": {
      id: 5,
      title: "AI Innovation Summit",
      description: "Push the boundaries of artificial intelligence in this elite competition where machine learning meets creative problem-solving.",
      date: "March 19, 2025",
      time: "09:00 AM - 06:00 PM",
      location: "AI Research Lab",
      participants: "100+ Innovators",
      prize: "₹60,000",
      difficulty: "Expert",
      category: "Artificial Intelligence",
      highlights: ["Deep Learning", "Computer Vision", "Natural Language Processing", "AI Ethics"],
      image: "/competition/5.png"
    },
    "6": {
      id: 6,
      title: "Cyber Security Challenge",
      description: "Defend the digital frontier in this intense cybersecurity competition where white-hat hackers battle against digital threats.",
      date: "March 20, 2025",
      time: "10:00 AM - 08:00 PM",
      location: "Security Operations Center",
      participants: "90+ Security Experts",
      prize: "₹45,000",
      difficulty: "Advanced",
      category: "Cybersecurity",
      highlights: ["Penetration Testing", "Forensics Analysis", "Threat Detection", "Incident Response"],
      image: "/competition/6.png"
    }
  };

  return competitions[id] || null;
};

interface PageProps {
  params: {
    id: string;
  };
}

const SpaceCompetitionPage = ({ params }: PageProps) => {
  const competition = getCompetitionData(params.id);

  if (!competition) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Rocket className="w-16 h-16 text-red-400 mx-auto" />
          <h1 className="text-4xl font-bold text-red-400">Mission Not Found</h1>
          <p className="text-gray-400">The requested competition does not exist in our space database.</p>
          <button className="bg-green-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-green-400 transition-colors">
            Return to Mission Control
          </button>
        </div>
      </div>
    );
  }
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-900/30 text-green-300 border-green-500/50';
      case 'intermediate':
        return 'bg-yellow-900/30 text-yellow-300 border-yellow-500/50';
      case 'advanced':
        return 'bg-red-900/30 text-red-300 border-red-500/50';
      case 'expert':
        return 'bg-purple-900/30 text-purple-300 border-purple-500/50';
      default:
        return 'bg-gray-900/30 text-gray-300 border-gray-500/50';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technology':
        return 'bg-cyan-900/30 text-cyan-300 border-cyan-500/50';
      case 'programming':
        return 'bg-green-900/30 text-green-300 border-green-500/50';
      case 'robotics':
        return 'bg-orange-900/30 text-orange-300 border-orange-500/50';
      case 'web development':
        return 'bg-blue-900/30 text-blue-300 border-blue-500/50';
      default:
        return 'bg-gray-900/30 text-gray-300 border-gray-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-green-900/20 to-black"></div>
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-emerald-400 rounded-full animate-bounce"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-lime-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-teal-400 rounded-full animate-ping"></div>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
            {Array.from({ length: 400 }).map((_, i) => (
              <div key={i} className="border border-green-500/20"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 bg-black/40 backdrop-blur-xl border-b border-green-500/30  top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button className="inline-flex items-center space-x-2 text-green-400 hover:text-green-300 transition-all duration-300 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Mission Control</span>
          </button>
        </div>
      </div>

      {/* Hero Section with Large Image */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Competition Image - Large and Prominent */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-cyan-500/30 rounded-3xl blur-2xl transform rotate-1"></div>
            <div className="relative bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-lg rounded-3xl p-4 border border-green-500/30 shadow-2xl">
              <Image
                src={competition.image}
                alt={competition.title}
                width={800}
                height={600}
                className="w-full h-96 md:h-[500px] lg:h-[600px] object-cover rounded-2xl"
                unoptimized
              />
              <div className="absolute inset-4 rounded-2xl bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-md ${getCategoryColor(competition.category)}`}>
                    <Rocket className="w-4 h-4 inline mr-2" />
                    {competition.category}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-md ${getDifficultyColor(competition.difficulty)}`}>
                    <Satellite className="w-4 h-4 inline mr-2" />
                    {competition.difficulty}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                  {competition.title}
                </h1>
                <p className="text-xl text-green-200 leading-relaxed max-w-3xl">
                  {competition.description}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <button className="group bg-gradient-to-r from-green-500 to-emerald-600 text-black px-8 py-4 rounded-2xl font-bold hover:from-green-400 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25">
              <span className="flex items-center space-x-2">
                <Rocket className="w-5 h-5" />
                <span>Launch Registration</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="border-2 border-green-500/50 text-green-400 px-8 py-4 rounded-2xl font-semibold hover:bg-green-500/10 hover:border-green-400 transition-all duration-300 backdrop-blur-md">
              <span className="flex items-center space-x-2">
                <Satellite className="w-5 h-5" />
                <span>Mission Briefing</span>
              </span>
            </button>
          </div>

          {/* Information Grid - New Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Mission Stats - Large Cards */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date & Time Card */}
                <div className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-start space-x-4">
                    <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
                      <Calendar className="w-8 h-8 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-green-400 mb-2">Mission Timeline</h3>
                      <p className="text-lg text-white font-semibold">{competition.date}</p>
                      <p className="text-green-300">{competition.time}</p>
                      <div className="mt-3 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-300">Countdown Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-start space-x-4">
                    <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
                      <MapPin className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-cyan-400 mb-2">Launch Pad</h3>
                      <p className="text-lg text-white font-semibold">{competition.location}</p>
                      <div className="mt-3 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                        <span className="text-sm text-cyan-300">Coordinates Locked</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Participants Card */}
                <div className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-start space-x-4">
                    <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                      <Users className="w-8 h-8 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-purple-400 mb-2">Space Crew</h3>
                      <p className="text-lg text-white font-semibold">{competition.participants}</p>
                      <div className="mt-3 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <span className="text-sm text-purple-300">Recruitment Open</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prize Card */}
                <div className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-start space-x-4">
                    <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30">
                      <Trophy className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-yellow-400 mb-2">Stellar Rewards</h3>
                      <p className="text-3xl font-bold text-white">{competition.prize}</p>
                      <div className="mt-3 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-yellow-300">Victory Awaits</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mission Objectives */}
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30">
                <h2 className="text-3xl font-bold text-green-400 mb-6 flex items-center">
                  <Star className="w-8 h-8 text-green-400 mr-3" />
                  Mission Objectives
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {competition.highlights.map((highlight, index) => (
                    <div key={index} className="group flex items-center space-x-4 p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300">
                      <div className="p-3 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full border border-green-500/40">
                        <Zap className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="text-white font-medium group-hover:text-green-300 transition-colors">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Command Center Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Mission Control */}
              <div className="bg-gradient-to-br from-green-600/80 to-emerald-700/80 backdrop-blur-xl rounded-2xl p-8 text-white shadow-2xl border border-green-400/30">
                <div className="text-center space-y-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-300/30 to-emerald-300/30 rounded-full flex items-center justify-center border border-green-300/50">
                    <Rocket className="w-8 h-8 text-green-200" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Ready for Launch?</h3>
                    <p className="text-green-200">Join the {competition.participants} elite space explorers!</p>
                  </div>
                  <button className="w-full bg-gradient-to-r from-white to-green-100 text-green-700 py-4 px-6 rounded-xl font-bold hover:from-green-50 hover:to-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <span className="flex items-center justify-center space-x-2">
                      <Satellite className="w-5 h-5" />
                      <span>Initiate Launch Sequence</span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Space Station Info */}
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30">
                <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-2" />
                  Space Station Status
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-lg">
                    <span className="text-gray-300">Difficulty Level:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(competition.difficulty)}`}>
                      {competition.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-lg">
                    <span className="text-gray-300">Mission Type:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(competition.category)}`}>
                      {competition.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-lg">
                    <span className="text-gray-300">Crew Size:</span>
                    <span className="font-bold text-green-400">{competition.participants}</span>
                  </div>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Registration</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm font-medium">ACTIVE</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Launch Pad</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                      <span className="text-cyan-400 text-sm font-medium">READY</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Mission Control</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                      <span className="text-yellow-400 text-sm font-medium">STANDBY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceCompetitionPage;