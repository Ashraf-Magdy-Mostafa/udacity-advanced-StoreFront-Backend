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
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DB_1 = __importDefault(require("../../DB"));
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const token = jsonwebtoken_1.default.sign({ name: "ashraf", stats: "test" }, TOKEN_SECRET);
describe("PRODUCTS HANDLER TESTS", () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield DB_1.default.connect();
        conn.query("ALTER SEQUENCE products_id_seq RESTART WITH 1");
        conn.query("DELETE FROM products");
        conn.release();
    }));
    it("creating new product", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield request
            .post("/products")
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "iphone", price: 699 });
        expect(data.status).toBe(200);
        expect(data.body.name).toBe("iphone");
    }));
    it("get product by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield request.get("/products/1");
        expect(product.status).toBe(200);
        expect(product.body.name).toEqual("iphone");
    }));
    it("get all products", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield request.get("/products");
        expect(product.status).toBe(200);
        expect(product.body.length).toBe(1);
    }));
});
