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
exports.productsRoutes = void 0;
const products_1 = __importDefault(require("../model/products"));
const auth_1 = __importDefault(require("../middlewear/auth"));
const STORE = new products_1.default();
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield STORE.index(); /// refrencing productstore.index() in "model route"
        res.json(data);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield STORE.show(req.params.id);
        res.json(data);
        console.log("products route id");
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newproduct = yield STORE.create(req.body);
        console.log(req.body);
        res.json(newproduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const productsRoutes = (app) => {
    app.get("/products", getAll);
    app.get("/products/:id", get);
    app.post("/products", auth_1.default, newProduct);
};
exports.productsRoutes = productsRoutes;
exports.default = exports.productsRoutes;
