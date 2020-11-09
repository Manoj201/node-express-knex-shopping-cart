"use strict";
import HttpStatus from "http-status-codes";

import AuthenticateService from "server/v1/services/authenticate.service";
import errorFactory from "server/util/errorFactory";

const authenticateController = {
  authenticate: async (req, res, next) => {
    try {
      const { userName, password } = req.body;
      const data = await AuthenticateService.authenticate(userName, password);
      console.log(data);
      data.token
        ? res.status(HttpStatus.OK).json(data)
        : res
            .status(HttpStatus.UNAUTHORIZED)
            .json(errorFactory.unAuthorized(req.traceId));
    } catch (error) {
      next(error);
    }
  },
};

export default authenticateController;
