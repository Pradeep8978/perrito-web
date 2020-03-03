const JWT = require("jsonwebtoken");
const Customers = require("../models/customers");
const { JWT_SECRET } = require("../configuration");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

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
    const { name, phone, email, password } = req.value.body;
    // Check if there is a user with the same email
    let foundCustomers = await Customers.findOne({ email: email });
    if (foundCustomers) {
      return res.status(403).json({ error: "Email is already in use" });
    }
    const cusObj = { ...req.body, createdOn: new Date().getTime() };
    // const imageUrls = ""
    if (req.body.image) {
      var buf = Buffer.from(req.body.image, "base64");
      console.log("BUFFFER length=>", buf.length);
      if (buf.length > 100 * 1024) {
        res.status(400).send({ message: "image size exceeds 100KB" });
        return;
      }
      const imgUrl = getImageUrl(req.body);
      fs.writeFile(imgUrl, buf, "binary", function(err) {
        if (err) throw err;
        console.log("File saved.");
      });
      cusObj.image = imgUrl;
    }
    const newCustomers = new Customers(cusObj);
    const customerObj = await newCustomers.save();
    // Generate the token
    const token = signToken(newCustomers);
    // res.setHeader('Authorization', token);
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
          res.status(400).json({ message: "Error in adding customer Address" });
        else res.json(response);
      }
    );
  },

  getProfile: async (req, res) => {
    res.send(req.user);
  }
};
