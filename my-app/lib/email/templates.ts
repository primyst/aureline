export interface BookingEmailData {
  reference: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  treatment: string;
  practitionerName: string;
  date: string;     // formatted: "Monday, 12 August 2026"
  time: string;     // "10:00"
  duration: number; // minutes
  notes: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://aurelineclinic.co.uk";

const sharedStyles = `
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #FAF8F5;
  color: #292524;
  margin: 0;
  padding: 0;
`;

// ─── PATIENT CONFIRMATION ────────────────────────────────────────────────────

export function patientConfirmationEmail(data: BookingEmailData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Appointment Confirmed — ${data.reference} | Aureline Clinic`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="${sharedStyles}">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F5; padding: 48px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%; background:#ffffff; border:1px solid #e7e5e4;">

          <!-- Header -->
          <tr>
            <td style="background:#1c1917; padding: 32px 40px; text-align:center;">
              <p style="margin:0; font-family: Georgia, serif; font-size:22px; font-weight:300; letter-spacing:0.15em; color:#FAF8F5; text-transform:uppercase;">
                Aureline
              </p>
              <p style="margin:4px 0 0; font-size:10px; letter-spacing:0.3em; color:#78716c; text-transform:uppercase;">
                Aesthetic Clinic · London
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 40px 0;">
              <p style="margin:0 0 8px; font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:#a8a29e;">
                Appointment Confirmed
              </p>
              <h1 style="margin:0 0 24px; font-family: Georgia, serif; font-size:26px; font-weight:300; color:#1c1917; line-height:1.2;">
                We look forward to seeing you, ${data.patientName.split(" ")[0]}.
              </h1>
              <p style="margin:0 0 32px; font-size:14px; line-height:1.75; color:#57534e;">
                Your consultation has been confirmed. All details are below.
                Please arrive 5 minutes early — your practitioner will meet you at reception.
              </p>
            </td>
          </tr>

          <!-- Booking details -->
          <tr>
            <td style="padding: 0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#FAF8F5; border:1px solid #e7e5e4; border-left: 3px solid #B8714A;">
                <tr>
                  <td style="padding: 28px 28px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${detailRow("Reference", `<strong>${data.reference}</strong>`)}
                      ${detailRow("Treatment", data.treatment)}
                      ${detailRow("Practitioner", data.practitionerName)}
                      ${detailRow("Date", data.date)}
                      ${detailRow("Time", `${data.time} (${data.duration} min)`)}
                      ${data.notes ? detailRow("Your Notes", data.notes) : ""}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Address -->
          <tr>
            <td style="padding: 32px 40px 0;">
              <p style="margin:0 0 6px; font-size:11px; letter-spacing:0.25em; text-transform:uppercase; color:#a8a29e;">
                Clinic Address
              </p>
              <p style="margin:0; font-size:14px; line-height:1.7; color:#57534e;">
                12 Mount Street, Mayfair<br/>
                London, W1K 3NX<br/>
                <a href="tel:+442071234567" style="color:#B8714A; text-decoration:none;">+44 (0) 207 123 4567</a>
              </p>
            </td>
          </tr>

          <!-- What happens next -->
          <tr>
            <td style="padding: 32px 40px 0;">
              <p style="margin:0 0 12px; font-size:11px; letter-spacing:0.25em; text-transform:uppercase; color:#a8a29e;">
                What Happens Next
              </p>
              <ul style="margin:0; padding-left:20px; font-size:14px; line-height:1.9; color:#57534e;">
                <li>You will receive a reminder 24 hours before your appointment</li>
                <li>Please arrive with a clean face — no makeup if possible</li>
                <li>If you need to reschedule, contact us at least 48 hours in advance</li>
                <li>Bring a form of ID to your first appointment</li>
              </ul>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 36px 40px 0; text-align:center;">
              <a href="${BASE_URL}/confirmation/${data.reference}"
                style="display:inline-block; background:#1c1917; color:#FAF8F5; text-decoration:none;
                       font-size:11px; letter-spacing:0.2em; text-transform:uppercase; padding:14px 32px;">
                View Booking Details
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 40px 40px 36px; border-top:1px solid #e7e5e4; margin-top:40px; text-align:center;">
              <div style="margin-top:32px;">
                <p style="margin:0; font-size:11px; color:#a8a29e; line-height:1.6;">
                  To cancel or reschedule, please contact us at least 48 hours before your appointment.<br/>
                  <a href="mailto:hello@aurelineclinic.co.uk" style="color:#B8714A; text-decoration:none;">hello@aurelineclinic.co.uk</a>
                  &nbsp;·&nbsp;
                  <a href="https://wa.me/447700900000" style="color:#B8714A; text-decoration:none;">WhatsApp</a>
                </p>
                <p style="margin:16px 0 0; font-size:10px; color:#d6d3d1;">
                  © ${new Date().getFullYear()} Aureline Clinic Ltd. Registered in England & Wales.
                </p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
AURELINE CLINIC — APPOINTMENT CONFIRMED

Reference: ${data.reference}
Treatment: ${data.treatment}
Practitioner: ${data.practitionerName}
Date: ${data.date}
Time: ${data.time} (${data.duration} min)
${data.notes ? `Notes: ${data.notes}\n` : ""}
Address: 12 Mount Street, Mayfair, London W1K 3NX
Phone: +44 (0) 207 123 4567

View your booking: ${BASE_URL}/confirmation/${data.reference}

Please arrive 5 minutes early. To reschedule, contact us at least 48 hours before.
hello@aurelineclinic.co.uk
  `.trim();

  return { subject, html, text };
}

// ─── ADMIN NOTIFICATION ──────────────────────────────────────────────────────

export function adminNotificationEmail(data: BookingEmailData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `New Booking — ${data.reference} | ${data.patientName} | ${data.treatment}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>${subject}</title></head>
<body style="${sharedStyles}">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F5; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0"
          style="max-width:560px; width:100%; background:#ffffff; border:1px solid #e7e5e4;">

          <tr>
            <td style="background:#1c1917; padding:24px 32px;">
              <p style="margin:0; font-size:11px; letter-spacing:0.3em; color:#a8a29e; text-transform:uppercase;">
                Aureline Clinic — New Booking
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${detailRow("Reference", `<strong>${data.reference}</strong>`)}
                ${detailRow("Patient", data.patientName)}
                ${detailRow("Email", `<a href="mailto:${data.patientEmail}" style="color:#B8714A;">${data.patientEmail}</a>`)}
                ${detailRow("Phone", `<a href="tel:${data.patientPhone}" style="color:#B8714A;">${data.patientPhone}</a>`)}
                ${detailRow("Treatment", data.treatment)}
                ${detailRow("Practitioner", data.practitionerName)}
                ${detailRow("Date", data.date)}
                ${detailRow("Time", `${data.time} (${data.duration} min)`)}
                ${data.notes ? detailRow("Patient Notes", data.notes) : ""}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 32px;">
              <p style="margin:0; font-size:11px; color:#a8a29e;">
                Booked at ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
NEW BOOKING — AURELINE CLINIC

Reference: ${data.reference}
Patient: ${data.patientName}
Email: ${data.patientEmail}
Phone: ${data.patientPhone}
Treatment: ${data.treatment}
Practitioner: ${data.practitionerName}
Date: ${data.date}
Time: ${data.time} (${data.duration} min)
${data.notes ? `Notes: ${data.notes}` : ""}
  `.trim();

  return { subject, html, text };
}

// ─── HELPER ──────────────────────────────────────────────────────────────────

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:6px 0; font-size:11px; letter-spacing:0.15em; text-transform:uppercase;
                 color:#a8a29e; vertical-align:top; width:120px; white-space:nowrap;">
        ${label}
      </td>
      <td style="padding:6px 0 6px 16px; font-size:14px; color:#292524; line-height:1.5;">
        ${value}
      </td>
    </tr>
  `;
}
