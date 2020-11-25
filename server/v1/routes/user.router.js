"use strict";

import express from "express";
import multipart from "connect-multiparty";

import UserController from "server/v1/controller/user.controller";
import authenticate from "server/middlewares/authenticate";

const router = express.Router();
const multipartMiddleware = multipart();

const userRoutes = (nodeApp) => {
  router.route("/user").post(UserController.createUser);
  router.route("/user/:id").get(UserController.getUserById);
  router.route("/user").get(UserController.getUsers);
  router.route("/user/:id/upload-avatar").patch(multipartMiddleware, UserController.uploadAvatar);

  nodeApp.use("/api/v1", authenticate, router);
};

export default userRoutes;
