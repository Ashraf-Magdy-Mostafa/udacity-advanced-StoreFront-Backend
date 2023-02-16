import supertest from "supertest";
import app from "../../server";
const request = supertest(app);
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import client from "../../DB";
dotenv.config();
const { TOKEN_SECRET } = process.env;
const token: string = jwt.sign(
  { name: "ashraf", stats: "test" },
  TOKEN_SECRET as unknown as string
);
describe("PRODUCTS HANDLER TESTS", () => {
  afterAll(async () => {
    const conn = await client.connect();

    conn.query("ALTER SEQUENCE products_id_seq RESTART WITH 1");
    conn.query("DELETE FROM products");
    conn.release();
  });
  it("creating new product", async () => {
    const data = await request
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "iphone", price: 699 });
    expect(data.status).toBe(200);
    expect(data.body.name).toBe("iphone");
  });

  it("get product by id", async () => {
    const product = await request.get("/products/1");
    expect(product.status).toBe(200);
    expect(product.body.name).toEqual("iphone");
  });
  it("get all products", async () => {
    const product = await request.get("/products");
    expect(product.status).toBe(200);
    expect(product.body.length).toBe(1);
  });
});
