"use strict";
import HttpStatus from "http-status-codes";
import jwt from "jsonwebtoken";

import errorFactory from "server/util/errorFactory";
import logger from "server/util/logger";

import config from "server/config/app.config";

const authenticate = (req, res, next) => {
  try {
    const reqPath = req.path;
    const reqMethod = req.method;

    if (!(reqPath === "/user" && reqMethod === "POST")) {
      const bearerToken = req.headers.authorization;
      if (bearerToken) {
        const token = bearerToken.split("Bearer ")[1];
        const jwtPayload = jwt.verify(token, config.encryptionKey);
        if (jwtPayload) {
          next();
        }
      } else {
        const error = errorFactory.unAuthorized(req.traceId);
        logger.error(error.message, { token: req.traceId });
        res.status(HttpStatus.UNAUTHORIZED).json(error);
      }
    } else {
      next();
    }
  } catch (error) {
    const err = errorFactory.unAuthorized(req.traceId);
    logger.error(error.message, { token: req.traceId });
    res.status(HttpStatus.UNAUTHORIZED).json(err);
  }
};

export default authenticate;
