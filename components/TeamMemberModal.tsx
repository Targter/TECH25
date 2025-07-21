"use client";

import React from "react";
import Image from "next/image";
import { Mail, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-lg w-full bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Header */}
          <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="rounded-full object-cover ring-4 ring-gray-600 shadow-lg"
                />
                {IconComponent && (
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-600"
                  >
                    <IconComponent className="w-4 h-4 text-slate-300" />
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 text-center overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-2">
              {member.name}
            </h2>
            
            <p className="text-slate-300 font-semibold text-lg mb-1">
              {member.position}
            </p>
            
            <p className="text-slate-400 mb-4 font-medium">
              {member.department}
            </p>
            
            {member.bio && (
              <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                {member.bio}
              </p>
            )}

            <div className="flex justify-center space-x-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-colors shadow-lg"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">Send Email</span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-800 text-slate-300 rounded-xl hover:bg-gray-700 hover:text-white transition-colors shadow-lg border border-gray-600"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">Call</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TeamMemberModal;