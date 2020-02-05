const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./configuration');
const Admin = require('./models/admin');
const Product = require('./models/products');

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
  try {
    // Find the user specified in token
    const user = await Admin.findById(payload.sub);

    // If user doesn't exists, handle it
    if (!user) {
      return done(null, false);
    }

    // Otherwise, return the user
    req.user = user;
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    // Find the user given the email
    const user = await Admin.findOne({ "email": email });
    
    // If not, handle it
    if (!user) {
      return done(null, false);
    }
  
    // Check if the password is correct
    const isMatch = await user.isValidPassword(password);
  
    // If not, handle it
    if (!isMatch) {
      return done(null, false);
    }
  
    // Otherwise, return the user
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));

