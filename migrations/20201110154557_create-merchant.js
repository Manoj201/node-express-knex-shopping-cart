const tableName = "merchants";

exports.up = async function (knex) {
  await knex.schema.createTable(tableName, (table) => {
    table.uuid("id").primary();
    table.text("country_code");
    table.text("merchant_name");
    table.boolean("status");
    table.uuid("user_id").references("id").inTable("users");
    table.timestamps(false, true);
  });

  await knex.raw(
    `CREATE TRIGGER update_timestamp BEFORE UPDATE ON ${tableName} FOR EACH ROW EXECUTE PROCEDURE update_timestamp();`
  );
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
