"use strict";
import HttpStatus from "http-status-codes";

import errorFactory from "server/util/errorFactory";
import authenticationService from "server/v1/services/authentication.service";

const authenticationController = {
  signUp: async (req, res, next) => {
    try {
      console.log(req.body);
      const { userName, fullName, email, password, isMerchant } = req.body;
      const data = await authenticationService.signUp(
        userName,
        fullName,
        email,
        password,
        isMerchant
      );
      //
      data.status === HttpStatus.CREATED
        ? res.status(HttpStatus.CREATED).json(data.result)
        : next(errorFactory.conflict(req.traceId));
    } catch (error) {
      next(error);
    }
  },
};

export default authenticationController;
