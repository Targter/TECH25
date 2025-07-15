"use client";

import React from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  bio: string;
  image: string;
  icon: LucideIcon;
}

interface TeamMemberModalProps {
  member: TeamMember;
  onClose: () => void;
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ member, onClose }) => {
  const IconComponent = member.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl border border-red-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-200 transition-colors z-10"
        >
          ×
        </button>

        {/* Header */}
        <div className="relative h-48 bg-gradient-to-br from-red-500 to-red-700 rounded-t-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                width={96}
                height={96}
                className="rounded-full object-cover ring-4 ring-white shadow-lg"
              />
              {IconComponent && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <IconComponent className="w-4 h-4 text-red-600" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {member.name}
          </h2>
          <p className="text-red-600 font-semibold text-lg mb-1">
            {member.position}
          </p>
          <p className="text-gray-500 mb-4">{member.department}</p>
          {member.bio && (
            <p className="text-gray-600 leading-relaxed mb-6">{member.bio}</p>
          )}

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
  );
};

export default TeamMemberModal;
