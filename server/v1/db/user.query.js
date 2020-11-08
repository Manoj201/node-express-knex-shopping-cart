import knex from "server/util/knex";

const signUpQuery = (data) => {
  return knex("user").insert(data, "*");
};

export default {
  signUpQuery,
};
