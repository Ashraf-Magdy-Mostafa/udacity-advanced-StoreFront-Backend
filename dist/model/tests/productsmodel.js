"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = __importDefault(require("../products"));
const store = new products_1.default();
describe("checking product getall model", () => {
    it("index all products", () => {
        expect(store.index).toBeDefined();
    });
});
describe("checking products create model", () => {
    beforeAll;
    it(" create new product", () => {
        expect(store.create).toBeDefined();
    });
});
describe("checking product get by id model", () => {
    it("show by id", () => {
        expect(store.show).toBeDefined();
    });
});
