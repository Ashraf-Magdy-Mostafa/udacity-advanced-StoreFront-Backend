"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = __importDefault(require("../model/orders"));
const auth_1 = __importDefault(require("../middlewear/auth"));
const STORE = new orders_1.default();
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    ////show route
    try {
        const data = yield STORE.show(req.params.id);
        res.json(data);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userid, status } = req.body;
        const neworder = yield STORE.create(req.body);
        //console.log(neworder);
        res.send(neworder);
    }
    catch (err) {
        console.log(err);
    }
});
const orderproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_id = req.params.id;
        const { product_id, quantity } = yield req.body;
        const data = yield STORE.neworder(order_id, product_id, quantity);
        res.send(data);
    }
    catch (error) {
        console.log(error);
        throw new Error("Cant Create OrderProduct");
    }
});
const getorderproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.userid;
        const data = yield STORE.getorder(user_id);
        const yourorders = data;
        res.json({
            message: "your user ordered Product by User_id is ",
            yourorders,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const ordersRoutes = (app) => {
    app.get("/orders/:userid/products", auth_1.default, getorderproduct); //show order-products
    app.get("/orders/:id", get); //// by user id
    app.post("/orders", auth_1.default, create);
    app.post("/orders/:id/products", auth_1.default, orderproduct); //create order-products
};
exports.default = ordersRoutes;
