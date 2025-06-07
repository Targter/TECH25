import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users, Trophy, Star, Zap, Award, ArrowLeft, ExternalLink } from 'lucide-react';

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

// This would typically come from your database/API or be passed as props
const getCompetitionData = (id: string): Competition | null => {
  const competitions: { [key: string]: Competition } = {
    "1": {
      id: 1,
      title: "CU MUN",
      description: "Showcase your artificial intelligence prowess in this cutting-edge competition where innovation meets technology.",
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
      description: "The ultimate coding showdown where algorithms dance and logic reigns supreme. Test your programming skills against the best.",
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
      description: "Enter the arena where metal meets mayhem! Design, build, and battle your way to robotic supremacy in this thrilling competition.",
      date: "March 17, 2025",
      time: "11:00 AM - 07:00 PM",
      location: "Engineering Workshop Arena",
      participants: "80+ Robots",
      prize: "₹75,000",
      difficulty: "Expert",
      category: "Robotics",
      highlights: ["Combat Robotics", "Mechanical Design", "Strategic Warfare", "Live Battle Arena"],
      image: "/competition/5.png"
    },
    "4": {
      id: 4,
      title: "Web Dev Wizardry",
      description: "Craft digital masterpieces and weave web magic in this comprehensive full-stack development competition.",
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
      title: "Web Dev Wizardry",
      description: "Craft digital masterpieces and weave web magic in this comprehensive full-stack development competition.",
      date: "March 18, 2025",
      time: "09:30 AM - 05:30 PM",
      location: "Digital Innovation Center",
      participants: "120+ Developers",
      prize: "₹40,000",
      difficulty: "Intermediate",
      category: "Web Development",
      highlights: ["Frontend Frameworks", "Backend Architecture", "Database Design", "UI/UX Excellence"],
      image: "/competition/6.png"
    },
    "6": {
      id: 6,
      title: "Web Dev Wizardry",
      description: "Craft digital masterpieces and weave web magic in this comprehensive full-stack development competition.",
      date: "March 18, 2025",
      time: "09:30 AM - 05:30 PM",
      location: "Digital Innovation Center",
      participants: "120+ Developers",
      prize: "₹40,000",
      difficulty: "Intermediate",
      category: "Web Development",
      highlights: ["Frontend Frameworks", "Backend Architecture", "Database Design", "UI/UX Excellence"],
      image: "/competition/7.png"
    }
  };

  return competitions[id] || null;
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function CompetitionPage({ params }: PageProps) {
  const competition = getCompetitionData(params.id);

  if (!competition) {
    notFound();
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technology':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'business':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'design':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      {/* Navigation */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
  <button 
    onClick={() => {
      window.location.href = "/#timeline";
      // Add smooth scroll after navigation
      setTimeout(() => {
        document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }}
    className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none cursor-pointer"
  >
    <ArrowLeft className="w-5 h-5" />
    <span className="font-medium">Back to Timeline</span>
  </button>
</div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-md ${getCategoryColor(competition.category)}`}>
                  {competition.category}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-md ${getDifficultyColor(competition.difficulty)}`}>
                  {competition.difficulty}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {competition.title}
              </h1>
              
              <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
                {competition.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <span className="flex items-center space-x-2">
                    <span>Register Now</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-md">
                  Download Brochure
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-30 transform rotate-6"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                <Image
                  src={competition.image}
                  alt={competition.title}
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competition Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Date & Time</h3>
                    <p className="text-gray-600">{competition.date}</p>
                    <p className="text-sm text-gray-500">{competition.time}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">{competition.location}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Participants</h3>
                    <p className="text-gray-600">{competition.participants}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Prize Pool</h3>
                    <p className="text-2xl font-bold text-yellow-600">{competition.prize}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Star className="w-6 h-6 text-blue-600 mr-3" />
                Competition Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {competition.highlights.map((highlight: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-800 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
              <div className="text-center space-y-4">
                <Award className="w-12 h-12 mx-auto text-blue-200" />
                <h3 className="text-xl font-bold">Ready to Compete?</h3>
                <p className="text-blue-100">Join {competition.participants} in this exciting challenge!</p>
                <button className="w-full bg-white text-blue-600 py-3 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
                  Register Now
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(competition.difficulty)}`}>
                    {competition.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(competition.category)}`}>
                    {competition.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Teams:</span>
                  <span className="font-medium text-gray-900">{competition.participants}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}