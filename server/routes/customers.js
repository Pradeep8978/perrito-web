const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
// const passportConf = require('../passport');
// const {signInStrategy} = require('../customerPassport');
// const axios = require('axios')
const {
  validateBody,
  schemas,
  validateParams
} = require("../helpers/routeHelpers");
const CustomerController = require("../controllers/customers");
const passportSignIn = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });
const multer = require("multer");
const CircularJSON = require("circular-json");
var os = require("os");
// SET STORAGE
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

router
  .route("/signup")
  .post(validateBody(schemas.customerAuthSchema), CustomerController.signUp);

router
  .route("/signin")
  .post(
    validateBody(schemas.customerloginSchema),
    passportSignIn,
    CustomerController.signIn
  );

router
  .route("/profile/update")
  .put(
    validateBody(schemas.customerupdateSchema),
    CustomerController.updateProfile
);

router.route("/profile/address/new").post(passportJWT,validateBody(schemas.customerAddress), CustomerController.addNewAddress);

router.route("/profile").get(passportJWT, CustomerController.getProfile);

router.route("/status").get(passportJWT, CustomerController.checkAuth);

module.exports = router;
