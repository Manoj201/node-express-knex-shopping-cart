import knex from "server/util/knex";

import Models from "server/v1/db/models";

const tableName = "users";


const createUser = (data) => {
  return knex(tableName).insert(data, [
    "id",
    "user_name",
    "full_name",
    "email",
    "is_merchant",
  ]);
};

const isExistUserQuery = (userName, email) => {
  return knex(tableName)
    .select("id")
    .where((qb) => {
      qb.where({ user_name: userName });
      qb.orWhere({ email });
    });
};

const getById = (id) => {
  return new Models.User({ id }).fetch({ withRelated: ["merchants"] });
};

const getByUsername = (userName) => {
  return knex(tableName)
    .select([
      "id",
      "user_name",
      "full_name",
      "email",
      "is_merchant",
      "password",
    ])
    .where({ "user_name": userName })
    .first();
};

const getUsers = (page, pageSize) => {
  return new Models.User().fetchPage({
    page, pageSize, withRelated: ["merchants"],
  });
};

const getUsersCount = () => {
  return knex(tableName).count("* as count").first();
};

const updateAvatarURL = (id, avatarURL) => {
  return knex(tableName).where({ id }).update({ "avatar_url": avatarURL });
};

export default {
  createUser,
  isExistUserQuery,
  getById,
  getByUsername,
  getUsers,
  getUsersCount,
  updateAvatarURL,
};
