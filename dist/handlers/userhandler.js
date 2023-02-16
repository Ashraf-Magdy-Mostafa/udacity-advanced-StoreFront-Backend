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
exports.userRoutes = void 0;
const user_1 = __importDefault(require("../model/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../middlewear/auth"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const STORE = new user_1.default();
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /////index route
    try {
        const data = yield STORE.index(); /// refrencing userStore.index() in "model route"
        res.json(data);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    ////show route
    try {
        const data = yield STORE.show(req.params.id);
        res.json(data);
        console.log("user route id");
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const newuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    ///create route
    try {
        const user = {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            hashed_password: req.body.password,
        };
        const newuser = yield STORE.create(user);
        const token = jsonwebtoken_1.default.sign({ newuser: newuser }, process.env.TOKEN_SECRET);
        res.status(200).json({ newuser, token });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
///// emulating the log-in process to get a token.(((require token in the req.body)))////
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        jsonwebtoken_1.default.verify(req.body.token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        console.log(err);
        throw new Error("No Token provided auth handler");
    }
    try {
        const { firstname, password } = req.body;
        const data = yield STORE.authenticate(firstname, password);
        const token = jsonwebtoken_1.default.sign({ data }, process.env.TOKEN_SECRET);
        if (!data) {
            return null;
        }
        //console.log(token);
        return res.json(data);
    }
    catch (err) {
        console.log("errrrrrrrrrr");
        throw new Error("cant authiticate user");
    }
});
/////making a token generator (in cause any thing happended)////
const guest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        name: "guest",
    };
    const token = jsonwebtoken_1.default.sign({ data }, TOKEN_SECRET);
    res.json(token);
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield STORE.delete(req.params.id);
        res.json({
            status: "success",
            message: "deleted :",
            data,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const userRoutes = (app) => {
    app.get("/users", auth_1.default, getAll);
    app.get("/users/:id", auth_1.default, get);
    app.post("/users", newuser); //// removed token required for convenience
    app.post("/users/auth", auth);
    app.post("/guest", guest); //guest token
    app.delete("/users/:id", remove);
};
exports.userRoutes = userRoutes;
exports.default = exports.userRoutes;
