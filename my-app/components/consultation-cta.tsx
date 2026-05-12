"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export default function ConsultationCTA() {
  return (
    <section className="relative bg-[#1E2A44] min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_#C9A96E_1px,_transparent_1px)] bg-[length:40px_40px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#C9A96E]/60 font-sans mb-8">
            <span className="w-8 h-px bg-[#C9A96E]/40" />
            Begin Your Journey
            <span className="w-8 h-px bg-[#C9A96E]/40" />
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
            Begin with a private{" "}
            <span className="italic text-[#C9A96E]/80">consultation</span>{" "}
            tailored to your goals
          </h2>

          <p className="text-white/50 font-sans font-light text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            Mayfair, London. Discretion assured.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/consultation"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-[#C9A96E] text-[#1E2A44] text-[14px] uppercase tracking-[0.15em] font-sans font-medium transition-all duration-300 hover:bg-[#B8985E] hover:shadow-[0_0_40px_rgba(201,169,110,0.25)]"
            >
              <Calendar size={18} strokeWidth={1.5} />
              Book Consultation
            </Link>
          </motion.div>

          <p className="mt-8 text-white/30 text-sm font-sans">
            Or{" "}
            <a
              href="https://wa.me/447000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A96E]/60 hover:text-[#C9A96E] transition-colors duration-300 underline underline-offset-4"
            >
              speak with our team on WhatsApp
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
