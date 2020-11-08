"use strict";
import HttpStatus from "http-status-codes";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

import UserQuery from "server/v1/db/user.query";

const signUp = async (userName, fullName, email, password, isMerchant) => {
  let payload = {};
  const id = uuidv4();

  const exist = await UserQuery.isExistUserQuery(userName, email);
  if (exist.length) {
    payload.status = HttpStatus.CONFLICT;
  } else {
    const addedUser = await UserQuery.signUpQuery({
      id,
      user_name: userName,
      full_name: fullName,
      email,
      password: bcrypt.hashSync(password, 10),
      is_merchant: isMerchant,
      status: true,
    });
    payload.status = HttpStatus.CREATED;
    payload.result = addedUser && addedUser[0];
  }

  return payload;
};

export default {
  signUp,
};
