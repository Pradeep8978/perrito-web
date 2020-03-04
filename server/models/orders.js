const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create a schema
const orderSchema = new Schema({ 
    proName: String,
    proCategory: [String],
    proImage: [String],
    seller_info:{
        seller_name: String,
        seller_address_line_1: String,
        seller_address_line_2: String,
        seller_city: String,
        seller_state: String,
        seller_pincode: Number,
        seller_email:String,  
        seller_phone:Number
    },
    dimensions: {
        proHeight: String,
        proWidth: String,
        proWeight: String
    },
    proDescription:[String],
    specifications: [{
        proLabel: String,
        proValue: String,
    }],
    proTags:[String],
    proCount:Number,
    proImportant_info: String,
    proPrice: Number,
    orderedOn : String,
    customerId:String,
    ProductId:String,
    Tracking:Array,
    TransactionId:String,
    isCod:Boolean,
    status:Array
});
// Create a model
const Orders = mongoose.model('orders', orderSchema,'orders');

// Export the model
module.exports = Orders;