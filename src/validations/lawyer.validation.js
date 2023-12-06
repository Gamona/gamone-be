/* eslint-disable prettier/prettier */
const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    noktpa: Joi.string().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    education: Joi.string().required(),
    specialize: Joi.array().items(Joi.string()),
    description: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};

module.exports = {
  register
};