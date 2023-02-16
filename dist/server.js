"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productshandler_1 = __importDefault(require("./handlers/productshandler"));
const userhandler_1 = __importDefault(require("./handlers/userhandler"));
//import BookRoutes from "./handlers/newh";
const body_parser_1 = __importDefault(require("body-parser"));
const orderhandler_1 = __importDefault(require("./handlers/orderhandler"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.listen(port, () => {
    console.log(" server running on localhost:", port);
});
app.get("/home", (req, res) => {
    res.send("hrloo");
});
(0, userhandler_1.default)(app);
(0, productshandler_1.default)(app);
(0, orderhandler_1.default)(app);
exports.default = app;
