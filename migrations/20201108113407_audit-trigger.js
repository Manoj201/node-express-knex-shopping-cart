exports.up = function (knex) {
  return knex.raw(`
      CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER
      LANGUAGE plpgsql
      AS
      $$
      BEGIN
          NEW.updated_at = "select extract(epoch from now())";
          RETURN NEW;
      END;
      $$;
    `);
};

exports.down = function (knex) {
  return knex.raw(`
      DROP FUNCTION IF EXISTS update_timestamp() CASCADE;
    `);
};
