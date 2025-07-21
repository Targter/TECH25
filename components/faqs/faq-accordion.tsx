"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle,MapPin } from "lucide-react";
import { faqs } from "@/lib/constants";

export function FaqAccordion() {
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-xl border border-green-500/30 rounded-full px-6 py-3 mb-6">
              <HelpCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">FAQ Center</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about TECHNICIA&apos;25. Find quick answers to common questions about registration, events, and participation.
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
              <div className="relative max-w-3xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-green-400 h-6 w-6" />
                  <Input
                    type="text"
                    placeholder="Search FAQs... (e.g., registration, accommodation, competitions, prizes)"
                    className="pl-14 pr-12 py-5 text-lg rounded-xl bg-slate-800/50 text-slate-200 border border-slate-600/50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all shadow-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors text-xl font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

        

          {/* FAQ Content */}
          <motion.div variants={itemVariants}>
  <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
    <div className="p-4 sm:p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-slate-600/30 rounded-xl bg-gradient-to-r from-slate-800/30 to-slate-900/30 hover:border-green-400/50 transition-all duration-300 overflow-hidden group"
                >
                  <AccordionTrigger className="flex justify-between items-center px-4 py-4 sm:px-6 sm:py-6 text-slate-200 font-semibold text-base sm:text-lg hover:text-green-400 transition-colors group-hover:bg-slate-800/20 [&[data-state=open]>svg]:rotate-0">
                    <div className="flex items-center gap-3 sm:gap-4 text-left pr-2">
                      <span className="leading-relaxed break-words">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-0 sm:px-6 sm:pb-6">
                    <div className="pl-0 sm:pl-8 lg:pl-14 pr-0 sm:pr-4">
                      <div className="bg-gradient-to-r from-slate-700/20 to-slate-800/20 rounded-xl p-4 sm:p-6 border-l-4 border-green-400/50">
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed break-words">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center py-12 sm:py-16 lg:py-20"
            >
              <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 sm:p-8 lg:p-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Search className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-300 mb-2 sm:mb-3">
                  No FAQs Found
                </h3>
                <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 px-2">
                  No FAQs found matching your search query. Try different keywords or browse all available questions.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-400 rounded-xl hover:from-green-500/30 hover:to-emerald-600/30 transition-all border border-green-500/30 font-semibold text-sm sm:text-base"
                >
                  Show All FAQs
                </button>
              </div>
            </motion.div>
          )}
        </Accordion>
      </motion.div>
    </div>
  </div>
</motion.div>

          {/* Location Map Section */}
          <motion.div variants={itemVariants} className="mt-20">
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-xl border border-green-500/30 rounded-full px-6 py-3 mb-6">
                    <MapPin className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-semibold">Event Location</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                    Where To Find Us
                  </h2>
                  
                  <div className="flex items-center justify-center gap-3 text-green-400 font-semibold text-lg mb-6">
                    <MapPin className="w-6 h-6" />
                    <p>Chandigarh University</p>
                  </div>
                </div>
                
                <div className="max-w-5xl mx-auto">
                  <div className="bg-gradient-to-r from-slate-700/20 to-slate-800/20 rounded-xl p-6 border border-slate-600/30">
                    <iframe
                      title="TECHNASIA'25 Location"
                      src="https://maps.google.com/maps?q=Chandigarh%20University&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="350"
                      className="rounded-lg shadow-lg border border-slate-600/30"
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
