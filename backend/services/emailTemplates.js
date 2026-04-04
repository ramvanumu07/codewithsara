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

export function promoterSignupEmail (promoterName, couponCode) {
  return {
    subject: 'Welcome to Sara Promoter Program!',
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
    .coupon-box { background: white; border: 2px solid #059669; padding: 20px; border-radius: 6px; text-align: center; margin: 20px 0; }
    .coupon-box .label { color: #6b7280; font-size: 14px; margin-bottom: 8px; }
    .coupon-box .code { font-size: 24px; font-weight: bold; color: #059669; letter-spacing: 2px; font-family: monospace; }
    .highlight { display: inline-block; background: #dcfce7; color: #166534; padding: 8px 12px; border-radius: 4px; font-weight: 600; margin-top: 20px; }
    .button { display: inline-block; background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; font-weight: 600; }
    .button:hover { background: #047857; }
    .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
    p { margin: 16px 0; }
    ul { padding-left: 24px; }
    li { margin: 8px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Sara Promoter Program!</h1>
    </div>
    <div class="body">
      <p>Hi ${promoterName},</p>
      <p>Thank you for joining the Sara Promoter Program! We're excited to have you as part of our community. Your account is ready to go!</p>
      
      <div class="coupon-box">
        <div class="label">Your Unique Promotion Code</div>
        <div class="code">${couponCode}</div>
      </div>
      
      <p><strong>Here's how it works:</strong></p>
      <ul>
        <li>Share your coupon code with friends and followers</li>
        <li>Request a payout when your earnings reach ₹1,000</li>
        <li>Money transferred to your bank or UPI account</li>
      </ul>
      
      <p><strong>Get started now:</strong> Log in to your dashboard to see your coupon code and start sharing!</p>
      
      <div class="highlight">Status: Active ✓</div>
      
      <a href="https://codewithsara.in/promoter/dashboard" class="button">Go to Promoter Dashboard</a>
      
      <p>Questions? Reply to this email or contact support@codewithsara.in</p>
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

export function payoutInitiatedEmail (promoterName, amount) {
  return {
    subject: `Payout Initiated: ₹${amount} on the way! 💰`,
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
    .amount-box { background: white; border: 2px solid #667eea; padding: 20px; border-radius: 6px; text-align: center; margin: 20px 0; }
    .amount-box .label { color: #6b7280; font-size: 14px; margin-bottom: 8px; }
    .amount-box .amount { font-size: 32px; font-weight: bold; color: #667eea; }
    .info-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin: 20px 0; }
    .info-box strong { color: #1e40af; }
    .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
    p { margin: 16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Payout Initiated! 💰</h1>
    </div>
    <div class="body">
      <p>Hi ${promoterName},</p>
      <p>Congratulations! Your payout has been initiated.</p>
      
      <div class="amount-box">
        <div class="label">Amount</div>
        <div class="amount">₹${amount}</div>
      </div>
      
      <div class="info-box">
        <p><strong>Expected Arrival:</strong> 1-2 hours (usually faster)</p>
        <p><strong>Status:</strong> In Process</p>
        <p>The money will be transferred to your registered bank account or UPI ID.</p>
      </div>
      
      <p>You can track the status of all your payouts in your promoter dashboard.</p>
      
      <p>Thank you for promoting Sara! Every student you bring helps them learn JavaScript better.</p>
      
      <p>Questions? Reply to this email or visit support@codewithsara.in</p>
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
