"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  // Show after scrolling past the hero (~100vh)
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          {/* Frosted bar */}
          <div className="bg-[#FAF8F5]/95 backdrop-blur-md border-t border-stone-200/60 px-5 py-4 shadow-[0_-4px_32px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3">

              {/* Book Consultation — primary */}
              <Link
                href="/consultation"
                className="flex-1 text-center py-3.5 bg-stone-800 text-[#FAF8F5] text-[11px] tracking-[0.2em] uppercase font-light hover:bg-stone-700 transition-colors duration-300"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Book Consultation
              </Link>

              {/* WhatsApp — secondary icon button */}
              <a
                href="https://wa.me/447700900000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact us on WhatsApp"
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-stone-200 hover:border-stone-400 transition-colors duration-300"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-[#B8714A]"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

            </div>
          </div>

          {/* iOS safe area spacer */}
          <div className="bg-[#FAF8F5]/95 h-safe-area-inset-bottom" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
