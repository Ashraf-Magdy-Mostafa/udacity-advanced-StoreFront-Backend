import dotenv from "dotenv";
import pg from "pg";

const Pool = pg.Pool;
dotenv.config();
export const {
  pg_host,
  pg_user,
  pg_database,
  pg_password,
  pg_port,
  NODE_ENV,
  TEST_DB,
} = process.env;

export const DB = () => {
  ///// change DB based on NODE_ENV ///mainly for testing
  if (NODE_ENV === "dev") {
    return pg_database;
  } else {
    return TEST_DB;
  }
};

export let client = new Pool({
  user: pg_user,
  host: pg_host,
  database: DB(),
  password: pg_password,
  port: Number(pg_port),
});
console.log(DB());
export default client;
