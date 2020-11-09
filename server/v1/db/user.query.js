import knex from "server/util/knex";

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

const isExistUserQuery = (user_name, email) => {
  return knex(tableName)
    .select("id")
    .where((qb) => {
      qb.where({ user_name });
      qb.orWhere({ email });
    });
};

const getById = (id) => {
  return knex(tableName)
    .select(["id", "user_name", "full_name", "email", "is_merchant"])
    .where({ id })
    .first();
};

const getByUsername = (user_name) => {
  return knex(tableName)
    .select([
      "id",
      "user_name",
      "full_name",
      "email",
      "is_merchant",
      "password",
    ])
    .where({ user_name })
    .first();
};

const getUsers = (limit, offset) => {
  return knex(tableName)
    .select(["id", "user_name", "full_name", "email", "is_merchant"])
    .limit(limit)
    .offset(offset);
};

const getUsersCount = () => {
  return knex(tableName).count("* as count").first();
};

export default {
  createUser,
  isExistUserQuery,
  getById,
  getByUsername,
  getUsers,
  getUsersCount,
};
