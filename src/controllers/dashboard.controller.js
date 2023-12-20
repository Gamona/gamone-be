/* eslint-disable prettier/prettier */
/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const bcrypt = require('bcryptjs');
const path = require('path')
const fs = require('fs')
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { lawyerService, tokenService, dashboardService } = require('../services');
const config = require('../config/config');

const makePremiumUser = catchAsync(async (req, res) => {
  const { userId } = req.body
  const userPre = await dashboardService.userPremium(userId)
  if(!userPre) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed')
  }

  res.status(200).json({ 
    responseCode: 200, 
    status: "success",
    data: {
      name: userPre.name,
      email: userPre.email,
      role: userPre.role,
      userId: userPre._id,
      premium: userPre.premium,
    },
  });
})

const lawyerDashboard = catchAsync(async (req, res) => {
  const lawDash = await dashboardService.allLawyer()
  if(!lawDash) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed')
  }

  res.status(200).json({ 
    responseCode: 200, 
    status: "success",
    data: lawDash
  });
})

module.exports = {
  makePremiumUser,
  lawyerDashboard,
};