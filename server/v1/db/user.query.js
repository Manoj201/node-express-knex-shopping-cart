import knex from "server/util/knex";

const signUpQuery = (data) => {
  return knex("users").insert(data, "*");
};

export default {
  signUpQuery,
};
