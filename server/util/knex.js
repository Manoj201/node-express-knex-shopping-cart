import config from "../../knexfile";
import knex from "knex";

const enviorenment = process.env.NODE_ENV || "development";
const enviorenmentConfig = config[enviorenment];
const connection = knex(enviorenmentConfig);

export default connection;
