module.exports = (app) => {
  require("./auth")(app);
  require("./movie")(app);
  require("./cinema")(app);
  require("./showtime")(app);
  require("./seat")(app);
  require("./ticket")(app);
  require("./comment")(app);
};
 