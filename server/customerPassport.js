const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./configuration');
const Admin = require('./models/admin');
const Product = require('./models/products');
const Customers = require('./models/customers');


const tokenExtractor = req => {
  let token = null;  
  console.log('HEADERS =>', req.headers)
    token = req.headers.authorization;
  return token;
  
}

export const signInStrategy = async (req, res, next) => {
    const customer = await Customers.findOne({ "phone": req.body.phone });
    // If not, handle it
    if (!customer) {
      return res.status(401).json({message: 'invalid credentials'})
    }
    req.customer = customer;
    next()
}

// JSON WEB TOKENS STRATEGY
// passport.use(new JwtStrategy({
//   jwtFromRequest: tokenExtractor,
//   secretOrKey: config.JWT_SECRET,
//   passReqToCallback: true
// }, async (req, payload, done) => {
//   try {
//     // Find the user specified in token
//     const customer = await Customers.findById(payload.sub);

//     // If user doesn't exists, handle it
//     if (!customer) {
//       return done(null, false);
//     }

//     // Otherwise, return the user
//     req.customer = customer;
//     done(null, customer);
//   } catch(error) {
//     done(error, false);
//   }
// }));

// // LOCAL STRATEGY
// passport.use(new LocalStrategy({
//   usernameField: 'phone'
// }, async (phone, done) => {
//   try {
//     // Find the user given the email
//     const customer = await Customers.findOne({ "phone": phone });
//     console.log("Customer Data",customer)
//     // If not, handle it
//     if (!customer) {
//       return done(null, false);
//     }
  
//     // Check if the password is correct
//     // const isMatch = await user.isValidPassword(password);
  
//     // // If not, handle it
//     // if (!isMatch) {
//     //   return done(null, false);
//     // }
  
//     // Otherwise, return the user
//     done(null, customer);
//   } catch(error) {
//     done(error, false);
//   }
// }));

