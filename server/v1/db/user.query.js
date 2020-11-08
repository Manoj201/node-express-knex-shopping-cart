import knex from "server/util/knex";

const createUser = (data) => {
  return knex("users").insert(data, [
    "id",
    "user_name",
    "full_name",
    "email",
    "is_merchant",
  ]);
};

const isExistUserQuery = (user_name, email) => {
  return knex("users")
    .select("id")
    .where((qb) => {
      qb.where({ user_name });
      qb.orWhere({ email });
    });
};

export default {
  createUser,
  isExistUserQuery,
};
