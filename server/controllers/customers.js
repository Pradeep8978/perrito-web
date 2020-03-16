const JWT = require("jsonwebtoken");
const Customers = require("../models/customers");
const { JWT_SECRET } = require("../configuration");
const multer = require("multer");
const mongoose = require("mongoose");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');



const signToken = customer => {
  return JWT.sign(
    {
      iss: "perrito",
      sub: customer.id,
      role: "customer",
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    JWT_SECRET
  );
};
const getImageUrl = body => {
  const imgPath = `uploads/customerimages/customer_${
    body.name
    }_${new Date().getTime()}.png`;
  return imgPath;
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email } = req.body;
    let foundCustomers = await Customers.findOne({ email: email });
    if (foundCustomers) {
      return res.status(403).json({ error: "Email is already in use" });
    }
    const cusObj = { ...req.body, createdOn: new Date().getTime() };
    const newCustomers = new Customers(cusObj);
    const customerObj = await newCustomers.save();
    // Generate the token
    const token = signToken(newCustomers);
    console.log("CUSTOMER OBJECT=>", customerObj);
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    console.log("Customer Details =>", req.user);
    // Generate token
    console.log("CUSTOMER SIGN IN =>", req.user);
    const token = signToken(req.user);
    // res.setHeader('Authorization', token);
    res.status(200).json({ token });
  },

  signOut: async (req, res, next) => {
    res.clearCookie("access_token");
    // console.log('I managed to get here!');
    res.json({ success: true });
  },

  checkAuth: async (req, res, next) => {
    // req.user.id = req.user._id;
    const token = signToken(req.user);
    console.log("I managed to get here!");
    res.json({ token });
  },

  //   getCustomers: async (req, res, next) => {
  //     const findSchema = req.query.role ? {
  //       'profile.role': { "$in": req.query.role }
  //     } : {};
  //     const users = await Customers.find(findSchema)
  //     res.json(users);
  //   },

  updateProfile: async (req, res) => {
    Customers.findOneAndUpdate(
      { _id: req.user.id },
      req.body,
      (err, response) => {
        if (err)
          res.status(400).json({ message: "Error in updating customer" });
        else res.json(response);
      }
    );
  },

  addNewAddress: (req, res) => {
    Customers.update(
      { _id: req.user.id },
      { $push: { address: req.body } },
      (err, response) => {
        if (err)
          res
            .status(400)
            .json({ message: "Error in adding customer Address", error: err });
        else res.json(response);
      }
    );
  },

  removeAddress: (req, res) => {
    console.log('PARAMS =>', req.params)
    Customers.updateOne(
      { _id: req.user.id },
      { $pull: { address: { _id: req.params.addressId } } },
      (err, response) => {
        if (err)
          res
            .status(400)
            .json({ message: "Error in Deleting customer Address", error: err });
        else res.json(response);
      }
    );
  },

  updateAddress: (req, res) => {
    const updateAddress = {};
    Object.keys(req.body).forEach(key => {
      updateAddress[`address.$.${key}`] = req.body[key];
    })
    Customers.updateOne(
      { _id: req.user.id, 'address._id': req.params.addressId },
      {
        $set: updateAddress
      },
      (err, response) => {
        if (err)
          res
            .status(400)
            .json({ message: "Error in adding customer Address", error: err });
        else res.json(response);
      }
    );
  },

  getProfile: async (req, res) => {
    res.send(req.user);
  },
  passwordUpdate: async (req, res) => {
    const oldpassword = req.body.oldpassword
    let findPassword = await Customers.findOne({ _id: req.user.id });
    const hash = findPassword.password
    bcrypt.compare(oldpassword, hash, function (err, isMatch) {
      if (err) {
        throw err
      } else if (!isMatch) {
        res.status(400).json({ message: "old password is not match" });
      } else {
        Customers.findOneAndUpdate(
          { _id: req.user.id }, { password: req.body.newpassword },
          (err, response) => {
            if (err)
              res.status(400).json({ message: "Error in updating customer" });
            else res.json(response);
          }
        );
      }
    })
  },
  otpGenerate: async (req, res) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    let foundCustomers = await Customers.findOne({ email: req.body.email });
    if (!foundCustomers) {
      return res.status(403).json({ error: "Email is not exit" });
    }
    Customers.findOneAndUpdate(
      { email: req.body.email }, { otp: otp },
      (err, response) => {
        if (err)
          res.status(400).json({ message: "Error in updating otp" });
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'chadapradeepreddy@gmail.com',
            pass: 'qmmypbseyfgplppo'
          }
        });
        const mailOptions = {
          from: 'indrajaranga@gmail.com',
          to: req.body.email,
          subject: 'Forgot Password',
          text: `your otp is ${otp}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log('ERROR', error);
            res.status(400).json({ message: "Error", error });
          } else {
            console.log('Email sent: ' + info.response);
            res.json(info.response);
          }
        }); res.json(response);
      }
    );
  },
  checkOtp: async (req, res) => {
    Customers.findOne({ email: req.body.email, otp: req.body.otp }, (err, response) => {
      if (err)
        res.status(400).json({ message: "Error in updating otp" });
      else {
        if (!response)
          res.status(404).json({ message: "Invalid otp or email" })
        else res.send({ success: true })
      }
    });
  },
  updateNewPassword: async (req, res) => {
    let foundCustomers = await Customers.findOne({ email: req.body.email });
    if (!foundCustomers) {
      return res.status(403).json({ error: "Email is not exit" });
    }
    Customers.findOneAndUpdate(
      { email: req.body.email }, { password: req.body.newpassword },
      (err, response) => {
        if (err)
          res.status(400).json({ message: "Error in updating customer" });
        else res.json(response);
      }
    );
  }
};
