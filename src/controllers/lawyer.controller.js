/* eslint-disable prettier/prettier */
/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const bcrypt = require('bcryptjs');
const path = require('path')
const fs = require('fs')
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { lawyerService, tokenService } = require('../services');
const config = require('../config/config');

const createLawyer = catchAsync(async (req, res) => {
  const { noktpa, name, address, education, specialize, description, email, password } = req.body
  const splitTag = specialize.split(",").map(function(item) {
    return item.trim();
  });

  if(req.file) { 
    const tmp = req.file.path;
    const originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
    const fileName = `${req.file.filename  }.${  originalExt}`;
    const targetPath = path.resolve(config.rootPath, `../src/public/uploads/${fileName}`);

    const src = fs.createReadStream(tmp);
    const dest = fs.createWriteStream(targetPath);

    src.pipe(dest);
    src.on('end', async() => {
      try {

        const payload = {
          noktpa,
          name,
          address,
          education,
          specialize: splitTag,
          description,
          email,
          password: await bcrypt.hash(password, 10),
          avatar: fileName
        }

        await lawyerService.lawyerRegistration(payload);
        res.json({ 
          responseCode: 200, 
          status: "success",
        });
        

      } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
      }
    })
  } else {
    try {

      const payload = {
        noktpa,
        name,
        address,
        education,
        specialize: splitTag,
        description,
        email,
        password: await bcrypt.hash(password, 10),
        avatar: 'undefined'
      }

      await lawyerService.lawyerRegistration(payload);
      res.json({ 
        responseCode: 200, 
        status: "success",
      });
      

    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
});

const loginLawyer = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const lawyer = await lawyerService.getUserByEmail(email);
  if (!lawyer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  
  } else {
    const check = await lawyerService.comparePassword(password, lawyer.password);
    if (!check) { 
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    } else {
      await lawyerService.updateStatusByID(lawyer._id)
      const tokens = await tokenService.generateAuthTokens(lawyer);
      res.json({ 
        responseCode: 200, 
        message: "success",
        data: {
          name: lawyer.name,
          email: lawyer.email,
          specialize: lawyer.specialize,
          education: lawyer.education,
          description: lawyer.description,
          role: lawyer.role,
          userId: lawyer._id,
        },
        tokens
      });
    }
  }
})


module.exports = {
  createLawyer,
  loginLawyer
};
