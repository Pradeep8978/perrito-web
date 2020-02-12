const JWT = require('jsonwebtoken');
const Product = require('../models/products');
const { JWT_SECRET } = require('../configuration');
const multer = require('multer');
const upload = multer({dest:'uploads/'})
const fs = require('fs');
const getImageUrl = (body, id) => {
  const imgPath = `uploads/images/product_${body.name}_${new Date().getTime()}_${id}.png`;
  return imgPath;
}


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
    const productObj = {...req.body, createdOn: new Date().getTime()};
    const imageUrls = []
    if(req.body.images){
      req.body.images.map((image, index)=>{
        var buf = Buffer.from(image, 'base64');
        console.log('BUFFFER length=>', buf.length)
        if(buf.length>100*1024){
            res.status(400).send({message: 'image size exceeds 100KB'});
            return;
        }
        const imgUrl = getImageUrl(req.body, index);
        imageUrls.push(imgUrl);
        fs.writeFile(imgUrl, buf, 'binary', function(err){
            if (err) throw err;
            console.log('File saved.')
        });
      })
      // const imageUrls = await Promise.all(imagesPromise).then(res => res).catch(err => null)
      console.log("image Urls",imageUrls)
      productObj.images = imageUrls;
    }
    const newProduct = new Product(productObj);

    newProduct.save(function (err, productDetails) {
    const newProduct = new Product(productObj);  
      newProduct.save(function (err, productDetails) {
      if (err) {
          res.status(405).send(err);
      }
      else {
        const token = signToken(newProduct);
        console.log("PRODUCT OBJECT=>", newProduct)
        res.status(200).json({token});
      }
  });
  });
},
  getProducts: async (req, res, next) => {
    Product.find({},function(err, response){
      if(err) res.status(404).json({message: "Error in fetfching products " + req.user.id});
      res.json(response);
   }); 
  },
  updateProduct: async(req,res)=>{
    const id = req.params.id
    const updateProduct = {};
    updateProduct.modifiedOn = new Date().getTime();
    if(req.body.name) updateProduct.name = req.body.name;
    if(req.body.categories) updateProduct.categories = req.body.categories;
    if(req.body.seller_info){
      updateProduct.seller_info = {};
      if(req.body.seller_info.name) updateProduct.seller_info.name = req.body.seller_info.name;
      if(req.body.seller_info.address_line_1)updateProduct.seller_info.address_line_1 = req.body.seller_info.address_line_1;
      if(req.body.seller_info.address_line_2) updateProduct.seller_info.address_line_2 = req.body.seller_info.address_line_2;
      if(req.body.seller_info.city)updateProduct.seller_info.city = req.body.seller_info.city;
      if(req.body.seller_info.state)updateProduct.seller_info.state = req.body.seller_info.state;
      if(req.body.seller_info.pincode)updateProduct.seller_info.pincode = req.body.seller_info.pincode
      if(req.body.seller_info.email)updateProduct.seller_info.email = req.body.seller_info.email;
    }
    if(req.body.dimensions){
      updateProduct.dimensions = {};
      if(req.body.dimensions.height)updateProduct.dimensions.height=req.body.dimensions.height;
      if(req.body.dimensions.width)updateProduct.dimensions.width = req.body.dimensions.width;
      if(req.body.dimensions.weight)updateProduct.dimensions.weight = req.body.dimensions.weight;
    }
    if(req.body.description)updateProduct.description=req.body.description;
    if(req.body.specifications)updateProduct.specifications = req.body.specifications;
    if(req.body.tags)updateProduct.tags=req.body.tags;
    if(req.body.important_info) updateProduct.important_info= req.body.important_info;
    if(req.body.price)updateProduct.price = req.body.price; 
    if(req.body.images){
      const imageUrls = req.body.images.map(image=>{
        var buf = Buffer.from(image, 'base64');
        console.log('BUFFFER length=>', buf.length)
        if(buf.length>100*1024){
            res.status(400).send({message: 'image size exceeds 100KB'});
            return;
        }
        const imgUrl = getImageUrl(req.body);
        fs.writeFile(imgUrl, buf, 'binary', function(err){
            if (err) throw err;
            console.log('File saved.')
        });
      })
      updateProduct.images = req.body.images;
    } 
    Product.findOneAndUpdate({_id:id},updateProduct,{multi: false},function(err,response){
      if(err)res.json({message:"Error in updating product"});
      res.json(response)
    })
  },
  deleteProduct: async(req,res)=>{
    Product.findOneAndDelete({_id:req.params.id},function(err,response){
      if(err)res.json({message:"Error in deleteting product"})
        res.json(response);
    });
  }


}