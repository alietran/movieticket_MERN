const Controller = require("../controllers");
const { MODEL_TICKET } = require("../models");
const middleWares = require("../middlewares");
const paypal = require("paypal-rest-sdk");
module.exports = (app) => {
  // middleWares.user.verifyPassword,
  app.post(
    "/api/ticket/createTicket",
    [middleWares.user.protect],

    // Controller.ticket.payment,
    Controller.ticket.createTicket
  );
  app.get("/api/ticket/getAllTicket", Controller.ticket.getAllTicket);
  app.delete(
    "/api/ticket/deleteTicket/:id",
    // [middleWares.user.protect],
    Controller.ticket.deleteTicket
  );
  app.post(
    "/api/ticket/pay",
    // [middleWares.user.protect],
    // Controller.ticket.getAllTicket,
    Controller.ticket.payment
  );
  app.get(
    "/api/ticket/success",
    // Controller.ticket.createTicket,
    Controller.ticket.excute
  );
};
