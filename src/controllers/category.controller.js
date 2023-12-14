/* eslint-disable prettier/prettier */
/* eslint-disable no-console */

const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const getCategoriesLimit = catchAsync(async (req, res) => {
  const { category } = req.body
  const cat = await categoryService.getLawyerLimit(category)
  if (!cat || cat.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  return res.send({
    responseCode: '200',
    message: 'Success',
    data: cat
  })
})

const getCategoriesAll = catchAsync(async (req, res) => {
  const { category } = req.body
  const cat = await categoryService.getLawyerAll(category)
  if (!cat || cat.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  return res.send({
    responseCode: '200',
    message: 'Success',
    data: cat
  })
})

module.exports = {
  getCategoriesLimit,
  getCategoriesAll
};
