const tableName = "users";

exports.up = async function (knex) {
  await knex.schema.createTable(tableName, (table) => {
    table.uuid("id").primary();
    table.text("user_name");
    table.text("full_name");
    table.text("email");
    table.text("avatar_url");
    table.text("password");
    table.boolean("is_merchant");
    table.boolean("status");
    table.timestamps(false, true);
  });

  await knex.raw(
    `CREATE TRIGGER update_timestamp BEFORE UPDATE ON ${tableName} FOR EACH ROW EXECUTE PROCEDURE update_timestamp();`
  );
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
