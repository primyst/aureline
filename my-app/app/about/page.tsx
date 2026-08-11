"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";

const principles = [
  {
    number: "01",
    title: "Subtle by design",
    text: "We believe aesthetic treatment should refine rather than redefine. Every recommendation is considered against your features, proportions and goals.",
  },
  {
    number: "02",
    title: "Personal, never prescribed",
    text: "There is no universal treatment plan. Your consultation is where we understand what you want, what you need and whether treatment is right for you.",
  },
  {
    number: "03",
    title: "Care before treatment",
    text: "A considered experience starts before the appointment. We prioritise clear information, honest conversations and appropriate aftercare at every stage.",
  },
];

const practitioners = [
  {
    name: "Dr. Isabelle Moreau",
    role: "Aesthetic Practitioner",
    focus: "Injectables · Facial Contouring",
    image: "/dr-isabelle.jpg",
  },
  {
    name: "Dr. Sophie Clarke",
    role: "Skin Specialist",
    focus: "Skin Rejuvenation · PRP Therapy",
    image: "/dr-sophie.jpg",
  },
  {
    name: "Dr. James Whitfield",
    role: "Aesthetic Practitioner",
    focus: "Injectables · Facial Aesthetics",
    image: "/dr-james.jpg",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#FAF8F5] text-stone-800">
      <section className="relative overflow-hidden bg-[#1E2A44] px-6 py-28 sm:px-10 lg:px-20 lg:py-40">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-[#C9A96E]/10" />
        <div className="absolute -right-20 -top-20 h-[260px] w-[260px] rounded-full border border-[#C9A96E]/10" />
        <div className="relative z-10 mx-auto max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl"
          >
            <span className="mb-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#C9A96E]">
              <span className="h-px w-8 bg-[#C9A96E]" />
              About Aureline
            </span>
            <h1 className="font-serif text-5xl font-light leading-[0.93] tracking-[-0.03em] text-white sm:text-7xl lg:text-[7rem]">
              Enhancement,
              <br />
              <span className="italic text-[#C9A96E]">considered.</span>
            </h1>
            <p className="mt-9 max-w-2xl text-sm font-light leading-7 text-white/55 sm:text-base">
              Aureline is built around a simple idea: aesthetic care should feel personal, thoughtful and quietly confident — never rushed, excessive or one-size-fits-all.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 lg:px-20 lg:py-36">
        <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-[0.75fr_1fr] lg:gap-28">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Our approach</p>
            <h2 className="mt-5 max-w-md font-serif text-4xl font-light leading-[1.02] tracking-[-0.02em] text-[#1E2A44] sm:text-5xl">
              Less about changing you.
              <br />
              <span className="italic text-stone-400">More about refining what is already there.</span>
            </h2>
          </div>
          <div className="space-y-7 text-sm font-light leading-8 text-stone-500">
            <p>
              We created Aureline for people who want aesthetic treatment without the pressure to chase a particular look. The best outcome is rarely the most obvious one.
            </p>
            <p>
              Our consultation-led approach gives you space to talk about what you want, ask questions and understand the options before making a decision.
            </p>
            <p>
              From injectables and facial contouring to skin rejuvenation and regenerative treatments, every plan is shaped around the individual.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white px-6 py-24 sm:px-10 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">The Aureline standard</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-none text-[#1E2A44] sm:text-5xl">
              Three principles.
              <br />
              <span className="italic text-stone-400">One considered experience.</span>
            </h2>
          </div>

          <div className="grid border-t border-stone-200 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-b border-stone-200 py-10 lg:border-b-0 lg:border-r lg:px-10 lg:py-12 lg:first:pl-0 lg:last:border-r-0"
              >
                <span className="text-[10px] tracking-[0.25em] text-[#C9A96E]">{principle.number}</span>
                <h3 className="mt-9 font-serif text-3xl font-light text-[#1E2A44]">{principle.title}</h3>
                <p className="mt-5 text-sm font-light leading-7 text-stone-500">{principle.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 lg:px-20 lg:py-36">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Meet the team</p>
              <h2 className="mt-4 font-serif text-4xl font-light text-[#1E2A44] sm:text-5xl">The people behind the care.</h2>
            </div>
            <p className="max-w-sm text-xs font-light leading-6 text-stone-400">
              A multidisciplinary team with a shared focus on thoughtful treatment and individual care.
            </p>
          </div>

          <div className="grid gap-px bg-stone-200 sm:grid-cols-2 lg:grid-cols-3">
            {practitioners.map((person, index) => (
              <motion.article
                key={person.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-[#FAF8F5]"
              >
                <div className="aspect-[4/5] overflow-hidden bg-stone-100">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full object-cover grayscale-[12%] transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-7 sm:p-8">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-stone-400">{person.role}</p>
                  <h3 className="mt-3 font-serif text-2xl font-light text-[#1E2A44]">{person.name}</h3>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-stone-400">{person.focus}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-[#1E2A44] px-6 py-28 sm:px-10 lg:px-20 lg:py-36">
        <div className="mx-auto max-w-4xl text-center">
          <Plus className="mx-auto mb-8 text-[#C9A96E]" size={18} strokeWidth={1} />
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A96E]">Start with a conversation</p>
          <h2 className="mt-6 font-serif text-4xl font-light leading-tight text-white sm:text-6xl">
            You do not have to know
            <br />
            <span className="italic text-white/45">where to begin.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-sm font-light leading-7 text-white/45">
            Tell us what you are hoping to achieve. We will take the time to understand your goals and talk through the options with you.
          </p>
          <Link
            href="/consultation"
            className="mt-9 inline-flex items-center gap-3 bg-[#C9A96E] px-8 py-4 text-[10px] uppercase tracking-[0.22em] text-[#1E2A44] transition-opacity hover:opacity-90"
          >
            Book a Consultation
            <ArrowRight size={14} strokeWidth={1.4} />
          </Link>
        </div>
      </section>
    </main>
  );
}
