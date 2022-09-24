const middlewares = require("../middlewares");
const Controller = require("../controllers");

module.exports = (app) => {
  // Thêm bình luận
  app.post(
    "/api/comment/addComment",
    // [middlewares.auth.VerifyToken],
    [middlewares.user.protect],
    Controller.comment.addComment
  );
   app.get(
     "/api/comment/getAllComment",
    //  [middlewares.user.protect],
     Controller.comment.getAllComment
   );
} 