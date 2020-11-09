"use strict";

import express from "express";

import AuthenticateController from "server/v1/controller/authenticate.controller";

const router = express.Router();

const authenticateRoutes = (sdpApp) => {
  router.route("/").post(AuthenticateController.authenticate);

  sdpApp.use("/api/v1/login", router);
};

export default authenticateRoutes;
