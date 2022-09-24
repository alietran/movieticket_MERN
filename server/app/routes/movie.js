const Controller = require("../controllers");
const { MODEL_MOVIES } = require("../models");
// const movieComment = require("./comment");

module.exports = (app) => {
  // middleWares.user.verifyPassword,
  app.post(
    "/api/movie/createMovie",
    Controller.movie.uploadUserPhoto,
    Controller.movie.createMovie
  );
  app.get("/api/movie/movieList", Controller.movie.getAllMovie);
  app.get(
    "/api/movie/getDetailMovie/:id",
    Controller.movie.getOne(MODEL_MOVIES, { path: "showtimes comment" })
  );
  // app.get("/:movieDetail/comment/", movieComment);
  app.delete("/api/movie/deleteMovie/:id", Controller.movie.deleteMovie);
  app.patch(
    "/api/movie/updateMovie/:id",
    Controller.movie.uploadUserPhoto,
    Controller.movie.updateMovie
  );
  // app.post("/api/movie/getDetailMovie/:id", Controller.movie.getDetailMovie);
};
