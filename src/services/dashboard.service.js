/* eslint-disable prettier/prettier */
const memberModel = require('../models/member.model')
const lawyerModel = require('../models/laywer.model')

exports.userPremium = async (userId) => {
  return memberModel.findByIdAndUpdate({"_id" : userId}, {"premium" : true});
} 

exports.allLawyer = async () => {
  return lawyerModel.find().select('name specialize education').exec();
}