const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

async function sendMail(to, subject, html) {
  await transporter.sendMail({
    from: process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USERNAME,
    to,
    subject,
    html,
  });
}

module.exports = { sendMail };
