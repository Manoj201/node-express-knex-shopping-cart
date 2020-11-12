import express from "express";
import Promise from "bluebird";

import ServerInit from "server/config/app.init";
import ServerMiddlewares from "server/middlewares";

import {
  authenticateRoutes,
  userRoutes,
  merchantRoutes,
} from "server/v1/routes";

const app = express();
app.listenAsync = Promise.promisify(app.listen).bind(app);

const serverRegisterApi = (app) => {
  authenticateRoutes(app);
  userRoutes(app);
  merchantRoutes(app);
};

ServerInit();
ServerMiddlewares.configure(app);
serverRegisterApi(app);
ServerMiddlewares.notFoundHandler(app);
ServerMiddlewares.globalErrorHandler(app);

export default app;
