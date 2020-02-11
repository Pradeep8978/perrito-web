const JWT = require('jsonwebtoken');
const Review = require('../models/reviews');
const Customers = require('../models/customers');
const { JWT_SECRET } = require('../configuration');
const multer = require('multer');
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
      Customers.findOne({_id:req.params.customerid}, function(err, result) {
        if (err) throw err;
        const productReview  = {...req.body, reviewOn: new Date().getTime(),productId:req.params.productid,customerId:req.params.customerid,customerName:result.name};
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
    const updateReview = {};
    updateReview.modifiedOn = new Date().getTime();
    if(req.body.ratting)updateReview.ratting = req.body.ratting;
    if(req.body.description)updateReview.description = req.body.description;
    Review.findOneAndUpdate({_id:reviewId},updateReview,{multi: false},function(err,response){
      if(err)res.json({message:"Error in updating review"});
      res.json(response)
    })
  }
 
}