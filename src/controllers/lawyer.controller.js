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
const { lawyerService, tokenService } = require('../services');
const config = require('../config/config');

const createLawyer = catchAsync(async (req, res) => {
  const { noktpa, name, address, education, specialize, description, email, password } = req.body

  if(req.file) { 
    const tmp = req.file.path;
    const originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
    const fileName = `${req.file.filename  }.${  originalExt}`;
    const targetPath = path.resolve(config.rootPath, `../upload/${fileName}`);

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
          specialize,
          description,
          email,
          password: await bcrypt.hash(password, 10),
          avatar: fileName
        }

        const lawyer = await lawyerService.lawyerRegistration(payload);
        res.json({ 
          responseCode: 200, 
          status: "success",
        });
        

      } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
      }
    })
  } else {
    res.json({ 
      responseCode: 400, 
      status: "Must have avatar",
    });
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
      const tokens = await tokenService.generateAuthTokens(lawyer);
      res.json({ 
        responseCode: 200, 
        message: "success",
        tokens
      });
    }
  }
})


module.exports = {
  createLawyer,
  loginLawyer
};
