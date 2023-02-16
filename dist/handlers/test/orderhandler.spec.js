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
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
const DB_1 = __importDefault(require("../../DB"));
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request = (0, supertest_1.default)(server_1.default);
const products_1 = __importDefault(require("../../model/products"));
const user_1 = __importDefault(require("../../model/user"));
const userstore = new user_1.default();
const productstore = new products_1.default();
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const token = jsonwebtoken_1.default.sign({ name: "ashraf", stats: "test" }, TOKEN_SECRET);
//const STORE = new ordersStore();
describe("Orders Handlers", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        ///create user
        const newu = yield userstore.create({
            first_name: "ashraf",
            last_name: "magdy",
            hashed_password: "123",
        });
        /// create product
        yield productstore.create({ name: "weapon", price: 10 });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield DB_1.default.connect();
        conn.query("ALTER SEQUENCE orders_id_seq RESTART WITH 1");
        conn.query("DELETE FROM orders");
        conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
        conn.query("DELETE FROM users");
        conn.query("ALTER SEQUENCE products_id_seq RESTART WITH 1");
        conn.query("DELETE FROM products");
        conn.release();
    }));
    it("create new order", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/orders")
            .set("Authorization", `Bearer ${token}`)
            .send({
            userid: "1",
            stats: "active",
        });
        expect(response.status).toBe(200);
        expect(response.body.user_id).toEqual(1);
    }));
    it(" get order by user_id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/orders/1");
        expect(response.status).toBe(200);
        expect(response.body[0].user_id).toEqual(1);
    }));
    it("get all orders ", () => __awaiter(void 0, void 0, void 0, function* () { }));
    it("create new product-order", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/orders/1/products")
            .set("Authorization", `Bearer ${token}`)
            .send({ product_id: "1", quantity: "1" });
        expect(response.status).toBe(200);
    }));
    it("get order by it's id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/orders/1/products")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
});
