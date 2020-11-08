"use strict";
import HttpStatus from "http-status-codes";

import userValidation from "server/v1/validations/user.validation";
import authenticationService from "server/v1/services/authentication.service";
import errorFactory from "server/util/errorFactory";

const userController = {
  createUser: async (req, res, next) => {
    try {
      const validation = userValidation.createUserValidation(req.body);

      if (validation.valid) {
        const { userName, fullName, email, password, isMerchant } = req.body;
        const data = await authenticationService.createUser(
          userName,
          fullName,
          email,
          password,
          isMerchant
        );

        data.status === HttpStatus.CREATED
          ? res.status(HttpStatus.CREATED).json(data.result)
          : next(errorFactory.conflict(req.traceId));
      } else {
        next(validation);
      }
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
