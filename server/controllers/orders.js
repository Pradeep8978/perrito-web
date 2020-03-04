const JWT = require('jsonwebtoken');
const Product = require('../models/products');
const Orders = require('../models/orders');
const { JWT_SECRET } = require('../configuration');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const getImageUrl = (body, id) => {
  const imgPath = `uploads/images/product_${body.name.split("/").join("")}_${new Date().getTime()}_${id}.png`;
  return imgPath;
}

module.exports = {
    orderProduct: async (req, res, next) => {
        Product.findOne({_id:req.params.id}, function(err, result) {
            // const label = result.specifications.map((item)=> {
            //     return  item.label;
            // })
            // const value = result.specifications.map((item)=> {
            //     return  item.value;
            // })
            const orderProduct  = {orderOn: new Date().getTime(),
                customerId:req.user.id,
                proName:result.name,
                proCategory:result.categories,
                proImage:result.images,
                seller_name: result.seller_info.name,
                seller_address_line_1: result.seller_info.address_line_1,
                seller_address_line_2:  result.seller_info.address_line_2,
                seller_city: result.seller_info.city,
                seller_state: result.seller_info.state,
                seller_pincode: result.seller_info.pincode,
                seller_email:result.seller_info.email,
                seller_phone:result.seller_info.phone,
                proHeight: result.dimensions.height,
                proWidth: result.dimensions.width,
                proWeight: result.dimensions.weight,
                proDescription:result.description,
                // proLabel: label,
                // proValue: value,
                proTags:result.tags,
                proCount:result.count,
                proImportant_info: result.important_info,
                proPrice: result.price,
                ProductId:req.params.id
            };

            const newProductOrder = new Orders(orderProduct); 
            newProductOrder.save(function (err, orderDetails){
              if (err){
                req.status(405).send(err);
              }
              else{
                console.log("FEEDBACK DETAILS=>", orderDetails)
                res.status(200).json(orderDetails);
              }
            });
        });
    }
}