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
    subject: "Email Verification Code",
    text: `Your verification code is: ${verificationCode}`,
  };
};

export { transporter, mailOptions };
