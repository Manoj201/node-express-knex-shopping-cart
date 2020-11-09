"use strict";
import HttpStatus from "http-status-codes";

import userValidation from "server/v1/validations/user.validation";
import userService from "server/v1/services/user.service";
import errorFactory from "server/util/errorFactory";

const userController = {
  createUser: async (req, res, next) => {
    try {
      const validation = userValidation.createUserValidation(req.body);

      if (validation.valid) {
        const { userName, fullName, email, password, isMerchant } = req.body;
        const data = await userService.createUser(
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

  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await userService.getUserById(id);
      data
        ? res.status(HttpStatus.OK).json(data)
        : next(errorFactory.notFound(req.traceId));
    } catch (error) {
      next(error);
    }
  },
  getUsers: async (req, res, next) => {
    try {
      const { page, pageSize } = req.query;
      const data = await userService.getUsers(
        parseInt(page),
        parseInt(pageSize)
      );
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
