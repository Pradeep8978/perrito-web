const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create a schema
const productSchema = new Schema({ 
    name: String,
    categories: [String],
    seller_info:{
        name: String,
        address_line_1: String,
        address_line_2: String,
        city: String,
        state: String,
        pincode: Number,
    },
    dimensions: {
        height: String,
        width: String,
        weight: String
    },
    description:[String],
    specs: [String],
    important_info: String,
    availablePins: [String],
    price: Number
});
// Create a model
const Product = mongoose.model('product', productSchema);

// Export the model
module.exports = Product;