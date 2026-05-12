"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Phone } from "lucide-react";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;
    const footer = document.querySelector("footer");
    
    // Show after scrolling past hero (100vh + buffer)
    setIsVisible(scrollY > heroHeight * 0.8);

    // Hide when footer is in view
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      setIsFooterVisible(footerRect.top < window.innerHeight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <AnimatePresence>
      {isVisible && !isFooterVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-stone-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
        >
          <div className="flex items-center h-16 px-4 gap-3">
            <Link
              href="/consultation"
              className="flex-1 flex items-center justify-center gap-2 h-11 bg-[#C9A96E] text-[#1E2A44] text-[12px] uppercase tracking-[0.12em] font-sans font-medium transition-all duration-300 active:scale-[0.98]"
            >
              <Calendar size={15} strokeWidth={1.5} />
              Book Consultation
            </Link>

            <a
              href="https://wa.me/447000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 border border-stone-200 text-stone-600 transition-all duration-300 active:scale-[0.98] hover:border-[#C9A96E]/50 hover:text-[#C9A96E]"
              aria-label="Contact via WhatsApp"
            >
              <Phone size={18} strokeWidth={1.5} />
            </a>
          </div>

          {/* Safe area padding for iOS */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
