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

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: tokenExtractor,
  secretOrKey: config.JWT_SECRET,
  passReqToCallback: true
}, async (req, payload, done) => {
  var admin, customer
  try {
    // Find the user specified in token
    if (payload.role == 'admin') {
      admin = await Admin.findById(payload.sub);
      if (!admin) {
        return done(null, false);
      }
      done(null, admin);
    }
    if (payload.role == 'customer') {
      customer = await Customers.findById(payload.sub);
      if (!customer) {
        return done(null, false);
      }
      done(null, customer);
    }
    // Otherwise, return the
  } catch (error) {
    done(error, false);
  }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  let admin, customer;
  try {
    // Find the user given the email
    if (req.body.role == 'admin') {
      admin = await Admin.findOne({ "email": email });
      if (!admin) {
        return done(null, false);
      }
      const isAdminMatch = await admin.isValidPassword(password);
      if (!isAdminMatch) {
        return done(null, false);
      }
      done(null, admin);

    }

    if (req.body.role == 'customer') {
      customer = await Customers.findOne({ "email": email });
      if (!customer) {
        return done(null, false);
      }
      const isMatch = await customer.isValidPassword(password);
      console.log('MATCH =>', isMatch)
      if (!isMatch) {
        return done(null, false);
      }
      done(null, customer);
    }
    // If not, handle it
  } catch (error) {
    done(error, false);
  }
}));

