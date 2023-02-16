import bcrypt from "bcrypt";
import client from "../DB";
import dotenv from "dotenv";
dotenv.config();
const { PEPPER, SALT } = process.env;

export type user = {
  id?: Number;
  first_name: String;
  last_name: String;
  hashed_password: string;
};

export class userStore {
  async create(u: user): Promise<user> {
    ///////CREATE///
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (first_name,last_name,hashed_password) VALUES($1,$2,$3) RETURNING *";
      const hash = bcrypt.hashSync(u.hashed_password + PEPPER, Number(SALT)); //hashing password
      const result = await conn.query(sql, [u.first_name, u.last_name, hash]); //injecting to table
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.first_name}): ${err}`);
    }
  }
  async index(): Promise<user[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }
  async show(id: string): Promise<user> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user with id: ${id}. Error: ${err}`);
    }
  }
  async delete(id: string): Promise<user> {
    const conn = await client.connect();
    const sql = "DELETE FROM users WHERE id=($1) returning *";
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  }

  async authenticate(
    firstname: String,
    password: String
  ): Promise<user | null> {
    try {
      const conn = await client.connect();
      const sql = "SELECT hashed_password FROM users WHERE first_name=($1)";

      const result = await conn.query(sql, [firstname]);

      if (result.rows.length) {
        const res = await conn.query(
          "SELECT * FROM users WHERE first_name=$1",
          [firstname]
        );
        //console.log(res);
        const user = res.rows[0];
        if (bcrypt.compareSync(`${password}${PEPPER}`, user.hashed_password)) {
          return user;
        }
      }
    } catch (err) {
      console.log(err);
    }
    return null; // no user found
  }
}

export default userStore;
