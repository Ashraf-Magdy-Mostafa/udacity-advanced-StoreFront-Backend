import client from "../DB";
import dotenv from "dotenv";

dotenv.config();

export type product = {
  id?: Number;
  name: String;
  price: Number;
};

export class productStore {
  async create(pro: product): Promise<product> {
    ///////CREATE///
    try {
      const conn = await client.connect();
      const sql = "INSERT INTO products (name,price) VALUES($1,$2) RETURNING *";
      const result = await conn.query(sql, [pro.name, pro.price]); //injecting to table
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`unable create product (${pro.name}): ${err}`);
    }
  }
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }
  async show(id: string): Promise<product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product with id: ${id}. Error: ${err}`);
    }
  }
}

export default productStore;
