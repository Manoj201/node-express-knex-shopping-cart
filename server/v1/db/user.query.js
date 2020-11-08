import knex from "server/util/knex";

const signUpQuery = (data) => {
  return knex("users").insert(data, "*");
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
  signUpQuery,
  isExistUserQuery,
};
