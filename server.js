const PORT = 5000;
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});
app.listen(PORT, () => {
  console.log("Server Running sucessfully.");
});
app.get("/email", (req, res) => {
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1a4cce79b83738",
      pass: "58e4df1e1ee826",
    },
  });

  var mailOptions = {
    from: "webdev.rds@email.com",
    to: "joelideveloper@gmail.com",
    subject:
      "How To Send Email With Attachment Using Node.js - Techsolutionstuff",
    html: "<h1>Hello, This is techsolutionstuff !!</h1><p>This is test mail..!</p>",
    attachments: [
      {
        filename: "demo.png",
        path: "./uploads/demo.png",
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).json({ success: false });
    } else {
      res.json({ success: true, data: info.response });
    }
  });
});
