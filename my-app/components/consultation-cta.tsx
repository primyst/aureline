"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const BENEFITS = [
  "Personalised assessment with a senior practitioner",
  "Honest recommendations — including when not to treat",
  "Full treatment plan with realistic expectations",
  "Transparent pricing before any commitment",
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

export default function ConsultationCTA() {
  const [sectionRef, inView] = useInView(0.15);

  return (
    <section
      ref={sectionRef}
      className="bg-stone-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px]">

          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=85&auto=format&fit=crop"
              alt="Private consultation at Aureline Clinic"
              fill
              className="object-cover object-center"
              sizes="50vw"
            />
            {/* Dark gradient blending into right panel */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-stone-900/80" />
          </motion.div>

          {/* Right — content */}
          <div className="flex flex-col justify-center px-10 lg:px-16 xl:px-20 py-20 lg:py-24">

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] tracking-[0.4em] uppercase text-stone-500 mb-6 font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Private Consultation
            </motion.p>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2rem,3.5vw,3rem)] font-light text-[#FAF8F5] leading-tight mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Begin with a conversation
              <br />
              <em className="not-italic" style={{ color: "#B8714A" }}>
                tailored to your goals.
              </em>
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[14px] leading-relaxed text-stone-400 font-light mb-10 max-w-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Every treatment begins with a private, unhurried consultation.
              No pressure. No obligation. Just honest, expert guidance
              on what will actually work for you.
            </motion.p>

            {/* Benefits list */}
            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3 mb-12"
            >
              {BENEFITS.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1 h-1 rounded-full bg-[#B8714A] flex-shrink-0" />
                  <span
                    className="text-[13px] text-stone-400 font-light leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {benefit}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link
                href="/consultation"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#B8714A] text-white text-[12px] tracking-[0.2em] uppercase font-light hover:bg-[#a6623f] transition-colors duration-300"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Book Consultation
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>

              <a
                href="https://wa.me/447700900000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 border border-stone-700 text-stone-400 text-[12px] tracking-[0.2em] uppercase font-light hover:border-stone-500 hover:text-stone-300 transition-all duration-300"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {/* WhatsApp icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Speak with Us
              </a>
            </motion.div>

            {/* Availability note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-[11px] text-stone-600 font-light mt-8 tracking-wide"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Appointments available within 3–5 business days.
            </motion.p>

          </div>
        </div>
      </div>
    </section>
  );
}
