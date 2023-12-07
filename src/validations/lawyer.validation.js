/* eslint-disable prettier/prettier */
const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    noktpa: Joi.string().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    education: Joi.string().required(),
    specialize: Joi.string().required(),
    description: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
}

module.exports = {
  register,
  login
};