import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ISlot extends Document {
  practitionerId: Types.ObjectId;
  treatment: string; // treatment slug
  date: Date;
  time: string; // "10:00", "10:30" etc.
  duration: number; // minutes
  isBooked: boolean;
  bookedBy: Types.ObjectId | null; // ref to Booking
}

const SlotSchema = new Schema<ISlot>(
  {
    practitionerId: {
      type: Schema.Types.ObjectId,
      ref: "Practitioner",
      required: true,
      index: true,
    },
    treatment: {
      type: String,
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    time: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
    duration: {
      type: Number,
      required: true,
      min: 15,
      max: 240,
    },
    isBooked: {
      type: Boolean,
      default: false,
      index: true,
    },
    bookedBy: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
  },
  { timestamps: true }
);

// A practitioner can have the same start time for different treatments.
// Treatment must therefore be part of the uniqueness constraint.
// This allows, for example, Dr. Sophie to have a 10:00 slot for both
// PRP Therapy and Chemical Peels.
SlotSchema.index(
  { practitionerId: 1, treatment: 1, date: 1, time: 1 },
  { unique: true }
);

const Slot: Model<ISlot> =
  mongoose.models.Slot ?? mongoose.model<ISlot>("Slot", SlotSchema);

export default Slot;
