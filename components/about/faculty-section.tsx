"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect } from "react"

import { Crown, Star, Sparkles, GraduationCap, BookOpen, Users, Award, Building, type LucideIcon } from "lucide-react"

interface FacultyMember {
  id: number
  name: string
  position: string
  department: string
  bio: string
  image: string
  icon: LucideIcon
}

interface FacultyCardProps {
  member: FacultyMember
  isLead?: boolean
  size?: "large" | "default" | "small"
}

interface Department {
  id: string
  name: string
  icon: LucideIcon
  lead: FacultyMember
  team: FacultyMember[]
}

const FacultyMemberCard = ({ member, size = "large" }: FacultyCardProps) => {
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

interface DepartmentSectionProps {
  department: Department
}

const DepartmentSection = ({ department }: DepartmentSectionProps) => {
  const IconComponent = department.icon

  return (
    <div className="mb-20">
      <div className="flex items-center justify-center gap-3 mb-12">
        <div className="p-2 bg-gray-800 rounded-lg border border-gray-700">
          <IconComponent className="w-6 h-6 text-gray-300" />
        </div>
        <h2 className="text-3xl font-light text-white">{department.name}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        <div className="lg:col-span-1 flex justify-center">
          <div className="w-full max-w-sm">
            <h3 className="text-lg font-medium text-gray-300 mb-6 text-center">Department Head</h3>
            <FacultyMemberCard member={department.lead} isLead={true} />
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-300 mb-6 text-center lg:text-left">Faculty Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {department.team.map((member, index) => (
              <FacultyMemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const FacultySection = () => {
  const universityLeadership = [
    {
      id: 1,
      name: "S. Satnam Singh Sandhu",
      position: "Chancellor",
      department: "",
      bio: "Leading the university with vision and dedication, serving as the ceremonial head and guiding institutional excellence.",
      image: "/faculty/Satnam.jpg",
      icon: Crown,
    },
    {
      id: 2,
      name: "Prof. (Dr.) Manpreet Singh Manna",
      position: "Vice Chancellor",
      department: "",
      bio: "Overseeing academic and administrative operations, ensuring the highest standards of education and research.",
      image: "/faculty/manna.jpg",
      icon: Star,
    },
    {
      id: 3,
      name: "Prof. (Dr.) V. R. Raghuveer",
      position: "Pro Vice Chancellor (Academic Affairs)",
      department: "",
      bio: "Managing academic policies and programs, fostering excellence in teaching and learning across all disciplines.",
      image: "/faculty/raghu.jpg",
      icon: Sparkles,
    },
  ]

  const engineeringLeadership = [
    {
      id: 4,
      name: "Prof. (Dr.) Sachin Ahuja",
      position: "Executive Director (Engineering)",
      department: "",
      bio: "Leading engineering education and research initiatives, driving innovation and technological advancement.",
      image: "/faculty/sachin.png",
      icon: Building,
    },
  ]

  const departments: Department[] = [
    {
      id: "faculty",
      name: "Faculty Members",
      icon: Users,
      lead: {
        id: 6,
        name: "Dr. Sandeep Singh Kang",
        position: "Deputy Head of Department",
        department: "",
        bio: "Coordinating departmental activities and supporting faculty development initiatives.",
        image: "/faculty/kang.jpeg",
        icon: GraduationCap,
      },
      team: [
        {
          id: 7,
          name: "Neetu Maam",
          position: "Faculty Advisor",
          department: "Academic Department",
          bio: "Committed to innovative teaching methods and student mentorship, fostering academic excellence.",
          image: "/faculty/neetu.jpg",
          icon: BookOpen,
        },
        {
          id: 8,
          name: "Neha Dutta",
          position: "Co - Faculty Advisor",
          department: "Academic Department",
          bio: "Dedicated to excellence in teaching and research, contributing to student success and academic growth.",
          image: "/faculty/neha.png",
          icon: BookOpen,
        }
      ],
    },
  ]

  useEffect(() => {
    document.body.style.backgroundColor = "#000000"
    document.documentElement.style.backgroundColor = "#000000"

    return () => {
      document.body.style.backgroundColor = ""
      document.documentElement.style.backgroundColor = ""
    }
  }, [])

  return (
    <div className="min-h-screen bg-black" style={{ backgroundColor: "#000000", minHeight: "100vh" }}>
      <div
        className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900"
        style={{ backgroundColor: "#000000", minHeight: "100vh" }}
      >
        <div className="container mx-auto px-6 py-16 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-5xl font-light mb-4" style={{ color: "#ffffff" }}>
              Meet Our{" "}
              <span className="font-medium" style={{ color: "#e5e7eb" }}>
                Faculty
              </span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#d1d5db" }}>
              Distinguished educators and leaders shaping the future of education
            </p>
            <div className="w-24 h-px bg-gray-600 mx-auto mt-8"></div>
          </div>

          {/* University Leadership */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light mb-2" style={{ color: "#ffffff" }}>
                University Leadership
              </h2>
              <div className="w-16 h-px bg-gray-600 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {universityLeadership.map((member) => (
                <FacultyMemberCard key={member.id} member={member} />
              ))}
            </div>
          </section>

          {/* Engineering Leadership */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light mb-2" style={{ color: "#ffffff" }}>
                Engineering Leadership
              </h2>
              <div className="w-16 h-px bg-gray-600 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {engineeringLeadership.map((member) => (
                <FacultyMemberCard key={member.id} member={member} />
              ))}
            </div>
          </section>

          {/* Faculty Department */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light mb-2" style={{ color: "#ffffff" }}>
                Academic Faculty
              </h2>
              <div className="w-20 h-px bg-gray-600 mx-auto"></div>
            </div>
            {departments.map((department) => (
              <DepartmentSection key={department.id} department={department} />
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}

export default FacultySection
