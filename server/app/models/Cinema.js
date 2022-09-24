const mongoose = require("mongoose");
const Cinemas = new mongoose.Schema({
  name: { type: String, trim: true },
  cinemaType: { type: String, trim: true },
  seatsTotal:{type: Number, trim: true, default: 160 },
  createAt: { type: Date, default: Date.now },
  deleteAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now, commit: String },
});

module.exports = Cinemas;