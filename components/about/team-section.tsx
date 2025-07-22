"use client"
import React from 'react';
// update path if needed

import Image from "next/image";
import { motion } from "framer-motion";

import {
  Crown,
  Star,
  Sparkles,
  Zap,
  Shield,
  Users,
  Megaphone,
  DollarSign,
  BookOpen,
  Newspaper,
  Code,
  Palette,
  LucideIcon
} from 'lucide-react';


interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  bio: string;
  image: string;
  icon: LucideIcon; // or the correct icon type
}

interface TeamCardProps {
  member: TeamMember;
  isLead?: boolean;
  size?: "large" | "default" | "small";

}

interface Department {
  id: string;
  name: string;
  icon: LucideIcon;
  lead: TeamMember;
  team: TeamMember[];
}
const TeamMemberCard = ({ member, size = "large" }: TeamCardProps) => {
  const IconComponent = member.icon;

  const sizeClasses = {
    large: "p-6 md:p-8",
    default: "p-4 md:p-6",
    small: "p-3 md:p-4",
  };

  const imageHeights = {
    large: "h-48 sm:h-64 md:h-80 lg:h-[28rem]",
    default: "h-40 sm:h-48 md:h-64 lg:h-80",
    small: "h-32 sm:h-40 md:h-48 lg:h-56",
  };

  const cardWidths = {
    large: "w-full max-w-sm",
    default: "w-full max-w-xs",
    small: "w-full max-w-64",
  };

  return (
    <motion.div
      className={`relative group rounded-xl bg-gradient-to-br from-gray-900 to-black border border-cyan-400/50 ${cardWidths[size]} mx-auto ${sizeClasses[size]}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Simple neon glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-xl opacity-75" />
      
      <div className="relative bg-black/80 rounded-xl h-full">
        <div className="flex flex-col items-center text-center gap-4 h-full p-2">
          {/* Image container */}
          <div className="relative w-full -mx-6 md:-mx-8 px-2">
            <div className="relative w-full overflow-hidden rounded-lg border border-cyan-400/40">
              <Image
                src={member.image}
                alt={member.name}
                width={500}
                height={500}
                className={`w-full object-cover ${imageHeights[size]}`}
              />
            </div>
          </div>
          
          {/* Name section */}
          <div className="border-b border-cyan-400/30 pb-2 w-full">
            <h3 className="text-base md:text-lg lg:text-xl font-bold text-cyan-300">
              {member.name}
            </h3>
          </div>
        </div>
      </div>
      
      {/* Simple icon badge */}
      <div className="absolute -top-2 -right-2 z-20">
        <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-black border border-cyan-400/60">
          <IconComponent className="h-4 w-4 md:h-5 md:w-5 text-cyan-400" />
        </div>
      </div>
    </motion.div>
  );
};

interface DepartmentSectionProps {
  department: Department;
}
 
const  DepartmentSection = ({ department}: DepartmentSectionProps) => {
  const IconComponent = department.icon;

  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg border border-blue-400/20">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-4xl font-bold text-white drop-shadow-lg">{department.name}</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-2 shadow-lg"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h3 className="text-xl font-semibold text-blue-400 mb-4 drop-shadow">Department Head</h3>
          <TeamMemberCard
            member={department.lead}
            isLead={true}
          />
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-blue-400 mb-4 drop-shadow">Team Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {department.team.map((member, index) => (
              <TeamMemberCard
                key={index}
                member={member}
              />

            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamsPage = () => {
 

  const secretariatBoard = [
    {
      id: 1,
      name: "Sahil Wadhwa",
      position: "Secretary General",
      department: "",
      bio: "Leading the conference with vision and dedication, ensuring excellence in every aspect of the MUN experience.",
      image: "/team/sahil.jpg",
      icon: Crown,
    },
    {
      id: 2,
      name: "Yatin Berry",
      position: "Deputy Secretary General",
      department: "",
      bio: "Supporting the Secretary General in strategic planning and operational oversight.",
      image: "/team/Yatin Berry.jpg",
      icon: Star,
    },
    {
      id: 3,
      name: "Srishti Nautiyal",
      position: "Director General",
      department: "",
      bio: "Overseeing committee operations and ensuring seamless conference execution.",
      image: "/team/Srishti.jpg",
      icon: Sparkles,
    },
    {
      id: 4,
      name: "Jatin Mittal",
      position: "Deputy Director General",
      department: "",
      bio: "Coordinating between committees and ensuring seamless operational excellence.",
      image: "/team/jatin Mittal.png",
      icon: Zap,
    },
  ];

  const advisorBoard = [
    {
      id: 5,
      name: "Animesh",
      position: "Advisor to Secretariat",
      department: "",
      bio: "Providing strategic guidance and mentorship to ensure the highest standards of conference execution.",
      image: "/team/ani.jpg",
      icon: Shield,
    },
  ];

  const usgPositions = [
    {
      id: 1,
      name: "Dinky Khurrana",
      position: "USG Delegate Affairs",
      department: "",
      bio: "Managing delegate experience and ensuring smooth committee proceedings.",
      image: "/team/Dinky.jpg",
      icon: Users,
    },
    {
      id: 2,
      name: "Shreyanshi Soor",
      position: "USG Delegate Affairs",
      department: "",
      bio: "Managing delegate experience and ensuring smooth committee proceedings.",
      image: "/team/Shreyanshi.jpg",
      icon: Users,
    },
    {
      id: 3,
      name: "Tanisha Goyal",
      position: "USG Outreach and Marketing",
      department: "",
      bio: "Building partnerships and expanding conference reach through strategic marketing.",
      image: "/team/Tanisha Goyal_.jpg",
      icon: Megaphone,
    },
    {
      id: 4,
      name: "Krishnam Gupta",
      position: "USG Finance",
      department: "",
      bio: "Managing conference budget and financial operations with precision.",
      image: "/team/Krishnam Gupta.jpg",
      icon: DollarSign,
    },
    {
      id: 5,
      name: "Amit Kumar",
      position: "USG Training and Workshop",
      department: "",
      bio: "Conducting delegate training sessions and educational workshops.",
      image: "/team/Amit Kumar.jpg",
      icon: BookOpen,
    },
    {
      id: 6,
      name: "Avleenjot Kaur",
      position: "USG Public Relations and Media",
      department: "",
      bio: "Managing media relations and public communications for the conference.",
      image: "/team/Avleen.jpg",
      icon: Newspaper,
    },
    {
      id: 7,
      name: "Khushi",
      position: "USG Press and Journalism",
      department: "",
      bio: "Overseeing press coverage and journalistic documentation of proceedings.",
      image: "/team/Khushi.jpg",
      icon: Newspaper,
    },
    {
      id: 8,
      name: "Abhay Bansal",
      position: "USG IT/Tech",
      department: "",
      bio: "Managing technical infrastructure and digital systems for the conference.",
      image: "/team/Abhay Bansal.jpg",
      icon: Code,
    },
  ];

  const departments: Department[] = [
    {
      id: "creatives",
      name: "Creatives Department",
      icon: Palette,
      lead: {
        id: 1,
        name: "Aditi Anand",
        position: "USG Creatives",
        department: "",
        bio: "Leading creative vision and design excellence for the conference.",
        image: "/team/Aditi Anand .jpg",
        icon: Users,
      },
      team: [
        {
          id: 2,
          name: "Anjani",
          position: "Creative Designer",
          department: "Design Team",
          bio: "Crafting visual elements that bring the conference to life.",
          image: "/team/Anjani thakur_.jpg",
          icon: Users,
        },
        {
          id: 3,
          name: "Soham",
          position: "Visual Content Creator",
          department: "Design Team",
          bio: "Creating engaging visual content for all conference materials.",
          image: "/team/SOHAM THAKER.png",
          icon: Users,
        },
      ],
    },
    {
      id: "tech",
      name: "Technology Department",
      icon: Code,
      lead: {
        id: 4,
        name: "Gaurav Thakur",
        position: "Web Developer",
        department: "Tech Team",
        bio: "Developing and maintaining technical infrastructure for the conference.",
        image: "/team/Gaurav Thakur.jpg",
        icon: Users,
      },
      team: [
        {
          id: 5,
          name: "Abhay Bansal",
          position: "USG IT/Tech",
          department: "",
          bio: "Ensuring seamless technical operations throughout the conference.",
          image: "/team/Abhay Bansal.jpg",
          icon: Users,
        },
        {
          id: 6,
          name: "Piyush Aggarwal",
          position: "Technical Support",
          department: "Tech Team",
          bio: "Providing technical support and troubleshooting during the event.",
          image: "/team/Piyush Aggarwal_.jpg",
          icon: Users,
        },
      ],
    },
    {
      id: "outreach",
      name: "Outreach & Marketing",
      icon: Megaphone,
      lead: {
        id: 7,
        name: "Tanisha Goyal",
        position: "USG Outreach and Marketing",
        department: "",
        bio: "Building strategic partnerships and expanding conference reach.",
        image: "/team/Tanisha Goyal_.jpg",
        icon: Users,
      },
      team: [
        {
          id: 8,
          name: "Jay Thakur",
          position: "Outreach Coordinator",
          department: "Outreach Team",
          bio: "Coordinating outreach efforts and building community connections.",
          image: "/team/Jay.png",
          icon: Users,
        },
        {
          id: 9,
          name: "Prashant",
          position: "Partnership Manager",
          department: "Outreach Team",
          bio: "Managing partnerships and sponsorship relationships.",
          image: "/team/Prashant.png",
          icon: Users,
        },
      ],
    },
  ];


  return (
  <>
    <div>
      {/* Space Background Effects */}
      

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Team</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto drop-shadow">
            Dedicated individuals working together to craft an extraordinary tech fest experience — uniting innovation, creativity, and collaboration at the heart of Technicia.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-full mx-auto mt-6 shadow-lg"></div>
        </div>

        {/* Secretariat Board */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg border border-amber-400/20">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">Secretariat Board</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mt-2 shadow-lg"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {secretariatBoard.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
               
              />
            ))}
          </div>
        </section>

        {/* Advisor Board */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg border border-emerald-400/20">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">Advisory Board</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mt-2 shadow-lg"></div>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 place-items-center">
            {advisorBoard.map((member) => (
              <div key={member.id} className="w-full max-w-sm">
                <TeamMemberCard
                  member={member}
                  
                />
              </div>
            ))}
          </div>
        </section>

        {/* USG Positions */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg border border-purple-400/20">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">Under Secretary General Positions</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full mt-2 shadow-lg"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {usgPositions.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
               
              />
            ))}
          </div>
        </section>

        {/* Departments */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Departments</h2>
            <div className="w-40 h-1 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-full mx-auto shadow-lg"></div>
          </div>
          {departments.map((department) => (
            <DepartmentSection
              key={department.id}
              department={department}
            
            />
          ))}
        </section>
      </div>
    </div>

   
  </>
);


};

export default TeamsPage;
