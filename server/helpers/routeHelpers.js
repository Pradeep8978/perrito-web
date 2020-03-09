const Joi = require("joi");

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      console.log("REQ BODY =>", req.body);
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },

  validateParams: schema => {
    return (req, res, next) => {
      const params = { ...req.params, ...req.query };
      const result = Joi.validate(params, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      next();
    };
  },

  schemas: {
    authSchema: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      phone: Joi.number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        .required(),
      password: Joi.string().required()
    }),

    loginSchema: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
      role: Joi.string()
    }),
    queryUser: Joi.object().keys({
      role: Joi.string()
    }),
    createCourse: Joi.object().keys({
      userId: Joi.string().required(),
      courseName: Joi.string().required(),
      description: Joi.string().required(),
      liveCourse: Joi.boolean().required(),
      liveSession: Joi.boolean(),
      curriculum: Joi.array().required(),
      metaTags: Joi.string().required()
    }),
    couseList: Joi.object().keys({
      id: Joi.string().required()
    }),
    uploadVideo: Joi.object().keys({
      id: Joi.string().required(),
      title: Joi.string().required()
      // video: Joi.binary().required()
    }),
    productSchema: Joi.object().keys({
      name: Joi.string().required(),
      categories: Joi.string().required(),
      images: Joi.array()
        .items(Joi.string())
        .required(),
      count: Joi.number().required(),
      seller_info: Joi.object().keys({
        name: Joi.string().required(),
        address_line_1: Joi.string().required(),
        address_line_2: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        pincode: Joi.number().required(),
        email: Joi.string()
          .email()
          .required(),
        phone: Joi.number().required()
      }),
      dimensions: Joi.object().keys({
        height: Joi.string().required(),
        width: Joi.string().required(),
        weight: Joi.string().required()
      }),
      // description: Joi.string().required(),
      description: Joi.array()
        .items(Joi.string())
        .required(),
      specifications: Joi.array()
        .items(
          Joi.object({
            label: Joi.string().required(),
            value: Joi.string().required()
          })
        )
        .required(),
      // specifications: Joi.string().required(),
      tags: Joi.array()
        .items(Joi.string())
        .required(),
      important_info: Joi.string().required(),
      price: Joi.number().required()
    }),
    productList: Joi.object().keys({
      search: Joi.string(),
      categories: Joi.string()
    }),
    reviewSchema: Joi.object().keys({
      rating: Joi.number()
        .integer()
        .min(1)
        .max(5)
        .required(),
      description: Joi.string().required()
    }),
    customerAuthSchema: Joi.object().keys({
      phone: Joi.number()
        .integer()
        .min(1000000000)
        .max(9999999999),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
      image: Joi.string()
    }),
    customerloginSchema: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
      role: Joi.string().required()
    }),
    customerupdateSchema: Joi.object().keys({
      phone: Joi.number()
        .integer()
        .min(1000000000)
        .max(9999999999),
      name: Joi.string(),
      password: Joi.string(),
      email: Joi.string().email(),
      dob: Joi.string().required(),
      gender: Joi.string().required(),
      address: Joi.array().items(
        Joi.object().keys({
          name: Joi.string().required(),
          phone: Joi.number().required(),
          secondaryPhone: Joi.number(),
          address_line_1: Joi.string().required(),
          address_line_2: Joi.string().required(),
          landmark: Joi.string().required(),
          city: Joi.string().required(),
          state: Joi.string().required(),
          pincode: Joi.number().required()
        })
      )
    }),
    feedbackSchema: Joi.object().keys({
      title: Joi.string().required(),
      message: Joi.string().required(),
      customerImage: Joi.array().items(Joi.string()),
      customerName: Joi.string()
    }),
    customerAddress: Joi.object().keys({
      name: Joi.string().required(),
      phone: Joi.number()
        .integer()
        .min(1000000000)
        .max(9999999999),
      address_line_1: Joi.string().required(),
      address_line_2: Joi.string().required(),
      landmark: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      pincode: Joi.number().required()
    }),
    orderSchema: Joi.object().keys({
      orders: Joi.array().items({
        productId: Joi.string().required(),
        quantity: Joi.number().required(),
        amount: Joi.number().required(),
        address: Joi.object().keys({
          name: Joi.string().required(),
          phone: Joi.number().required(),
          secondaryPhone: Joi.number().required(),
          address_line_1: Joi.string().required(),
          address_line_2: Joi.string().required(),
          landmark: Joi.string(),
          city: Joi.string().required(),
          state: Joi.string().required(),
          pincode: Joi.number().required()
        }),
        transactionId: Joi.string().required(),
        isCod: Joi.boolean().required(),
        status: Joi.string().required(),
        cancelledOn: Joi.string().required(),
        cancelledBy: Joi.string().required(),
        orderedOn: Joi.string().required()
      })
    })
  }
};
