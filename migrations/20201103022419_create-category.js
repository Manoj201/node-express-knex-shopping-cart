exports.up = function (knex) {
  return knex.schema.createTable("category", (table) => {
    table.uuid("id").primary();
    table.text("code");
    table.text("name");
    table.boolean("status");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("category");
};
