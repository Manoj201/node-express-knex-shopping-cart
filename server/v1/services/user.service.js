"use strict";
import HttpStatus from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

import UserQuery from "server/v1/db/user.query";
import config from "server/config/app.config";

const createUser = async (userName, fullName, email, password, isMerchant) => {
  const payload = {};
  const id = uuidv4();

  const exist = await UserQuery.isExistUserQuery(userName, email);
  if (exist.length) {
    payload.status = HttpStatus.CONFLICT;
  } else {
    const addedUser = await UserQuery.createUser({
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

const getUserById = async (userId) => {
  let response = {};
  const dbResults = await UserQuery.getById(userId);

  const userObject = dbResults[0];
  const { id, userName, fullName, email, isMerchant } = userObject;

  response = { id, userName, fullName, email, isMerchant };
  response.merchants = dbResults.map((item) => {
    const { merchantId, countryCode, merchantName, merchantStatus } = item;
    return { merchantId, countryCode, merchantName, merchantStatus };
  });

  return response;
};
const getUsers = async (pageNumber, pageSize) => {
  let page = pageNumber || 1;
  const size = pageSize || config.listingPageSize;

  if (page < 1) {
    page = 1;
  }
  const offset = (page - 1) * size;

  const users = await UserQuery.getUsers(size, offset);
  const countData = await UserQuery.getUsersCount();

  const total = parseInt(countData && countData.count);
  const lastPage = Math.ceil(total / size);

  return {
    data: users,
    meta: {
      page,
      size,
      total,
      lastPage,
    },
  };
};

export default {
  createUser,
  getUserById,
  getUsers,
};
