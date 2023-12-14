/* eslint-disable prettier/prettier */
const lawyerModel = require('../models/laywer.model');

exports.getLawyerLimit = async (params) => {
  const res = await lawyerModel
    .find({
      $and: [{ specialize: { $all: params } }],
    })
    .limit(1)
    .exec();
  return res;
};

exports.getLawyerAll = async (params) => {
  const res = await lawyerModel
    .find({
      $and: [{ specialize: { $all: params } }],
    })
    .exec();
  return res;
};
