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
const DB_1 = __importDefault(require("../../DB"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
let token;
describe("TESTING USER HANDLER", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () { }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield DB_1.default.connect();
        conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
        const sql = "DELETE FROM users";
        yield conn.query(sql);
        conn.release();
    }));
    it("check create newUser", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield request.post("/users").send({
            firstname: "ashraf",
            lastname: "magdy",
            password: "123",
        });
        //const token = newUser.body[1].token;
        token = newUser.body.token;
        expect(newUser.status).toBe(200);
        expect(newUser.body.newuser.first_name).toEqual("ashraf");
        expect(newUser.body.newuser.id).toEqual(1);
        expect(newUser.body.newuser.last_name).toEqual("magdy");
    }));
    it("check users get all endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const test = yield request
            .get("/users")
            .set("Authorization", `Bearer ${token}`);
        expect(test.status).toBe(200);
        expect(test.body.length).toBe(1);
    }));
    it("check get user by id handler", () => __awaiter(void 0, void 0, void 0, function* () {
        const test = yield request
            .get("/users/1")
            .set("Authorization", `Bearer ${token}`);
        expect(test.status).toBe(200);
        expect(test.body.id).toBe(1);
        expect(test.body.first_name).toBe("ashraf");
        expect(test.body.last_name).toBe("magdy");
    }));
    it("check authinticate user handler", () => __awaiter(void 0, void 0, void 0, function* () {
        const test = yield request.post("/users/auth").send({
            firstname: "ashraf",
            password: "123",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJndWVzdCJ9LCJpYXQiOjE2NzEzMTg2MDl9.79zFna0GnImP26hLoKSIG5pX1SNSz_pGqN0vcLKMRII",
        });
        expect(test.status).toBe(200);
        expect(test.body.id).toEqual(1);
        expect(test.body.first_name).toEqual("ashraf");
        expect(test.body.last_name).toEqual("magdy");
    }));
    it("check Delete user handler", () => __awaiter(void 0, void 0, void 0, function* () {
        const test = yield request.delete("/users/1");
        expect(test.status).toBeDefined();
        expect(test.body.data.id).toEqual(1);
        expect(test.body.data.first_name).toEqual("ashraf");
        expect(test.body.data.last_name).toEqual("magdy");
    }));
});
