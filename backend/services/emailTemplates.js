/**
 * Email Templates - HTML email content
 */

export function userSignupEmail (userName) {
  return {
    subject: 'Welcome to Sara - Your Learning Journey Begins!',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 28px; }
    .body { background: #f9fafb; padding: 30px 20px; }
    .button { display: inline-block; background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; font-weight: 600; }
    .button:hover { background: #047857; }
    .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
    p { margin: 16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Sara!</h1>
    </div>
    <div class="body">
      <p>Hi ${userName},</p>
      <p>We're thrilled to have you join our JavaScript learning community. Get ready to master JavaScript with AI-powered personalized guidance, interactive coding challenges, and real projects.</p>
      <p><strong>What you can do now:</strong></p>
      <ul>
        <li>Access structured JavaScript curriculum</li>
        <li>Practice with interactive code editor</li>
        <li>Get AI feedback on your solutions</li>
        <li>Complete assignments and earn certificates</li>
      </ul>
      <p>
        <a href="https://codewithsara.in/dashboard" class="button">Go to Dashboard</a>
      </p>
      <p>Happy learning!</p>
      <p><strong>— Sara Team</strong></p>
    </div>
    <div class="footer">
      <p>Sara Learning Platform | support@codewithsara.in</p>
      <p>© 2026 Sara. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `
  }
}
