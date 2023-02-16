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
exports.ordersStore = void 0;
const DB_1 = __importDefault(require("../DB"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class ordersStore {
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield DB_1.default.connect();
                const sql = "INSERT INTO orders (user_id,stats)VALUES($1,$2) RETURNING *";
                const result = yield conn.query(sql, [order.userid, order.stats]);
                const Order = result.rows[0];
                conn.release();
                return Order;
            }
            catch (err) {
                throw new Error(`unable create order: (${order}): ${err}`);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield DB_1.default.connect();
                const sql = "SELECT * FROM orders";
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
                const sql = "SELECT * FROM orders WHERE user_id=($1)";
                const conn = yield DB_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not find orders with id: ${id}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield DB_1.default.connect();
            const sql = "DELETE FROM orders WHERE id=($1) ";
            const result = yield conn.query(sql, [id]);
            return result;
        });
    }
    neworder(order_id, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield DB_1.default.connect();
                const sql = "INSERT INTO orders_products(order_id,product_id,quantity) VALUES($1,$2,$3) RETURNING *";
                const result = yield conn.query(sql, [order_id, product_id, quantity]);
                const data = result.rows[0];
                return data;
            }
            catch (err) {
                console.log("what wrong is ", err);
                return null;
            }
        });
    }
    getorder(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield DB_1.default.connect();
                const sql = "SELECT id FROM orders WHERE user_id=($1)";
                const result = yield conn.query(sql, [user_id]);
                const order_id = result.rows[0].id;
                const sql2 = "SELECT * FROM orders_products WHERE order_id=($1)";
                const orderedproduc = yield conn.query(sql2, [order_id]);
                return orderedproduc.rows;
            }
            catch (err) {
                console.log(err);
            }
            return null;
        });
    }
}
exports.ordersStore = ordersStore;
exports.default = ordersStore;
