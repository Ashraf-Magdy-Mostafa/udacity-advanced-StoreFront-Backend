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
const DB_1 = __importDefault(require("../../DB"));
const products_1 = __importDefault(require("../products"));
// create    index    show
const store = new products_1.default();
describe("checking product to be defined", () => {
    it("index all products", () => {
        expect(store.index).toBeDefined();
    });
    it(" create new product", () => {
        expect(store.create).toBeDefined();
    });
    it("show product by id", () => {
        expect(store.show).toBeDefined();
    });
});
describe("checking product  model", () => __awaiter(void 0, void 0, void 0, function* () {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield store.create({ name: "weapon", price: 10 });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield DB_1.default.connect();
        yield conn.query("ALTER SEQUENCE products_id_seq RESTART WITH 1");
        yield conn.query("DELETE FROM products");
        conn.release();
    }));
    it(" create new product", () => __awaiter(void 0, void 0, void 0, function* () {
        const newproduct = yield store.create({ name: "weapon1", price: 22 });
        expect(newproduct.name).toEqual("weapon1");
        expect(newproduct).toBeTruthy;
    }));
    it("index all products", () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield store.index();
        expect(products.length).toBe(2);
    }));
    it("show product by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield store.show("1");
        expect(product.name).toEqual("weapon");
    }));
}));
