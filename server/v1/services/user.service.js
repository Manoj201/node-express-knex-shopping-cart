"use strict";
import HttpStatus from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import aws from "aws-sdk";
import sharp from "sharp";

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
  const dbResults = await UserQuery.getById(userId);
  return dbResults;
};

const getUsers = async (pageNumber, pageSize) => {
  const page = pageNumber || 1;
  const size = pageSize || config.listingPageSize;

  const users = await UserQuery.getUsers(page, size);
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

const uploadAvatar = async (userId, s3Params, filePath) => {
  const s3 = new aws.S3(s3Params);

  const covertedImage = await sharp(filePath).resize({
    width: 500,
    height: 500,
    fit: "cover",
  }).png().toBuffer();

  const imageKey = `avatar-${userId}.png`;

  const params = {
    Bucket: "gmp-shopping-cart/avatar",
    Key: imageKey,
    Body: covertedImage,
  };

  const stored = await s3.upload(params).promise();
  if (stored) {
    const avatarLocation = `avatar/${imageKey}`;
    await UserQuery.updateAvatarURL(userId, avatarLocation);
  }

  return getUserById(userId);
};

export default {
  createUser,
  getUserById,
  getUsers,
  uploadAvatar,
};
