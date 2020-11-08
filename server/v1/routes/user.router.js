"use strict";

import express from "express";

import UserController from "server/v1/controller/user.controller";

const router = express.Router();

const userRoutes = (nodeApp) => {
  router.route("/user").post(UserController.createUser);

  nodeApp.use("/api/v1", router);
};

export default userRoutes;
