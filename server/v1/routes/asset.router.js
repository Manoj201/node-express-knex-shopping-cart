"use strict";

import express from "express";

import AssetController from "server/v1/controller/asset.controller";

const router = express.Router();

const assetRoutes = (nodeApp) => {
  router.route("/avatar/:id").get(AssetController.getAvatar);

  nodeApp.use("/api/asset", router);
};

export default assetRoutes;
