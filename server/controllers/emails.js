const JWT = require("jsonwebtoken");
const Product = require("../models/products");
const Orders = require("../models/orders");
const Emails = require("../models/emails");
const { JWT_SECRET } = require("../configuration");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const nodemailer = require('nodemailer');
const getImageUrl = (body, id) => {
    const imgPath = `uploads/images/product_${body.name
        .split("/")
        .join("")}_${new Date().getTime()}_${id}.png`;
    return imgPath;
};

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
        // const mailSchema = {
        //     from: 'indrajaranga@gmail.com',
        //     toMail: req.body.toMail,
        //     title: req.body.title,
        //     content: req.body.content
        // };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('ERROR', error);
                res.status(400).json({ message: "Error", error });
            } else {
                console.log('Email sent: ' + info.response);
                res.json(info.response);
                // const newEmails = new Emails(mailSchema);
                // newEmails.save(function (err, emailDetails) {
                //     if (err) {
                //         res.status(405).send(err);
                //     }
                //     else {
                //         console.log("PRODUCT OBJECT=>", emailDetails)
                //         res.status(200).json({ emailDetails });
                //     }
                // });
            }
        });
    }
};
