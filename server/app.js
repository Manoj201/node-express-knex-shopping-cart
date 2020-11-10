import express from "express";
import Promise from "bluebird";

import server_init from "server/config/app.init";
import server_middlewares from "server/middlewares";

import {
  authenticateRoutes,
  userRoutes,
  merchantRoutes,
} from "server/v1/routes";

var app = express();
app.listenAsync = Promise.promisify(app.listen).bind(app);

const server_registerApi = (app) => {
  authenticateRoutes(app);
  userRoutes(app);
  merchantRoutes(app);
};

server_init();
server_middlewares.configure(app);
server_registerApi(app);
server_middlewares.notFoundHandler(app);
server_middlewares.globalErrorHandler(app);

export default app;
