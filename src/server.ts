import express, { Request, Response } from "express";
import productsRoutes from "./handlers/productshandler";
import userRoutes from "./handlers/userhandler";
//import BookRoutes from "./handlers/newh";
import bodyparser from "body-parser";
import ordersRoutes from "./handlers/orderhandler";
const app = express();
const port = 3000;
app.use(bodyparser.json());

app.listen(port, () => {
  console.log(" server running on localhost:", port);
});

app.get("/home", (req, res) => {
  res.send("hrloo");
});

userRoutes(app);
productsRoutes(app);
ordersRoutes(app);

export default app;
