"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CASES = [
  {
    treatment: "Lip Enhancement",
    description: "Subtle volume and improved definition achieved over a single session.",
    weeks: "6 weeks post-treatment",
    before: "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=800&q=80&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&q=80&auto=format&fit=crop",
  },
  {
    treatment: "Skin Rejuvenation",
    description: "Visibly improved texture and luminosity through a tailored peel protocol.",
    weeks: "8 weeks post-treatment",
    before: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80&auto=format&fit=crop",
  },
  {
    treatment: "Facial Contouring",
    description: "Refined jawline and cheekbone definition using precise filler placement.",
    weeks: "12 weeks post-treatment",
    before: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&q=80&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80&auto=format&fit=crop",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function DragSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const getPosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging.current) return;
    getPosition(e.clientX);
  }, [getPosition]);
  const onMouseUp = () => { dragging.current = false; };
  const onTouchMove = useCallback((e: TouchEvent) => {
    getPosition(e.touches[0].clientX);
  }, [getPosition]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden cursor-col-resize select-none"
      onMouseDown={onMouseDown}
      onTouchMove={(e) => onTouchMove(e.nativeEvent)}
    >
      {/* After image — full width base */}
      <div className="absolute inset-0">
        <Image
          src={after}
          alt={afterAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
          draggable={false}
        />
        <div className="absolute bottom-4 right-4">
          <span
            className="text-[10px] tracking-[0.25em] uppercase bg-[#FAF8F5]/90 backdrop-blur-sm text-stone-600 px-3 py-1.5 font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            After
          </span>
        </div>
      </div>

      {/* Before image — clipped by position */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div
          className="absolute inset-0"
          style={{ width: containerRef.current?.offsetWidth ?? 600 }}
        >
          <Image
            src={before}
            alt={beforeAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
            draggable={false}
          />
        </div>
        <div className="absolute bottom-4 left-4">
          <span
            className="text-[10px] tracking-[0.25em] uppercase bg-[#FAF8F5]/90 backdrop-blur-sm text-stone-600 px-3 py-1.5 font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Before
          </span>
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.6)] pointer-events-none"
        style={{ left: `${position}%` }}
      />

      {/* Drag Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center pointer-events-none z-10"
        style={{ left: `${position}%` }}
      >
        <div className="flex items-center gap-0.5">
          <ChevronLeft size={12} strokeWidth={2} className="text-stone-500" />
          <ChevronRight size={12} strokeWidth={2} className="text-stone-500" />
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterSlider() {
  const [sectionRef, inView] = useInView(0.15);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = CASES[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="bg-stone-50 border-y border-stone-100 py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] tracking-[0.4em] uppercase text-stone-400 mb-4 font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Real Results
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2rem,4vw,3.2rem)] font-light text-stone-800 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            The difference speaks
            <br />
            <em className="not-italic" style={{ color: "#B8714A" }}>
              for itself.
            </em>
          </motion.h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <DragSlider
              key={activeIndex}
              before={active.before}
              after={active.after}
              beforeAlt={`${active.treatment} before`}
              afterAlt={`${active.treatment} after`}
            />
            <p
              className="text-[11px] tracking-[0.2em] uppercase text-stone-300 mt-4 text-center font-light"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Drag to compare
            </p>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Treatment tabs */}
            <div className="flex gap-3 mb-10 flex-wrap">
              {CASES.map((c, i) => (
                <button
                  key={c.treatment}
                  onClick={() => setActiveIndex(i)}
                  className={`text-[11px] tracking-[0.18em] uppercase px-4 py-2 font-light transition-all duration-300 ${
                    activeIndex === i
                      ? "bg-stone-800 text-[#FAF8F5]"
                      : "border border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-600"
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {c.treatment}
                </button>
              ))}
            </div>

            {/* Active case info */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3
                className="text-[clamp(1.6rem,3vw,2.4rem)] font-light text-stone-800 mb-4 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {active.treatment}
              </h3>

              <div className="w-8 h-px bg-[#B8714A] mb-6" />

              <p
                className="text-[14px] leading-relaxed text-stone-500 font-light mb-8 max-w-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {active.description}
              </p>

              <span
                className="text-[11px] tracking-[0.25em] uppercase text-stone-300 font-light"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {active.weeks}
              </span>

              <p
                className="text-[11px] leading-relaxed text-stone-300 font-light mt-10 max-w-xs"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Results are individual. All treatments are carried out by qualified
                practitioners following a private consultation.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
