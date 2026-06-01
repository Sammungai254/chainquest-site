import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface BookingPayload {
  name: string;
  email: string;
  phone?: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  goals?: string;
}

const FROM_ADDRESS = "ChainQuest Ke <noreply@chainquest.co.ke>";
const WHATSAPP_NUMBER = "+254 745 381 960";

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const fieldRow = (label: string, value: string) => `
  <tr>
    <td style="padding: 8px 16px 8px 0; color: #8fa3c8; font-size: 13px; vertical-align: top; white-space: nowrap;">${label}</td>
    <td style="padding: 8px 0; color: #0f1d35; font-size: 14px; font-weight: 600;">${value}</td>
  </tr>
`;

/**
 * POST /api/booking
 *
 * Handles booking form submissions:
 *   1. Sends a formatted notification email to CONTACT_EMAIL
 *   2. Sends a confirmation email back to the client (Samuel confirms
 *      within 24 hours via WhatsApp +254 745 381 960 or email)
 *
 * Required env vars:
 *   - RESEND_API_KEY
 *   - CONTACT_EMAIL    Destination inbox for booking notifications
 *
 * Required fields: name, email, service
 */
export async function POST(req: NextRequest) {
  try {
    const body: BookingPayload = await req.json();

    if (!body.name || !body.email || !body.service) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, service" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!apiKey || !contactEmail) {
      console.error("[Booking API] Missing RESEND_API_KEY or CONTACT_EMAIL env var");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const name = body.name.trim();
    const email = body.email.trim();
    const phone = body.phone?.trim() || "";
    const service = body.service.trim();
    const preferredDate = body.preferredDate?.trim() || "";
    const preferredTime = body.preferredTime?.trim() || "";
    const goals = body.goals?.trim() || "";

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeService = escapeHtml(service);
    const safeTime = escapeHtml(preferredTime);
    const safeGoals = escapeHtml(goals).replace(/\n/g, "<br/>");

    // Pretty-print the date if it's a YYYY-MM-DD value
    let displayDate = preferredDate;
    if (/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
      const d = new Date(preferredDate + "T00:00:00");
      if (!isNaN(d.getTime())) {
        displayDate = d.toLocaleDateString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    }
    const safeDisplayDate = escapeHtml(displayDate);

    // 1. Notification to the team (Samuel)
    const notification = await resend.emails.send({
      from: FROM_ADDRESS,
      to: contactEmail,
      replyTo: email,
      subject: `[ChainQuest Booking] ${name} — ${service}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #0f1d35;">
          <h2 style="color: #f5c218; border-bottom: 2px solid #f5c218; padding-bottom: 8px; margin-bottom: 16px;">
            New Booking Request
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${fieldRow("Name", safeName)}
            ${fieldRow("Email", `<a href="mailto:${safeEmail}" style="color: #1e4d8c;">${safeEmail}</a>`)}
            ${phone ? fieldRow("Phone / WhatsApp", `<a href="tel:${safePhone}" style="color: #1e4d8c;">${safePhone}</a>`) : ""}
            ${fieldRow("Service", safeService)}
            ${preferredDate ? fieldRow("Preferred Date", safeDisplayDate) : ""}
            ${preferredTime ? fieldRow("Preferred Time", safeTime) : ""}
          </table>
          ${
            goals
              ? `
            <h3 style="margin-top: 24px; color: #8fa3c8; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
              Goals
            </h3>
            <div style="background: #f5f5f5; padding: 16px; border-left: 4px solid #f5c218; border-radius: 4px; color: #0f1d35;">
              ${safeGoals}
            </div>
          `
              : ""
          }
          <p style="margin-top: 24px; color: #888; font-size: 12px;">
            Submitted at ${new Date().toUTCString()}
          </p>
        </div>
      `,
      text: [
        "New Booking Request",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        `Service: ${service}`,
        preferredDate ? `Preferred Date: ${displayDate}` : null,
        preferredTime ? `Preferred Time: ${preferredTime}` : null,
        "",
        goals ? `Goals:\n${goals}` : null,
        "",
        `Submitted at ${new Date().toUTCString()}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (notification.error) {
      console.error("[Booking API] Notification send failed", notification.error);
      return NextResponse.json(
        { error: "Failed to submit booking. Please try again." },
        { status: 502 }
      );
    }

    // 2. Confirmation to the client (best-effort)
    const confirmation = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      replyTo: contactEmail,
      subject: "Booking received — ChainQuest Ke",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #0f1d35;">
          <h2 style="color: #f5c218;">Thanks, ${safeName} — your booking request is in.</h2>
          <p>
            <strong>Samuel will confirm within 24 hours</strong> via WhatsApp
            (<a href="https://wa.me/254745381960" style="color: #f5c218;">${WHATSAPP_NUMBER}</a>)
            or email.
          </p>

          <h3 style="margin-top: 28px; color: #8fa3c8; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
            Your Booking Details
          </h3>
          <table style="width: 100%; border-collapse: collapse; background: #f5f5f5; padding: 16px; border-radius: 8px;">
            ${fieldRow("Service", safeService)}
            ${preferredDate ? fieldRow("Preferred Date", safeDisplayDate) : ""}
            ${preferredTime ? fieldRow("Preferred Time", safeTime) : ""}
            ${phone ? fieldRow("Your Phone", safePhone) : ""}
          </table>

          ${
            goals
              ? `
            <h3 style="margin-top: 24px; color: #8fa3c8; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
              Your Goals
            </h3>
            <div style="background: #f5f5f5; padding: 16px; border-left: 4px solid #f5c218; border-radius: 4px;">
              ${safeGoals}
            </div>
          `
              : ""
          }

          <p style="margin-top: 28px;">
            Need to reach us sooner? WhatsApp
            <a href="https://wa.me/254745381960" style="color: #f5c218;">${WHATSAPP_NUMBER}</a>
            or email
            <a href="mailto:${escapeHtml(contactEmail)}" style="color: #f5c218;">${escapeHtml(contactEmail)}</a>.
          </p>
          <p style="color: #888; font-size: 12px; margin-top: 32px; border-top: 1px solid #eee; padding-top: 16px;">
            — Samuel & the ChainQuest Ke Team<br/>
            <a href="https://chainquest.co.ke" style="color: #f5c218;">chainquest.co.ke</a>
          </p>
        </div>
      `,
      text: [
        `Thanks, ${name} — your booking request is in.`,
        "",
        `Samuel will confirm within 24 hours via WhatsApp (${WHATSAPP_NUMBER}) or email.`,
        "",
        "Your Booking Details",
        `  Service: ${service}`,
        preferredDate ? `  Preferred Date: ${displayDate}` : null,
        preferredTime ? `  Preferred Time: ${preferredTime}` : null,
        phone ? `  Your Phone: ${phone}` : null,
        "",
        goals ? `Your Goals:\n${goals}` : null,
        "",
        `Need to reach us sooner? WhatsApp ${WHATSAPP_NUMBER} or email ${contactEmail}.`,
        "",
        "— Samuel & the ChainQuest Ke Team",
        "chainquest.co.ke",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (confirmation.error) {
      console.warn("[Booking API] Confirmation send failed", confirmation.error);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Booking received! Check your email for confirmation.",
        notificationId: notification.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Booking API Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
