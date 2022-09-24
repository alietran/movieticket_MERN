const mongoose = require("mongoose");

const Movies = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    genre: { type: String, default: "" },
    trailer: { type: String, default: "" },
    premiere: { type: Date, default: Date.now }, //ngay ra mat
    durations: { type: String, default: "" }, //time chieu
    description: { type: String, default: "" },
    // comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    images: {
      type: String,
    },
    createAt: { type: Date, default: Date.now },
    deleteAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now, commit: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

Movies.virtual("showtimes", {
  ref: "showtimes",
  foreignField: "idMovie",
  localField: "_id",
});
Movies.virtual("comment", {
  ref: "comments",
  foreignField: "idMovie",
  localField: "_id",
});

module.exports = Movies;
