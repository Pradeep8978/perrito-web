const JWT = require('jsonwebtoken');
const Admin = require('../models/users');
const { JWT_SECRET } = require('../configuration');

const signToken = admin => {
  return JWT.sign({
    iss: 'ramustocks',
    sub: admin.id,
    role:"admin",
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password, name, phone } = req.value.body;
    
    // Check if there is a user with the same email
    let foundAdmin = await Admin.findOne({ "email": email });
    if (foundAdmin) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    // Create a new user
    const role = 'admin'
    const newAdmin = new Admin({
      email,
      phone,
      name,
      role,
      password
    });


    const userObj = await newAdmin.save();

    // Generate the token
    const token = signToken(newAdmin);
    // res.setHeader('Authorization', token);
    console.log("USER OBJECT=>", userObj)
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    console.log("req.user",req.user)
    // Generate token
    console.log('USER SIGN IN =>', req.user)
    const token = signToken(req.user);

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

  getAdmins: async (req, res, next) => {
    const findSchema = req.query.role ? {
      'profile.role': { "$in": req.query.role }
    } : {};
    const users = await Admin.find(findSchema)
    res.json(users);
  }
}