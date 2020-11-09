"use strict";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserQuery from "server/v1/db/user.query";
import config from "server/config/app.config";

const authenticate = async (username, password) => {
  let result = {};

  const user = await UserQuery.getByUsername(username);
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      result.user = user;
      result.token = jwt.sign({ username, id: user.id }, config.encryptionKey, {
        expiresIn: 86400,
      });
    }
  }
  return result;
};

export default {
  authenticate,
};
