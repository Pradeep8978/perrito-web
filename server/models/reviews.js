const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create a schema
const reviewSchema = new Schema({ 
    ratting: Number,
    description: String,
    customer_picture:[String]
});
// Create a model
const Review = mongoose.model('review', reviewSchema,'review');

// Export the model
module.exports = Review;