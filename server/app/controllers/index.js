const user = require("./userController");
const movie = require("./movieController.js");
const  cinema = require("./cinemaController.js");
const showtime = require("./showtimeController");
const seat = require("./seatController");
const ticket = require("./ticketController");
const comment = require("./commentController");

const Controller = {
  user,
  movie,
  cinema,
  showtime,
  seat,
  ticket,
    comment,
};

module.exports = Controller;
