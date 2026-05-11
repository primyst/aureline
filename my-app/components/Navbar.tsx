"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const BRAND = {
  accent: "#0F4C5C",
  ink: "#1C1C1E",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/70 backdrop-blur-md border-black/5 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="text-sm tracking-wide font-medium"
          style={{ color: BRAND.ink }}
        >
          Aureline Clinic
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {["treatments", "results", "about"].map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className="text-black/60 hover:text-black transition"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </nav>

        <Link
          href="/consultation"
          className="hidden md:block px-4 py-2 text-sm rounded-full border"
          style={{
            borderColor: BRAND.accent,
            color: BRAND.accent,
            backgroundColor: scrolled
              ? "rgba(15,76,92,0.06)"
              : "transparent",
          }}
        >
          Book Consultation
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
          style={{ color: BRAND.ink }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}