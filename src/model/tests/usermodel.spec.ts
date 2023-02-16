import userStore, { user } from "../user";
const store = new userStore();
import client from "../../DB";
import dotenv from "dotenv";
dotenv.config();

let u = {
  first_name: "test",
  last_name: "test",
  hashed_password: "123",
} as user;
describe("", () => {
  it("", async () => {
    await store.create({
      first_name: "test1",
      last_name: "test",
      hashed_password: "123",
    } as user);
    await store.create({
      first_name: "test2",
      last_name: "test",
      hashed_password: "123",
    } as user);
    await store.create({
      first_name: "test3",
      last_name: "test",
      hashed_password: "123",
    } as user);
  });
});

describe("checking User models to be defined", () => {
  it("get allUser to be defined", () => {
    expect(store.index).toBeDefined();
  });
  it("get singleUser by id to be defined", () => {
    expect(store.show).toBeDefined();
  });
  it("create newUser to be defined", () => {
    expect(store.create).toBeDefined();
  });
  it("user authiticate route to be defined", () => {
    expect(store.authenticate).toBeDefined();
  });
});

describe("authinticate user", () => {
  it("authinticate a user ", async () => {
    const createduser = await store.create(u);
    expect(store.authenticate(u.first_name, u.hashed_password)).toBeTruthy();
  });
});

describe("checking users endpoints", async () => {
  beforeAll(async () => {
    client.connect();
  });
  afterAll(async () => {
    const conn = await client.connect();
    conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
    const sql = "DELETE FROM users";
    await conn.query(sql);
    conn.release();
  });

  it("create new user", async () => {
    const newuser = await store.create(u);
    u.id = newuser.id;
    //console.log(newuser);
    expect(newuser).toEqual({
      id: newuser.id,
      first_name: "test",
      last_name: "test",
      hashed_password: newuser.hashed_password,
    } as unknown as user);
  });
  it("Get all users", async () => {
    const data = await store.index();
    expect(data.length).toEqual(5);
  });
  it("Get single user", async () => {
    const data = await store.show("1" as string);
    //console.log(data);
    expect(data).toEqual({
      id: data.id,
      first_name: "test1",
      last_name: "test",
      hashed_password: data.hashed_password,
    });
  });
  it("Delete single user", async () => {
    const data = await store.delete("5");
    expect(data).toBeTruthy();
  });
});
