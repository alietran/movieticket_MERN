const mongoose = require("mongoose");

const Comments = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    idMovie: { type: mongoose.Schema.Types.ObjectId, ref: "movies" },
    rating: { type: Number, trim: true },
    content: { type: String, trim: true },
    // status: { type: Number, trim: true, default: 1 },
    // likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users", index: true }],
    // disLikes: [
    //   { type: mongoose.Schema.Types.ObjectId, ref: "users", index: true },
    // ],
    createAt: { type: Date, default: Date.now },
    deleteAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now, commit: String },
  },
  {
    toJSON: { virtuals: true }, //xuất ra id để kết nối
    toObject: {
      virtuals: true,
    },
  }
);
// tìm tất cả
Comments.pre(/^find/, function (next) {
  this.populate({
    path: "userId",
    select: "userName",
  })
  next();
});

module.exports = Comments;
