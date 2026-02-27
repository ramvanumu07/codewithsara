/**
 * Certificate Service - Sara Learning Platform
 * MongoDB-style design: Proof of Completion, decorative green shapes, signature bottom-left
 * Landscape 595 x 420 pt
 */

import PDFDocument from 'pdfkit'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CERTIFICATE_TOPICS_REQUIRED = 45

export const CERTIFICATE_TOPICS = CERTIFICATE_TOPICS_REQUIRED

const SIGNATURE_PATH = path.join(__dirname, '..', 'assets', 'signature.png')

const SARA_GREEN = '#10a37f'
const SARA_GREEN_DARK = '#0d8a6c'

/**
 * Generate a completion certificate PDF for a user
 * @param {Object} options
 * @param {string} options.fullName - User's full name (not username)
 * @param {string} options.completionDate - ISO date string when certificate is issued
 * @returns {Promise<Buffer>} PDF buffer
 */
export async function generateCertificatePDF({ fullName, completionDate }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      layout: 'portrait',
      size: [595, 420],
      margins: { top: 0, bottom: 0, left: 0, right: 0 }
    })

    const chunks = []
    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    const pageWidth = doc.page.width
    const pageHeight = doc.page.height
    const margin = 50
    const textWidth = pageWidth * 0.45

    // ----- Border -----
    doc.rect(2, 2, pageWidth - 4, pageHeight - 4)
      .strokeColor('#d1d5db')
      .lineWidth(1)
      .stroke()

    // ----- Decorative green shapes (right side, small top connected to large bottom) -----
    doc.save()
    doc.ellipse(pageWidth, 200, 100, 80)
      .fillColor(SARA_GREEN_DARK)
      .fill()
    doc.ellipse(pageWidth - 80, pageHeight - 80, 140, 130)
      .fillColor(SARA_GREEN_DARK)
      .fill()
    doc.restore()

    // ----- Sara branding in green area (bottom right, bold) -----
    doc.fillColor('#ffffff')
    doc.fontSize(16)
    doc.font('Helvetica-Bold')
    doc.text('Sara Learning Platform', pageWidth - 200, pageHeight - 95, { width: 180, align: 'right' })

    // ----- Left content area -----
    doc.fillColor('#1a1a1a')

    // Proof of Completion
    doc.fontSize(20)
      .font('Helvetica-Bold')
      .fillColor(SARA_GREEN)
      .text('Proof of Completion', margin, 45, { width: textWidth })

    // Congratulations to
    doc.fontSize(12)
      .font('Helvetica')
      .fillColor('#374151')
      .text('Congratulations to', margin, 95, { width: textWidth })

    // Name (single line)
    doc.fontSize(22)
      .font('Helvetica-Bold')
      .fillColor('#1a1a1a')
      .text(fullName || 'Student', margin, 118, { width: 420, lineBreak: false })

    // For successfully completing
    doc.fontSize(12)
      .font('Helvetica')
      .fillColor('#374151')
      .text('For successfully completing', margin, 175, { width: textWidth })

    // Course name (single line)
    doc.fontSize(14)
      .font('Helvetica-Bold')
      .fillColor('#1a1a1a')
      .text('The Full-Stack JavaScript & Modern Development Course', margin, 198, { width: 420, lineBreak: false })

    // On [Date]
    const formattedDate = completionDate
      ? new Date(completionDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
      : new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
    doc.fontSize(12)
      .font('Helvetica')
      .fillColor('#374151')
      .text(`On ${formattedDate.replace(/\//g, '-')}`, margin, 235, { width: textWidth })

    // ----- Signature block (bottom left) -----
    const sigBlockY = 265
    const sigWidth = 115
    const sigHeight = 45
    const hasSignature = fs.existsSync(SIGNATURE_PATH)

    if (hasSignature) {
      try {
        doc.image(SIGNATURE_PATH, margin, sigBlockY, { width: sigWidth, height: sigHeight, fit: [sigWidth, sigHeight] })
      } catch (_) {
        doc.moveTo(margin, sigBlockY + 22)
          .lineTo(margin + sigWidth, sigBlockY + 22)
          .strokeColor('#1a1a1a')
          .lineWidth(1)
          .stroke()
      }
    } else {
      doc.moveTo(margin, sigBlockY + 22)
        .lineTo(margin + sigWidth, sigBlockY + 22)
        .strokeColor('#1a1a1a')
        .lineWidth(1)
        .stroke()
    }

    const nameY = sigBlockY + (hasSignature ? sigHeight + 5 : 30)
    doc.fontSize(10)
      .fillColor('#1a1a1a')
      .font('Helvetica-Bold')
      .text('DIRECTOR', margin, nameY, { width: 200 })
    doc.fontSize(9)
      .fillColor('#6b7280')
      .font('Helvetica')
      .text('Sara Learning Platform', margin, nameY + 14, { width: 200 })

    doc.end()
  })
}
