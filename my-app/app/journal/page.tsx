"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const articles = [
  {
    number: "01",
    category: "Injectables",
    title: "How to approach subtle aesthetic enhancement",
    excerpt: "The best treatment plan is rarely about doing more. It is about understanding proportion, expression and what feels right for you.",
    date: "08 August 2026",
    read: "5 min read",
    featured: true,
  },
  {
    number: "02",
    category: "Skin",
    title: "What to expect after a chemical peel",
    excerpt: "From the first few hours to the days that follow, a simple guide to caring for your skin after treatment.",
    date: "04 August 2026",
    read: "4 min read",
  },
  {
    number: "03",
    category: "Guides",
    title: "Your first aesthetic consultation",
    excerpt: "You do not need to know exactly what treatment you want. Here is what a considered consultation should feel like.",
    date: "29 July 2026",
    read: "3 min read",
  },
  {
    number: "04",
    category: "Injectables",
    title: "Lip enhancement: subtle or defined?",
    excerpt: "There is more to lip enhancement than adding volume. Shape, balance and proportion all matter.",
    date: "22 July 2026",
    read: "5 min read",
  },
  {
    number: "05",
    category: "Skin",
    title: "Why skin health comes first",
    excerpt: "A treatment can change how your skin looks today. A considered routine helps determine how it looks over time.",
    date: "15 July 2026",
    read: "4 min read",
  },
  {
    number: "06",
    category: "Clinic Notes",
    title: "The Aureline approach to natural-looking results",
    excerpt: "Our philosophy is simple: treatments should work with your features, not against them.",
    date: "08 July 2026",
    read: "3 min read",
  },
];

const categories = ["All", "Skin", "Injectables", "Guides", "Clinic Notes"];

export default function JournalPage() {
  const featured = articles[0];
  const remaining = articles.slice(1);

  return (
    <main className="bg-[#FAF8F5] text-stone-800">
      <section className="bg-[#1E2A44] px-6 py-28 sm:px-10 lg:px-20 lg:py-40">
        <div className="mx-auto max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <span className="mb-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#C9A96E]">
              <span className="h-px w-8 bg-[#C9A96E]" />
              The Aureline Journal
            </span>
            <h1 className="font-serif text-5xl font-light leading-[0.93] tracking-[-0.03em] text-white sm:text-7xl lg:text-[7rem]">
              Skin, aesthetics
              <br />
              <span className="italic text-[#C9A96E]">& considered care.</span>
            </h1>
            <p className="mt-9 max-w-xl text-sm font-light leading-7 text-white/50 sm:text-base">
              Thoughtful guides, treatment insights and perspectives on looking after your skin — before, during and after treatment.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-stone-200 px-6 py-7 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[1200px] gap-6 overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`text-[10px] uppercase tracking-[0.22em] transition-colors ${
                index === 0 ? "text-[#1E2A44]" : "text-stone-400 hover:text-stone-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-20 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid overflow-hidden border border-stone-200 bg-white lg:grid-cols-[1.25fr_0.75fr]">
            <div className="relative min-h-[390px] overflow-hidden bg-[#1E2A44] p-8 sm:p-12 lg:min-h-[520px] lg:p-16">
              <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full border border-[#C9A96E]/15" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C9A96E]">Featured journal</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">{featured.number}</span>
                </div>
                <div className="max-w-xl">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-white/35">{featured.category}</p>
                  <h2 className="mt-5 font-serif text-4xl font-light leading-[1] text-white sm:text-5xl lg:text-6xl">
                    {featured.title}
                  </h2>
                  <p className="mt-6 max-w-lg text-sm font-light leading-7 text-white/45">{featured.excerpt}</p>
                  <Link
                    href="#article"
                    className="mt-9 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-[#C9A96E]"
                  >
                    Read article
                    <ArrowRight size={14} strokeWidth={1.3} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end p-8 sm:p-12 lg:p-16">
              <div className="mb-auto">
                <p className="text-[9px] uppercase tracking-[0.25em] text-stone-400">Editor's note</p>
                <div className="mt-7 h-px w-12 bg-[#C9A96E]" />
              </div>
              <p className="max-w-sm font-serif text-2xl font-light leading-relaxed text-[#1E2A44] sm:text-3xl">
                Good aesthetic care starts with a conversation, not a treatment list.
              </p>
              <div className="mt-8 flex items-center gap-4 text-[9px] uppercase tracking-[0.18em] text-stone-400">
                <span>{featured.date}</span>
                <span className="h-1 w-1 rounded-full bg-stone-300" />
                <span>{featured.read}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="article" className="border-t border-stone-200 px-6 py-20 sm:px-10 lg:px-20 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 flex items-end justify-between border-b border-stone-200 pb-7">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Latest thinking</p>
              <h2 className="mt-3 font-serif text-4xl font-light text-[#1E2A44]">From the journal.</h2>
            </div>
            <span className="hidden text-[9px] uppercase tracking-[0.2em] text-stone-400 sm:block">06 articles</span>
          </div>

          <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {remaining.map((article, index) => (
              <motion.article
                key={article.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
                className="group border-t border-stone-200 pt-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A96E]">{article.category}</span>
                  <span className="text-[9px] tracking-[0.15em] text-stone-300">{article.number}</span>
                </div>
                <h3 className="mt-7 font-serif text-3xl font-light leading-[1.02] text-[#1E2A44] transition-colors group-hover:text-[#C9A96E]">
                  {article.title}
                </h3>
                <p className="mt-5 text-xs font-light leading-6 text-stone-500">{article.excerpt}</p>
                <div className="mt-8 flex items-center justify-between border-t border-stone-100 pt-5">
                  <span className="text-[9px] uppercase tracking-[0.16em] text-stone-400">{article.date}</span>
                  <ArrowUpRight size={15} strokeWidth={1.3} className="text-stone-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#C9A96E]" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white px-6 py-24 sm:px-10 lg:px-20 lg:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Aureline notes</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl font-light leading-tight text-[#1E2A44] sm:text-5xl">
              Thoughtful care,
              <br />
              <span className="italic text-stone-400">delivered to your inbox.</span>
            </h2>
            <p className="mt-6 max-w-lg text-sm font-light leading-7 text-stone-500">
              Occasional treatment guides, skin insights and clinic notes. No noise, just useful information.
            </p>
          </div>
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center gap-3 bg-[#1E2A44] px-8 py-4 text-[10px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#273653]"
          >
            Start a Consultation
            <ArrowRight size={14} strokeWidth={1.4} />
          </Link>
        </div>
      </section>
    </main>
  );
}
