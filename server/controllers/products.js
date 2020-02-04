const JWT = require('jsonwebtoken');
const Product = require('../models/products');
const { JWT_SECRET } = require('../configuration');

const signToken = user => {
  return JWT.sign({
    iss: 'perrito',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  createProduct: async (req, res, next) => {
    const productObj = req.body;
    const newProduct = new Product(productObj);  
      newProduct.save(function (err, productDetails) {
      if (err) {
          req.status(405).send(err);
      }
      else {
        const token = signToken(newProduct);
        console.log("USER OBJECT=>", newProduct)
        res.status(200).json({token});
      }
  });
  },
  

  getProducts: async (req, res, next) => {
    Product.find({},function(err, response){
      if(err) res.status(404).json({message: "Error in fetfching products " + req.user.id});
      res.json(response);
   }); 
  },


}