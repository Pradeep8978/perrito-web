const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const customerSchema = new Schema({
    phone: Number,
    name: String
});

// Create a model
const Customers = mongoose.model('customers', customerSchema,'customers');

// Export the model
module.exports = Customers;