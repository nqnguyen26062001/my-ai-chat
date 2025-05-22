import { Request, Response } from "express";
import { Chat } from "../model/Chat";
import { ChatRepository } from "../repository/chatRepository";
import { getOpenRouterAIResponse } from "../services/openrouter"
import { getGeminiAIResponse } from "../services/genimi";

class ChatController {
  async login(req: Request, res: Response) {
    try {
      const responseAI = await getGeminiAIResponse( req.body.user_message);
      const new_chat = new Chat();
      new_chat.user_message = req.body.user_message;
      new_chat.ai_response = responseAI;

      await new ChatRepository().postMessage(new_chat);

      res.status(201).json({
        message: responseAI
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new ChatController()
