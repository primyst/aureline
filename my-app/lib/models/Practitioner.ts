import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPractitioner extends Document {
  name: string;
  title: string;
  bio: string;
  treatments: string[]; // treatment slugs e.g. ["botox", "facial-contouring"]
  image: string;
  isActive: boolean;
}

const PractitionerSchema = new Schema<IPractitioner>(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    treatments: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "A practitioner must offer at least one treatment.",
      },
    },
    image: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Practitioner: Model<IPractitioner> =
  mongoose.models.Practitioner ??
  mongoose.model<IPractitioner>("Practitioner", PractitionerSchema);

export default Practitioner;
