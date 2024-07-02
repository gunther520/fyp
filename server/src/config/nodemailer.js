import nodemailer from "nodemailer";

const adminEmail = "j179988143412@gmail.com";
const adminPassword = "efoi shto seyq bztk";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: adminEmail,
    pass: adminPassword,
  },
});

const mailOptions = (email, verificationCode) => {
  return {
    from: adminEmail,
    to: email,
    subject: "ToiletGuide Email Verification Code",
    text: `Your ToiletGuide verification code is: ${verificationCode}. Please enter this code to complete your registration.`,
    html: `
        <h2>ToiletGuide Email Verification</h2>
        <p>Dear User,</p>
        <p>Thank you for registering with ToiletGuide. Please use the following verification code to complete your registration:</p>
        <p style="font-size: 18px; font-weight: bold;">${verificationCode}</p>
        <p>If you did not request this code, please ignore this email.</p>
        <footer>
          <p>Regards,<br/>The ToiletGuide Team</p>
        </footer>
      `,
  };
};

export { transporter, mailOptions };
