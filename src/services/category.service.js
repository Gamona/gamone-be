/* eslint-disable prettier/prettier */
const lawyerModel = require('../models/laywer.model');

exports.getLawyerLimit = async (params) => {
  const res = await lawyerModel
    .find({
      $and: [{ specialize: { $all: params } }],
    })
    .limit(2)
    .select('_id name specialize education')
    .exec();
  return res;
};

exports.getLawyerAll = async (params) => {
  const res = await lawyerModel
    .find({
      $and: [{ specialize: { $all: params } }],
    })
    .select('_id name specialize education')
    .exec();
  return res;
};
