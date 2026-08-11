"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Treatments", href: "/treatments" },
  { label: "Results", href: "/results" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/60 shadow-[0_1px_20px_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none group">
              <span
                className="text-xl tracking-[0.18em] uppercase text-stone-800 font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Aureline
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-stone-400 font-light mt-0.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Aesthetic Clinic · London
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-[13px] tracking-[0.12em] uppercase text-stone-500 hover:text-stone-800 transition-colors duration-300 group"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-stone-400 group-hover:w-full transition-all duration-300 ease-out" />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/consultation"
                className="text-[12px] tracking-[0.2em] uppercase px-7 py-3 bg-stone-800 text-[#FAF8F5] hover:bg-stone-700 transition-colors duration-300 font-light"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Book Consultation
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#FAF8F5] flex flex-col"
          >
            {/* Top bar replica to align close button */}
            <div className="flex items-center justify-between h-20 px-6">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex flex-col leading-none"
              >
                <span
                  className="text-xl tracking-[0.18em] uppercase text-stone-800 font-light"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Aureline
                </span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-stone-400 font-light mt-0.5"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Aesthetic Clinic · London
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-stone-700"
                aria-label="Close menu"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col px-6 pt-10 gap-1 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-5 border-b border-stone-100 text-2xl font-light text-stone-700 tracking-wide hover:text-stone-900 transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="px-6 pb-12 pt-8 flex flex-col gap-3">
              <Link
                href="/consultation"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center text-[12px] tracking-[0.2em] uppercase px-7 py-4 bg-stone-800 text-[#FAF8F5] font-light"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Book Consultation
              </Link>
              <a
                href="https://wa.me/447700900000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center text-[12px] tracking-[0.2em] uppercase px-7 py-4 border border-stone-300 text-stone-700 font-light"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
