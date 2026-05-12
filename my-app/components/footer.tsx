import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1E2A44] py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-4">
              <span className="font-serif text-2xl text-white">
                Aureline Clinic
              </span>
            </Link>
            <p className="text-white/40 font-sans font-light text-sm leading-relaxed max-w-sm">
              Premium aesthetic treatments in the heart of London. Natural
              results, expert care, discretion assured.
            </p>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-white/30 font-sans mb-6">
              Contact
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+442000000000"
                className="flex items-center gap-3 text-white/60 hover:text-[#C9A96E] transition-colors duration-300 text-sm font-sans"
              >
                <Phone size={14} strokeWidth={1.5} />
                +44 20 0000 0000
              </a>
              <a
                href="mailto:hello@aureline.clinic"
                className="flex items-center gap-3 text-white/60 hover:text-[#C9A96E] transition-colors duration-300 text-sm font-sans"
              >
                <Mail size={14} strokeWidth={1.5} />
                hello@aureline.clinic
              </a>
              <div className="flex items-start gap-3 text-white/60 text-sm font-sans">
                <MapPin size={14} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
                <span>
                  12a Mount Street
                  <br />
                  Mayfair, London W1K 2RB
                </span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-white/30 font-sans mb-6">
              Hours
            </h4>
            <div className="space-y-2 text-sm font-sans text-white/60">
              <p>Mon–Fri: 9am–7pm</p>
              <p>Saturday: 10am–4pm</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs font-sans">
            © 2026 Aureline Clinic. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-white/30 hover:text-white/60 text-xs font-sans transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/30 hover:text-white/60 text-xs font-sans transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
