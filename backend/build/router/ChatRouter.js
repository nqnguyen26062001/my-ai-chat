"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("./base/BaseRouter"));
const ChatController_1 = __importDefault(require("../controller/ChatController"));
class ChatRoutes extends BaseRouter_1.default {
    routes() {
        this.router.post("", ChatController_1.default.postMessage);
        this.router.get("", ChatController_1.default.getMessages);
    }
}
exports.default = new ChatRoutes().router;
