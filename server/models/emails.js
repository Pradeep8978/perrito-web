const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const emailSchema = new Schema({
    content: String,
    title: String,
    toMail: String,
});
// Create a model
const Email = mongoose.model('emails', emailSchema,'emails');

// Export the model
module.exports = Email;