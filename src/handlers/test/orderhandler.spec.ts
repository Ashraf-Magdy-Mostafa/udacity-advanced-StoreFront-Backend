import supertest from "supertest";
import dotenv from "dotenv";
import client from "../../DB";
import app from "../../server";
import jwt from "jsonwebtoken";
const request = supertest(app);
import productStore from "../../model/products";
import userStore from "../../model/user";
const userstore = new userStore();
const productstore = new productStore();
dotenv.config();
const { TOKEN_SECRET } = process.env;
const token: string = jwt.sign(
  { name: "ashraf", stats: "test" },
  TOKEN_SECRET as unknown as string
);

//const STORE = new ordersStore();
describe("Orders Handlers", () => {
  beforeAll(async () => {
    ///create user
    const newu = await userstore.create({
      first_name: "ashraf",
      last_name: "magdy",
      hashed_password: "123",
    });
    /// create product
    await productstore.create({ name: "weapon", price: 10 });
  });
  afterAll(async () => {
    const conn = await client.connect();
    conn.query("ALTER SEQUENCE orders_id_seq RESTART WITH 1");
    conn.query("DELETE FROM orders");
    conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
    conn.query("DELETE FROM users");
    conn.query("ALTER SEQUENCE products_id_seq RESTART WITH 1");
    conn.query("DELETE FROM products");
    conn.release();
  });

  it("create new order", async () => {
    const response = await request
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userid: "1",
        stats: "active",
      });
    expect(response.status).toBe(200);
    expect(response.body.user_id).toEqual(1);
  });

  it(" get order by user_id", async () => {
    const response = await request.get("/orders/1");
    expect(response.status).toBe(200);
    expect(response.body[0].user_id).toEqual(1);
  });
  it("get all orders ", async () => {});
  it("create new product-order", async () => {
    const response = await request
      .post("/orders/1/products")
      .set("Authorization", `Bearer ${token}`)
      .send({ product_id: "1", quantity: "1" });
    expect(response.status).toBe(200);
  });
  it("get order by it's id", async () => {
    const response = await request
      .get("/orders/1/products")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
