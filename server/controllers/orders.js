const JWT = require("jsonwebtoken");
const Product = require("../models/products");
const Orders = require("../models/orders");
const { JWT_SECRET } = require("../configuration");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const getImageUrl = (body, id) => {
  const imgPath = `uploads/images/product_${body.name
    .split("/")
    .join("")}_${new Date().getTime()}_${id}.png`;
  return imgPath;
};

module.exports = {
  // orderProduct: async (req, res, next) => {
  //   const {deliveryAddress} = req.body;
  //   let products = await Product.find({
  //     '_id': { $in: ['5e5e11de28d46a00173e340c', '5e5e10d628d46a00173e3409'] }
  //   });
  //   products = products.map(product => {
  //     // product.productId = product._id;
  //     // delete product._id
  //     return{
  //       ...product
  //     }
  //   })
  //     // const newProductOrder = new Orders(orderProducts);
  //     // console.log("newProductOrder",newProductOrder)
  //     // Orders.insertMany(products, function (err, orderDetails) {
  //     //   if (err) {
  //     //     req.status(405).send(err);
  //     //   }
  //     //   else {
  //     //     console.log ("ORDER DETAILS=>", orderDetails)
  //     //     res.status(200).json(orderDetails);
  //     //   }
  //     // });
  //   // })
  // }
  orderProduct: async (req, res, next) => {
    const orderDetails = { ...req.body, orderedOn: new Date().getTime() };
    const newProductOrder = new Orders(orderDetails);
    newProductOrder.save(function(err, response) {
      if (err) {
        res.status(400).send(err);
      } else {
        console.log("ORDER DETAILS=>", response);
        res.status(200).json(response);
      }
    });
  },

  getOrderList: (req, res) => {
    const { customerId } = req.params;
    Orders.find({ customerId }, (err, orderList) => {
      if (err) {
        res.status(400).send(err);
      } else {
        console.log("ORDER List=>", orderList);
        res.status(200).json(orderList);
      }
    });
  }
};
