const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const customerSchema = new Schema({
    phone: Number,
    name: String,
    image:String,
    email: String,
    password:String,
    dob: String,
    gender:String,
    address: {
      address_line_1: String,
      address_line_2: String,
      city: String,
      state: String,
      pincode: Number
    },
    createdOn :String
});
customerSchema.pre('save', async function (next) {
  try {
    const customer = this;
    //check if the admin has been modified to know if the password has already been hashed
    if (!customer.isModified('password')) {
      next();
    }
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    console.log('Password =>', this.password)
    this.password = await bcrypt.hash(this.password, salt);
    console.log('exited');
    next();
  } catch (error) {
    next(error);
  }
  
});
customerSchema.pre('findOneAndUpdate', function (next) {
  if (!this._update.password ) {
    return next();
}
  this._update.password = bcrypt.hashSync(this._update.password, 10)
  next();
})
customerSchema.methods.isValidPassword = async function (newPassword) {
  console.log(newPassword, this.password);
  try {
    return await bcrypt.compare(newPassword, this.password);
  } 
  catch (error) {
    throw new Error(error);
  }
}


// Create a model
const Customers = mongoose.model('customers', customerSchema,'customers');

// Export the model
module.exports = Customers;