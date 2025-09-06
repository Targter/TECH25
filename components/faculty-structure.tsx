"use client"

import { useState, useEffect } from "react"
import { Users, BookOpen, Crown, Star, Mail, Phone, GraduationCap, Building, Award, LucideIcon } from "lucide-react"
import Image from "next/image"

interface FacultyMember {
  id: number
  name: string
  position: string
  department: string
  bio: string
  image: string
  icon: LucideIcon
}

const facultyLeadership: FacultyMember[] = [
  {
    id: 1,
    name: "S. Satnam Singh Sandhu",
    position: "Chancellor",
    department: "Office of the Chancellor",
    bio: "Head of the university, providing honorary and ceremonial leadership to guide institutional excellence.",
    image: "/professional-chancellor-portrait.jpg",
    icon: Crown,
  },
  {
    id: 2,
    name: "Prof. (Dr.) Manpreet Singh Manna",
    position: "VC",
    department: "Office of the Vice Chancellor",
    bio: "Vice Chancellor responsible for overall university administration and academic oversight.",
    image: "/professional-vice-chancellor-portrait.jpg",
    icon: Star,
  },
  {
    id: 3,
    name: "Prof. (Dr.) Vinay Kumar Mittal",
    position: "PVC (Academic Affairs)",
    department: "Academic Affairs Office",
    bio: "Pro Vice Chancellor overseeing academic operations and educational excellence across all departments.",
    image: "/professional-academic-administrator-portrait.jpg",
    icon: GraduationCap,
  },
]

const engineeringLeadership: FacultyMember[] = [
  {
    id: 4,
    name: "Prof. (Dr.) Sachin Ahuja",
    position: "ED Engineering",
    department: "Faculty of Engineering",
    bio: "Executive Director of Engineering, leading strategic initiatives and coordinating engineering programs.",
    image: "/professional-engineering-dean-portrait.jpg",
    icon: Building,
  },
  {
    id: 5,
    name: "Prof. (Dr.) Satbir Singh Sehgal",
    position: "AD Eng",
    department: "Faculty of Engineering",
    bio: "Associate Dean of Engineering, providing strategic guidance and academic leadership.",
    image: "/professional-associate-dean-portrait.jpg",
    icon: Award,
  },
]

const departmentalFaculty: FacultyMember[] = [
  {
    id: 6,
    name: "Dr. Sandeep Singh Kang",
    position: "Deputy HOD",
    department: "Computer Science & Engineering",
    bio: "Deputy Head of Department managing departmental operations and ensuring quality education delivery.",
    image: "/professional-deputy-hod-portrait.jpg",
    icon: Users,
  },
  {
    id: 7,
    name: "Neha Dutta",
    position: "Faculty 1",
    department: "Faculty of Engineering",
    bio: "Faculty Member providing quality education and academic guidance to students.",
    image: "/professional-faculty-advisor-portrait.jpg",
    icon: BookOpen,
  },
  {
    id: 8,
    name: "Neetu Maam",
    position: "Faculty 2",
    department: "Faculty of Engineering",
    bio: "Faculty Member supporting student development through teaching and mentorship.",
    image: "/professional-faculty-advisor-portrait-female.jpg",
    icon: BookOpen,
  },
]

const FacultyStructure = () => {
  const [selectedMember, setSelectedMember] = useState<FacultyMember | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const MemberCard = ({
    member,
    index,
    size = "large",
  }: {
    member: FacultyMember
    index: number
    size?: "large" | "default" | "small"
  }) => {
    const IconComponent = member.icon

    const sizeClasses = {
      large: "p-8",
      default: "p-6",
      small: "p-4",
    }

    const imageHeights = {
      large: "h-90",
      default: "h-56",
      small: "h-48",
    }

    const iconSizes = {
      large: "w-8 h-8",
      default: "w-6 h-6",
      small: "w-5 h-5",
    }

    return (
      <div
        className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-red-100 hover:border-red-300 cursor-pointer transform hover:-translate-y-2 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
        onClick={() => setSelectedMember(member)}
      >
        {/* Card Header with Full Image */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <div className={`${imageHeights[size]} relative bg-gray-800`}>
            <Image
              src={member.image}
              alt={member.name}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = "none"
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 bg-gray-900"></div>

            {/* Icon Badge */}
            {IconComponent && (
              <div className="absolute top-4 right-4 bg-red-600 rounded-full p-3 shadow-lg">
                <IconComponent className={`${iconSizes[size]} text-white`} />
              </div>
            )}

            {/* Status Badge */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
              Active
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              <h3
                className={`font-bold text-white mb-1 ${
                  size === "large" ? "text-2xl" : size === "small" ? "text-lg" : "text-xl"
                }`}
                style={{
                  textShadow: "2px 2px 8px rgba(0,0,0,1), 0 0 4px rgba(0,0,0,0.8)",
                  color: "#ffffff",
                }}
              >
                {member.name}
              </h3>
              <p
                className={`text-white font-semibold ${size === "large" ? "text-lg" : "text-base"}`}
                style={{
                  textShadow: "1px 1px 6px rgba(0,0,0,1), 0 0 3px rgba(0,0,0,0.8)",
                  color: "#ffffff",
                }}
              >
                {member.position}
              </p>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className={sizeClasses[size]}>
          <div className="text-center">
            <div className="mb-4">
              <p className="text-gray-500 text-sm">{member.department}</p>
            </div>

            {member.bio && <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{member.bio}</p>}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-2 pt-4 border-t border-gray-100">
              <button className="flex items-center space-x-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-red-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          <div className="text-center"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* University Leadership */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px bg-red-300 flex-1 max-w-20 sm:max-w-32"></div>
              <h1 className="px-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600">University Leadership</h1>
              <div className="h-px bg-red-300 flex-1 max-w-20 sm:max-w-32"></div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The senior university leadership team providing strategic direction and institutional governance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {facultyLeadership.map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} size="large" />
            ))}
          </div>
        </section>

        {/* Engineering Leadership */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px bg-red-300 flex-1 max-w-20 sm:max-w-32"></div>
              <h2 className="px-6 text-2xl sm:text-3xl font-bold text-red-600">Engineering Leadership</h2>
              <div className="h-px bg-red-300 flex-1 max-w-20 sm:max-w-32"></div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Engineering faculty leadership providing strategic guidance and academic excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {engineeringLeadership.map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} size="large" />
            ))}
          </div>
        </section>

        {/* Faculty Members */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px bg-red-300 flex-1 max-w-20 sm:max-w-32"></div>
              <h2 className="px-6 text-2xl sm:text-3xl font-bold text-red-600">Faculty Members</h2>
              <div className="h-px bg-red-300 flex-1 max-w-20 sm:max-w-32"></div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dedicated faculty members managing departmental operations and providing quality education.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentalFaculty.map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} size="large" />
            ))}
          </div>
        </section>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl border border-red-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-200 transition-colors z-10"
            >
              ×
            </button>

            {/* Modal Header */}
            <div className="relative h-48 bg-gradient-to-br from-red-500 to-red-700 rounded-t-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                  {selectedMember.icon && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <selectedMember.icon className="w-4 h-4 text-red-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedMember.name}</h2>
                <p className="text-red-600 font-semibold text-lg mb-1">{selectedMember.position}</p>
                <p className="text-gray-500 mb-4">{selectedMember.department}</p>

                {selectedMember.bio && <p className="text-gray-600 leading-relaxed mb-6">{selectedMember.bio}</p>}

                {/* Contact Actions */}
                <div className="flex justify-center space-x-4">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>Send Email</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>Call</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FacultyStructure