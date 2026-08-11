import mongoose, { Schema, Document, Model, Types } from "mongoose";
import crypto from "crypto";

export type BookingStatus = "confirmed" | "cancelled" | "completed";

export interface IBooking extends Document {
  reference: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  treatment: string;
  treatmentLabel: string; // human-readable e.g. "Botox & Anti-Wrinkle"
  practitionerId: Types.ObjectId;
  practitionerName: string; // denormalised — don't want broken refs on confirmation
  slotId: Types.ObjectId;
  date: Date;
  time: string;
  duration: number;
  notes: string;
  status: BookingStatus;
  createdAt: Date;
}

function generateReference(): string {
  // AUR- + 8 uppercase alphanumeric characters
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars (0/O, 1/I)
  const random = crypto.randomBytes(8);
  let ref = "AUR-";
  for (const byte of random) {
    ref += chars[byte % chars.length];
  }
  return ref;
}

const BookingSchema = new Schema<IBooking>(
  {
    reference: {
      type: String,
      unique: true,
      default: generateReference,
      index: true,
    },
    patientName: { type: String, required: true, trim: true, maxlength: 100 },
    patientEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    patientPhone: { type: String, required: true, trim: true, maxlength: 30 },
    treatment: { type: String, required: true },
    treatmentLabel: { type: String, required: true },
    practitionerId: {
      type: Schema.Types.ObjectId,
      ref: "Practitioner",
      required: true,
    },
    practitionerName: { type: String, required: true },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
      unique: true, // one booking per slot — enforced at schema level too
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    duration: { type: Number, required: true },
    notes: { type: String, trim: true, maxlength: 1000, default: "" },
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "completed"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking ?? mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
