"use strict";
import HttpStatus from "http-status-codes";

// import errorFactory from "src/util/errorFactory";
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
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default authenticationController;
