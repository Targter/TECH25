import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMerchOrderConfirmationEmail = async (
  toEmail: string,
  fullName: string
  // You can later add products, amount, couponApplied as parameters
) => {
  const mailOptions = {
    from: `"TECHNICIA'25 Merchandise" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "✅ Your Merchandise Order Confirmation | TECHNICIA’25",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <p>Dear ${fullName},</p>

        <p>🎉 Thank you for ordering official <strong>TECHNICIA'25 Merchandise</strong>! Your order has been successfully confirmed.</p>

        <p><strong>Order Summary:</strong></p>
        <ul>
          <li>Products: [PRODUCTS PLACEHOLDER]</li>
          <li>Total Amount: [AMOUNT PLACEHOLDER]</li>
          <li>Coupon Applied: [COUPON PLACEHOLDER]</li>
        </ul>

        <p>Your merchandise will be processed and shipped soon. We will notify you once it is on the way.</p>

        <p>For any queries regarding your order, feel free to reply to this email or contact us at 
        <a href="mailto:official@technicia.live" style="color: #2980b9;">official@technicia.live</a>.</p>

        <p>Thank you for supporting TECHNICIA'25!</p>

        <p>Warm regards,<br/>
        <strong>Merchandise Team – TECHNICIA'25</strong><br/>
        ISTE Student Chapter<br/>
        Chandigarh University</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (err) {
    console.error('Error sending email:', err);
    throw new Error('Failed to send merchandise confirmation email');
  }
};

export default sendMerchOrderConfirmationEmail;
