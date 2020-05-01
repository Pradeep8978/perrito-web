const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
    phone: Number,
    name: String,
    email: String,
    password: String,
    role:String,
    bankdetails: {    
    }
});
userSchema.pre('save', async function (next) {
  try {
    const User = this;
    //check if the User has been modified to know if the password has already been hashed
    if (!User.isModified('password')) {
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
userSchema.pre('findOneAndUpdate', function (next) {
  this._update.password = bcrypt.hashSync(this._update.password, 10)
next();
})

userSchema.methods.isValidPassword = async function (newPassword) {
  console.log(newPassword, this.password);
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
}


// Create a model
const User = mongoose.model('users', userSchema,'users');

// Export the model
module.exports = User;