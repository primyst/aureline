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

  // The database may still contain the old unique index from the previous
  // Slot schema: practitionerId + date + time. That index prevents one
  // practitioner from having the same start time for multiple treatments.
  // Remove stale indexes first, then let Mongoose create the current index.
  const existingIndexes = await Slot.collection.indexes();
  for (const index of existingIndexes) {
    const key = index.key as Record<string, number>;
    const isOldSlotIndex =
      key.practitionerId === 1 &&
      key.date === 1 &&
      key.time === 1 &&
      !Object.prototype.hasOwnProperty.call(key, "treatment");

    if (isOldSlotIndex && index.name) {
      await Slot.collection.dropIndex(index.name);
      console.log(`Dropped stale slot index: ${index.name}`);
    }
  }

  await Slot.syncIndexes();
  console.log("Slot indexes synchronized.");

  await Practitioner.deleteMany({});
  await Slot.deleteMany({});
  console.log("Cleared existing practitioners and slots.");

  const inserted = await Practitioner.insertMany(PRACTITIONERS);
  console.log(`Inserted ${inserted.length} practitioners.`);

  const workdays = getNextNWorkdays(14);
  const slots = [];

  for (const practitioner of inserted) {
    for (const date of workdays) {
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

  await Slot.insertMany(slots);
  console.log(`Inserted ${slots.length} deterministic slots across 14 workdays.`);

  await mongoose.disconnect();
  console.log("Done. Database seeded successfully.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
