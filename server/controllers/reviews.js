const JWT = require('jsonwebtoken');
const Review = require('../models/reviews');
const Customers = require('../models/customers');
const { JWT_SECRET } = require('../configuration');
const multer = require('multer');
const fs = require('fs');
const getImageUrl = (body) => {
  const imgPath = `./uploads/images/product_${body.name}_${new Date().getTime()}.png`;
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
  customerReview: async(req,res)=>{
    console.log("PRODUCT ID",req.params.productid)
    console.log("CUSTOMER ID",req.user.id)
    const findProductReview = await Review.find({"productId":req.params.productid,"customerId":req.user.id});
    console.log("findProductReview",findProductReview)    
      if(findProductReview.length != 0){
        return res.status(403).json({ error: 'already given' });
      }
    Customers.findOne({_id:req.user.id}, function(err, result) {
      const productReview  = {...req.body, reviewOn: new Date().getTime(),productId:req.params.productid,customerId:req.user.id,customerName:result.name,customerImage:result.image};
      const newProductReview = new Review(productReview); 
      newProductReview.save(function (err, reviewDetails){
        if (err){
          req.status(405).send(err);
        }
        else{
          console.log("REVIEW DETAILS=>", newProductReview)
          res.status(200).json(reviewDetails);
        }
      });
    });
  },
  updateReview:async(req,res)=>{
    const  reviewId = req.params.reviewid;
    console.log("reviewId",reviewId)
    const updateReview = {};
    updateReview.modifiedOn = new Date().getTime();
    if(req.body.ratting <= 5){
      if(req.body.ratting)updateReview.ratting = req.body.ratting;
    }
    if(req.body.description)updateReview.description = req.body.description;
    Review.findOneAndUpdate({_id:reviewId},updateReview,{multi: false},function(err,response){
      if(err)res.json({message:"Error in updating review"});
      res.json(response)
    })
  }
 
}