"use client";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/data";
import { motion } from "framer-motion";
  
export default function RegistrationIndicator() {
  const { events } = useCartStore();
  if (events.length === 0) return;
  return (
    <Link href="/register" className="fixed bottom-[10%] right-6 z-50">
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="group relative inline-block">
          {/* Button/Trigger Element */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-full shadow-lg border border-blue-400/50 cursor-pointer flex items-center gap-2">
            <Calendar className="h-6 w-6 text-white" />
          </div>

          {/* Hover Message */}
          <div className="absolute right-[80px] translate-x-1/2 top-full mt-2 hidden group-hover:block bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md whitespace-nowrap text-sm font-medium border border-blue-100 transition-all duration-200 opacity-0 group-hover:opacity-100">
            Complete your registration
            {/* Small arrow pointer */}
            <div className="absolute top-0 right-[30px] -translate-x-1/2 w-3 h-3 bg-white rotate-45 transform border-t border-l border-blue-100"></div>
          </div>
        </div>
        {events.length > 0 && (
          <motion.div
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {events.length}
          </motion.div>
        )}
      </motion.div>
    </Link>
  );
}
