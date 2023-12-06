/* eslint-disable prettier/prettier */
const lawyerModel = require('../models/laywer.model');

exports.lawyerRegistration = async (post) => {
  const data = await lawyerModel.create(post);
  return data;
};
