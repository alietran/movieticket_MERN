const mongoose = require("mongoose");
const  Seat  = require("./Seat");
const Showtimes = new mongoose.Schema({
  idCinema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cinemas",
    required: "Lịch chiếu phim phải thuộc về một rạp.",
  },
  idMovie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
    required: "Lịch chiếu phim phải thuộc về một phim",
  },
  ticketPrice: { type: Number, trim: true },
  seatList: [Seat],
  dateShow: { type: Date, trim: true },
  createAt: { type: Date, default: Date.now },
  deleteAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now, commit: String },
});


Showtimes.pre(/^find/, function (next) {
  this.populate({
    path: "idCinema",
    // select: "name type",
  }).populate({
    path: "idMovie",
    // select: "name",
  });
  next();
});

module.exports = Showtimes;
