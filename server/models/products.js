const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create a schema
const productSchema = new Schema({ 
    name: String,
    categories: [String],
    images: [String],
    seller_info:{
        name: String,
        address_line_1: String,
        address_line_2: String,
        city: String,
        state: String,
        pincode: Number,
        email:String,
        phone:Number
    },
    dimensions: {
        height: String,
        width: String,
        weight: String
    },
    description:[String],
    specifications: [{
        label: String,
        value: String,
    }],
    tags:[String],
    count:Number,
    important_info: String,
    price: Number,
    createdOn : String,
    modifiedOn : String
});
// Create a model
const Product = mongoose.model('product', productSchema);

// Export the model
module.exports = Product;