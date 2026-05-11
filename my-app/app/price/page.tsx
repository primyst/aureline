"use client"

import { useState } from "react";
import { Check, Plus, Minus, Zap, CreditCard, MapPin, Palette, FileText, LucideIcon } from "lucide-react";

interface Addon {
  name: string;
  price: number;
  icon: LucideIcon;
  desc: string;
  unit?: string;
}

const BASE_PRICE = 100000;

const addons: Addon[] = [
  {
    name: "Booking & Appointment System",
    price: 25000,
    icon: Zap,
    desc: "Let clients book without the back-and-forth",
  },
  {
    name: "Payment Integration",
    price: 30000,
    icon: CreditCard,
    desc: "Accept payments directly on your site",
  },
  {
    name: "Advanced SEO & Google Maps",
    price: 15000,
    icon: MapPin,
    desc: "Show up when customers search for you",
  },
  {
    name: "Custom Branding & Design",
    price: 35000,
    icon: Palette,
    desc: "A site that actually looks like your business",
  },
  {
    name: "Extra Pages",
    price: 7000,
    icon: FileText,
    desc: "Each additional page beyond the base 5",
    unit: "/ page",
  },
];

const baseFeatures = [
  "3–5 Pages",
  "Mobile Responsive",
  "Contact & About",
  "Service Showcase",
  "Basic SEO Setup",
  "Fast Delivery",
];

// Fixed the implicit 'any' error here
const fmt = (n: number) => "₦" + n.toLocaleString("en-NG");

export default function PriceList() {
  // Added string array type to state
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (name: string) =>
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );

  const total =
    BASE_PRICE +
    addons
      .filter((a) => selected.includes(a.name))
      .reduce((sum, a) => sum + a.price, 0);

  return (
    <div className="min-h-screen bg-[#090909] flex items-center justify-center p-5">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');
        .bebas { font-family: 'Bebas Neue', sans-serif; }
        .dm { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="w-full max-w-sm dm">

        {/* Logo + Heading */}
        <div className="mb-8">
          <p className="bebas text-[#ff5c00] text-2xl tracking-widest mb-5">PRIMYST.</p>
          <h1 className="bebas text-white leading-none tracking-wide" style={{ fontSize: "clamp(3.5rem, 15vw, 5rem)" }}>
            PRICE<br />LIST
          </h1>
          <p className="text-neutral-500 text-xs mt-2 tracking-wide">
            Tap add-ons to build your estimate
          </p>
        </div>

        {/* Base Package */}
        <div className="bg-[#ff5c00] rounded-2xl p-5 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="bebas text-black tracking-widest text-sm">BASE WEBSITE</p>
              <p className="text-black font-bold text-3xl leading-tight mt-1">{fmt(BASE_PRICE)}</p>
            </div>
            <span className="bg-black/20 text-black text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded-lg">
              INCLUDED
            </span>
          </div>
          <div className="border-t border-black/20 pt-4 grid grid-cols-2 gap-y-2 gap-x-3">
            {baseFeatures.map((f) => (
              <div key={f} className="flex items-center gap-1.5">
                <Check size={11} className="text-black shrink-0" strokeWidth={3} />
                <span className="text-black text-[11px] font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons Label */}
        <p className="bebas text-neutral-600 tracking-[0.15em] text-xs mb-2 mt-5">
          OPTIONAL ADD-ONS
        </p>

        {/* Add-ons List */}
        <div className="flex flex-col gap-2 mb-4">
          {addons.map((addon) => {
            const active = selected.includes(addon.name);
            const Icon = addon.icon;
            return (
              <button
                key={addon.name}
                onClick={() => toggle(addon.name)}
                className={`w-full text-left rounded-xl p-4 border transition-all duration-200 cursor-pointer
                  ${active
                    ? "bg-neutral-900 border-[#ff5c00]"
                    : "bg-neutral-950 border-neutral-800 hover:border-neutral-700"
                  }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 transition-all duration-200 shrink-0
                      ${active ? "bg-[#ff5c00]" : "bg-neutral-800"}`}>
                      <Icon
                        size={14}
                        className={active ? "text-black" : "text-neutral-500"}
                        strokeWidth={2.2}
                      />
                    </div>
                    <div>
                      <p className={`text-[12px] font-semibold leading-tight mb-0.5 transition-colors duration-200
                        ${active ? "text-white" : "text-neutral-300"}`}>
                        {addon.name}
                      </p>
                      <p className="text-neutral-600 text-[10px] leading-snug">{addon.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right">
                      <p className={`text-[12px] font-bold transition-colors duration-200
                        ${active ? "text-[#ff5c00]" : "text-neutral-500"}`}>
                        {fmt(addon.price)}
                      </p>
                      {addon.unit && (
                        <p className="text-[9px] text-neutral-700">{addon.unit}</p>
                      )}
                    </div>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200
                      ${active ? "bg-[#ff5c00]" : "bg-neutral-800"}`}>
                      {active
                        ? <Minus size={10} className="text-black" strokeWidth={3} />
                        : <Plus size={10} className="text-neutral-500" strokeWidth={3} />
                      }
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Total */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-4 flex items-center justify-between mb-4">
          <div>
            <p className="bebas text-neutral-600 tracking-widest text-[10px] mb-1">
              {selected.length > 0
                ? `BASE + ${selected.length} ADD-ON${selected.length > 1 ? "S" : ""}`
                : "BASE PACKAGE"}
            </p>
            <p className="text-white font-bold text-2xl leading-none">{fmt(total)}</p>
          </div>
          {selected.length > 0 && (
            <button
              onClick={() => setSelected([])}
              className="text-neutral-600 text-[11px] underline underline-offset-2 hover:text-neutral-400 transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="text-neutral-600 text-[11px] text-center leading-relaxed">
          Final price depends on project scope.<br />
          Reach out — let's figure out what works for you.
        </p>

      </div>
    </div>
  );
}
