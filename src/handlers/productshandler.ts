import express, { Application, Request, Response } from "express";
import productStore, { product } from "../model/products";
import validatetoken from "../middlewear/auth";
const STORE = new productStore();

const getAll = async (req: Request, res: Response) => {
  try {
    const data = await STORE.index(); /// refrencing productstore.index() in "model route"
    res.json(data);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const get = async (req: Request, res: Response) => {
  try {
    const data = await STORE.show(req.params.id);
    res.json(data);
    console.log("products route id");
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const newProduct = async (req: Request, res: Response) => {
  try {
    const newproduct = await STORE.create(req.body);
    console.log(req.body);
    res.json(newproduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
export const productsRoutes = (app: express.Application) => {
  app.get("/products", getAll);
  app.get("/products/:id", get);
  app.post("/products", validatetoken, newProduct);
};

export default productsRoutes;
