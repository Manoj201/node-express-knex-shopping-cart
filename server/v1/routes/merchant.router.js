import express from "express";

import MerchantController from "server/v1/controller/merchant.controller";
import authenticate from "server/middlewares/authenticate";

const router = express.Router();

const merchantRoutes = (nodeApp) => {
  router.route("/merchant").post(MerchantController.createMerchant);

  nodeApp.use("/api/v1", authenticate, router);
};

export default merchantRoutes;
