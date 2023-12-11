/* eslint-disable prettier/prettier */
const bcrypt = require('bcryptjs');
const memberModel = require('../models/member.model');

exports.memberRegistration = async (post) => {
  const data = await memberModel.create(post);
  return data;
};

exports.getUserByEmail = async (email) => {
  return memberModel.findOne({ email });
};

exports.comparePassword = async(reqPW, password) => {
  const check = await bcrypt.compare(reqPW, password);
  return check;
}