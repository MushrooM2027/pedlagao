const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Or use SMTP or other services
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendPasswordResetEmail = async (to, token) => {
  const resetLink = `http://localhost:3000/reset?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Password Reset Request',
    html: `
      <h2>Reset your password</h2>
      <p>Click the link below to reset your password. This link is valid for 1 hour.</p>
      <a href="${resetLink}">${resetLink}</a>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetEmail };
