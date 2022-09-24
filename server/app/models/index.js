const Users = require("../models/User");
const Seats = require("./Seat");
// const Casts = require("./Cast");
const Movies = require("./Movie");
const Cinemas = require("./Cinema");
const Showtimes = require("./Showtime");
const Comments = require("./Comment");
const Tickets = require("./Ticket");
const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;

const MODEL_USERS = mongoose.model("users", Users);
const MODEL_CINEMAS = mongoose.model("cinemas", Cinemas);
const MODEL_SEATS = mongoose.model("SEATS", Seats);
// const MODEL_CASTS = mongoose.model("casts", Casts);
const MODEL_MOVIES = mongoose.model("movies", Movies);
const MODEL_SHOWTIME = mongoose.model("showtimes", Showtimes);
const MODEL_COMMENTS = mongoose.model("comments", Comments);
const MODEL_TICKET = mongoose.model("tickets", Tickets);

module.exports = {
  // mongoose,
  MODEL_USERS,
  MODEL_CINEMAS,
  MODEL_SEATS,
  // MODEL_CASTS,
  MODEL_MOVIES,
  MODEL_SHOWTIME,
  MODEL_COMMENTS,
  MODEL_TICKET,
};
