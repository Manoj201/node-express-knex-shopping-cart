exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.uuid("id").primary();
    table.text("user_name");
    table.text("full_name");
    table.text("email");
    table.text("avatar_url");
    table.text("password");
    table.boolean("is_merchant");
    table.boolean("status");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
