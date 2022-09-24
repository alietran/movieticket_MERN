const mongoose = require("mongoose");

const InfoCardHolder = new mongoose.Schema({
  cardHolder: { type: String, trim: true, required: true, maxlength: 32 },
  cardNumber: { type: String, trim: true, required: true, maxlength: 16 },
  cardType: { type: String, trim: true, required: true },
});

module.exports = InfoCardHolder;
