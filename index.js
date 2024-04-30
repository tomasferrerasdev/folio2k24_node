require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const bodyParser = require("body-parser");

const app = express();
app.use(
  cors({
    origin:
      "https://folio2k24node-br6xpxkxh-tomasferrerasdevs-projects.vercel.app",
  })
);
const port = process.env.PORT;
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

app.post("/api/contact", (req, res) => {
  console.log(req.body);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: "hellotomasdev@gmail.com",
    subject: "Hey Tomas, you have a new message from your website!",
    text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });

  console.log("FINISH");
});

module.exports = app;
