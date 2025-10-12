"use client"
import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";

import {
  Crown,
  Star,
  Sparkles,
  Users,
  Megaphone,
  Camera,
   Calendar,
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

 

  return (
   <motion.div
  className={`relative group rounded-lg bg-gray-900/50 border border-gray-700/50 backdrop-blur-sm w-full max-w-sm mx-auto ${sizeClasses[size]}`}
  whileHover={{ y: -2, borderColor: "rgba(156, 163, 175, 0.5)" }}
  transition={{ duration: 0.2 }}
>
  <div className="flex flex-col items-center text-center space-y-4">
    {/* Image container */}
    <div className="relative w-full overflow-hidden rounded-md p-2">
      <Image
        src={member.image}
        alt={member.name}
        width={450}
        height={450}
        className={`w-full h-[360px] sm:h-[380px] md:h-[400px] lg:h-[420px] object-cover`}
      />
    </div>
    
    {/* Name and Position */}
    <div className="space-y-1 pb-1">
      <h3 className="text-lg font-medium text-white">{member.name}</h3>
      <p className="text-sm text-gray-400">{member.position}</p>
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
    position: "President",
    department: "",
    bio: "Leading the team with vision, coordination, and commitment to excellence.",
    image: "/team2/Sahil_Wadhwa.jpg",
    icon: Crown,
  },
  {
    id: 2,
    name: "Yatin Berry",
    position: "Vice President",
    department: "",
    bio: "Supporting leadership initiatives and ensuring smooth execution across departments.",
    image: "/team2/Yatin_Berry.jpg",
    icon: Star,
  },
  {
    id: 3,
    name: "Srishti Nautiyal",
    position: "General Secretary",
    department: "",
    bio: "Managing internal communication and ensuring efficient organization flow.",
    image: "/team/Srishti.JPG",
    icon: Sparkles,
  },
];
 const jointsecretariatBoard = [
  {
    id: 1,
    name: "Jatin Mittal",
    position: "Joint Secertry",
    department: "",
    bio: "Leading the team with vision, coordination, and commitment to excellence.",
    image: "/team/Jatin Mittal.png",
    icon: Crown,
  },
  {
    id: 2,
    name: "Amit Kumar",
    position: "Joint Secertry",
    department: "",
    bio: "Supporting leadership initiatives and ensuring smooth execution across departments.",
    image: "/team2/Amit_Kumar.jpg",
    icon: Star,
  },
  {
    id: 3,
    name: "Dinky Khurrana",
    position: "Joint Secretery",
    department: "",
    bio: "Managing internal communication and ensuring efficient organization flow.",
    image: "/team/Dinky.jpg",
    icon: Sparkles,
  },
  {
    id: 4,
    name: "Krishnam Gupta",
    position: "Joint Secretery",
    department: "",
    bio: "Managing internal communication and ensuring efficient organization flow.",
    image: "/team/Krishnam Gupta.jpg",
    icon: Sparkles,
  },
];

 

  const usgPositions = [
  {
    id: 1,
    name: "Tanisha Goyal",
    position: "USG Sponsorships and Outreach",
    department: "",
    bio: "Building sponsorship relations and managing outreach and marketing operations.",
    image: "/team/Tanisha Goyal_.jpg",
    icon: Megaphone,
  },
  {
    id: 2,
    name: "Gaurav Thakur",
    position: "USG Technical",
    department: "",
    bio: "Overseeing technical operations, web systems, and digital infrastructure.",
    image: "/team2/gt.jpg",
    icon: Code,
  },
  {
    id: 3,
    name: "Shreyanshi Soor",
    position: "USG Delegate Affairs",
    department: "",
    bio: "Coordinating delegate management and ensuring smooth communication channels.",
    image: "/team2/Shreyanshi_Soor.jpg",
    icon: Users,
  },
  {
    id: 4,
    name: "Sneha Yadav",
    position: "USG Events",
    department: "",
    bio: "Leading event coordination and ensuring successful execution of programs.",
    image: "/team2/Sneha_Yadav.jpg",
    icon: Calendar,
  },
  {
    id: 5,
    name: "Aditi Anand",
    position: "USG Creatives",
    department: "",
    bio: "Heading creative direction and managing the visual identity of the team.",
    image: "/team/Aditi Anand .jpg",
    icon: Palette,
  },
];

 const departments = [
  {
    id: "media",
    name: "Media Department",
    icon: Camera,
    lead: {
      id: 1,
      name: "Hussain Areeb",
      position: "Head of Media",
      department: "",
      bio: "Overseeing all photography, videography, and editing operations.",
      image: "/team2/Hussain Areeb.jpg",
      icon: Users,
    },
    team: [
      {
        id: 2,
        name: "Vikram Garg",
        position: "Camera Person",
        department: "Media Team",
        bio: "Capturing key moments and documenting the spirit of the event.",
        image: "/team/Vikram Garg.jpg",
        icon: Newspaper,
      },
      {
        id: 3,
        name: "Zayed",
        position: "Editor",
        department: "Media Team",
        bio: "Editing and producing media content for post-event coverage.",
        image: "/team/Zayed.jpg",
        icon: Newspaper,
      },
      {
        id: 4,
        name: "Charoo Negi",
        position: "Reel Editor",
        department: "Media Team",
        bio: "Editing and producing media content for post-event coverage.",
        image: "/team2/Charoo.jpg",
        icon: Newspaper,
      },
    ],
  },
  {
    id: "creatives",
    name: "Creatives Department",
    icon: Palette,
    lead: {
      id: 4,
      name: "Aditi Anand",
      position: "Head of Creatives",
      department: "",
      bio: "Leading design and creative strategy for visual communication.",
      image: "/team/Aditi Anand .jpg",
      icon: Users,
    },
    team: [
      {
        id: 5,
        name: "Anjani Thakur",
        position: "Creative Designer",
        department: "Creatives",
        bio: "Designing key visuals and brand elements for the event.",
        image: "/team2/Anjani_Thakur.jpg",
        icon: Users,
      },
      {
        id: 6,
        name: "Ridhima Sharma",
        position: "Creative Designer",
        department: "Creatives",
        bio: "Contributing to the design and creative output of the team.",
        image: "/team/Ridhima Sharma.jpg",
        icon: Users,
      },
      {
        id: 7,
        name: "Dibyasree Dash",
        position: "Creative Designer",
        department: "Creatives",
        bio: "Crafting digital and print designs for various campaign materials.",
        image: "/team2/Dibyasree Dash.jpg",
        icon: Users,
      },
    ],
  },
  {
    id: "technical",
    name: "Technical Department",
    icon: Code,
    lead: {
      id: 8,
      name: "Gaurav Thakur",
      position: "Head of Technical Department",
      department: "",
      bio: "Managing all technical and web development aspects of the event.",
      image: "/team2/gt.jpg",
      icon: Users,
    },
    team: [
      {
        id: 9,
        name: "Shreyanshi Soor",
        position: "Technical Team Lead",
        department: "Technical",
        bio: "Assisting with website and software coordination tasks.",
        image: "/team2/Shreyanshi_Soor.jpg",
        icon: Users,
      },
      {
        id: 10,
        name: "Abhay Bansal",
        position: "Technical Support",
        department: "Technical",
        bio: "Providing tech assistance and ensuring smooth system performance.",
        image: "/team2/abhay.jpg",
        icon: Users,
      },
    ],
  },
  {
    id: "outreach",
    name: "Outreach & Marketing",
    icon: Megaphone,
    lead: {
      id: 11,
      name: "Tanisha Goyal",
      position: "Head of Outreach & Marketing",
      department: "",
      bio: "Expanding reach through partnerships and marketing strategies.",
      image: "/team/Tanisha Goyal_.jpg",
      icon: Users,
    },
    team: [
      { id: 12, name: "Harshvardhan Srivastava", position: "Outreach Member", department: "Outreach", bio: "", image: "/team2/Harshvardhan_srivastava.jpg", icon: Users },
      { id: 13, name: "Arnav Singh", position: "Outreach Member", department: "Outreach", bio: "", image: "/team2/Arnav_Singh.jpg", icon: Users },
      { id: 14, name: "Nitika", position: "Outreach Member", department: "Outreach", bio: "", image: "/team2/Nitika Singh Langeh.jpg", icon: Users },
      { id: 15, name: "Shatarupa", position: "Outreach Member", department: "Outreach", bio: "", image: "/team/Shatarupa.jpg", icon: Users },
      { id: 16, name: "Yuvraj Singh", position: "Outreach Member", department: "Outreach", bio: "", image: "/team/Yuvraj.jpg", icon: Users },
    ],
  },
  {
    id: "events",
    name: "Events Department",
    icon: Newspaper,
    lead: {
      id: 16,
      name: "Sneha Yadav",
      position: "Head of Events",
      department: "",
      bio: "Coordinating all events and ensuring their successful management.",
      image: "/team/Sneha Yadav.jpg",
      icon: Users,
    },
    team: [
      { id: 17, name: "ShreeDharshan B", position: "Event Coordinator", department: "Events", bio: "", image: "/team2/ShreeDharshan_B.jpg", icon: Users },
      { id: 18, name: "V Rithish Pranav", position: "Event Coordinator", department: "Events", bio: "", image: "/team2/V_Rithish_Pranav.jpg", icon: Users },
      { id: 19, name: "Claudio Ronald E", position: "Event Coordinator", department: "Events", bio: "", image: "/team2/Claudio_Ronald_E.jpg", icon: Users },
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
    <h2 className="text-3xl font-light text-white mb-2">Office Bearers</h2>
    <div className="w-16 h-px bg-gray-600 mx-auto"></div>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto justify-items-center">
    {secretariatBoard.map((member) => (
      <TeamMemberCard key={member.id} member={member} />
    ))}
  </div>
</section>

{/* Joint Secretary Board */}
<section className="mb-20">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-light text-white mb-2">Joint Secretery Board</h2>
    <div className="w-16 h-px bg-gray-600 mx-auto"></div>
  </div>
  
  {/* Top row: first 3 members */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto justify-items-center mb-8">
    {jointsecretariatBoard.slice(0, 3).map((member) => (
      <TeamMemberCard key={member.id} member={member} />
    ))}
  </div>

  {/* Bottom row: 4th member centered */}
  <div className="flex justify-center">
    <div className="w-full max-w-sm">
      <TeamMemberCard member={jointsecretariatBoard[3]} />
    </div>
  </div>
</section>


        {/* Advisor Board */}
      

        {/* USG Positions */}
       <section className="mb-20">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-light text-white mb-2">Under Secretary General Board</h2>
    <div className="w-16 h-px bg-gray-600 mx-auto"></div>
  </div>

  {/* Top row: first 3 USGs */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto justify-items-center mb-8">
    {usgPositions.slice(0, 3).map((member) => (
      <TeamMemberCard key={member.id} member={member} />
    ))}
  </div>

  {/* Bottom row: last 2 USGs */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto justify-items-center">
    {usgPositions.slice(3).map((member) => (
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
          {departments.map((department) => {
            // Special layout for departments with 3, 4, or 5 team members
            if (department.id === "outreach" && department.team.length === 5) {
              const IconComponent = department.icon;
              return (
                <div key={department.id} className="mb-20">
                  <div className="flex items-center justify-center gap-3 mb-12">
                    <div className="p-2 bg-gray-800 rounded-lg border border-gray-700">
                      <IconComponent className="w-6 h-6 text-gray-300" />
                    </div>
                    <h2 className="text-3xl font-light text-white">{department.name}</h2>
                  </div>

                  {/* Full width layout for 5 members - similar to USG Board */}
                  <div className="max-w-6xl mx-auto">
                    <div className="mb-12 flex justify-center">
                      <div className="w-full max-w-sm">
                        <h3 className="text-lg font-medium text-gray-300 mb-6 text-center">Department Head</h3>
                        <TeamMemberCard member={department.lead} isLead={true} />
                      </div>
                    </div>

                    <h3 className="text-lg font-medium text-gray-300 mb-6 text-center">Team Members</h3>
                    
                    {/* Top row: first 3 members */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-8">
                      {department.team.slice(0, 3).map((member, index) => (
                        <TeamMemberCard key={index} member={member} />
                      ))}
                    </div>

                    {/* Bottom row: last 2 members centered */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto justify-items-center">
                      {department.team.slice(3).map((member, index) => (
                        <TeamMemberCard key={index} member={member} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            
            // Default layout for other departments
            return <DepartmentSection key={department.id} department={department} />;
          })}
        </section>
      </div>
    </div>
  );
};

export default TeamsPage;