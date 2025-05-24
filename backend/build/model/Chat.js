"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Chat = class Chat extends sequelize_typescript_1.Model {
};
exports.Chat = Chat;
Chat.CHAT_TABLE_NAME = "messages";
Chat.CHAT_ID = "id";
Chat.CHAT_USERMESSAGE = "user_message";
Chat.CHAT_TIMESTAMP = "timestamp";
Chat.CHAT_AIRESPONSE = "ai_response";
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Chat.CHAT_ID,
    }),
    __metadata("design:type", Number)
], Chat.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(500),
        field: Chat.CHAT_USERMESSAGE,
    }),
    __metadata("design:type", String)
], Chat.prototype, "user_message", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: Chat.CHAT_TIMESTAMP,
    }),
    __metadata("design:type", Date)
], Chat.prototype, "timestamp", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(500),
        field: Chat.CHAT_AIRESPONSE,
    }),
    __metadata("design:type", String)
], Chat.prototype, "ai_response", void 0);
exports.Chat = Chat = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: Chat.CHAT_TABLE_NAME,
    })
], Chat);
