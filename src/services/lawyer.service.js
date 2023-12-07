/* eslint-disable prettier/prettier */
const bcrypt = require('bcryptjs');
const lawyerModel = require('../models/laywer.model');

exports.lawyerRegistration = async (post) => {
  const data = await lawyerModel.create(post);
  return data;
};

exports.getUserByEmail = async (email) => {
  return lawyerModel.findOne({ email });
};

exports.updateStatusByID = async (id) => {
  return lawyerModel.findByIdAndUpdate({"_id" : id}, {"status" : "online"});
};

exports.comparePassword = async(reqPW, password) => {
  const check = await bcrypt.compare(reqPW, password);
  return check;
}