const middleWares = require("../middlewares");
const controller = require("../controllers");
const { MODEL_USERS } = require("../models");

module.exports = (app) => {
  // middleWares.user.verifyPassword,
  app.post(
    "/api/auth/register",
    [middleWares.user.verifyUserName, middleWares.user.verifyPhoneNumber],

    controller.user.registerController
  );
  app.post(
    "/api/auth/login",
    //  [middleWares.user.verifyUserName],
    controller.user.loginController
  );
  app.get("/api/auth/getAllUser", controller.user.getAllUser);

  app.post(
    "/api/auth/updatePassword",
    [middleWares.user.protect],
    controller.user.updatePassword
  );

  app.delete(
    "/api/auth/deleteUser/:id",
    [
      middleWares.user.protect,
      middleWares.user.checkPermission("admin", "moderator"),
    ],
    // controller.user.getOne(MODEL_USERS),
    controller.user.deleteUser
  );

  app.get(
    "/api/auth/setActiveUser/:id",
    [middleWares.user.protect],
    controller.user.activeUser
  );
  // Update ng dùng
  // update thành viên
  app.patch(
    "/api/auth/updateMe",
    [
      middleWares.user.protect,
    
    ],
    controller.user.updateMe
  );

  app.get(
    "/api/auth/getOne/:id",
    [middleWares.user.protect],
    controller.user.getOne(MODEL_USERS, { path: "tickets" })
  );

  app.get(
    "/api/auth/getDetailUser/:id",
    [middleWares.user.protect],
    controller.user.getDetailUser
  );

  app.patch(
    "/api/auth/updateUserAdmin",
    [
      middleWares.user.protect,
      middleWares.user.checkPermission("admin", "moderator"),
    ],
    controller.user.updateUserAdmin
  );

  app.patch(
    "/api/auth/updateUser/:id",
    [
      middleWares.user.protect,
      middleWares.user.checkPermission("admin", "moderator"),
    ],
    controller.user.updateUser
  );


  app.patch(
    "/api/auth/editRole",
    [middleWares.user.protect, middleWares.user.checkPermission("moderator")],
    controller.user.changeRole
  );
};
