const JWT = require('jsonwebtoken');
const Customers = require('../models/customers');
const { JWT_SECRET } = require('../configuration');

const signToken = customer => {
  return JWT.sign({
    iss: 'perrito',
    sub: customer.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    const {name, phone } = req.value.body;
    // Check if there is a user with the same email
    let foundCustomers = await Customers.findOne({ "phone": phone });
    if (foundCustomers) {
      return res.status(403).json({ error: 'Mobile number is already in use' });
    }
    // Create a new user
    const newCustomers = new Customers({
      phone,name
    });
    const customerObj = await newCustomers.save();
    // Generate the token
    const token = signToken(newCustomers);
    // res.setHeader('Authorization', token);
    console.log("CUSTOMER OBJECT=>", customerObj)
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    // Generate token
    console.log('CUSTOMER SIGN IN =>', req.customer)
    const token = signToken(req.customer);
    // res.setHeader('Authorization', token);
    res.status(200).json({ token });
  },

  signOut: async (req, res, next) => {
    res.clearCookie('access_token');
    // console.log('I managed to get here!');
    res.json({ success: true });
  },


  checkAuth: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ success: true });
  },

//   getCustomers: async (req, res, next) => {
//     const findSchema = req.query.role ? {
//       'profile.role': { "$in": req.query.role }
//     } : {};
//     const users = await Customers.find(findSchema)
//     res.json(users);
//   },

  updateProfile: async (req, res) => {
    const profileObj = req.body || {}
    // if(req.body.phone) updateProfile.phone = req.body.phone
    // if(req.body.name) updateProfile.name = req.body.name
    // if(req.body.email) updateProfile.email = req.body.email
    // if(req.body.password) updateProfile.password = req.body.password
    Customers.findByIdAndUpdate(req.user.id, profileObj, { multi: false }, function (err, response) {
      if (err) res.json({ message: "Error in updating product with id " + req.user.id });
      res.json(response);
    })
    // console.log('UPDATE PROFILE BODY', req.body);
    // console.log('USER INFO =>', req.user);
    // const newProfile = {...req.user.profile, ...req.body}
    // await Customers.update({ _id: req.user._id}, {profile: newProfile});
    // res.send({message: 'success'});
  },

  getProfile: async (req, res) => {
    res.send(req.user);
  }
}