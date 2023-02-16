import supertest from "supertest";
import express, { Request, Response } from "express";
import app from "../server";

const request = supertest(app);

describe("Server tests", () => {
  it("testing server up and running", async () => {
    const res = await request.get("/home");
    expect(res.status).toBe(200);
  });
});
