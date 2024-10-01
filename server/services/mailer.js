const nodemailer = require('nodemailer');

// Configure the SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP server host
    port: 465, // Replace with your SMTP server port
    secure: true, // Use true for 465, false for other ports
    auth: {
        user: 'blueskyfreelance1@gmail.com', // Replace with your SMTP username
        pass: 'libq ztys pkcz shsf' // Replace with your SMTP password
    }
});

module.exports = transporter;