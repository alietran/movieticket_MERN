const Controller = require("../controllers");
const { MODEL_SEATS } = require("../models");

module.exports = (app) => {
  // middleWares.user.verifyPassword,
  app.post("/api/seat/createSeat", Controller.seat.createOne(MODEL_SEATS));
  app.get("/api/seat/getAllSeat", Controller.seat.getAllSeat);
};
