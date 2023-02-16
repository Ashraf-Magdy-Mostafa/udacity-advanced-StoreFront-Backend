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
exports.productStore = void 0;
const DB_1 = __importDefault(require("../DB"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class productStore {
    create(pro) {
        return __awaiter(this, void 0, void 0, function* () {
            ///////CREATE///
            try {
                const conn = yield DB_1.default.connect();
                const sql = "INSERT INTO products (name,price) VALUES($1,$2) RETURNING *";
                const result = yield conn.query(sql, [pro.name, pro.price]); //injecting to table
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`unable create product (${pro.name}): ${err}`);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield DB_1.default.connect();
                const sql = "SELECT * FROM products";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get users. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM products WHERE id=($1)";
                const conn = yield DB_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find product with id: ${id}. Error: ${err}`);
            }
        });
    }
}
exports.productStore = productStore;
exports.default = productStore;
