import client from "../DB";
import dotenv from "dotenv";
dotenv.config();

export type order = {
  id?: Number;
  userid: String;
  stats: string;
};

export class ordersStore {
  async create(order: order): Promise<order> {
    try {
      const conn = await client.connect();
      const sql = "INSERT INTO orders (user_id,stats)VALUES($1,$2) RETURNING *";
      const result = await conn.query(sql, [order.userid, order.stats]);
      const Order = result.rows[0];
      conn.release();
      return Order;
    } catch (err) {
      throw new Error(`unable create order: (${order}): ${err}`);
    }
  }

  async index(): Promise<order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }
  async show(id: string): Promise<order | order[]> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find orders with id: ${id}. Error: ${err}`);
    }
  }
  async delete(id: string) {
    const conn = await client.connect();
    const sql = "DELETE FROM orders WHERE id=($1) ";
    const result = await conn.query(sql, [id]);
    return result;
  }
  async neworder(
    order_id: string,
    product_id: string,
    quantity: number
  ): Promise<{
    order_id: number;
    product_id: number;
    quantity: number;
  } | null> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders_products(order_id,product_id,quantity) VALUES($1,$2,$3) RETURNING *";
      const result = await conn.query(sql, [order_id, product_id, quantity]);
      const data = result.rows[0];
      return data;
    } catch (err) {
      console.log("what wrong is ", err);
      return null;
    }
  }

  async getorder(
    user_id: string
  ): Promise<
    | [id: Number, order_id: String, product_id: String, quantity: Number][]
    | null
  > {
    try {
      const conn = await client.connect();
      const sql = "SELECT id FROM orders WHERE user_id=($1)";
      const result = await conn.query(sql, [user_id]);
      const order_id = result.rows[0].id;
      const sql2 = "SELECT * FROM orders_products WHERE order_id=($1)";
      const orderedproduc = await conn.query(sql2, [order_id]);
      return orderedproduc.rows;
    } catch (err) {
      console.log(err);
    }
    return null;
  }
}

export default ordersStore;
