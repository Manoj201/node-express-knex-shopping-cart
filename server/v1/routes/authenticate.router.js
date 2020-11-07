"use strict";

import express from "express";

import CategoryQueries from "server/v1/db/category/category.query";
import AuthenticationController from "server/v1/controller/authentication.controller";

const router = express.Router();

const authenticateRoutes = (nodeApp) => {
  router.route("/test").get((req, res, next) => {
    // res.json({ test: "test" });
    CategoryQueries.getAll().then((categories) => {
      res.json(categories);
    });
  });
  router.route("/sign-up").post(AuthenticationController.signUp);

  nodeApp.use("/api/v1", router);
};

export default authenticateRoutes;
