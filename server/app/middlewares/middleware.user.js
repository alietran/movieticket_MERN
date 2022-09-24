const jwt = require("jsonwebtoken");
const { MODEL_USERS } = require("../models");
const handleError = require("../errors/handleError");
const config = require("../config/config.token");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");
// const verifyPassword = async (req, res, next) => {
//   try {
//     const password = req.body.password;
//       console.log("a");
//     const hash = req.result.password;
//     // result là gì?
//     const VerifyPassword = MODEL_USERS.verifyPassword(password, hash);
//     if (verifyPassword !== undefined) {
//       handleError.hashPasswordError(VerifyPassword, res);
//     }
//     next();
//   } catch (error) {
//     handleError.serverError(error, res);
//   }
// };

const verifyUserName = async (req, res, next) => {
  try {
    const userName = req.body.userName;
    const result = await MODEL_USERS.findOne({ userName });
    if (result) {
      handleError.alreadyExistError(userName, res);
    }
    next();
  } catch (error) {
    handleError.serverError(error, res);
  }
};

const verifyPhoneNumber = async (req, res, next) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const result = await MODEL_USERS.findOne({ phoneNumber });
    if (result) {
      handleError.alreadyExistError(phoneNumber, res);
    }
    next();
  } catch (error) {
    handleError.serverError(error, res);
  }
};

const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, config.secret);

  // 3) Check if user still exists
  const currentUser = await MODEL_USERS.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }
  // 4) Check if user changed password after the token was issued
  //   if (currentUser.changedPasswordAfter(decoded.iat)) {
  //     return next(
  //       new AppError("User recently changed password!. Please log in again", 401)
  //     );
  //   }

  // GRANT ACCESS TO PROTECTED ROUTER
  req.user = currentUser;
  next();
});

const checkPermission = (...roles) => {
  return (req, res, next) => {
    // roles ["admin","lead-guide"]. role='user';
    if (!roles.includes(req.user.roles)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

module.exports = {
  verifyUserName,
  protect,
  checkPermission,
  verifyPhoneNumber,
};
