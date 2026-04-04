/**
 * Email Service - Nodemailer Integration
 * Sends emails from support@codewithsara.in via Gmail SMTP
 */

import nodemailer from 'nodemailer'

let transporter = null

function getTransporter () {
  if (transporter) return transporter

  const gmailUser = process.env.GMAIL_USER
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10)

  if (!gmailUser || !gmailAppPassword) {
    console.warn('[EmailService] Missing GMAIL_USER or GMAIL_APP_PASSWORD - email sending disabled')
    return null
  }

  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false, // TLS on 587, not SSL
    auth: {
      user: gmailUser,
      pass: gmailAppPassword
    }
  })

  return transporter
}

/**
 * Send email with subject and HTML content
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} htmlContent - HTML email body
 * @returns {Promise<boolean>} true if sent successfully
 */
export async function sendEmail (to, subject, htmlContent) {
  try {
    const transport = getTransporter()
    if (!transport) {
      console.warn(`[EmailService] Skipping email to ${to} - transporter not configured`)
      return false
    }

    const emailFromName = process.env.EMAIL_FROM_NAME || 'Sara Learning Platform'
    const emailFromAddress = process.env.EMAIL_FROM_ADDRESS || process.env.GMAIL_USER

    const result = await transport.sendMail({
      from: `${emailFromName} <${emailFromAddress}>`,
      to,
      subject,
      html: htmlContent
    })

    console.log(`[EmailService] Email sent to ${to} - Message ID: ${result.messageId}`)
    return true
  } catch (error) {
    console.error(`[EmailService] Failed to send email to ${to}:`, error.message)
    return false
  }
}

/**
 * Verify transporter connection (useful for testing)
 */
export async function verifyEmailConfiguration () {
  try {
    const transport = getTransporter()
    if (!transport) {
      return { configured: false, message: 'Email configuration missing' }
    }

    await transport.verify()
    return { configured: true, message: 'Email configuration valid' }
  } catch (error) {
    return { configured: false, message: error.message }
  }
}
