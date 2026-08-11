import { z } from "zod";

export const TREATMENT_SLUGS = [
  "botox",
  "lip-enhancement",
  "skin-rejuvenation",
  "prp-therapy",
  "facial-contouring",
  "chemical-peels",
] as const;

export const TREATMENT_LABELS: Record<(typeof TREATMENT_SLUGS)[number], string> = {
  "botox": "Botox & Anti-Wrinkle",
  "lip-enhancement": "Lip Enhancement",
  "skin-rejuvenation": "Skin Rejuvenation",
  "prp-therapy": "PRP Therapy",
  "facial-contouring": "Facial Contouring",
  "chemical-peels": "Chemical Peels",
};

// GET /api/slots query params
export const SlotsQuerySchema = z.object({
  treatment: z.enum(TREATMENT_SLUGS),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .refine((d) => {
      const parsed = new Date(d);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return parsed >= today;
    }, "Date must be today or in the future"),
});

// POST /api/bookings body
export const CreateBookingSchema = z.object({
  slotId: z
    .string()
    .min(24)
    .max(24)
    .regex(/^[a-f\d]{24}$/i, "Invalid slot ID"),
  treatment: z.enum(TREATMENT_SLUGS),
  patientName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100)
    .trim(),
  patientEmail: z
    .string()
    .email("Invalid email address")
    .max(254)
    .trim()
    .toLowerCase(),
  patientPhone: z
    .string()
    .min(7, "Phone number is too short")
    .max(30)
    .trim()
    .regex(/^[+\d\s\-().]+$/, "Invalid phone number"),
  notes: z.string().max(1000).trim().optional().default(""),
});

export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;
export type SlotsQuery = z.infer<typeof SlotsQuerySchema>;
