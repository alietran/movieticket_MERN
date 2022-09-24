const message = require("../constants/message");
const { MODEL_USERS } = require("../models");
const configsToken = require("../config/config.token");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const brypt = require("bcryptjs");
const AppError = require("../utils/appError");

const registerController = catchAsync(async (req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  const gender = req.body.gender;
  const dateOfBirth = req.body.dateOfBirth;
  const roles = req.body.roles;

  const user = new MODEL_USERS({
    userName,
    password,
    phoneNumber,
    email,
    gender,
    dateOfBirth,
    roles,
  });
  user
    .save()
    .then((data) => {
      // console.log("data", data);
      return res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

const signToken = (id) => {
  return jwt.sign({ id }, configsToken.secret, {
    expiresIn: configsToken.jwtExpiration,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const loginController = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    res.status(400).json({ message: "Missing username or password" });
  }

  const user = await MODEL_USERS.findOne({ userName }).select("+password");
  //   console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json({ status: "fail", message: message.LoginFailed });
  }

  createSendToken(user, 200, res);
};

const deleteUser = async (req, res) => {
 
  //  console.log("a");
  try {
    let query = MODEL_USERS.findById(req.params.id);
    // if (populateOptions) query = query.populate(populateOptions);
    const content = await query;
    console.log("content", content);

    if (!content) {
      return next(new AppError("No document found with that ID", 404));
    }
    const id = req.params.id;

    // console.log("role", role);
    if (content.roles != "admin") {
      const row = await MODEL_USERS.findByIdAndRemove(id).exec();

      if (!row) {
        // console.log(message.NotFound);
        return res.status(404).send({ messages: message.NotFound + id });
      }
      // console.log(message.DeleteSuccessfully);
      return res.status(200).send({ messages: message.DeleteSuccessfully });
    } else {
      return res
        .status(400)
        .send({ messages: "Không thể xóa tài khoản admin" });
    }
  } catch (error) {
    res.status(500).send({ messages: "Xóa tài khoản thất bại" });
  } 
};

 

const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await MODEL_USERS.findById(req.user.id).select("+password");
  const passwordCurrent = req.body.passwordCurrent;
  console.log(passwordCurrent);
  // 2) Check if POSTED current password is correct
  if (!(await user.correctPassword(passwordCurrent, user.password))) {
    return next(new AppError("Your current password is incorrect.", 401));
  }
 
  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send  JWT
  createSendToken(user, 200, res);
});

const activeUser = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!userId) {
      return res.status(404).send({ messages: "User not found" });
    }

    const result = await MODEL_USERS.findOneAndUpdate(
      { _id: userId },
      { isActive: false },
      {
        new: true,
        upsert: true,
      }
    );
    // console.log(user.isActive);
    return res.status(200).send({ messages: "Block successfully", result });
  } catch (error) {
    res.status(500).send({ messages: "Block fail" });
  }
};
// Tự update
const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const updateMe = catchAsync(async (req, res, next) => {
  // 2) Update user document
  console.log(req.body);
  // Get filtered name and email
  const filteredBody = filterObj(
    req.body,
    "phoneNumber",
    "email",
    "gender",
    "dateOfBirth"
  );
  //  console.log(req.user.id);
  const updateUser = await MODEL_USERS.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const user = await MODEL_USERS.find();
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const getDetailUser = async (req, res,next) => {
  //  console.log("a");
  try {
    const id = req.params.id;
    const content = await MODEL_USERS.findById(id);

    if (!content) {
      console.log(message.NotFound);
      return res.status(404).send({ messages: message.NotFound + id });
    }
  
    return res.status(200).send({ content});
    
  } catch (error) {
    res.status(500).send({ messages: error });
  }
  req.userDetail = content;
  next();
};


const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const content = await query;
    if (!content) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      content,
    });
     req.userDetail = content;
     next();
  });

    const updateUserAdmin = catchAsync(async (req, res) => {
      const filteredBody = filterObj(req.body, "phoneNumber", "email","gender", "dateOfBirth");
      const updateUser = await MODEL_USERS.findByIdAndUpdate(
        req.user.id,
        filteredBody,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "success ",
        data: {
          user: updateUser,
        },
      });
    });

    const updateUser = catchAsync(async (req, res) => {
      
      const filteredBody = filterObj(req.body, "phoneNumber", "email","gender", "dateOfBirth","roles");
      const updateUser = await MODEL_USERS.findByIdAndUpdate(
       req.params.id,
        filteredBody,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "success ",
         content: updateUser
      });
    });

    const changeRole = async (req, res) => {
      //  console.log("a");
      const filteredBody = filterObj(
        req.body,
        "roles"
      );
      try {
        const id = req.params.id;
        const row = await MODEL_USERS.findByIdAndUpdate(id).exec();

        if (!row) {
          console.log(message.NotFound);
          return res.status(404).send({ messages: message.NotFound + id });
        }
        console.log(message.DeleteSuccessfully);
        return res.status(200).send({ messages: "Cập nhật thành công" });
      } catch (error) {
        res.status(500).send({ messages: "Cập nhật không thành công" });
      }
    };

module.exports = {
  registerController,
  loginController,
  deleteUser,
  updatePassword,
  activeUser,
  getAllUser,
  updateMe,
  getOne,
  getMe,
  updateUserAdmin,
  changeRole,
  getDetailUser,
  updateUser,
};
