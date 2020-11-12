"use strict";
import helmet from "helmet";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import expressStatusMonitor from "express-status-monitor";
import HttpStatus from "http-status-codes";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import swaggerDocumentV1 from "server/v1/swager";

import logger from "server/util/logger";
import errorFactory from "server/util/errorFactory";

const configure = (app) => {
  app.use(compression());
  app.use(helmet());
  app.use(cors());
  app.use(expressStatusMonitor());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use("/api-docs/v1", swaggerUI.serve, swaggerUI.setup(swaggerDocumentV1));
};

const globalErrorHandler = (app) => {
  app.use((err, req, res, next) => {
    logger.error(err.message || err, { token: req.traceId });
    res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    res.json({
      message: err.message,
      error: err || errorFactory.internalServerError(req.traceId, err),
    });
  });
};

const notFoundHandler = (app) => {
  app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  });
};

export default { configure, globalErrorHandler, notFoundHandler };
