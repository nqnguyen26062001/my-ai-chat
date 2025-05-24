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
exports.getOpenRouterAIResponse = getOpenRouterAIResponse;
const axios_1 = __importDefault(require("axios"));
function getOpenRouterAIResponse(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions';
        const apiKey = process.env.OPENROUTER_API_KEY; // Replace with your actual environment variable
        try {
            const response = yield axios_1.default.post('https://openrouter.ai/api/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            const data = response.data;
            return data.choices[0].message.content;
        }
        catch (error) {
            console.error('Error in getAIResponse:', error);
            throw new Error('Failed to get AI response');
        }
    });
}
