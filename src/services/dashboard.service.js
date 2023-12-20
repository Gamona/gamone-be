/* eslint-disable prettier/prettier */
const memberModel = require('../models/member.model')

exports.userPremium = async (userId) => {
  return memberModel.findByIdAndUpdate({"_id" : userId}, {"premium" : true});
} 