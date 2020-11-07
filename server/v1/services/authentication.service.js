"use strict";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserQuery from "server/v1/db/user.query";

const signUp = async (userName, fullName, email, password, isMerchant) => {
  const addedUser = await UserQuery.signUpQuery({
    user_name: userName,
    full_name: fullName,
    email,
    password,
    is_merchant: isMerchant,
  });
  return addedUser;
};

export default {
  signUp,
};
