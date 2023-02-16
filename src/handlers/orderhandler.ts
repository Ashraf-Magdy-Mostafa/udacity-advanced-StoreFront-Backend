import express, { Application, Request, Response } from "express";
import ordersStore from "../model/orders";
import validatetoken from "../middlewear/auth";
const STORE = new ordersStore();

const get = async (req: Request, res: Response) => {
  ////show route
  try {
    const data = await STORE.show(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { userid, status } = req.body;
    const neworder = await STORE.create(req.body);
    //console.log(neworder);
    res.send(neworder);
  } catch (err) {
    console.log(err);
  }
};
const orderproduct = async (req: Request, res: Response) => {
  try {
    const order_id = req.params.id;
    const { product_id, quantity } = await req.body;
    const data = await STORE.neworder(order_id, product_id, quantity);
    res.send(data);
  } catch (error) {
    console.log(error);
    throw new Error("Cant Create OrderProduct");
  }
};
const getorderproduct = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.userid;
    const data = await STORE.getorder(user_id);
    const yourorders = data;
    res.json({
      message: "your user ordered Product by User_id is ",
      yourorders,
    });
  } catch (err) {
    console.log(err);
  }
};

const ordersRoutes = (app: express.Application) => {
  app.get("/orders/:userid/products", validatetoken, getorderproduct); //show order-products
  app.get("/orders/:id", validatetoken, get); //// by user id
  app.post("/orders", validatetoken, create);
  app.post("/orders/:id/products", validatetoken, orderproduct); //create order-products
};

export default ordersRoutes;
