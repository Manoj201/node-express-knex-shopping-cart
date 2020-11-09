"use strict";

import express from "express";

import UserController from "server/v1/controller/user.controller";
import authenticate from "server/middlewares/authenticate";

const router = express.Router();

const userRoutes = (nodeApp) => {
  router.route("/user").post(UserController.createUser);
  router.route("/user/:id").get(UserController.getUserById);
  router.route("/user").get(UserController.getUsers);

  nodeApp.use("/api/v1", authenticate, router);
};

export default userRoutes;
