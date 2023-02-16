import supertest from "supertest";
import client from "../../DB";
import { user } from "../../model/user";
import app from "../../server";
import express, { Request, Response } from "express";
const request = supertest(app);
let token: string;
describe("TESTING USER HANDLER", () => {
  beforeAll(async () => {});
  afterAll(async () => {
    const conn = await client.connect();
    conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
    const sql = "DELETE FROM users";
    await conn.query(sql);
    conn.release();
  });

  it("check create newUser", async () => {
    const newUser = await request.post("/users").send({
      firstname: "ashraf",
      lastname: "magdy",
      password: "123",
    });
    //const token = newUser.body[1].token;

    token = newUser.body.token;
    expect(newUser.status).toBe(200);
    expect(newUser.body.newuser.first_name).toEqual("ashraf");
    expect(newUser.body.newuser.id).toEqual(1);
    expect(newUser.body.newuser.last_name).toEqual("magdy");
  });
  it("check users get all endpoint", async () => {
    const test = await request
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(test.status).toBe(200);
    expect(test.body.length).toBe(1);
  });
  it("check get user by id handler", async () => {
    const test = await request
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(test.status).toBe(200);
    expect(test.body.id).toBe(1);
    expect(test.body.first_name).toBe("ashraf");
    expect(test.body.last_name).toBe("magdy");
  });

  it("check authinticate user handler", async () => {
    const test = await request.post("/users/auth").send({
      firstname: "ashraf",
      password: "123",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJndWVzdCJ9LCJpYXQiOjE2NzEzMTg2MDl9.79zFna0GnImP26hLoKSIG5pX1SNSz_pGqN0vcLKMRII",
    });
    expect(test.status).toBe(200);
    expect(test.body.id).toEqual(1);
    expect(test.body.first_name).toEqual("ashraf");
    expect(test.body.last_name).toEqual("magdy");
  });

  it("check Delete user handler", async () => {
    const test = await request.delete("/users/1");
    expect(test.status).toBeDefined();
    expect(test.body.data.id).toEqual(1);
    expect(test.body.data.first_name).toEqual("ashraf");
    expect(test.body.data.last_name).toEqual("magdy");
  });
});
