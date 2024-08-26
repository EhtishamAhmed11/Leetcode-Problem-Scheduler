import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASS,
  },
});

export const sendEmail = async (to, subject, text, html) => {
  const mailOption = {
    from: process.env.APP_EMAIL,
    to,
    subject,
    text,
    html,
  };
  try {
    await transporter.sendMail(mailOption);
    console.log("Email Sent Successfully!");
  } catch (error) {
    console.log("Error Sending Email: ", error.message);
  }
};
