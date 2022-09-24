const Controller = require("../controllers");

module.exports = (app) => {
  // middleWares.user.verifyPassword,
  app.post("/api/showtime/createShowtime", Controller.showtime.createShowtime);
  // app.get("/api/showtime/getAllShowtime/:id", Controller.showtime.getAllShowtime);
  app.get(
    "/api/showtime/getDetailShowtime/:id",
    Controller.showtime.getDetailShowtime
  );
  app.get("/api/showtime/getAllShowtime", Controller.showtime.getAllShowtime);
  app.patch(
    "/api/showtime/updateShowtime/:id",
    Controller.showtime.updateShowtime
  );
  app.delete(
    "/api/showtime/deleteShowtime/:id",
    Controller.showtime.deleteShowtime
  );
};
