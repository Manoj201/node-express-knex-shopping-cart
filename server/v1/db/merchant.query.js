import knex from "server/util/knex";

const tableName = "merchants";

const createMerchant = (data) => {
  return knex(tableName).insert(data, [
    "id",
    "country_code",
    "merchant_name",
    "status",
    "user_id",
  ]);
};

export default {
  createMerchant,
};
