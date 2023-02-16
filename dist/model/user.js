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
exports.userStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const DB_1 = __importDefault(require("../DB"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PEPPER, SALT } = process.env;
class userStore {
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            ///////CREATE///
            try {
                const conn = yield DB_1.default.connect();
                const sql = "INSERT INTO users (first_name,last_name,hashed_password) VALUES($1,$2,$3) RETURNING *";
                const hash = bcrypt_1.default.hashSync(u.hashed_password + PEPPER, Number(SALT)); //hashing password
                const result = yield conn.query(sql, [u.first_name, u.last_name, hash]); //injecting to table
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`unable create user (${u.first_name}): ${err}`);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield DB_1.default.connect();
                const sql = "SELECT * FROM users";
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
                const sql = "SELECT * FROM users WHERE id=($1)";
                const conn = yield DB_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find user with id: ${id}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield DB_1.default.connect();
            const sql = "DELETE FROM users WHERE id=($1) returning *";
            const result = yield conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        });
    }
    authenticate(firstname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield DB_1.default.connect();
                const sql = "SELECT hashed_password FROM users WHERE first_name=($1)";
                const result = yield conn.query(sql, [firstname]);
                if (result.rows.length) {
                    const res = yield conn.query("SELECT * FROM users WHERE first_name=$1", [firstname]);
                    //console.log(res);
                    const user = res.rows[0];
                    if (bcrypt_1.default.compareSync(`${password}${PEPPER}`, user.hashed_password)) {
                        return user;
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
            return null; // no user found
        });
    }
}
exports.userStore = userStore;
exports.default = userStore;
