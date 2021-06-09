const nodemailer = require("nodemailer");
const ejs = require("ejs");

const sendEmail = (res, options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const { name, message, email } = options;

  ejs.renderFile(
    __dirname + "/../static/templates/email.ejs",
    {
      name: name,
      message: message,
      email: email,
    },
    (err, data) => {
      if (err) {
        return res.status(err.responseCode).json({ message: err.message });
      }

      const emailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}`,
        html: data,
      };

      transporter.sendMail(emailOptions, (err, data) => {
        if (err) {
          return res.status(err.responseCode).json({ message: err.message });
        }

        res.sendStatus(200);
      });
    }
  );
};

module.exports = sendEmail;
