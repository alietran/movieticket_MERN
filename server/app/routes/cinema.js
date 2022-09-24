const Controller = require("../controllers");

module.exports = (app) => {
  // middleWares.user.verifyPassword,
  app.post("/api/cinema/createCinema", Controller.cinema.createCinema);
  app.get("/api/cinema/getAllCinema", Controller.cinema.getAllCinema);
  app.delete("/api/cinema/deleteCinema/:id", Controller.cinema.deleteCinema);
  app.get("/api/cinema/getDetailCinema/:id", Controller.cinema.getDetailCinema);
  app.patch("/api/cinema/updateCinema/:id", Controller.cinema.updateCinema);
};
