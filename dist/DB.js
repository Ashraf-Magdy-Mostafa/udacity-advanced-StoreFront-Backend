"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.DB = exports.TEST_DB = exports.NODE_ENV = exports.pg_port = exports.pg_password = exports.pg_database = exports.pg_user = exports.pg_host = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = __importDefault(require("pg"));
const Pool = pg_1.default.Pool;
dotenv_1.default.config();
_a = process.env, exports.pg_host = _a.pg_host, exports.pg_user = _a.pg_user, exports.pg_database = _a.pg_database, exports.pg_password = _a.pg_password, exports.pg_port = _a.pg_port, exports.NODE_ENV = _a.NODE_ENV, exports.TEST_DB = _a.TEST_DB;
const DB = () => {
    ///// change DB based on NODE_ENV ///mainly for testing
    if (exports.NODE_ENV === "dev") {
        return exports.pg_database;
    }
    else {
        return exports.TEST_DB;
    }
};
exports.DB = DB;
exports.client = new Pool({
    user: exports.pg_user,
    host: exports.pg_host,
    database: (0, exports.DB)(),
    password: exports.pg_password,
    port: Number(exports.pg_port),
});
console.log((0, exports.DB)());
exports.default = exports.client;
