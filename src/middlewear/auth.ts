import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { TOKEN_SECRET } = process.env;
const validatetoken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, TOKEN_SECRET as string);
    if (token) {
      if (decoded) {
        next();
      } else {
        res.json("error not verififed");
        res.status(401);
      }
    }
  } catch (error) {
    res.status(401);
    throw new Error("Not Token Provided");
  }
};
export default validatetoken;
