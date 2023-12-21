/* eslint-disable prettier/prettier */
const memberModel = require('../models/member.model')
const lawyerModel = require('../models/laywer.model')

exports.userPremium = async (userId) => {
  const member = await memberModel.findOneAndUpdate({_id : userId}, {premium : true}, { new: true });
  return member
} 

exports.allLawyer = async () => {
  const lawyer = await lawyerModel.find().select('name specialize education avatar').exec();
  return lawyer
}