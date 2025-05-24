"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const ChatRouter_1 = __importDefault(require("./router/ChatRouter"));
const cors_1 = __importDefault(require("cors"));
const AuthRouters_1 = __importDefault(require("./router/AuthRouters"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.databaseSync();
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use((0, cors_1.default)({
            origin: "http://localhost:3000", // or '*' to allow all origins
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    databaseSync() {
        var _a;
        const db = new database_1.default();
        (_a = db.sequelize) === null || _a === void 0 ? void 0 : _a.sync();
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send("welcome home");
        });
        this.app.use("/api/chat", ChatRouter_1.default);
        this.app.use("/api/auth", AuthRouters_1.default);
    }
}
const port = 5000;
const app = new App().app;
app.listen(port, () => {
    console.log(" Server started successfully!");
});
