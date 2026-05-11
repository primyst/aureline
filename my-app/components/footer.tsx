"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const TREATMENTS = [
  { label: "Botox & Anti-Wrinkle", href: "/treatments/botox" },
  { label: "Lip Enhancement", href: "/treatments/lip-enhancement" },
  { label: "Skin Rejuvenation", href: "/treatments/skin-rejuvenation" },
  { label: "PRP Therapy", href: "/treatments/prp-therapy" },
  { label: "Facial Contouring", href: "/treatments/facial-contouring" },
  { label: "Chemical Peels", href: "/treatments/chemical-peels" },
];

const CLINIC = [
  { label: "About Aureline", href: "/about" },
  { label: "Our Practitioners", href: "/about#team" },
  { label: "Results", href: "/#results" },
  { label: "Journal", href: "/journal" },
  { label: "Book Consultation", href: "/consultation" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Complaints Procedure", href: "/complaints" },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <Link href="/" className="inline-flex flex-col leading-none mb-8 group">
              <span
                className="text-2xl tracking-[0.18em] uppercase text-[#FAF8F5] font-light group-hover:text-stone-200 transition-colors duration-300"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Aureline
              </span>
              <span
                className="text-[9px] tracking-[0.35em] uppercase text-stone-500 font-light mt-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Aesthetic Clinic · London
              </span>
            </Link>

            <p
              className="text-[13px] leading-relaxed text-stone-500 font-light mb-8 max-w-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Premium aesthetic treatments in the heart of Mayfair. Natural
              results, expert care, and an experience designed around you.
            </p>

            {/* Address */}
            <div className="flex flex-col gap-2 mb-8">
              <p
                className="text-[12px] leading-relaxed text-stone-500 font-light"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                12 Mount Street, Mayfair
                <br />
                London, W1K 3NX
              </p>
              <a
                href="tel:+442071234567"
                className="text-[12px] text-stone-500 hover:text-stone-300 transition-colors duration-300 font-light"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                +44 (0) 207 123 4567
              </a>
              <a
                href="mailto:hello@aurelineclinic.co.uk"
                className="text-[12px] text-stone-500 hover:text-stone-300 transition-colors duration-300 font-light"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                hello@aurelineclinic.co.uk
              </a>
            </div>

            {/* Opening hours */}
            <div
              className="text-[11px] leading-relaxed text-stone-600 font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <p>Mon – Fri: 9:00 – 19:00</p>
              <p>Saturday: 10:00 – 17:00</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          {/* Treatments */}
          <div className="lg:col-span-3 lg:col-start-6">
            <p
              className="text-[10px] tracking-[0.3em] uppercase text-stone-600 mb-6 font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Treatments
            </p>
            <ul className="flex flex-col gap-3">
              {TREATMENTS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-stone-500 hover:text-stone-300 transition-colors duration-300 font-light"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic */}
          <div className="lg:col-span-3 lg:col-start-10">
            <p
              className="text-[10px] tracking-[0.3em] uppercase text-stone-600 mb-6 font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Clinic
            </p>
            <ul className="flex flex-col gap-3">
              {CLINIC.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-stone-500 hover:text-stone-300 transition-colors duration-300 font-light"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/447700900000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-10 text-[11px] tracking-[0.2em] uppercase text-stone-500 hover:text-stone-300 transition-colors duration-300 font-light group"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-[#B8714A]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="h-px bg-stone-800" />
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-7">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          {/* Copyright */}
          <p
            className="text-[11px] text-stone-600 font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            © {new Date().getFullYear()} Aureline Clinic Ltd. All rights reserved.
            <span className="mx-2 text-stone-700">·</span>
            Registered in England & Wales
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-6 flex-wrap">
            {LEGAL.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] text-stone-600 hover:text-stone-400 transition-colors duration-300 font-light"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

        </div>
      </div>

    </footer>
  );
}
