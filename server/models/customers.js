const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const customerSchema = new Schema({
    phone: Number,
    name: String,
    image:String,
    email: String,
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

// Create a model
const Customers = mongoose.model('customers', customerSchema,'customers');

// Export the model
module.exports = Customers;