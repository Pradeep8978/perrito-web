const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      console.log('REQ BODY =>', req.body)
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  validateParams: (schema) => {
    return (req, res, next) => {
      const params = {...req.params, ...req.query}
      const result = Joi.validate(params, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      next();
    }
  },

  schemas: {

    authSchema: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.number().required(),
      password: Joi.string().required()
      
    }),
  
    loginSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
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
      images: Joi.array().items(Joi.string()).required(),
      seller_info: Joi.object().keys({
        name:Joi.string().required(),
        address_line_1: Joi.string().required(),
        address_line_2: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        pincode: Joi.number().required(),
        email: Joi.string().required(),
        phone:Joi.number().required(),
      }),
      dimensions: Joi.object().keys({
       height:Joi.string().required(),
       width:Joi.string().required(),
       weight:Joi.string().required(),
      }),
      // description: Joi.string().required(),
      description: Joi.array().items(Joi.string()).required(),
      specifications: Joi.array().items(Joi.object({
        label:Joi.string().required(),
        value:Joi.string().required(),
      })).required(),
      // specifications: Joi.string().required(),
      tags: Joi.array().items(Joi.string()).required(),

      important_info: Joi.string().required(),
      price: Joi.number().required(),
    }),
  }
}