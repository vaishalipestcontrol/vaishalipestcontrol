import nodemailer from 'nodemailer'

const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10)
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const SMTP_FROM = process.env.SMTP_FROM || '"Vaishali Pest Control" <no-reply@vaishalipestcontrol.in>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'manish@vaishalipestcontrol.in'

/**
 * Returns true if the required SMTP configuration environment variables are present.
 */
export function isMailConfigured() {
  return !!(SMTP_HOST && SMTP_USER && SMTP_PASS)
}

/**
 * Creates and returns a Nodemailer SMTP transporter.
 */
function getTransporter() {
  if (!isMailConfigured()) return null

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465, false for 587 or other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })
}

interface MailPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  concern: string
  details?: string
}

/**
 * Sends an automated confirmation email to the client,
 * and an alert notification to the admin dashboard email address.
 */
export async function sendAutomaticQuoteEmails(payload: MailPayload) {
  const { firstName, lastName, email, phone, concern, details } = payload
  const whatsappLink = "https://wa.me/" + phone.replace(/[^0-9]/g, "")

  if (!isMailConfigured()) {
    console.warn(
      '⚠️ SMTP email is not configured. Please define SMTP_HOST, SMTP_USER, and SMTP_PASS in your environment to enable automatic quote notification emails.'
    )
    return { success: false, reason: 'unconfigured' }
  }

  const transporter = getTransporter()
  if (!transporter) return { success: false, reason: 'transporter_creation_failed' }

  // 1. Customize informational copy based on user's target pest concern
  let serviceInfo = ''
  let serviceTips: string[] = []

  switch (concern?.toLowerCase()) {
    case 'cockroaches':
      serviceInfo = 'Cockroaches are highly resilient pests that carry bacteria and allergens. Our cockroach eradication service uses specialized clinical-grade gel baits and eco-safe spray residues that eliminate nests completely without requiring you to empty your cabinets.'
      serviceTips = [
        'Store all dry foods in airtight glass or plastic containers.',
        'Ensure kitchen garbage bins are sealed tightly and emptied nightly.',
        'Eliminate standing moisture by fixing any drips under the kitchen sink.'
      ]
      break
    case 'termites (white ants)':
    case 'termites':
      serviceInfo = 'Termites cause silent and severe structural damage to woodwork and masonry. Our liquid-soil barrier anti-termite treatment creates a permanent protective perimeter shield around and beneath your foundation, backed by our 5-year guarantee.'
      serviceTips = [
        'Store firewood, timber, or cardboard waste far away from building walls.',
        'Ensure downspouts and AC lines drain away from your home’s outer foundation.',
        'Regularly inspect wooden doors, window frames, and closets for hollow sounds or mud tubes.'
      ]
      break
    case 'rodents (rats / mice)':
    case 'rodents':
      serviceInfo = 'Rats and mice chew through wires and insulation, presenting a serious fire hazard. Our smart rodent control uses secure multi-point tamper-resistant bait stations and sealing of entry points to keep them out permanently.'
      serviceTips = [
        'Seal any gap or crack in exterior walls larger than 1/4 inch with steel wool or wire mesh.',
        'Keep outdoor grass and shrubbery trimmed low and away from the building.',
        'Never leave pet food bowls outside overnight.'
      ]
      break
    case 'bed bugs':
      serviceInfo = 'Bed bugs multiply exponentially and disrupt sleep. Our multi-phase treatment pairs precise localized thermal treatment with contact solutions to target adult bugs, nymphs, and eggs for complete eradication.'
      serviceTips = [
        'Wash all infected clothing, bedsheets, and curtains in hot water (at least 60°C) and dry on high heat.',
        'Inspect any second-hand furniture or luggage thoroughly before bringing them indoors.',
        'Vacuum mattress seams regularly and encase them in certified bed-bug proof covers.'
      ]
      break
    default:
      serviceInfo = 'Our certified technicians will perform a comprehensive physical inspection of your site to deploy a localized, target-specific pest control program designed exactly for your home or business.'
      serviceTips = [
        'Ensure trash bins are kept covered and cleaned regularly.',
        'Wipe up food crumbs and liquid spills immediately.',
        'Schedule a professional preventative inspection annually.'
      ]
      break
  }

  // --- 2. CUSTOMER CONFIRMATION TEMPLATE ---
  const customerHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 25px; border-bottom: 2px solid #16a34a; padding-bottom: 20px;">
        <h1 style="color: #16a34a; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">Vaishali Pest Control</h1>
        <p style="color: #64748b; margin: 5px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">Eco-Friendly & Safe Pest Eradication</p>
      </div>

      <p style="font-size: 16px; line-height: 1.6; color: #334155;">Hello <strong>${firstName} ${lastName}</strong>,</p>
      
      <p style="font-size: 16px; line-height: 1.6; color: #334155;">
        Thank you for contacting <strong>Vaishali Pest Control</strong>! We have received your request for a free quote. Our pest safety experts are reviewing your details and will call or WhatsApp you shortly.
      </p>

      <div style="background-color: #f8fafc; border-left: 4px solid #16a34a; padding: 18px; margin: 25px 0; border-radius: 8px; border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;">
        <h3 style="margin: 0 0 12px 0; color: #0f172a; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px;">Request Details</h3>
        <p style="margin: 6px 0; font-size: 14px; color: #475569;"><strong>Service Needed:</strong> <span style="color: #16a34a; font-weight: bold;">${concern}</span></p>
        <p style="margin: 6px 0; font-size: 14px; color: #475569;"><strong>Your Email:</strong> ${email}</p>
        <p style="margin: 6px 0; font-size: 14px; color: #475569;"><strong>Your Phone:</strong> ${phone}</p>
        ${details ? `<p style="margin: 6px 0; font-size: 14px; color: #475569;"><strong>Additional Notes:</strong> <em>"${details}"</em></p>` : ''}
      </div>

      <h3 style="color: #16a34a; font-size: 17px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; margin-top: 30px; font-weight: 700;">ℹ️ About Your Selected Service</h3>
      <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 20px;">
        ${serviceInfo}
      </p>

      <h3 style="color: #0f172a; font-size: 15px; margin-top: 25px; margin-bottom: 12px; font-weight: 700;">🛡️ Recommended Safety Tips</h3>
      <ul style="padding-left: 20px; margin: 0; font-size: 14px; line-height: 1.6; color: #475569;">
        ${serviceTips.map(tip => `<li style="margin-bottom: 8px;">${tip}</li>`).join('')}
      </ul>

      <div style="margin-top: 35px; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 13px; color: #64748b; line-height: 1.6;">
        <p style="margin: 0;"><strong>Need immediate assistance or want to speed up booking?</strong> Connect with us directly on WhatsApp:</p>
        <p style="margin: 8px 0;"><a href="https://wa.me/919662668711" style="display: inline-block; background-color: #25D366; color: #ffffff; font-weight: bold; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-size: 14px; box-shadow: 0 4px 10px rgba(37,211,102,0.2);">💬 WhatsApp Us: +91 96626 68711</a></p>
        <p style="margin: 15px 0 0 0;">Best regards,<br/><strong>Vaishali Pest Control Team</strong></p>
      </div>
    </div>
  `

  // --- 3. ADMIN ALERT TEMPLATE ---
  const adminHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b; background-color: #ffffff;">
      <div style="background-color: #0f172a; padding: 20px; text-align: center; color: #ffffff; margin-bottom: 25px; border-radius: 10px;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 800; color: #10b981;">⚡ New Quote Lead!</h2>
        <p style="margin: 5px 0 0 0; font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Vaishali Pest Control Notification Hub</p>
      </div>

      <p style="font-size: 15px; color: #334155; line-height: 1.5;">Hello Admin,</p>
      <p style="font-size: 15px; color: #334155; line-height: 1.5;">A potential customer has just requested a quote on the website. Here are the contact and requirement details:</p>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #f1f5f9;">
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: bold; color: #475569; width: 140px;">Customer Name:</td>
          <td style="padding: 12px; color: #0f172a; font-weight: bold;">${firstName} ${lastName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: bold; color: #475569;">Email Address:</td>
          <td style="padding: 12px; color: #0f172a;"><a href="mailto:${email}" style="color: #16a34a; text-decoration: none; font-weight: bold;">${email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: bold; color: #475569;">Phone Number:</td>
          <td style="padding: 12px; color: #0f172a;"><a href="tel:${phone}" style="color: #16a34a; text-decoration: none; font-weight: bold;">${phone}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: bold; color: #475569;">Pest Target:</td>
          <td style="padding: 12px; color: #ea580c; font-weight: bold; font-size: 15px;">${concern}</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold; color: #475569; vertical-align: top;">Notes/Details:</td>
          <td style="padding: 12px; color: #0f172a; line-height: 1.5;">${details ? `"${details}"` : '<em>None</em>'}</td>
        </tr>
      </table>

      <div style="text-align: center; margin-top: 30px;">
        <a href="mailto:${email}?subject=Vaishali%20Pest%20Control%20-%20Free%20Quote" style="display: inline-block; padding: 12px 24px; background-color: #0f172a; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 8px; margin-right: 10px; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">Reply via Email</a>
        <a href="${whatsappLink}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #25D366; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 8px; font-size: 14px; box-shadow: 0 4px 10px rgba(37,211,102,0.25);">Reply on WhatsApp</a>
      </div>
    </div>
  `

  try {
    // 1. Send confirmation to Customer
    await transporter.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: `🛡️ Free Quote Requested: ${concern} - Vaishali Pest Control`,
      html: customerHtml,
    })

    // 2. Send alert to Admin
    await transporter.sendMail({
      from: SMTP_FROM,
      to: ADMIN_EMAIL,
      subject: `🚨 [New Lead] ${firstName} ${lastName} - ${concern}`,
      html: adminHtml,
    })

    console.log(`✅ Automated quote emails successfully sent to client (${email}) and admin (${ADMIN_EMAIL})`)
    return { success: true }
  } catch (err: any) {
    console.error('❌ Error sending automated quote emails via SMTP:', err)
    return { success: false, error: err?.message || err }
  }
}
