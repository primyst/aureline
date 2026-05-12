"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Users, Award, Clock } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  {
    icon: <Users size={18} strokeWidth={1.5} />,
    value: 2000,
    suffix: "+",
    label: "Private Clients",
  },
  {
    icon: <Star size={18} strokeWidth={1.5} />,
    value: 4.9,
    suffix: "/5",
    label: "Google Reviews",
  },
  {
    icon: <Award size={18} strokeWidth={1.5} />,
    value: 10,
    suffix: "+",
    label: "Years Experience",
  },
  {
    icon: <Clock size={18} strokeWidth={1.5} />,
    value: 98,
    suffix: "%",
    label: "Client Retention",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Number(current.toFixed(value % 1 !== 0 ? 1 : 0)));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function TrustBar() {
  return (
    <section className="bg-[#FAF8F5] border-b border-stone-200/60">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#C9A96E]">{stat.icon}</span>
                <span className="font-serif text-3xl md:text-4xl text-[#1E2A44]">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-stone-500 font-sans">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
