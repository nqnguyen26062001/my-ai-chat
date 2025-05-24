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
const Chat_1 = require("../model/Chat");
const chatRepository_1 = require("../repository/chatRepository");
const genimi_1 = require("../services/genimi");
class ChatController {
    postMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responseAI = yield (0, genimi_1.getGeminiAIResponse)(req.body.user_message);
                const new_chat = new Chat_1.Chat();
                new_chat.user_message = req.body.user_message;
                new_chat.ai_response = responseAI;
                yield new chatRepository_1.ChatRepository().postMessage(new_chat);
                res.status(201).json({
                    message: responseAI
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!",
                });
            }
        });
    }
    getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_note = yield new chatRepository_1.ChatRepository().getMessages();
                res.status(200).json({
                    status: "Ok!",
                    message: "Successfully fetched all note data!",
                    data: new_note,
                });
            }
            catch (err) {
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!",
                });
            }
        });
    }
}
exports.default = new ChatController();
