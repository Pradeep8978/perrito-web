const JWT = require('jsonwebtoken');
const Product = require('../models/products');
const { JWT_SECRET } = require('../configuration');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const getImageUrl = (body, id) => {
  const imgPath = `uploads/images/product_${body.name.split("/").join("")}_${new Date().getTime()}_${id}.png`;
  return imgPath;
}

// const getAggregationPipeline = (params) => {
//   const pipeline = [];
//   const {category, search} = params;
//   if(category){
//     pipeline.push({
//       categories: {
//         $in: [
//           category
//         ]
//       }
//     })
//   }
//   return pipeline;
// }

module.exports = {
  createProduct: async (req, res, next) => {
    const productObj = { ...req.body, createdOn: new Date().getTime() };
    const newProduct = new Product(productObj);
    newProduct.save(function (err, productDetails) {
      if (err) {
        res.status(405).send(err);
      }
      else {
        // const token = signToken(productDetails);
        console.log("PRODUCT OBJECT=>", productDetails)
        res.status(200).json({ productDetails });
      }
    });
  },
  getProducts: async (req, res, next) => {
    const searchConfig = {};
    if(req.query.categories){       
      searchConfig.categories = req.query.categories
      Product.find(
        {"categories":{ $regex: new RegExp("^" + searchConfig.categories.toLowerCase(), "i") } },
        {sort: {'_id': -1}},
         function (err, response) {
        if (err) res.status(404).send(err);       
          res.json(response);
      });
    } else{
    Product.find({ }, function (err, response) {
      if (err) res.status(404).send(err);
        res.json(response);
    });
  }
    
  },
  updateProduct: async (req, res) => {
    const id = req.params.id
    const updatedProduct = req.body;
    updatedProduct.modifiedOn = new Date().getTime();
    Product.findOneAndUpdate({ _id: id }, updatedProduct, { multi: false }, function (err, response) {
      if (err) res.json({ message: "Error in updating product" });
      res.json(response)
    })
  },
  deleteProduct: async (req, res) => {
    Product.findOneAndDelete({ _id: req.params.id }, function (err, response) {
      if (err) res.json({ message: "Error in deleteting product" })
      res.json(response);
    });
  }
}