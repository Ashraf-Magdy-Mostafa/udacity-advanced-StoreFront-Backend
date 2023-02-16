import express, { Application, Request, Response } from "express";
import userStore, { user } from "../model/user";
import jwt from "jsonwebtoken";
import validatetoken from "../middlewear/auth";
import dotenv from "dotenv";
dotenv.config();
const { TOKEN_SECRET } = process.env;
const STORE = new userStore();

const getAll = async (req: Request, res: Response) => {
  /////index route
  try {
    const data = await STORE.index(); /// refrencing userStore.index() in "model route"
    res.json(data);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const get = async (req: Request, res: Response) => {
  ////show route
  try {
    const data = await STORE.show(req.params.id);
    res.json(data);
    console.log("user route id");
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const newuser = async (req: Request, res: Response) => {
  ///create route
  try {
    const user: user = {
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      hashed_password: req.body.password,
    };
    const newuser = await STORE.create(user);
    const token = jwt.sign(
      { newuser: newuser },
      process.env.TOKEN_SECRET as string
    );
    res.status(200).json({ newuser, token });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
///// emulating the log-in process to get a token.(((require token in the req.body)))////
const auth = async (req: Request, res: Response) => {
  try {
    jwt.verify(req.body.token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    console.log(err);
    throw new Error("No Token provided auth handler");
  }
  try {
    const { firstname, password } = req.body;
    const data = await STORE.authenticate(firstname, password);

    const token = jwt.sign({ data }, process.env.TOKEN_SECRET as string);
    if (!data) {
      return null;
    }
    //console.log(token);
    return res.json(data);
  } catch (err) {
    console.log("errrrrrrrrrr");
    throw new Error("cant authiticate user");
  }
};
/////making a token generator (in cause any thing happended)////
const guest = async (req: Request, res: Response) => {
  const data = {
    name: "guest",
  };
  const token = jwt.sign({ data }, TOKEN_SECRET as string);
  res.json(token);
};

const remove = async (req: Request, res: Response) => {
  try {
    const data = await STORE.delete(req.params.id);
    res.json({
      status: "success",
      message: "deleted :",
      data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userRoutes = (app: express.Application) => {
  app.get("/users", validatetoken, getAll);
  app.get("/users/:id", validatetoken, get);
  app.post("/users", newuser); //// removed token required for convenience
  app.post("/users/auth", auth);
  app.post("/guest", guest); //guest token
  app.delete("/users/:id", remove);
};

export default userRoutes;
