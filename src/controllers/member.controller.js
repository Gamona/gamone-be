/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable security/detect-non-literal-fs-filename */
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { memberService, tokenService } = require('../services');
const config = require('../config/config');

const createMember = catchAsync(async (req, res) => {
  const { ktp, name, email, password } = req.body;

  if (req.file) {
    const tmp = req.file.path;
    const originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
    const fileName = `${req.file.filename}.${originalExt}`;
    const targetPath = path.resolve(config.rootPath, `../upload/${fileName}`);

    const src = fs.createReadStream(tmp);
    const dest = fs.createWriteStream(targetPath);

    src.pipe(dest);
    src.on('end', async () => {
      try {
        const payload = {
          ktp,
          name,
          email,
          password: await bcrypt.hash(password, 10),
          avatar: fileName,
        };

        await memberService.memberRegistration(payload);
        res.json({
          responseCode: 200,
          status: 'success',
        });
      } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
      }
    });
  } else {
    res.json({
      responseCode: 400,
      status: 'Error',
    });
  }
});

const loginMember = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const member = await memberService.getUserByEmail(email);
  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  } else {
    const check = await memberService.comparePassword(password, member.password);
    if (!check) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    } else {
      const tokens = await tokenService.generateAuthTokens(member);
      res.json({
        responseCode: 200,
        message: 'success',
        data: {
          name: member.name,
          email: member.email,
          role: member.role,
          userID: member._id,
          premium: member.premium,
        },
        tokens,
      });
    }
  }
});

module.exports = {
  createMember,
  loginMember,
};
