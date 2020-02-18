const JWT = require('jsonwebtoken');
const Customers = require('../models/customers');
const { JWT_SECRET } = require('../configuration');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');



const signToken = customer => {
  return JWT.sign({
    iss: 'perrito',
    sub: customer.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}
const getImageUrl = (body) => {
  const imgPath = `uploads/customerimages/customer_${body.name}_${new Date().getTime()}.png`;
  return imgPath;
}

module.exports = {
  signUp: async (req, res, next) => {
    const {name, phone } = req.value.body;
    // Check if there is a user with the same email
    let foundCustomers = await Customers.findOne({ "phone": phone });
    if (foundCustomers) {
      return res.status(403).json({ error: 'Mobile number is already in use' });
    }
    const cusObj = { ...req.body, createdOn: new Date().getTime() }; 
    // const imageUrls = ""
    if (req.body.image) {
      var buf = Buffer.from(req.body.image, 'base64');
        console.log('BUFFFER length=>', buf.length)
        if (buf.length > 100 * 1024) {
          res.status(400).send({ message: 'image size exceeds 100KB' });
          return;
        }
        const imgUrl = getImageUrl(req.body);
        fs.writeFile(imgUrl, buf, 'binary', function (err) {
          if (err) throw err;
          console.log('File saved.')
        });
        cusObj.image = imgUrl;
    } 
    const newCustomers = new Customers(cusObj);
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
    const id = req.params.id
    const updateProfile = {}
    if(req.body.phone) updateProfile.phone = req.body.phone
    if(req.body.name) updateProfile.name = req.body.name
    if(req.body.email) updateProfile.email = req.body.email
    if(req.body.password) updateProfile.password = req.body.password
    if(req.body.dob) updateProfile.dob = req.body.dob
    if(req.body.gender) updateProfile.gender = req.body.gender
    if(req.body.address){
      updateProfile.address = {}
      if(req.body.address.address_line_1) updateProfile.address.address_line_1 = req.body.address.address_line_1
      if(req.body.address.address_line_2) updateProfile.address.address_line_2 = req.body.address.address_line_2
      if(req.body.address.city) updateProfile.address.city = req.body.address.city
      if(req.body.address.state) updateProfile.address.state = req.body.address.state
      if(req.body.address.pincode) updateProfile.address.pincode = req.body.address.pincode
    }
    Customers.findOneAndUpdate({_id:id}, updateProfile, { multi: false }, function (err, response) {
      if (err) res.json({ message: "Error in updating customer"});
      res.json(updateProfile);
    })
  },
  getProfile: async (req, res) => {
    res.send(req.user);
  }
}