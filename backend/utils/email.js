const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1)Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL.PORT,
    auth: {
      user: process.env.EMAIL.USER,
      pass: process.env.EMAIL.PASSWORD,
    },
  });

  // 2)Define the email options
  const mailOptions = {
    from: "Ash <ash@gmail.com>",
    to: options.mail,
    subject: options.subject,
    text: options.message,
  };

  // 3)Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
