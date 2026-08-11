import nodemailer from "nodemailer";
import {
  patientConfirmationEmail,
  adminNotificationEmail,
  type BookingEmailData,
} from "./templates";

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Missing SMTP configuration. Check SMTP_HOST, SMTP_USER, SMTP_PASS in your environment."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  });
}

export async function sendBookingEmails(data: BookingEmailData): Promise<void> {
  const transport = createTransport();
  const from = process.env.SMTP_FROM ?? `Aureline Clinic <${process.env.SMTP_USER}>`;
  const clinicEmail = process.env.CLINIC_EMAIL;

  if (!clinicEmail) {
    throw new Error("CLINIC_EMAIL environment variable is not defined.");
  }

  const patient = patientConfirmationEmail(data);
  const admin = adminNotificationEmail(data);

  await Promise.all([
    // Confirmation to patient
    transport.sendMail({
      from,
      to: data.patientEmail,
      subject: patient.subject,
      html: patient.html,
      text: patient.text,
    }),
    // Notification to clinic
    transport.sendMail({
      from,
      to: clinicEmail,
      subject: admin.subject,
      html: admin.html,
      text: admin.text,
    }),
  ]);
}
