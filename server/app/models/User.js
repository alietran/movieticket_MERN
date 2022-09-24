// const bcrypt = require("bcrypt");
const messages = require("../constants/message");
const avataMale = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
const avataFemale = "https://cdn-icons-png.flaticon.com/512/2922/2922565.png";
const password_pattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
const noSpace_special = /^[a-zA-Z0-9]*$/;
const phone_pattern = /^\d{10}$/;
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const Comments = require("./Comment");

const Users = new mongoose.Schema(
  {
    userName: {
      type: String,
      // trim: true,
      required: [true, "Please tell us your name!"],
      unique: true,
      minlength: 8,
      maxlength: 16,
      match: [noSpace_special, messages.validateUserName],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please type your password"],
      select: false,
      // match: [password_pattern, messages.validatePassword],
    },

    email: { type: String, trim: true, required: true, unique: true },
    gender: { type: String, trim: true, default: "Nữ" },
    // default = 1 :chưa xóa
    status: { type: Number, default: 1 },
    roles: {
      type: String,
      enum: ["user", "admin", "guest", "moderator"],
      default: "user",
    },
    avatar: {
      type: String,
      trim: true,
      default: this.gender === true ? avataMale : avataFemale,
    },
    // isActive: true => đang hoạt động
    isActive: { type: Boolean, trim: true, default: true },
    displayName: { type: String, trim: true, default: null },
    phoneNumber: {
      type: String,
      trim: true,
      default: null,
      unique: true,
      // match: [phone_pattern, messages.validatePhone],
    },
    dateOfBirth: {
      type: Date,
    },
    listMovieFavorite: [
      { type: mongoose.Schema.Types.ObjectId, ref: "movies", unique: true },
    ],
    bookingHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bookingHistory",
        unique: true,
      },
    ],
    createAt: { type: Date, default: Date.now },
    deleteAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now, commit: String },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
// Comments.virtual("comments", {
//   ref: "comments",
//   foreignField: "userId",
//   localField: "_id",
// });

Users.virtual("tickets", {
  ref: "tickets",
  foreignField: "userId",
  localField: "_id",
});

Users.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
Users.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    return next();
  }
});

// Users.static('verifyPassword', (password, hash) => {
//   console.log(password)
//   if (password && hash) {
//     let passwordIsValid = bcrypt.compareSync(password, hash)
//     if (!passwordIsValid) {
//       const response = {
//         accessToken: null,
//         messageError: messages.InvalidPassword
//       }
//       return response
//     }
//   }
// })

// Users.static('hashPassword', (password) => {
//   if (password) {
//     const salt = bcrypt.genSaltSync(10)
//     return bcrypt.hashSync(password, salt)
//   }
// })

// const Userss = mongoose.model("Userss", Users);

module.exports = Users;
