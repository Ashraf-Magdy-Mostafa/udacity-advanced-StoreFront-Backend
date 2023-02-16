import client from "../../DB";
import productStore, { product } from "../products";

// create    index    show
const store = new productStore();
describe("checking product to be defined", () => {
  it("index all products", () => {
    expect(store.index).toBeDefined();
  });
  it(" create new product", () => {
    expect(store.create).toBeDefined();
  });
  it("show product by id", () => {
    expect(store.show).toBeDefined();
  });
});

describe("checking product  model", async () => {
  beforeAll(async () => {
    await store.create({ name: "weapon", price: 10 });
  });
  afterAll(async () => {
    const conn = await client.connect();
    await conn.query("ALTER SEQUENCE products_id_seq RESTART WITH 1");
    await conn.query("DELETE FROM products");
    conn.release();
  });
  it(" create new product", async () => {
    const newproduct = await store.create({ name: "weapon1", price: 22 });
    expect(newproduct.name).toEqual("weapon1");
    expect(newproduct).toBeTruthy;
  });
  it("index all products", async () => {
    const products = await store.index();
    expect(products.length).toBe(2);
  });
  it("show product by id", async () => {
    const product = await store.show("1");
    expect(product.name).toEqual("weapon");
  });
});
