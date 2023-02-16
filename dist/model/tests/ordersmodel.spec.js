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
const orders_1 = __importDefault(require("../orders"));
const Store = new orders_1.default();
describe("required ORDER function exists", () => {
    it("ceate order", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Store.create).toBeDefined();
    }));
    it("delete order", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Store.delete).toBeDefined();
    }));
    it("get order by id", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Store.getorder).toBeDefined();
    }));
    it("get all orders", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Store.index).toBeDefined();
    }));
    it("create new product order", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Store.neworder).toBeDefined();
    }));
    it("get product order by user_id", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Store.show).toBeDefined();
    }));
});
