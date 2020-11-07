import knex from "server/util/knex";

const CategoryQueryies = {
  getAll() {
    return knex("category");
  },
};

export default CategoryQueryies;
