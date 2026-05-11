"use client";

import Link from "next/link"; import { useEffect, useState } from "react"; import { Menu, X } from "lucide-react";

const BRAND = { accent: "#0F4C5C", // deep medical teal ink: "#1C1C1E", };

export default function Navbar() { const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);

useEffect(() => { const onScroll = () => { setScrolled(window.scrollY > 10); };

onScroll();
window.addEventListener("scroll", onScroll);
return () => window.removeEventListener("scroll", onScroll);

}, []);

return ( <header className={fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${ scrolled ? "bg-white/70 backdrop-blur-md border-black/5 shadow-sm" : "bg-transparent border-transparent" }} > <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"> {/* Brand */} <Link href="/" className="text-sm tracking-wide font-medium transition-colors duration-300" style={{ color: scrolled ? BRAND.ink : "rgba(28,28,30,0.85)" }} > Aureline Clinic </Link>

{/* Desktop Nav */}
    <nav className="hidden md:flex items-center gap-8 text-sm">
      <Link
        href="/treatments"
        className="transition-colors duration-200 hover:opacity-100"
        style={{ color: "rgba(28,28,30,0.65)" }}
      >
        Treatments
      </Link>
      <Link
        href="/results"
        className="transition-colors duration-200 hover:opacity-100"
        style={{ color: "rgba(28,28,30,0.65)" }}
      >
        Results
      </Link>
      <Link
        href="/about"
        className="transition-colors duration-200 hover:opacity-100"
        style={{ color: "rgba(28,28,30,0.65)" }}
      >
        About
      </Link>
    </nav>

    {/* CTA */}
    <div className="hidden md:block">
      <Link
        href="/consultation"
        className="px-4 py-2 text-sm rounded-full border transition-all duration-300 hover:opacity-90"
        style={{
          borderColor: BRAND.accent,
          color: scrolled ? BRAND.accent : BRAND.ink,
          backgroundColor: scrolled ? "rgba(15,76,92,0.06)" : "transparent",
        }}
      >
        Book Consultation
      </Link>
    </div>

    {/* Mobile Toggle */}
    <button
      onClick={() => setOpen(!open)}
      className="md:hidden p-2 transition-transform duration-200"
      aria-label="Toggle Menu"
      style={{ color: BRAND.ink }}
    >
      {open ? <X size={20} /> : <Menu size={20} />}
    </button>
  </div>

  {/* Mobile Menu */}
  <div
    className={`md:hidden overflow-hidden transition-all duration-300 border-t border-black/5 bg-white/90 backdrop-blur-md ${
      open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
    }`}
  >
    <nav className="flex flex-col px-5 py-4 gap-4 text-sm">
      <Link href="/treatments" onClick={() => setOpen(false)}>
        Treatments
      </Link>
      <Link href="/results" onClick={() => setOpen(false)}>
        Results
      </Link>
      <Link href="/about" onClick={() => setOpen(false)}>
        About
      </Link>

      <Link
        href="/consultation"
        onClick={() => setOpen(false)}
        className="mt-2 inline-block rounded-full px-4 py-2 text-center transition-all duration-300"
        style={{
          backgroundColor: BRAND.accent,
          color: "#fff",
        }}
      >
        Book Consultation
      </Link>
    </nav>
  </div>
</header>

); }