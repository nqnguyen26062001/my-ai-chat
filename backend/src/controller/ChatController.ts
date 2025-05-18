import { Request, Response } from "express";
import { Chat } from "../model/Chat";
import { ChatRepository } from "../repository/chatRepository";
// import { getOpenRouterAIResponse } from "../services/openrouter"
import { getAIResponse } from "../services/ai.service";

class ChatController {
  async postMessage(req: Request, res: Response) {

      const prompt = 'Hello! How can I help you today?';

    try {
        const responseAI = await getAIResponse( req.body.user_message);

        // const response = await getOpenRouterAIResponse(prompt);
        console.log('AI Response:', responseAI);

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

  async getMessages(req: Request, res: Response) {
    try {
      const new_note = await new ChatRepository().getMessages();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all note data!",
        data: new_note,
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
