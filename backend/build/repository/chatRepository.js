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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const Chat_1 = require("../model/Chat");
class ChatRepository {
    postMessage(chat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Chat_1.Chat.create({
                    user_message: chat.user_message,
                    ai_response: chat.ai_response
                });
            }
            catch (error) {
                throw new Error("Method not implemented.");
            }
        });
    }
    getMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Chat_1.Chat.findAll();
            }
            catch (error) {
                throw new Error("Method not implemented.");
            }
        });
    }
}
exports.ChatRepository = ChatRepository;
