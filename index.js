// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail", // Gmail use kar rahe ho to
  auth: {
    user: 'websiteemailxx@gmail.com', // apna email
    pass: 'kzmi kqsu vztr sjzz', // app password agar Gmail hai
  },
});

// API route to handle contact form
app.post("/send", async (req, res) => {
  const { name, email, message, subject} = req.body;

  if (!name || !email || !message || !subject) {
    return res.status(400).json({ msg: "Please provide all fields" });
  }

  const mailOptions = {
    from: email,
    to: 'vk722413@gmail.com', // jaha mail receive karna hai
    subject: `${name} has send email regarding ${subject}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ msg: "Failed to send email" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
