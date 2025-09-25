"use client"
import Image from "next/image"
import { motion } from "framer-motion"

import { Crown, Star, Users, type LucideIcon, GraduationCap, Building2, UserCheck } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  position: string
  department: string
  bio: string
  image: string
  icon: LucideIcon
}

interface TeamCardProps {
  member: TeamMember
  isLead?: boolean
  size?: "large" | "default" | "small"
}

const TeamMemberCard = ({ member, size = "large" }: TeamCardProps) => {
  const sizeClasses = {
    large: "p-4",
    default: "p-3",
    small: "p-2",
  }

  const imageHeights = {
    large: "h-80",
    default: "h-72",
    small: "h-64",
  }

  return (
    <motion.div
      className={`relative group rounded-lg bg-gray-900/50 border border-gray-700/50 backdrop-blur-sm w-full max-w-sm mx-auto ${sizeClasses[size]}`}
      whileHover={{ y: -2, borderColor: "rgba(156, 163, 175, 0.5)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Image container */}
        <div className="relative w-full overflow-hidden rounded-md">
          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            width={400}
            height={400}
            className={`w-full object-cover ${imageHeights[size]}`}
          />
        </div>

        {/* Name and Position */}
        <div className="space-y-1 pb-1">
          <h3 className="text-lg font-medium text-white">{member.name}</h3>
          <p className="text-sm text-gray-400">{member.position}</p>
        </div>
      </div>
    </motion.div>
  )
}

const FacultyPage = () => {
  const universityLeadership = [
    {
      id: 1,
      name: "S. Satnam Singh Sandhu",
      position: "Chancellor",
      department: "",
      bio: "Head of the university, providing ceremonial leadership and strategic vision for institutional excellence.",
      image: "/faculty/Satnam.jpg",
      icon: Crown,
    },
    {
      id: 2,
      name: "Prof. (Dr.) Manpreet Singh Manna",
      position: "Vice Chancellor",
      department: "",
      bio: "Chief executive officer of the university, overseeing all academic and administrative operations.",
      image: "/faculty/manna.jpg",
      icon: Star,
    },
    {
      id: 3,
      name: "Prof. (Dr.) V. R. Raghuveer",
      position: "Pro Vice Chancellor (Academic Affairs)",
      department: "",
      bio: "Leading academic initiatives and ensuring excellence in educational programs and research.",
      image: "/faculty/raghu.jpg",
      icon: GraduationCap,
    },
  ]

  const engineeringLeadership = [
    {
      id: 4,
      name: "Prof. (Dr.) Sachin Ahuja",
      position: "Executive Director (Engineering)",
      department: "",
      bio: "Overseeing engineering programs and fostering innovation in technical education.",
      image: "/faculty/sachin.png",
      icon: Building2,
    }
  ]

  const facultyMembers = [
    {
      id: 6,
      name: "Dr. Sandeep Singh Kang",
      position: "Deputy Head of Department",
      department: "",
      bio: "Supporting departmental operations and academic coordination.",
      image: "/faculty/kang.jpeg",
      icon: UserCheck,
    },
    {
      id: 7,
      name: "Dr. Neha Dutta",
      position: "Faculty Co-Advisor",
      department: "",
      bio: "Dedicated to excellence in teaching and research, contributing to student success.",
      image: "/",
      icon: Users,
    },
    {
      id: 8,
      name: "Dr. Neetu Rani",
      position: "Faculty Advisor",
      department: "",
      bio: "Committed to academic excellence and student development through innovative teaching.",
      image: "/faculty/neetu.jpg",
      icon: Users,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-light text-white mb-4">
            Meet Our <span className="font-medium text-gray-300">Faculty</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Distinguished educators and leaders shaping the future of education
          </p>
          <div className="w-24 h-px bg-gray-600 mx-auto mt-8"></div>
        </div>

        {/* University Leadership */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-white mb-2">University Leadership</h2>
            <div className="w-16 h-px bg-gray-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {universityLeadership.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Engineering Leadership */}
<section className="mb-20">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-light text-white mb-2">Engineering Leadership</h2>
    <div className="w-16 h-px bg-gray-600 mx-auto"></div>
  </div>

  {/* Center the card */}
  <div className="flex justify-center">
    <div className="grid grid-cols-1 gap-8 w-full max-w-sm">
      {engineeringLeadership.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  </div>
</section>


        {/* Faculty Members */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-white mb-2">Faculty Members</h2>
            <div className="w-16 h-px bg-gray-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {facultyMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default FacultyPage
