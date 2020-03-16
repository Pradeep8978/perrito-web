const Emails = require("../models/emails");
const nodemailer = require('nodemailer');

module.exports = {
    postEmail: async (req, res) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'chadapradeepreddy@gmail.com',
                pass: 'qmmypbseyfgplppo'
            }
        });
        const mailOptions = {
            from: 'indrajaranga@gmail.com',
            to: req.body.toMail,
            subject: req.body.title,
            text: req.body.content
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('ERROR', error);
                res.status(400).json({ message: "Error", error });
            } else {
                console.log('Email sent: ' + info.response);
                res.json(info.response);
            }
        });
    }
};
