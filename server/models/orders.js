const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({ 
    products: [
        {
            _id: "",
            quantity: "",
            price: "",
            requirements:[],
        }
    ],
    address: [{
        customerid:String,
        phone: Number,
        name: String,
        image: String,
        email: String,
        address_line_1: String,
        address_line_2: String,
        landmark: String,
        city: String,
        state: String,
        pincode: Number
    }],
    Tracking:Array,
    TransactionId:String,
    isCod:Boolean,
    status:Array,
    orderedOn : String,
    totalPrice: String

});

// Create a schema
// const orderSchema = new Schema({ 
//     product_name: String,
//     product_category: [String],
//     product_image: [String],
//     seller_info:{
//         seller_name: String,
//         seller_address_line_1: String,
//         seller_address_line_2: String,
//         seller_city: String,
//         seller_state: String,
//         seller_pincode: Number,
//         seller_email:String,  
//         seller_phone:Number
//     },
//     dimensions: {
//         product_height: String,
//         product_width: String,
//         product_weight: String
//     },
//     product_description:[String],
//     specifications: [{
//         product_label: String,
//         product_value: String,
//     }],
//     product_tags:[String],
//     quantity:Number,
//     product_count:Number,
//     product_important_info: String,
//     product_price: Number,
//     orderedOn : String,
//     customerId:String,
//     product_id:String,
//     Tracking:Array,
//     TransactionId:String,
//     isCod:Boolean,
//     status:Array
// });
// Create a model
const Orders = mongoose.model('orders', orderSchema,'orders');

// Export the model
module.exports = Orders;