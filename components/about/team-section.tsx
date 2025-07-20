"use client"
import React, { useState } from 'react';
import TeamMemberModal from "@/components/TeamMemberModal"; // update path if needed

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
  onProfileClick?: (member: TeamMember) => void; // new
}

interface Department {
  id: string;
  name: string;
  icon: LucideIcon;
  lead: TeamMember;
  team: TeamMember[];
}
const TeamMemberCard = ({ member, size = "large", onProfileClick }: TeamCardProps) => {
  const IconComponent = member.icon;

  const sizeClasses = {
    large: "p-8",
    default: "p-6",
    small: "p-4",
  };

  const imageHeights = {
    large: "h-[28rem]",
    default: "h-80",
    small: "h-56",
  };

  return (
    <motion.div
      className={`relative group rounded-2xl border-2 border-border/50 bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-xl transition-all duration-300 shadow-lg hover:shadow-xl ${sizeClasses[size]}`}
      whileHover={{ 
        y: -6, 
        boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.15)",
        scale: 1.02
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{
        boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Outer glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      {/* Inner glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
      
      {/* Content boundary */}
      <div className="relative z-10 h-full border border-white/10 rounded-xl">
        <div className="flex flex-col items-center text-center gap-4 h-full p-2">
          {/* Image container with boundary */}
          <div className="relative -mx-8 px-2">
            <div className="relative w-full overflow-hidden rounded-xl border border-border/30 shadow-md">
              <div className="relative w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={500}
                  height={500}
                  className={`w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 ${imageHeights[size]}`}
                />
                {/* Image overlay glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
          
          {/* Name section */}
          <div className="border-b border-border/20 pb-2 w-full">
            <h3 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">{member.name}</h3>
          </div>
          
          {/* Button section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mt-auto"
          >
            <Button
              onClick={() => onProfileClick?.(member)}
              size="sm"
              className="z-10 shadow-md border border-border/30 bg-gradient-to-r from-background to-muted/50 hover:from-muted/70 hover:to-muted/40 transition-all duration-200"
            >
              View Profile
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Icon badge with enhanced styling */}
      <div className="absolute -top-2 -right-2 z-20">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border/60 bg-muted/70 backdrop-blur-md shadow-lg group-hover:shadow-xl transition-all duration-300">
          <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300" />
        </div>
      </div>
    </motion.div>
  );
};

interface DepartmentSectionProps {
  department: Department;
  onProfileClick: (member: TeamMember) => void;
}
const DepartmentSection = ({ department, onProfileClick }: DepartmentSectionProps) => {
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
            onProfileClick={onProfileClick}
          />
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-blue-400 mb-4 drop-shadow">Team Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {department.team.map((member, index) => (
              <TeamMemberCard
                key={index}
                member={member}
                onProfileClick={onProfileClick}
              />

            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamsPage = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

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
          name: "Piyush",
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative">
      {/* Space Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-indigo-300 rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-32 left-16 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
        <div className="absolute bottom-40 right-12 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-40 left-1/2 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-60 right-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-pulse delay-900"></div>
        <div className="absolute top-80 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-1100"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Team</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto drop-shadow">
            Dedicated individuals working together to create an exceptional MUN conference experience in the cosmos of diplomacy
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
                onProfileClick={setSelectedMember}
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
                  onProfileClick={setSelectedMember}
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
                onProfileClick={setSelectedMember}
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
              onProfileClick={setSelectedMember}
            />
          ))}
        </section>
      </div>
    </div>

    {selectedMember && (
      <TeamMemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    )}
  </>
);


};

export default TeamsPage;