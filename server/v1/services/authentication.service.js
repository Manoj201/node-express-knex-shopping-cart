"use strict";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

import UserQuery from "server/v1/db/user.query";

const signUp = async (userName, fullName, email, password, isMerchant) => {
  const id = uuidv4();
  const addedUser = await UserQuery.signUpQuery({
    id,
    user_name: userName,
    full_name: fullName,
    email,
    password: bcrypt.hashSync(password, 10),
    is_merchant: isMerchant,
    status: true,
  });
  return addedUser && addedUser[0];
};

export default {
  signUp,
};
