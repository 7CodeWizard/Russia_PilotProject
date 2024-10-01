const nodemailer = require("nodemailer");
const Email = require("../models/emailModel");
const transporter = require("../services/mailer");

const sendEmail = async (req, res, next) => {
  try {
    const mailOptions = {
      to: 'takedaharuhito0914@gmail.com',
      subject: `New Contact`,
      html: `
                <p>Hi, there is a new contact:</p>
                <ul>
                    <li>Full Name: ${req.body.name}</li>
                    <li>Contacts: ${req.body.email}</li>
                    <li>Content: ${req.body.content}</li>
                </ul>
            `,
      attachments: req.file ? [{
        filename: req.file.originalname,
        path: req.file.path // The file path where it is saved
      }] : [] // If no file uploaded, no attachments
    };
    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Successfully sent!" });
  } catch (error) {
    return res.status(200).json({
      error: "Don't sent Email"
    });
  }
}

// const createEmail = async (req, res) => {
//   try {
//     const result = new Email(req.body);
//     const { email } = req.body;
//     const emailExists = await Email.findOne({ email });
//     if (emailExists) {
//       res.status(200).json({ error: "User already exists" });
//     } else {
//       await result.save();
//       return res.status(200).json({ message: "Success" });
//     }
//   } catch (error) {
//     return res.status(200).json({ error: "Incorrect email!" });
//   }
// };

// const getEmails = async (req, res) => {
//   const email = await Email.find({});
//   res.status(200).json(email);
// };

// const getEmailByID = async (req, res) => {
//   const email = await Email.findById(req.params.id);
//   if (email) {
//     res.status(200).json(email);
//   } else {
//     res.status(404).json({ error: "email not found" });
//   }
// };

// const deleteEmail = async (req, res) => {
//   try {
//     let result = await Email.deleteOne({ _id: req.params.emailid });
//     let data = await Email.find();
//     res.json(data);
//   } catch (err) {
//     return res.status(400).json({ error: err });
//   }
// };

module.exports = {
  sendEmail,
};
