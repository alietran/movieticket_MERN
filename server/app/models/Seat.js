const mongoose = require("mongoose");

const Seat = new mongoose.Schema({
  name:{ type: String},
  isBooked: {type: Boolean, default: false},
  
});

module.exports = Seat;
