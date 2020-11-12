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

const isExistUserQuery = (userName, email) => {
  return knex(tableName)
    .select("id")
    .where((qb) => {
      qb.where({ user_name: userName });
      qb.orWhere({ email });
    });
};

const getById = (id) => {
  return knex(tableName)
    .select([
      "users.id",
      "user_name as userName",
      "full_name as fullName",
      "email",
      "users.is_merchant as isMerchant",
      "merchants.id as merchantId",
      "merchants.country_code as countryCode",
      "merchants.merchant_name as merchantName",
      "merchants.status as merchantStatus",
    ])
    .leftJoin("merchants", "users.id", "merchants.user_id")
    .where("users.id", "=", id);
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
