/**
 * Run with: npx tsx scripts/seed.ts
 * Make sure MONGODB_URI is in your .env.local
 */

import "dotenv/config";
import mongoose from "mongoose";
import Practitioner from "../lib/models/Practitioner";
import Slot from "../lib/models/Slot";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not set.");

const PRACTITIONERS = [
  {
    name: "Dr. Isabelle Moreau",
    title: "Clinical Director & Lead Aesthetician",
    bio: "15 years in aesthetic medicine. Specialist in facial anatomy and advanced filler techniques.",
    treatments: ["botox", "facial-contouring", "lip-enhancement"],
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    isActive: true,
  },
  {
    name: "Dr. Sophie Clarke",
    title: "Skin & Rejuvenation Specialist",
    bio: "Dermatology background with a focus on skin health, peels, and PRP therapies.",
    treatments: ["skin-rejuvenation", "prp-therapy", "chemical-peels"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    isActive: true,
  },
  {
    name: "Dr. James Whitfield",
    title: "Consultant Aesthetic Physician",
    bio: "Plastic surgery background. Specialises in botox, contouring, and lip enhancement.",
    treatments: ["botox", "lip-enhancement", "facial-contouring"],
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    isActive: true,
  },
];

// 30-minute appointment start times, 09:00–16:30.
const TIMES = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:30", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30",
];

const TREATMENT_DURATION: Record<string, number> = {
  "botox": 30,
  "lip-enhancement": 45,
  "skin-rejuvenation": 60,
  "prp-therapy": 75,
  "facial-contouring": 60,
  "chemical-peels": 45,
};

function getNextNWorkdays(n: number): Date[] {
  const dates: Date[] = [];
  const current = new Date();
  current.setHours(0, 0, 0, 0);

  while (dates.length < n) {
    current.setDate(current.getDate() + 1);
    const day = current.getDay();
    if (day !== 0 && day !== 6) dates.push(new Date(current));
  }

  return dates;
}

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  await Practitioner.deleteMany({});
  await Slot.deleteMany({});
  console.log("Cleared existing practitioners and slots.");

  const inserted = await Practitioner.insertMany(PRACTITIONERS);
  console.log(`Inserted ${inserted.length} practitioners.`);

  const workdays = getNextNWorkdays(14);
  const slots = [];

  for (const practitioner of inserted) {
    for (const date of workdays) {
      // Deterministic demo availability: every practitioner is available at
      // every defined start time. This prevents a valid treatment from
      // randomly appearing to have no availability.
      for (const time of TIMES) {
        for (const treatment of practitioner.treatments) {
          slots.push({
            practitionerId: practitioner._id,
            treatment,
            date: new Date(date),
            time,
            duration: TREATMENT_DURATION[treatment] ?? 30,
            isBooked: false,
            bookedBy: null,
          });
        }
      }
    }
  }

  await Slot.insertMany(slots, { ordered: false });
  console.log(`Inserted ${slots.length} deterministic slots across 14 workdays.`);

  await mongoose.disconnect();
  console.log("Done. Database seeded successfully.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
