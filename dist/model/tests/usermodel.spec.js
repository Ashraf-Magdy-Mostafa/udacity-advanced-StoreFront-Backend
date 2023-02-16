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
const user_1 = __importDefault(require("../user"));
const store = new user_1.default();
const DB_1 = __importDefault(require("../../DB"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let u = {
    first_name: "test",
    last_name: "test",
    hashed_password: "123",
};
describe("", () => {
    it("", () => __awaiter(void 0, void 0, void 0, function* () {
        yield store.create({
            first_name: "test1",
            last_name: "test",
            hashed_password: "123",
        });
        yield store.create({
            first_name: "test2",
            last_name: "test",
            hashed_password: "123",
        });
        yield store.create({
            first_name: "test3",
            last_name: "test",
            hashed_password: "123",
        });
    }));
});
describe("checking User models to be defined", () => {
    it("get allUser to be defined", () => {
        expect(store.index).toBeDefined();
    });
    it("get singleUser by id to be defined", () => {
        expect(store.show).toBeDefined();
    });
    it("create newUser to be defined", () => {
        expect(store.create).toBeDefined();
    });
    it("user authiticate route to be defined", () => {
        expect(store.authenticate).toBeDefined();
    });
});
describe("authinticate user", () => {
    it("authinticate a user ", () => __awaiter(void 0, void 0, void 0, function* () {
        const createduser = yield store.create(u);
        expect(store.authenticate(u.first_name, u.hashed_password)).toBeTruthy();
    }));
});
describe("checking users endpoints", () => __awaiter(void 0, void 0, void 0, function* () {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        DB_1.default.connect();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield DB_1.default.connect();
        conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
        const sql = "DELETE FROM users";
        yield conn.query(sql);
        conn.release();
    }));
    it("create new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const newuser = yield store.create(u);
        u.id = newuser.id;
        //console.log(newuser);
        expect(newuser).toEqual({
            id: newuser.id,
            first_name: "test",
            last_name: "test",
            hashed_password: newuser.hashed_password,
        });
    }));
    it("Get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield store.index();
        expect(data.length).toEqual(5);
    }));
    it("Get single user", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield store.show("1");
        //console.log(data);
        expect(data).toEqual({
            id: data.id,
            first_name: "test1",
            last_name: "test",
            hashed_password: data.hashed_password,
        });
    }));
    it("Delete single user", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield store.delete("5");
        expect(data).toBeTruthy();
    }));
}));
