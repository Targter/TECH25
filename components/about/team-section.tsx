"use client"
import React from 'react';
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
  icon: LucideIcon;
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
  const sizeClasses = {
    large: "p-4",
    default: "p-3",
    small: "p-2",
  };

  const imageHeights = {
    large: "h-80",
    default: "h-72",
    small: "h-64",
  };

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
            src={member.image}
            alt={member.name}
            width={400}
            height={400}
            className={`w-full object-cover ${imageHeights[size]}`}
          />
        </div>
        
        {/* Name and Position */}
        <div className="space-y-1 pb-1">
          <h3 className="text-lg font-medium text-white">
            {member.name}
          </h3>
          <p className="text-sm text-gray-400">
            {member.position}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

interface DepartmentSectionProps {
  department: Department;
}
 
const DepartmentSection = ({ department }: DepartmentSectionProps) => {
  const IconComponent = department.icon;

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
            <TeamMemberCard member={department.lead} isLead={true} />
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-300 mb-6 text-center lg:text-left">Team Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {department.team.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
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
      image: "/team/Srishti.JPG",
      icon: Sparkles,
    },
    {
      id: 4,
      name: "Jatin Mittal",
      position: "Deputy Director General",
      department: "",
      bio: "Coordinating between committees and ensuring seamless operational excellence.",
      image: "/team/Jatin Mittal.png",
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-light text-white mb-4">
            Meet Our <span className="font-medium text-gray-300">Team</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Dedicated minds crafting an extraordinary experience
          </p>
          <div className="w-24 h-px bg-gray-600 mx-auto mt-8"></div>
        </div>

        {/* Secretariat Board */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-white mb-2">Secretariat Board</h2>
            <div className="w-16 h-px bg-gray-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {secretariatBoard.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Advisor Board */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-white mb-2">Advisory Board</h2>
            <div className="w-16 h-px bg-gray-600 mx-auto"></div>
          </div>
          <div className="flex justify-center">
            {advisorBoard.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* USG Positions */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-white mb-2">Under Secretary General Positions</h2>
            <div className="w-16 h-px bg-gray-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {usgPositions.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Departments */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-2">Departments</h2>
            <div className="w-20 h-px bg-gray-600 mx-auto"></div>
          </div>
          {departments.map((department) => (
            <DepartmentSection key={department.id} department={department} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default TeamsPage;