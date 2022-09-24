const mongoose = require("mongoose");
const Seat = require("./Seat");
const Ticket = new mongoose.Schema(
  {
    idShowtime: { type: mongoose.Schema.Types.ObjectId, ref: "showtimes" },
    seatList: [Seat], //seatList khác vs seatList trong showtime do trùng tên
    idSeat: { type: mongoose.Schema.Types.ObjectId, ref: "seats" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    totalPrice: { type: Number, required: true },
    createAt: { type: Date, default: Date.now },
    deleteAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now, commit: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

Ticket.pre(/^find/, function (next) {
  this.populate({
    path: "idShowtime",
    select: "ticketPrice idTheater idMovie dateShow",
  });
  next();
});

module.exports = Ticket;
